/**
 * Transaction_studentsController
 *
 * @description :: Server-side logic for managing Transaction_students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async');
/**
 *@module Transaction Attendance StudentDetails
 */
module.exports = {
/**
  *Inserts every in and out of a student and faculty to track their location
  *@param {Object} req Json Object
  *@param {object} res
*/
insert_per_transaction_student_faculty : function (req, res) {

        // var obj = [{
        
        //         "major": 35035,
        //         "minor": 64,
        //         "flag": 1,
        // },
        // {
        
        //         "major": 35035,
        //         "minor": 64,
        //         "flag": 0
        // },
        // {
        
        //         "major": 35035,
        //         "minor": 63,
        //         "flag": 1
        // },
        // {
        
        //         "major": 35035,
        //         "minor": 63,
        //         "flag": 0
        // }]



        // var array : 
        // var str = "";
        // for (idex,object) in array.enumarate() {
        //     //object
        //     if index < array.count - 1 {
        //         let strObject = createStringFromJson(2,3,4);
        //         str = str + strObject + ","
        //     }
        // }

        // var strWithlast = str + createStringFromJson(5,6,7);
        // var finalStr = "[" + strWithlast + "]"


        // var array : 
        // var strObjectArray : Array<String> = Array();
        // for (idex,object) in array.enumarate() {
        //     //object
        //     if index < array.count - 1 {
        //         strObjectArray.append(createStringFromJson(2,3,4));
        //     }
        // }

        // var stringWithCommaObject = strObjectArray.commponentJoinByString(",")
        // var finalStr = "[" + stringWithCommaObject + "]"

        var obj = req.body;
        console.log(obj);
        console.log(obj[0].minor + " ---- " + obj[0].major);
        async.forEachOfSeries(obj, function(value,key,callback) {
            
            var value_major = obj[key].major;
            var value_minor = obj[key].minor;
            var flag = obj[key].flag;
            // console.log(key + "---->" + obj.length);
            console.log(value_major);

          if(value_major == 50143) {

            Beacon_faculty.find({major : value_major,minor : value_minor}, {select : ['gr_no_bf']})
            .exec(function(err, user) {

                if(err) 
                    res.badRequest('reason');

                var data = {
                    user_data : user,
                };

                var len = data.user_data.length;
                console.log(data);
                if(len == 1) {

                var grno = user[0].gr_no_bf;
                console.log(grno);

                  Transaction_faculty.query("SELECT is_in_is_out from transaction_faculties WHERE gr_no_tf='"+ grno + "'AND location='" + req.session.username + "' ORDER BY id DESC" + ";", function(err, user) {

                    console.log("====");
                    console.log(user);
                    if(user[0].is_in_is_out != flag) {

                      Transaction_faculty.create({
                                              gr_no_tf: grno,
                                              is_in_is_out : flag,
                                              location : req.session.username
                                          }).exec(function(err, user)  {

                                              if(err) {
                                                console.log(err);
                                                return err;    
                                              }

                                              else {
                                                console.log("++++");
                                                console.log(user);
                                                callback();
                                                return res.status(200);
                                              }
                                          }); 
                    } else {

                      console.log("======");
                      callback();
                    }
                  });
                  }
              });
          } else {
           
            Beacon_student.find({major : value_major,minor : value_minor}, {select : ['gr_no_bs']})
            .exec(function(err, user) {

                if(err) {
                    res.badRequest('reason');
                }
                var data = {
                    user_data : user,
                };

                console.log(data);
                var len = data.user_data.length;

                if(len == 1) {

                var grno = user[0].gr_no_bs;
                console.log(grno);

                  Transaction_student.query("SELECT is_in_is_out from transaction_students WHERE gr_no_ts='"+ grno + "'AND location='" + req.session.username + "'ORDER BY id DESC" + ";", function(err, user) {

                    // console.log(user);
                    if(user[0].is_in_is_out != flag) {     

                      Transaction_student.create({
                                              gr_no_ts : grno,
                                              is_in_is_out : flag,
                                              location : req.session.username
                                          }).exec(function(err, user)  {

                                              if(err) {
                                              
                                               return err;    
                                              }

                                              else {
                                          
                                              console.log("++++");
                                              callback();
                                              return res.status(200);
                                              }
                                          });
                    } else {

                      console.log("======");
                      callback();
                    }
                  }); 
                }
            });
          }
        });

}, 
/**
  *At the end of the day(On click of logout) this function will be called.Inserts the attendance(present or absent) of the Student based on timestamps of their entry and exit in class.The student must be present in class for atleast 30 mins to mark his presence as Present 
  *@param {Object} req Parameters(StartTime,EndTime,MiniTime)
  *@param {object} res 
*/
	attendance_student: function(req,res) {
       var param = req.params.all();
       var value_major = '1A';
       //var value_major = req.session.username;
       var class_div =  (value_major.slice(-1)).charCodeAt(0);
       console.log(class_div);
       var class_no = value_major.slice(0, -1);
       console.log(class_no);
       var value_major = Number(class_no.concat(class_div));
       console.log(value_major);
       //var loc = req.session.username;
       // var loc = '1A';
       var time1 = param.StartTime;
       var time2 = param.EndTime;
       var minimum_time = param.MiniTime;
       var minimum_time_split = minimum_time.split(':');
       var minimum_hrs = minimum_time_split[0];
       var minimum_min = minimum_time_split[1];
       var minimum_sec = minimum_time_split[2];
       //console.log(loc);
       console.log(time1);
       console.log(time2);
       console.log(minimum_time);
       console.log(minimum_hrs);
       console.log(minimum_min);
       console.log(minimum_sec);
       //var a = "c%";
       // var value_major = 1265;
       // var loc = "'class'";
       // var time1 = "'08:00:00'";
       // var time2 = "'16:55:00'";
       // var minimum_hrs = 01;
       // var minimum_min = 00;
       // var minimum_sec = 00;
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
           
                 console.log(user);
            
        var i =0;
        async.eachSeries(user, function (l, callback) {   
            console.log(i);
            console.log(user[i].gr_no_bs);
            var gr_no_bs = user[i].gr_no_bs;
            Transaction_student.query("select gr_no_ts,is_in_is_out,time_stamp from transaction_students where TIME(time_stamp) BETWEEN '"+ time1 +"' AND '"+ time2  +"' AND gr_no_ts = " + gr_no_bs + " AND location LIKE '";",function(err2,user1) {
             if (err2) {
                 console.log(err2);
                 return res.send(err2);
             }
              console.log("+++++++");
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
                  presence: 'A'
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
                  presence: 'P'
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
                               var a = user1[k].time_stamp.toLocaleTimeString('en-US', { hour12: false });
                               var b = user1[j].time_stamp.toLocaleTimeString('en-US', { hour12: false }); 
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
                    console.log("--------FINAL--------------");
                    console.log(c);
                    var c_split = c.split(':');
                    console.log("--------AFTER SPLIT--------------");
                    console.log(c_split[0]);
                    console.log(c_split[1]);
                    console.log(c_split[2]);
                    
                    if(c_split[0] < minimum_hrs) 
                     {
                      Attendance_student.create({ 
                      gr_no_as: user[i].gr_no_bs,
                      minor_as: user[i].minor,
                      major_as: value_major,
                      presence: 'A'
                      }).exec(function(err1, usercreate) {
                      if (err1) {
                       callback(err1);
                      }
                      });
                    }
                    else
                    { 
                      if(c_split[1] < minimum_min)
                      {
                        Attendance_student.create({ 
                        gr_no_as: user[i].gr_no_bs,
                        minor_as: user[i].minor,
                        major_as: value_major,
                        presence: 'A'
                        }).exec(function(err1, usercreate) {
                        if (err1) {
                         callback(err1);
                        }
                        });
                      }
                      else
                      {
                        if(c_split[2] < minimum_sec)
                        {
                          Attendance_student.create({ 
                          gr_no_as: user[i].gr_no_bs,
                          minor_as: user[i].minor,
                          major_as: value_major,
                          presence: 'A'
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
                          presence: 'P'
                          }).exec(function(err1, usercreate) {
                          if (err1) {
                           callback(err1);
                           }
                          });
                        }
                      }
                    }
                }
                else
                {
                    Attendance_student.create({ 
                    gr_no_as: user[i].gr_no_bs,
                    minor_as: user[i].minor,
                    major_as: value_major,
                    presence: 'A'
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

            if(user.length == i)
            {
              delete req.session.username;
              return res.json("Attendance Successfully Marked");
            }
          }); 
        });
     });  
},
/**
   *Displays the presence history to the month and year passed of a specific student
   *@param {Object} req Parameters(month,year)
   *@param {object} res 
   *@return {Object} json Object
*/
   attendance_permonth :function(req,res) {

       var param = req.params.all();
       var m = param.month;
       var y = param.year;
       var grno = param.gr_no_s;
       // var y = 2015;
       // var m = 03;
       // var grno = 35;
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
          return res.json(user);
         }
       });
   },
