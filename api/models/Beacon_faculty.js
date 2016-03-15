/**
* Beacon_faculty.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

tableName : "beacon_faculties",

  attributes: {
      id: {
           type: 'INTEGER',
           primaryKey : true,
           autoincrement : true
       },
       gr_no_bf: {
           type: 'INTEGER'
       },
       uuid: {
           type: 'STRING'
       },
       major: {
            type: 'INTEGER'
       },
       minor: {
            type: 'INTEGER'
       },
       is_delete: {
       		type: 'INTEGER'
       }
  }
};

