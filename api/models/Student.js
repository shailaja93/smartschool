module.exports = {

	tableName : 'students',
  attributes: {
       gr_no_s: {
           type: 'INTEGER',
           primaryKey : true,
           autoincrement : true
       },
       name: {
           type: 'STRING'
       },
       surname: {
           type: 'STRING'
       },
       address: {
            type: 'STRING'
       },
       blood_group: {
            type: 'STRING'
       },
       primary_contact_no: {
       		type: 'STRING'
       },
       secondary_contact_no: {
       		type: 'STRING'
       },
       dob: {
       		type: 'STRING'
       },
       is_delete: {
       		type: 'INTEGER'
       }
  }
};