/**
   *Displays the current day attendance of the class passed
   *@param {Object} req Parameters(stud_class,stud_div)
   *@param {object} res 
   *@return {Object} json Object
*/
   attendance_currentday :function(req,res) {

         var param = req.params.all();
         var classNo = param.stud_class;
         var classDiv = param.stud_div;
         var major = 165;//Number(classNo.concat((classDiv.charCodeAt(0)).toString()));
         console.log(major);
         
         Attendance_student.query('SELECT students.name, students.surname, attendance_students.gr_no_as, attendance_students.minor_as, attendance_students.presence FROM students INNER JOIN attendance_students ON students.gr_no_s = attendance_students.gr_no_as where major_as = '+ major +' AND DATE(date) = DATE(CURDATE());',function(err2,user) {
         if (err2) {
             return res.send(err2);
         }
         
         console.log(user);
         return res.json(user);
   });
  },
/**
   *Displays the location history of the particular student of a specific date passed
   *@param {Object} req Parameters(gr_no_s,date)
   *@param {object} res 
   *@return {Object} json Object
*/
  student_locationhistory : function(req, res) {

      var param = req.allParams();
      console.log("----");
      var gr_no = param.gr_no_s;
      var date = param.date;
      var data = [];
      console.log(date);
      console.log(gr_no);

            Transaction_student.query("SELECT * FROM transaction_students WHERE gr_no_ts = " + gr_no + " AND DATE(time_stamp) = '"+date+"' ORDER BY time_stamp ASC;", function(err, user) {
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
                    if(user.length != 0) {
                      
                      console.log(data);
                      return res.json(data);
                    } else {

                      return res.send("No entries for the specified date or gr number");
                    }
                  } 
              }
          });
  }
};

//dynamic json parsing
//-------------------------------------------------------------------------------

  // function call() {

  //  var obj = {
 //       name: "Simon",
 //       age: "20",
 //       clothing: {
 //           style: "simple",
 //           isDouche: false
 //       }
  //  }
  //  for (var property in obj) {
    
 //       if (obj.hasOwnProperty(property)) {
            
 //           if(typeof obj[property] === 'string') {

 //             var property = obj[property];
 //             console.log(property);
 //             console.log(name);
 //             //console.log(property + " --> " + obj[property]);
 //           //console.log(typeof obj[property]);
 //           //console.log(typeof property);

 //         }
 //         else {

 //           var objs = obj[property];
 //           for(var properties in objs) {

 //             if (objs.hasOwnProperty(properties)) {

 //               var properties = objs[properties];
 //               console.log(properties);
 //               //console.log(properties + " --> " + objs[properties]);
  //          }

 //           }
 //         }
 //       }
  //  }
  // }
  // call(); 


//-------------------------------------------------------------------------------