/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    tableName : 'users',

    attributes: {

  		id: {
            
            type: 'INTEGER',
            primaryKey : true,
            autoincrement : true
         },
        username: {
            type: 'STRING',
            unique : true
         },
        password: {
            type: 'STRING'
     	},
     	major_student: {
     		type: 'INTEGER'
     	},
     	major_faculty: {
     		type: 'INTEGER'
     	}
 	}
};

