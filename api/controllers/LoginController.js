/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	afterlogin_authenticate: function(req, res) {
    var param = req.allParams();
    var pass = param.password;
    var uname = param.username;

    Class_admin.find({
        uname: uname,
      }, {
        select: ['uname', 'password', 'major_student' ,'major_faculty','is_deleted']
      })
      .exec(function(err, user1) {
        if (err) {
          return res.send(err);
        }
        
        var data = {
          Count_user: user1
        };
        
        var len = data.Count_user.length;
        if (len == 1) {
              bcrypt.compare(pass, user1[0].password, function(err, valid) {
              console.log(valid);
              if (err) 
              {
                  return res.json("Error");
              }
              else
              if(user1[0].is_deleted == 0 && valid == true)
              {
                return res.json(data);
              }
              else
              {
                return res.json("Please enter valid password");
              }
          }); 
        }
        else
        {
            return res.json("Please enter valid username");
        }
    });
}
};

