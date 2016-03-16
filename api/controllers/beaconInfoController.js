var async = require('async');

module.exports = {

	getBeaconInfo : function (req, res) {

        // var obj = [{
        
        //         "major": 35035,
        //         "minor": 64,
        //         "flag": 1,
        // },
        // {
        
        //         "major": 35035,
        //         "minor": 64,
        //         "flag": 0
        // },
        // {
        
        //         "major": 35035,
        //         "minor": 63,
        //         "flag": 1
        // },
        // {
        
        //         "major": 35035,
        //         "minor": 63,
        //         "flag": 0
        // }]

        var obj = req.body;
        console.log(obj);
        async.forEachOfSeries(obj, function(value,key,callback) {

            
            var value_major = obj[key].major;
            var value_minor = obj[key].minor;
            var flag = obj[key].flag;
            console.log(key + "---->" + obj.length);

            Beacon_student.find({major : value_major,minor : value_minor}, {select : ['gr_no_bs']})
            .exec(function(err, user) {

                if(err) 
                    res.badRequest('reason');

                var data = {
                    user_data : user,
                };

                console.log(user);
                var len = data.user_data.length;

                if(len == 1) {

                var grno = user[0].gr_no_bs;
                console.log(grno);

                Transaction_student.create({
                                        gr_no_ts : grno,
                                        is_in_is_out : flag,
                                        location : 'canteen'
                                    }).exec(function(err, user)  {

                                        if(err) {
                                         
                
                                         return err;    
                                        }

                                        else {
                                    
                                        console.log("++++");
                                        callback();
                                        return res.status(200);
                                        }
                                    }); 

                 }
                });
        });
    }    
};