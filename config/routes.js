/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  'POST /user/beacon_info' : 'beaconInfoController.getBeaconInfo',  //---
  
  'GET /student/student_info' : 'attendanceInfoController.displayStudent',
  'GET /student/student_location_timestamp' : 'attendanceInfoController.displayStudentAttendance',
  'GET /student/attendance_student' : 'attendanceInfoController.attendance_student',


  'POST /user/create_admin' : 'class_adminController.userCreate',  //-------
  'GET /user/user_login' : 'class_adminController.userLogin',   //----
  'GET /user/list_user' : 'class_adminController.userList',     //----
  'POST /user/update_user' : 'class_adminController.userUpdate',  //----
  
  // 'get /LoginController/afterlogin_authenticate': 'LoginController.afterlogin_authenticate',

  // 'post /UsersController/insert_user': 'UsersController.insert_user',
  // 'get /UsersController/list_user': 'UsersController.list_user',
  // 'get /UsersController/view_info_user/:id': 'UsersController.view_info_user',
  // 'get /UsersController/update_user/:id': 'UsersController.update_user',
  // 'get /UsersController/delete_user/:id': 'UsersController.delete_user',

  'post /StudentsController/insert_student': 'StudentsController.insert_student',
  'get /StudentsController/list_student': 'StudentsController.list_student',      //-----
  'get /StudentsController/view_info_student/:id': 'StudentsController.view_info_student',  //-----
  'post /StudentsController/update_student/:id': 'StudentsController.update_student',     
  'get /StudentsController/delete_student/:id': 'StudentsController.delete_student',

  // 'post /FacultiesController/insert_beaconfaculty': 'FacultiesController.insert_masterfaculty',
  // 'get /FacultiesController/list_masterfaculty': 'FacultiesController.list_masterfaculty',
  // 'get /FacultiesController/view_info_masterfaculty/:id': 'FacultiesController.view_info_masterfaculty',
  // 'put /FacultiesController/update_beaconfaculty/:id': 'FacultiesController.update_masterfaculty',
  // 'get /FacultiesController/delete_masterfaculty/:id': 'FacultiesController.delete_masterfaculty'

  // 'post /Beacon_studentsController/insert_beaconstudent': 'Beacon_studentsController.insert_beaconstudent',
  // 'get /Beacon_studentsController/update_beaconstudent': 'Beacon_studentsController.update_beaconstudent',
  // 'get /Beacon_studentsController/list_beaconstudent/:id': 'Beacon_studentsController.list_beaconstudent',
  // 'get /Beacon_studentsController/view_info_beaconstudent/:id': 'Beacon_studentsController.view_info_beaconstudent',
  // 'get /Beacon_studentsController/delete_beaconstudent/:id': 'Beacon_studentsController.delete_beaconstudent',

  'post /FacultiesController/insert_faculty': 'FacultiesController.insert_faculty',
  'post /FacultiesController/update_faculty/:fac_id': 'FacultiesController.update_faculty',
  'get /FacultiesController/list_faculty': 'FacultiesController.list_faculty',
  'get /FacultiesController/view_info_faculty/:fac_id': 'FacultiesController.view_info_faculty',
  'get /FacultiesController/delete_faculty/:fac_id': 'FacultiesController.delete_faculty'



   // 'get /Transaction_studentsController/attendance_student': 'Transaction_studentsController.attendance_student'
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
