module.exports = {

    tableName : 'transaction_students',

    attributes: {

        gr_no_ts: {
            type: 'INTEGER'
        },
  		id: {
            type: 'INTEGER',
            primaryKey : true,
            autoincrement : true
         },
        is_in_is_out: {
            type: 'INTEGER'
         },
        time_stamp: {
            type: 'DATETIME'
     	},
     	location : {
     		type : 'STRING'
     	}
 	}
};


