/**
 * FacultiesController
 *
 * @description :: Server-side logic for managing crud_masterfaculties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	insert_faculty: function(req, res) {

	  var param = req.allParams();
    var nm = param.name;
    var snm = param.surname;
    var add = param.address;
    var bg = param.blood_group;
    var pc = param.primary_contact_no;
    var sc = param.secondary_contact_no;
    var dob = param.dob;
    var maj = param.major;
    var uuid = '11111';

            Faculty.create({ 
              name: nm,
              surname: snm,
              address: add,
              blood_group: bg,
              primary_contact_no: pc,
              secondary_contact_no: sc,
              dob: dob
            }).exec(function(err, usercreate) {
            	if (err) {
                     return res.send(err);
                }

                Faculty.query('select gr_no_f from faculties order by gr_no_f desc;',function(err,userid) {
                if (err) {
                  return res.send(err);
                }
                else
                {
                   var id = userid[0].gr_no_f;
                
                   Beacon_faculty.query('select minor from beacon_faculties where major = '+maj+' order by minor desc;',function(err,user) {
                    if(err) {
                      return res.send(err);
                    }
                  
                    var min;
                    if(user[0] != undefined)
                    {
                      min = user[0].minor + 1;
                    }
                    else
                    {
                      min = 1;
                    }
               
                   Beacon_faculty.create({ 
                   gr_no_bf: id,
                   uuid: uuid,
                   major: maj, 
                   minor: min
                   }).exec(function(err, user) {
                    if (err) {
                         return res.send(err);
                    }
                  
                  return res.json(user);
              });
            });
          }
        });
      });
},

update_faculty: function(req, res) {


    var param = req.allParams();
    var id = param.gr_no_f;
    var nm = param.name;
    var snm = param.surname;
    var add = param.address;
    var bg = param.blood_group;
    var pc = param.primary_contact_no;
    var sc = param.secondary_contact_no;
    var dob = param.dob;
    
    Faculty.update({
      gr_no_f: id
    }, {
              name: nm,
              surname: snm,
              address: add,
              blood_group: bg,
              primary_contact_no: pc,
              secondary_contact_no: sc,
              dob: dob
    }).exec(function(err, user) {
      if (err) {
        return res.json(err);
      }
      else
      {
        return res.json(user);
      }
    });
},

list_faculty: function(req, res) {

         Faculty.find({
            select: ['gr_no_f', 'name', 'surname', 'address', 'blood_group','primary_contact_no','secondary_contact_no','dob','is_delete']
          })
          .exec(function(err, user) {
          if (err) {
              return res.json(err);
          }
          else
          {
              return res.json(user);
          }   
      });  
  },

view_info_faculty: function(req,res) {

      var param = req.allParams();
      var id = param.gr_no_f;
      Faculty.find({
        gr_no_f: id
      }, {
        select: ['gr_no_f', 'name', 'surname', 'address', 'blood_group','primary_contact_no','secondary_contact_no','dob','is_delete']
      })
      .exec(function(err, user) {
        if (err) {
          return res.send(err);
        }
        var data = {
          Count_user: user
        };
        return res.json(user);
      });
},

delete_faculty: function(req,res)
 {
        var param = req.allParams();
        var id = param.gr_no_f;
        Faculty.find({ gr_no_f : id },{
            select: ['is_delete']
         })
        .exec(function(err, user) {

        if(user[0].is_delete == 1)
        {
          return res.json("Already deleted");
        }
        else
        {
        Faculty.update({ gr_no_f : id },{is_delete: 1}).exec(function (err,user){
        if (err) {
           return res.send(err);
        }
        var data = {
          Count_user: user
        }; 
        return res.json(user);
        });
     }
  });     
 }
};

