module.exports = {

tableName : "beacon_students",
  attributes: {
      id: {
           type: 'INTEGER',
           primaryKey : true,
           autoincrement : true
       },
       gr_no_bs: {
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
