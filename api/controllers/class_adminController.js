/**
 * Admin_loginController
 *
 * @description :: Server-side logic for managing admin_logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');
var converter = require('json-2-csv');
var fs = require('fs');

module.exports = {

	userLogin : function(req, res) {

		var param = req.allParams();
    var username = param.textFieldClassRoomNo;
		var password = param.textFieldPassword;
      	
      	console.log(username);
      	console.log(password);

      User.find({username: username,password : password }, {select: ['username','major_student', 'major_faculty','uuid']})
      .exec(function(err, user) {
        if(err) {
            res.badRequest('reason');
        }
      
		  console.log(user);
    	var data = {
                   Count_user : user
        };
    	var len = data.Count_user.length;        
    
    	if(len == 1)
    	{
          console.log(req.session.username = user[0].username);
          res.status(200);
          console.log(data);
      		res.json(data);
    	}
    	else
    	{
        res.status(404);
        res.send('no such record');
    	}
    	});
	},

  userCreate : function(req, res) {

    console.log("---");
    var param = req.allParams();
    var username = param.user_name;
    var password = param.user_pwd;
    var floor = param.floor;
    var teacher_major = 52555;
    var uuid = param.uuid;//'B9407F30-F5F8-466E-AFF9-25556B57FE6';
    console.log(password + " -- " + username);

      if(username == 'washroom' || username == 'staffroom') {
        {
          var user_name = username + floor;
          var user_pwd = password + floor;
            User.create({username : user_name,
                        password : user_pwd,
                        uuid : uuid
                      }).exec(function(err, user) {

                      if(err) {

                        return res.send('failure');
                      } else {
                          
                        console.log(user);
                        return res.send("Success");
                      }

                   });
        }

      } else if(username == 'canteen' || username == 'library') {

        User.create({username :username,
                     password : password,
                     uuid : uuid
                      }).exec(function(err, user) {

                      if(err) {

                        return res.send('failure');
                      } else {
                        
                        console.log(user);
                        // res.status(200);
                        return res.send("Success");
                      }

                   });


      } else {

            var class_div =  (username.slice(-1)).charCodeAt(0);
            console.log(class_div);
            var class_no = username.slice(0, -1);
            console.log(class_no);
            var student_major = Number(class_no.concat(class_div));
            console.log(student_major);

            User.create({username :username,
                         password : password,
                         major_student : student_major,
                         major_faculty : teacher_major,
                         uuid : uuid
                      }).exec(function(err, user) {

                      if(err) {

                        console.log(user);
                        return res.send('failure');
                      } else {
                        
                        console.log(user);
                        return res.send("Success");
                      }

                   });
      }              
   },

    userList : function(req, res) {

     User.find({select: ['id','username','password','major_student','major_faculty','uuid']})
      .exec(function(err, user) {
        if(err) {
            res.badRequest('reason');
        }
        for(var i =0 ; i < user.length; i++) {
        
          if(user[i].username == 'canteen' || user[i].username == 'library') {      
          
            break;

          }else { 

                if((user[i].major_student.toString()).length < 5) {
                
                  var major_student_value = user[i].major_student.toString();
                  var major_student_class = (user[i].major_student.toString()).slice(0, -2);
                  var major_student_div = String.fromCharCode((user[i].major_student.toString()).substring(major_student_value.length - 2, major_student_value.length));
                  user[i].major_student = major_student_class.concat(major_student_div);
                }
          } 
        }
        //  var json2csvCallback = function (err, csv) {
        //   if (err) throw err;
        //    fs.writeFile('userList1.csv', csv, function(err) {
        //     if (err) throw err;
        //     console.log(csv);
        //     console.log('file saved');
        //    });
        //   };

        // converter.json2csv(user, json2csvCallback);
        return res.json(user);
  
      });
  },
  
    userUpdate : function(req, res) {
     
     req.accepts('application/json');
      var obj = req.body;
      console.log(obj);
      var id = obj[0].id;
      var username = obj[0].username;
      var password = obj[0].password;
      var major_student_value = obj[0].major_student;
      console.log(major_student_value);
      var major_faculty = 54651;

      if(major_student_value.length === 2) {

        var major_student_class = Number(major_student_value.charAt(0));
        console.log(major_student_class);
        var major_student_div = Number((major_student_value.slice(-1)).charCodeAt(0));
        console.log(major_student_div);
        var major_student = (major_student_class*100) + major_student_div;
        console.log(major_student);
//              }

        User.update({ 
             id: id}, {
            username : username,
            password : password,
            major_student : major_student,
            major_faculty : major_faculty
        }).exec(function(err, user) {

          if(err) { 
            
            console.log("+++++-----");
            return err;
          }
          // console.log(user);
          // console.log(user.length);
          res.status(200);
          return res.json('Data Updated');
     //      User.find({select: ['id','username','password','major_student','major_faculty']})
     //  .exec(function(err, user) {
     //    if(err) {
     //        res.badRequest('reason');
     //    }


     //     for(var i =0 ; i < user.length; i++) {
        
     //          if((user[i].major_student.toString()).length === 3) {

     //              var major_student_class = (user[i].major_student.toString()).charAt(0);
     //              var major_student_div = String.fromCharCode(user[i].major_student - (Number(major_student_class) *100));
     //              user[i].major_student = major_student_class.concat(major_student_div);
     //              // console.log(user[i].major_student);
     //          }
     //    }
     // //   console.log(user);
     //    return res.json(user);
  
      // });

      });
  }
    }

};

