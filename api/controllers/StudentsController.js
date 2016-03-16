/**
 * StudentsController
 *
 * @description :: Server-side logic for managing crud_masterstudents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

insert_student: function(req, res) {

	  var param = req.allParams();
    var nm = param.name;
    var snm = param.surname;
    var add = param.address;
    var bg = param.blood_group;
    var pc = param.primary_contact_no;
    var sc = param.secondary_contact_no;
    var dob = param.dob;
    var clas = param.stud_class;
    var div = param.stud_div;
    var uuid = '343434343';

            Student.create({ 
              name: nm,
              surname: snm,
              address: add,
              blood_group: bg,
              primary_contact_no: pc,
              secondary_contact_no: sc,
              dob: dob
            }).exec(function(err1, usercreate) {
            	  if (err1) {
               //    console.log("++++++");
                      return res.send(err1);
                }
                
           // Student.query('insert into students values(' + 29+",ppp0,"+"popop,"+"sasasas,"+"Aaa,"+"KLKLKL,"+"SALKALSK,"+"KSKSK ,"+0+');', function(err,usercreate) {

              // if(err) 
              //   return res.send(err);
            //});

                Student.query('select gr_no_s from students order by gr_no_s desc;',function(err2,userid) {
                if (err2) {
                  return res.send(err2);
                }
                else
                {
                   var id = userid[0].gr_no_s;
                   var maj = Number(clas.concat((div.charCodeAt(0)).toString()));
                  
                   Beacon_student.query('select minor from beacon_students where major = '+maj+' order by minor desc;',function(err3,user) {
                    if(err3) {
                      return res.send(err3);
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
               
                   Beacon_student.create({ 
                   gr_no_bs: id,
                   uuid: uuid,
                   major: maj,
                   minor: min
                   }).exec(function(err4, user) {
                    if (err4) {
                         return res.send(err4);
                    }
                  var data = { 
                      Count_user: user
                  };
                  
                  return res.json(user);
              });
            });
          }
        });
      });
},

update_student: function(req, res) {

    var obj = req.body;
    console.log(obj);
    var id = obj[0].gr_no_s;
    var nm = obj[0].name;
    var snm = obj[0].surname;
    var add = obj[0].address;
    var bg = obj[0].blood_group;
    var pc = obj[0].primary_contact_no;
    var sc = obj[0].secondary_contact_no;
    var dob = obj[0].dob;
    console.log(id);
    console.log(nm);
    console.log(snm);
    console.log(add);
    console.log(bg);
    console.log(pc);
    console.log(sc);
    console.log(dob);
    
    Student.update({
      gr_no_s: id
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
       console.log("**********************************************************");
       console.log(user);
       return res.json(user);
      }
    });
},

list_student: function(req, res) {

         Student.find({
           is_delete : 0
          },
          {
            select: ['gr_no_s', 'name', 'surname', 'address', 'blood_group','primary_contact_no','secondary_contact_no','dob','is_delete']
          })
          .exec(function(err, user) {
          if (err) {
              console.log("+++");
              res.json(err);
          }
          else
          {
              res.json(user);
          }   
      });  
  },

view_info_student: function(req,res) {

      var param = req.allParams();
      var id = param.id;
      Student.find({
        gr_no_s: id
      }, {
        select: ['gr_no_s', 'name', 'surname', 'address', 'blood_group','primary_contact_no','secondary_contact_no','dob','is_delete']
      })
      .exec(function(err, user) {
        if (err) {
          return res.send(err);
        }
        
        return res.json(user);
      });
},

delete_student: function(req,res)
 {
        var param = req.allParams();
        var id = param.id;
        Student.find({ gr_no_s : id },{
            select: ['is_delete']
         })
        .exec(function(err, user) {
          console.log(user);
          if(user.length == 0)
          {
            res.send("No such id exists");
          }
          else
          {
            if(user[0].is_delete == 1)
            {
              return res.json("Already deleted");
            }
            else
            {
            Student.update({ gr_no_s : id },{is_delete: 1}).exec(function (err,user){
            if (err) {
               return res.send(err);
            }
            
            return res.json(user);
            });
            }
          }
  });     
 }
};

