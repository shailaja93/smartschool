/**
 * StudentsController
 *
 * @description :: Server-side logic for managing crud_masterstudents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var converter = require('json-2-csv');
var async = require('async');
var fs = require('fs');
/**
 *@module Studentinfo
 */
module.exports = {
/**
   *Inserts the information of the Student and based on gr_no created the student's ibeacon is mapped to it
   *@param {Object} req Parameters(name,surname,address,blood_group,primary_contact_no,secondary_contact_no,dob,stud_class,stud_div)
   *@param {object} res 
*/
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
    var data;

            Student.create({ 
              name: nm,
              surname: snm,
              address: add,
              blood_group: bg,
              primary_contact_no: pc,
              secondary_contact_no: sc,
              dob: dob
            }).exec(function(err1, user) {
            	  if (err1) {
                      return res.send(err1);
                }
                console.log("---------------------------------");
                console.log(user);
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
                   console.log(maj);
                  
                   Beacon_student.query('select minor from beacon_students where major = '+maj+' order by minor desc;',function(err3,user) {
                    if(err3) {
                      return res.send(err3);
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
                         return res.send(err);
                    }  
                    console.log(user);
                    return res.send("Inserted");
              });
            });
          }
        });
      });
},

/**
   *Updates the information of a specific student 
   *@param {Object} req json object passed 
   *@param {object} res
*/
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
    // console.log(id);
    // console.log(nm);
    // console.log(snm);
    // console.log(add);
    // console.log(bg);
    // console.log(pc);
    // console.log(sc);
    // console.log(dob);
    
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
       return res.send("Updated");
       //return res.json(user);
      }
    });
},

/**
   *Lists the information of the students 
   *@param {Object} req
   *@param {object} res
   *@return {Object} json Object
*/
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
              // var json2csvCallback = function (err, csv) {
              // if (err) throw err;
              // fs.writeFile('file1.csv', csv, function(err) {
              // if (err) throw err;
              // console.log(csv);
              // console.log('CSV file saved');
              // });
              // }
              // converter.json2csv(user, json2csvCallback);

              // var fileContents = fs.readFileSync('file1.csv');
              // var lines = fileContents.toString();
              // var csv2jsonCallback = function (err, json) {
              //  if (err) throw err;
              //     console.log(json.length);
              //     console.log(json);
              //  }
              // converter.csv2json(lines, csv2jsonCallback);
               res.json(user);
          }   
      });  
  },

/**
   *List the information of a specific student 
   *@param {Object} req Parameters(id) 
   *@param {object} res
   *@return {Object} json Object
*/ 
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

/**
   *Updates the flag is_delete to 1 of a specific student 
   *@param {Object} req Parameters(id) 
   *@param {object} res
*/ 
delete_student: function(req,res)
 {
        var param = req.allParams();
        var id = param.id;
       // console.log(id);
        Student.find({ gr_no_s : id },{
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
            Student.update({ gr_no_s : id },{is_delete: 1}).exec(function (err,user){
            if (err) {
               return res.send(err);
            }
            console.log("+++++++++++++++++++++++++++");
            console.log(user);
            return res.send("Deleted");
            });
            }
          }
  });     
 },

/**
   *Inserts the information of the students from the CSV file provided (CSV should contain the fields : name,surname,address,blood_group,primary_contact_no,secondary_contact_no,dob,stud_class(Eg:10A)) 
   *@param {Object} req File Prameters(name) 
   *@param {object} res json Object
*/ 
 uploadfile_student: function(req,res)
 {
    var uuid = '343434343';
    console.log("-------");
    var param = req.allParams();
    var name = param.name;
    console.log(req.file('name'));
    req.file('name').upload({dirname:require('path').resolve(sails.config.appPath,'./assets/csv'),
                              saveAs : 'students.csv'},function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });

    console.log("---------");
    var fileContents = fs.readFileSync('./assets/csv/students.csv');
    var lines = fileContents.toString();
    var csv2jsonCallback = function (err, json) {
    if (err) throw err;

      console.log(json);

      var i =0;
      async.eachSeries(json, function (l, callback) {  
          console.log(i + " -- " + json.length);
          var c = json[i].class;
        //  var d = json[i].div;

          Student.create({
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