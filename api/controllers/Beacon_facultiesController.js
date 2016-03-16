/**
 * Beacon_facultiesController
 *
 * @description :: Server-side logic for managing crud_mappingibeaconfaculties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	insert_beaconfaculty: function(req, res) {

	  var param = req.allParams();
    var id = param.id;
    var uuid = param.uuid;
    var maj = param.major;
    var min = param.minor;
    
            Beacon_faculty.create({ 
              faculty_id: id,
              uuid: uuid,
              major: maj,
              minor: min
            }).exec(function(err, usercreate) {
            	if (err) {
                     return res.send(err);
                }
                return res.json("Successfully mapping of a faculty's ibeacon done");
            });
},

update_beaconfaculty: function(req, res) {

    var param = req.allParams();
    var id = param.id;
    var uuid = param.uuid;
    var maj = param.major;
    var min = param.minor;
    
    Beacon_faculty.update({
      faculty_id: id
    }, {
              uuid: uuid,
              major: maj,
              minor: min
    }).exec(function(err, data) {
      if (err) {
        return res.json(err);
      }
      else
      {
        return res.json("Successfully mapping of a faculty's ibeacon updated");
      }
    });
},

list_beaconfaculty: function(req, res) {

         Beacon_faculty.find({
            select: ['faculty_id', 'uuid', 'major', 'minor', 'is_delete']
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

view_info_beaconfaculty: function(req,res) {

      var param = req.allParams();
      var id = param.id;
      Beacon_faculty.find({
        faculty_id: id
      }, {
        select: ['faculty_id', 'uuid', 'major', 'minor', 'is_delete']
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

delete_beaconfaculty: function(req,res)
 {
        var param = req.allParams();
        var id = param.id;
        Beacon_faculty.find({ faculty_id : id },{
            select: ['is_delete']
         })
        .exec(function(err, user) {

        if(user[0].is_delete == 1)
        {
          return res.json("Already deleted");
        }
        else
        {
        Beacon_faculty.update({ faculty_id : id },{is_delete: 1}).exec(function (err,user){
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

