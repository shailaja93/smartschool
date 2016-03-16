/**
 * Transaction_studentsController
 *
 * @description :: Server-side logic for managing Transaction_students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async');
module.exports = {
	     
	attendance_student: function(req,res) {
       //var param = req.params.all();
       //var value_major = param.stud_major();
       var value_major = 1265;
       //---------------------------------------------------------------------------------
                                function hmsToSeconds(s) {
                                  var b = s.split(':');
                                  return b[0]*3600 + b[1]*60 + (+b[2] || 0);
                                }     
                                function secondsToHMS(secs) {
                                function z(n){return (n<10?'0':'') + n;}
                                var sign = secs < 0? '-':'';
                                secs = Math.abs(secs);
                                return sign + z(secs/3600 |0) + ':' + z((secs%3600) / 60 |0) + ':' + z(secs%60);
                                }
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
                   user_data : user,
           };
           console.log(data);
           
       
        var i =0;
        async.eachSeries(user, function (l, callback) {  
            console.log(user); 
        	  console.log(i);
          //  console.log(user[i].gr_no_bs);

          // Transaction_student.query('select gr_no_s,is_in_is_out,time_stamp from transaction_students where TIME(time_stamp) BETWEEN '08:00:00' AND '08:55:00' AND location = 'class' AND gr_no_ts = '+user[i].gr_no_bs+';',function(err2,userid) {
          // if (err2) {
          //     return res.send(err2);
          // }

          Transaction_student.find({
		        gr_no_ts: user[i].gr_no_bs
		      }, {
		        select: ['gr_no_ts', 'is_in_is_out', 'time_stamp', 'location']
		      })
		      .exec(function(err, user1) {
		        if (err) {
		          callback(err);
		        }
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
                               var a = user1[k].time_stamp.toLocaleTimeString();
                               var b = user1[j].time_stamp.toLocaleTimeString(); 
                               console.log(a);
                               console.log(b);
                             
                                var append = secondsToHMS(hmsToSeconds(b) - hmsToSeconds(a));
                                console.log(append);
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
                else
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
            }
            console.log("---AFTER INCREMENT-----");
            i= i+1;
            console.log(i);
            console.log("-----------------------------------"); 
            callback();
		      }); 
        });

    });                           
   },

   attendance_permonth :function(req,res) {

   var y = 2015;
   var m = 03;
   var grno = 35;
         Attendance_student.query('select presence,date from attendance_students where YEAR(date) = '+ y +' AND MONTH(date) = '+ m +' AND gr_no_as = '+ grno +' order by date asc;',function(err2,user) {
         if (err2) {
             return res.send(err2);
         }

         if(user.length == 0)
         {
          console.log("Please enter valid month/year");
         }
         else
         {
          for(var i = 0;i < user.length; i++)
          {
            user[i].date = user[i].date.toLocaleDateString();
          }
          console.log(user);
         }
       });

   },
 
   attendance_currentday :function(req,res) {

         var d = "'2016-03-16'";
         Attendance_student.query('select minor_as,presence from attendance_students where DATE(date) = '+ d +' order by date asc;',function(err2,user) {
         if (err2) {
             return res.send(err2);
         }
         console.log(user);
   });
  }
};

