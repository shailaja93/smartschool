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
  
  'post /UsersController/create_user' : 'UsersController.create_user',  
  'get /UsersController/login_user' : 'UsersController.login_user',   
  'get /UsersController/list_user' : 'UsersController.list_user',     
  'post /UsersController/update_user' : 'UsersController.update_user', 
  'get /UsersController/delete_user' : 'UsersController.delete_user',
  
  'post /StudentsController/insert_student': 'StudentsController.insert_student',
  'get /StudentsController/list_student': 'StudentsController.list_student',      
  'get /StudentsController/view_info_student/:id': 'StudentsController.view_info_student',  
  'post /StudentsController/update_student': 'StudentsController.update_student',     
  'get /StudentsController/delete_student': 'StudentsController.delete_student',
  'post /StudentsController/uploadfile_student': 'StudentsController.uploadfile_student',

  'post /FacultiesController/insert_faculty': 'FacultiesController.insert_faculty',
  'post /FacultiesController/update_faculty': 'FacultiesController.update_faculty',
  'get /FacultiesController/list_faculty': 'FacultiesController.list_faculty',
  'get /FacultiesController/view_info_faculty/:id': 'FacultiesController.view_info_faculty',
  'get /FacultiesController/delete_faculty': 'FacultiesController.delete_faculty',
  'post /FacultiesController/uploadfile_faculty': 'FacultiesController.uploadfile_faculty',

  'get /Transaction_studentsController/attendance_student': 'Transaction_studentsController.attendance_student',
  'get /Transaction_studentsController/attendance_permonth': 'Transaction_studentsController.attendance_permonth',
  'get /Transaction_studentsController/attendance_currentday': 'Transaction_studentsController.attendance_currentday',
  'get /Transaction_studentsController/student_locationhistory' : 'Transaction_studentsController.student_locationhistory',
  'post /Transaction_studentsController/insert_per_transaction_student_faculty' : 'Transaction_studentsController.insert_per_transaction_student_faculty',

  'get /Transaction_facultiesController/faculty_locationhistory' : 'Transaction_facultiesController.faculty_locationHistory',
  'get /Transaction_facultiesController/list_facultyForLocationHistory' : 'Transaction_facultiesController.list_facultyForLocationHistory'
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
