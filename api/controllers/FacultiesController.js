/**
 * FacultiesController
 *
 * @description :: Server-side logic for managing crud_masterfaculties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var converter = require('json-2-csv');
var async = require('async');
var fs = require('fs');
/**
 *@module Facultyinfo
 */
module.exports = {
/**
   *Inserts the information of the Faculty and based on gr_no created the faculty's ibeacon is mapped to it
   *@param {Object} req Parameters(name,surname,address,blood_group,primary_contact_no,secondary_contact_no,dob)
   *@param {object} res 
*/
	insert_faculty: function(req, res) {

	  var param = req.allParams();
    var nm = param.name;
    var snm = param.surname;
    var add = param.address;
    var bg = param.blood_group;
    var pc = param.primary_contact_no;
    var sc = param.secondary_contact_no;
    var dob = param.dob;
    //var maj = param.major;
    var maj = 9999;
    var uuid = '343434343';

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
                  return res.send("Inserted");
              });
            });
          }
        });
      });
},

/**
   *Updates the information of a specific faculty 
   *@param {Object} req json object passed Parameters(gr_no_f,name,surname,address,blood_group,primary_contact_no,secondary_contact_no,dob)
   *@param {object} res
*/
update_faculty: function(req, res) {


    var obj = req.body;
    console.log(obj);
    var id = obj[0].gr_no_f;
    var nm = obj[0].name;
    var snm = obj[0].surname;
    var add = obj[0].address;
    var bg = obj[0].blood_group;
    var pc = obj[0].primary_contact_no;
    var sc = obj[0].secondary_contact_no;
    var dob = obj[0].dob;
    console.log(id);
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
        console.log(user);
        return res.send("Updated");
      }
    });
},

/**
   *Lists the information of the faculties 
   *@param {Object} req
   *@param {object} res
   *@return {Object} json Object
*/
list_faculty: function(req, res) {

         Faculty.find({
          is_delete : 0
         },{
           select: ['gr_no_f', 'name', 'surname', 'address', 'blood_group','primary_contact_no','secondary_contact_no','dob','is_delete']
         })
         .exec(function(err, user) {
         if (err) {
             return res.json(err);
         }
         else
         {
              if(user.length == 0)
              {
                 return res.json("No Faculties");
              }
              else
              {
                 var i =0;
                 async.eachSeries(user, function (l, callback) {  
                 console.log(user); 
                 console.log(i);
                 console.log(user[i].gr_no_s);
                 var gr_no = user[i].gr_no_s;

                 Beacon_faculty.find({
                 gr_no_bs: gr_no
                 }, {
                 select: ['gr_no_bf', 'uuid', 'major', 'minor']
                 })
                 .exec(function(err, user1) {
                   if (err) {
                     return res.send(err);
                   }
                  //  console.log(i);
                  // console.log(user1[0].major);
                  // console.log(user1);

                  user[i].uuid = user1[0].uuid;
                  user[i].major = user1[0].major;
                  user[i].minor = user1[0].minor;

                  console.log("---AFTER INCREMENT-----");
                  i= i+1;
                  console.log(i);
                  console.log("-----------------------------------"); 
                  callback();

                  if(user.length == i)
                  {
                    return res.json(user);
                  }
                 });
                });
              }   
            }
         });
  },

/**
   *List the information of a specific faculty 
   *@param {Object} req Parameters(id) 
   *@param {object} res
   *@return {Object} json Object
*/ 
view_info_faculty: function(req,res) {

      var param = req.allParams();
      var id = param.id;
      Faculty.find({
        gr_no_f: id
      }, {
        select: ['gr_no_f', 'name', 'surname', 'address', 'blood_group','primary_contact_no','secondary_contact_no','dob','is_delete']
      })
      .exec(function(err, user) {
        if (err) {
          return res.send(err);
        }
        return res.json(user);
      });
},

/**
   *Updates the flag is_delete to 1 of a specific faculty 
   *@param {Object} req Parameters(id) 
   *@param {object} res
*/ 
delete_faculty: function(req,res)
 {
        var param = req.allParams();
        var id = param.id;
      //  console.log(id);
        Faculty.find({ gr_no_f : id },{
            select: ['is_delete']
         })
        .exec(function(err, user) {
          console.log(user);
          console.log("---------------------------");
          console.log(user.length);
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
                Faculty.update({ gr_no_f : id },{is_delete: 1}).exec(function (err,user){
                if (err) {
                   return res.send(err);
                }
                Beacon_faculty.update({ faculty_id : id },{is_delete: 1}).exec(function (err,user){
                 if (err) {
                    return res.send(err);
                 }
                console.log("+++++++++++++++++++++++++++");
                console.log(user);
                return res.json("Deleted");
                });
              });
            }
          }
  });     
 },

/**
   *Inserts the information of the faculties from the CSV file provided (CSV should contain the fields : name,surname,address,blood_group,primary_contact_no,secondary_contact_no,dob) 
   *@param {Object} req File Prameters(name) 
   *@param {object} res json Object
*/ 
 uploadfile_faculty: function(req,res)
 {
    var uuid = '343434343';
    console.log("-------");
    req.file('name').upload({dirname: require('path').resolve(sails.config.appPath, './assets/csv'),
                              saveAs : 'faculties.csv'},function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });

    console.log("---------");
    var fileContents = fs.readFileSync('./assets/csv/faculties.csv');
    var lines = fileContents.toString();
    var csv2jsonCallback = function (err, json) {
    if (err) throw err;

      console.log(json);

      var i =0;
      async.eachSeries(json, function (l, callback) {  
          console.log(i + " -- " + json.length);
          // var c = json[i].class;
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
                          
                          Faculty.query('select gr_no_f from faculties order by gr_no_f desc;',function(err2,userid) {
                          if (err2) {
                            return callback(err2);
                          }
                          else
                          {
                             var id = userid[0].gr_no_f;
                             console.log(id);
                            //  console.log("***********");
                            //  console.log(c);
                            // // console.log(d);
                             
                            //  var class_div =  (c.slice(-1)).charCodeAt(0);
                            //  var class_no = c.slice(0, -1);
                            // var maj = Number(class_no.concat(class_div));
                             var maj = 9999
                             console.log(maj);
                            
                             Beacon_faculty.query('select minor from beacon_faculties where major = '+maj+' order by minor desc;',function(err3,user) {
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
                             Beacon_faculty.create({ 
                             gr_no_bf: id,
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

