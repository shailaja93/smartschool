module.exports = {
  tableName : 'attendance_students',

  attributes: {
       id: {
           type: 'INTEGER',
           primaryKey : true,
           autoincrement : true
       },
       gr_no_as: {
           type: 'INTEGER'
       },
       minor_as: {
           type: 'INTEGER'
       },
       major_as: {
            type: 'INTEGER'
       },
       presence: {
            type: 'INTEGER'
       },
       date : {
            type: 'DATETIME' 
       }
  }
};