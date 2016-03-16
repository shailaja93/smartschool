/**
 * UsersController
 *
 * @description :: Server-side logic for managing login_signups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {

insert_user: function(req, res) {

    var param = req.allParams();
    var pass = param.password;
    var uname = param.username;
    var ms = param.majors;
    var mf = param.majorf;

      User.find({
          uname: uname
        }, {
          select: ['uname']
        }) 
        .exec(function(err, user) {
          if (err) {
            return res.send(err);
          }

          var data = { 
            Count_user: user
          };
          
         
          var len = data.user_data.length;
          if (len == 1) 
          {
            return res.json("Username already existing");
          } 
          else {

            bcrypt.hash(pass, 10, function(err, hash) {
            if (err) return cb(err);
            pass = hash

            User.create({ 
              uname: uname,
              password: pass,
              major_student: ms,
              major_faculty: mf,
            }).exec(function(err, usercreate) {
            	if (err) {
                     return res.send(err);
                }
              //  return res.json("Successfully registered");
                return res.json(data);
            });
          });
         }
         });
},

list_user: function(req, res) {

         console.log("------");
         User.find({
            select: ['id', 'uname', 'password', 'major_student', 'major_faculty','is_delete']
          })
          .exec(function(err, user) {
          if (err) {
              return res.json(err);
          }
          else
          {
              var data = { 
                  Count_user: user
              };
              return res.json(data);
              //return res.view('list',{'data': data.Count_user});
          }   
      });  
  },

view_info_user: function(req,res) {

      var param = req.allParams();
      var id = param.id;
      User.find({
        id: id
      }, {
        select: ['uname', 'password', 'id', 'major_student', 'major_faculty','is_delete']
      })
      .exec(function(err, user1) {
        if (err) {
          return res.send(err);
        }
        var data = {
          Count_user: user1
        };
        return res.json(data);
      //return res.view('view_update',{'data': data.Count_user});
      });
},

update_user: function(req, res) {

    var param = req.allParams();
    var id = param.id;
    var ms = param.major_student;
    var mf = param.major_faculty;
  
    User.update({
      id: id
    }, {
      major_student: ms,
      major_faculty: mf,
    }).exec(function(err, user) {
      if (err) {
        return res.json(err);
      }
       var data = {
          Count_user: user
        }; 
        return res.json(data);
    });
},

delete_user: function(req,res)
  {
  
        var param = req.allParams();
        var id = param.id;
        User.find({ id : id },{
            select: ['is_delete']
         })
        .exec(function(err, user) {

        if(user[0].is_deleted == 1)
        {
          return res.json("Already deleted");
        }
        else
        {
        User.update({ id : id },{is_delete: 1}).exec(function (err,user){
        if (err) {
           return res.send(err);
        }
        var data = {
          Count_user: user
        }; 
        return res.json(data);
        });
     }
  });     
 }
};


