var async = require('async');

module.exports = {

	displayStudent : function(req, res) {

		var value_major = 35035;
    var data = [];

      Beacon_student.find({major : value_major}, {select : ['gr_no_bs','minor']})
           .exec(function(err, user) {            

        if (err) return res.serverError(err);

        async.forEachOfSeries(user, function(value,key,callback) {  

          var gr_no = user[key].gr_no_bs;

          Student.find({gr_no_s : gr_no}, {select : ['gr_no_s','name','surname']})
            .exec(function(err, user1) {

            if(err) 
              res.badRequest('reason');

             data = data.concat(user1);
             
              if(key == user.length - 1) {

                console.log(data);
                res.json(data);  
              }
              callback();
          });
       });
    });
  },

  DisplayStudentAttendance : function(req, res) {

      var param = req.allParams();
      // console.log(obj);
      console.log("----");
      var gr_no =  11142;//param.id;
      var date = param.date;
      var data = [];

			console.log(gr_no);

    				Transaction_student.query('SELECT * FROM transaction_students WHERE gr_no_ts = ' + gr_no + ' AND DATE(time_stamp) = "'+date+'" ORDER BY time_stamp ASC;', function(err, user) {
  						if (err) return res.serverError(err);

  						res.status(200);

              for(var i = 0; ; i = i+2) {
              
                if(i < user.length) {

                  var t1 = user[i].time_stamp.toLocaleTimeString();
                  var t2 = user[i+1].time_stamp.toLocaleTimeString();
                  console.log(t1 +' -- '+ t2);
                  user[i].time_stamp = t1 + " to " + t2;
              //  console.log(user[i]);
                  data = data.concat(user[i]);
                 }
                  else {
                  
                    console.log(data);
                    return res.json(data);
                  }
              }
					});
	},

  attendance_student: function(req,res) {
     
       //var param = req.params.all();
       //var value_major = param.stud_major();
       var value_major = 35035;
       var t1 = "'08:00:00'";
       var t2 = "'08:55:00'";
       var c = "'class'";
       //---------------------------------------------------------------------------------
          function sum(c,append) {
              var temp1 = c.split(':');
              var temp2 = append.split(':');
              var temp;
              console.log(temp1);
              console.log(temp2);
              temp = (Number(temp1[0]) + Number(temp2[0])) + ':' + (Number(temp1[1]) + Number(temp2[1])) + ':' + (Number(temp1[2]) + Number(temp2[2]));
              return temp;
          } 
          function calc(arr2,arr1) {
              return (Number(arr2[0]) - Number(arr1[0])) + ':' + (Number(arr2[1]) - Number(arr1[1])) + ':' + (Number(arr2[2]) - Number(arr1[2]));
          }                               
       //----------------------------------------------------------------------------------
       console.log("------STARTING POINT-----");
       Beacon_student.find({major : value_major}, {select : ['gr_no_bs','minor']})
           .exec(function(err, user) {            
               if(err)
                  res.badRequest('reason');           
               var data = {
                   user_data : user
           };
         //  console.log(data);
           
       
        var i =0;
        async.eachSeries(user, function (l, callback) {  
          console.log(user); 
          console.log(i);
          var q = 'select gr_no_ts,is_in_is_out,time_stamp,location from transaction_students where gr_no_ts = '+ user[i].gr_no_bs + ' AND location = '+ c + ' AND TIME(time_stamp) BETWEEN '+t1 + 'AND' + t2+ ';'
          
          Transaction_student.query(q,function(err,user1) {
           if (err) {
               return res.send(err);
           }
          //    attendanceInfo.find({
          //   gr_no_ts: user[i].gr_no_bs
          // }, {
          //   select: ['gr_no_ts', 'is_in_is_out', 'time_stamp', 'location']
          // })
          // .exec(function(err, user1) {
          //   if (err) {
          //     callback(err);
          //   }
            
            console.log(user1);
            console.log(i);
            
            console.log("-------LENGTH----------");
            console.log(user1.length);
            if(user1.length == 0)
            {
                  Attendance_student.create({ 
                  gr_no_as: user[i].gr_no_bs,
                  minor_as: user[i].minor,
                  major_as: value_major,
                  presence: 0
                  }).exec(function(err1, usercreate) {
                  if (err1) {
                       callback(err1);
                 }
                });
            }
            else if(user1.length == 1)
            {
                  Attendance_student.create({ 
                  gr_no_as: user[i].gr_no_bs,
                  minor_as: user[i].minor,
                  major_as: value_major,
                  presence: 1
                  }).exec(function(err1, usercreate) {
                  if (err1) {
                       callback(err1);
                 }
                });
            }
            else if(user1.length > 1)
            {
                if(user1.length % 2 == 0)
                {
                    console.log("EVEN");
                    var len = user1.length;
                    console.log(user1.length);
                    var c = 0;
                    var finalresult;
                    for(var k = 0,j = 1 ; k < len, j < len ; k = k + 2, j = j + 2)
                    {
                       console.log("--------------VALUE OF k-----------");
                       console.log(k);
                            console.log("--------------VALUE OF j-----------");
                            console.log(j);
                             var a = user1[k].time_stamp;
                             var b = user1[j].time_stamp; 
                             
                               var arr1 = [];
                               var arr2 = [];
                               
                               arr1[0] = a.getHours();
                               arr1[1] = a.getMinutes();
                               arr1[2] = a.getSeconds();
                               arr2[0] = b.getHours();
                               arr2[1] = b.getMinutes();
                               arr2[2] = b.getSeconds();
                               console.log(arr1);
                               console.log(arr2);
  
                            //   var append = secondsToHMS(hmsToSeconds(arr2) - hmsToSeconds(arr1));
                                 var append = calc(arr2,arr1);
                               if(c == 0)
                               {
                                 c = append;
                               }
                               else
                               {
                                  c = sum(c,append); 
                               } 
                               console.log(c);    
                    }
                    var c_split = c.split(':');
                    if(c_split[0] > 30)
                    {
                      Attendance_student.create({ 
                      gr_no_as: user[i].gr_no_bs,
                      minor_as: user[i].minor,
                      major_as: value_major,
                      presence: 1
                      }).exec(function(err1, usercreate) {
                      if (err1) {
                       callback(err1);
                      }
                      });
                    }
                    else
                    {
                      Attendance_student.create({ 
                      gr_no_as: user[i].gr_no_bs,
                      minor_as: user[i].minor,
                      major_as: value_major,
                      presence: 0
                      }).exec(function(err1, usercreate) {
                      if (err1) {
                           callback(err1);
                      }
                     });
                    }
                } 
                else {

                  Attendance_student.create({ 
                  gr_no_as: user[i].gr_no_bs,
                  minor_as: user[i].minor,
                  major_as: value_major,
                  presence: 1
                  }).exec(function(err1, usercreate) {
                  if (err1) {
                       callback(err1);
                 }
                });

                }
            }
            console.log("---AFTER INCREMENT-----");
            i= i+1;
            console.log(i);
            callback();
          }); 
        });
    });                           
   }

};


//dynamic json parsing
//-------------------------------------------------------------------------------

	// function call() {

	// 	var obj = {
 //    		name: "Simon",
 //    		age: "20",
 //    		clothing: {
 //        		style: "simple",
 //        		isDouche: false
 //    		}
	// 	}
	// 	for (var property in obj) {
    
 //    		if (obj.hasOwnProperty(property)) {
        		
 //        		if(typeof obj[property] === 'string') {

 //        			var property = obj[property];
 //        			console.log(property);
 //        			console.log(name);
 //        			//console.log(property + " --> " + obj[property]);
 //    				//console.log(typeof obj[property]);
 //    				//console.log(typeof property);

 //    			}
 //    			else {

 //    				var objs = obj[property];
 //    				for(var properties in objs) {

 //    					if (objs.hasOwnProperty(properties)) {

 //    						var properties = objs[properties];
 //    						console.log(properties);
 //    						//console.log(properties + " --> " + objs[properties]);
	// 					}

 //    				}
 //    			}
 //    		}
	// 	}
	// }
	// call(); 


//-------------------------------------------------------------------------------