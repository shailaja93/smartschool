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
 },

 uploadfile_faculty: function(req,res)
 {
    var uuid = '343434343';
    console.log("-------");
    // req.file('name').upload({dirname: require('path').resolve(sails.config.appPath, './assets/csv'),
    //                           saveAs : 'saaailja.csv'},function (err, files) {
    //   if (err)
    //     return res.serverError(err);

    //   return res.json({
    //     message: files.length + ' file(s) uploaded successfully!',
    //     files: files
    //   });
    // });

    console.log("---------");
    var fileContents = fs.readFileSync('./assets/csv/saaailja.csv');
    var lines = fileContents.toString();
    var csv2jsonCallback = function (err, json) {
    if (err) throw err;

      console.log(json);

      var i =0;
      async.eachSeries(json, function (l, callback) {  
          console.log(i + " -- " + json.length);
          var c = json[i].class;
        //  var d = json[i].div;

          Faculty.create({
                        name: json[i].name,
                        surname: json[i].surname,
                        address: json[i].address,
                        blood_group: json[i].blood_group,
                        primary_contact_no: json[i].primary_contact_no,
                        secondary_contact_no: json[i].secondary_contact_no,
                        dob: json[i].dob
                        }).exec(function(err, user) {

                          if(err) return callback(err);
                          
                          Student.query('select gr_no_s from students order by gr_no_s desc;',function(err2,userid) {
                          if (err2) {
                            return callback(err2);
                          }
                          else
                          {
                             var id = userid[0].gr_no_s;
                             console.log(id);
                             console.log("***********");
                             console.log(c);
                            // console.log(d);
                             
                             var class_div =  (c.slice(-1)).charCodeAt(0);
                             var class_no = c.slice(0, -1);
                             var maj = Number(class_no.concat(class_div));
                             console.log(maj);
                            
                             Beacon_student.query('select minor from beacon_students where major = '+maj+' order by minor desc;',function(err3,user) {
                              if(err3) {
                                return callback(err3);
                              }
                              console.log("---------------------------");
                              var min;
                              console.log(user);
                              if(user[0] != undefined)
                              {
                                min = user[0].minor + 1;
                              }
                              else
                              {
                                min = 1;

                              }
                             console.log(min);


                             // Beacon_student.query('INSERT INTO beacon_students (gr_no_bs, uuid, major, minor) VALUES ('+id+','
                             //                      + uuid + ',' + maj + ',' + min + ');', function(err, user) {
                             Beacon_student.create({ 
                             gr_no_bs: id,
                             uuid: uuid,
                             major: maj,
                             minor: min
                             }).exec(function(err, user) {
                              if (err) {
                                    console.log("-+-+-+-");
                                   return callback(err);
                              }  
                              console.log(user);
                              return res.ok();
                        });
                      });
                    }
                  });
                                
                                console.log(user);
                                i= i+1;
                                console.log(i);
                                console.log("-----------------------------------"); 
                                callback();
                });
              });
          }
          converter.csv2json(lines, csv2jsonCallback);
 }
};

