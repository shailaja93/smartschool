/**
 * Transaction_facultiesController
 *
 * @description :: Server-side logic for managing Transaction_faculties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/**
 *@module Transaction Attendance FacultyDetails
 */
var async = require('async');

module.exports = {
/**
   *Displays the name and id of all the faculties
   *@param {Object} req
   *@param {object} res 
   *@return {Object} json Object
*/
  list_facultyForLocationHistory : function(req,res) {

     Faculty.find({
            select: ['gr_no_f', 'name', 'surname']
          })
          .exec(function(err, user) {
          if (err) {
              return res.json(err);
          }
          else
          {
            async.forEachOfSeries(user, function(value,key,callback) {

              var name = user[key].name;
              var surname = user[key].surname;
              user[key].name  = name + " " + surname;
            }); 
            console.log(user);
            return res.json(user);
          }   
      }); 
  },

/**
   *Displays the location history of a particular faculty of a specific date passed
   *@param {Object} req Parameters(gr_no_f,date)
   *@param {object} res 
   *@return {Object} json Object
*/
  faculty_locationHistory : function(req, res) {

    var param = req.allParams();
      console.log("----");
      var gr_no = param.gr_no_f;
      var date = param.date;
      var data = [];
      console.log(date);
      console.log(gr_no);

            Transaction_faculty.query('SELECT * FROM transaction_faculties WHERE gr_no_tf = ' + gr_no + ' AND DATE(time_stamp) = "'+date+'" ORDER BY time_stamp ASC;', function(err, user) {
              if (err) return console.log(err);

              for(var i = 0; ; i = i+2) {
              
                if(i < user.length) {

                  var t1 = user[i].time_stamp.toLocaleTimeString();
                  var t2 = user[i+1].time_stamp.toLocaleTimeString();
                  console.log(t1 +' -- '+ t2);
                  user[i].time_stamp = t1 + " to " + t2;
              //  console.log(user[i]);
                  data = data.concat(user[i]);
                 }
                  else {
                   if(user.length != 0) {
                      
                      console.log(data);
                      return res.json(data);
                    } else {

                      return res.send("No entries for the specified date or gr number");
                    }
                  }
              }
          });
  }	
};

