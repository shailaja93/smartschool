module.exports = {

tableName : "transaction_students",
  attributes: {
      id: {
           type: 'INTEGER',
           primaryKey : true,
           autoincrement : true
       },
       gr_no_ts: {
           type: 'INTEGER'
       },
       is_in_is_out: {
           type: 'INTEGER'
       },
       time_stamp: {
            type: 'DATETIME'
       },
       is_delete: {
            type: 'INTEGER'
       },
       location: {
       		type: 'STRING'
       }
  }
};
