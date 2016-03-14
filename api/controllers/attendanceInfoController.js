module.exports = {

	displayAttendance : function(req, res) {

		var value_major = 35035;
    	var value_minor = 64;
    	var date = "'2016-03-07'";    

    	   Beacon_student.find({major : value_major,minor : value_minor}, {select : ['gr_no_bs']})
    		.exec(function(err, user) {

    		if(err) 
    			res.badRequest('reason');

    		var data = {
                 user_data : user,
        	};

			var len = data.user_data.length;
			var grno = user[0].gr_no_bs;
			console.log(grno);
			console.log(user);
        	if(len == 1) {

    				Transaction_student.query('SELECT * FROM transaction_students WHERE gr_no_ts = ' +grno+ ' AND DATE(time_stamp) = '+date+';', function(err, user) {
  						if (err) return res.serverError(err);

  						console.log("----");
  						res.status(200);
  						return res.json(user);
					});
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