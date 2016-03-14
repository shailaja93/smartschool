/**
 * Admin_loginController
 *
 * @description :: Server-side logic for managing admin_logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {

	userLogin : function(req, res) {

		var param = req.allParams(); 	       // getting the login params
    var username = param.textFieldClassRoomNo;
		var password = param.textFieldPassword;
      	
      	console.log(username);
      	console.log(password);

      User.find({username: username,password : password }, {select: ['username','major_student', 'major_faculty']})
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

    var param = req.allParams();
    var username = param.user_name;
    var password = param.user_pwd;
    var teacher_major = 52555;
    var student_major_classNo = param.student_major_classNo;
    var student_major_classDiv = param.student_major_classDiv; 


    var student_major = Number(student_major_classNo.concat((student_major_classDiv.charCodeAt(0)).toString()));
    //console.log(student_major);


    User.create({username :username,
              password : password,
              major_student : student_major,
              major_faculty : teacher_major
             }).exec(function(err, user) {

                if(err) {

                  return err;
                } else {
                  
                  console.log(user);
                  req.addFlash('signup_success', 'Succesfully signed up!');
                  //res.status(200);
                  return res.ok();
                  //return res.send("-----------");
                }

             });              
   },

    userList : function(req, res) {
      console.log("userList");
     User.find({select: ['id','username','password','major_student','major_faculty']})
      .exec(function(err, user) {
        if(err) {
            res.badRequest('reason');
        }
         for(var i =0 ; i < user.length; i++) {
        
              if((user[i].major_student.toString()).length === 3) {

                  var major_student_class = (user[i].major_student.toString()).charAt(0);
                  var major_student_div = String.fromCharCode(user[i].major_student - (Number(major_student_class) *100));
                  user[i].major_student = major_student_class.concat(major_student_div);
                  // console.log(user[i].major_student);
              }
        }
        console.log(user);
        return res.json(user);
  
      });
  },

    userUpdate : function(req, res) {
      
      var param = req.allParams();
      var id =param.id; //45;
      var username = param.username; //"3E";
      var password = param.password; //param.password;  "3E";
      var major_student_value = param.major_student; // "3E";
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

          User.find({select: ['id','username','password','major_student','major_faculty']})
      .exec(function(err, user) {
        if(err) {
            res.badRequest('reason');
        }


         for(var i =0 ; i < user.length; i++) {
        
              if((user[i].major_student.toString()).length === 3) {

                  var major_student_class = (user[i].major_student.toString()).charAt(0);
                  var major_student_div = String.fromCharCode(user[i].major_student - (Number(major_student_class) *100));
                  user[i].major_student = major_student_class.concat(major_student_div);
                  // console.log(user[i].major_student);
              }
        }
        console.log(user);
        return res.json(user);
  
      });

      });
  }
    }

};

