var moment = require('moment');

exports.get_customer = function(req, res) {

    req.getConnection(function(err,connection){
        // errorhandling
        if(!err) {
            var queryoptions = {
                where : ""
            };

            if(req.params && req.params.customerID != null){
                req.query.customerID=req.params.customerID;
            }

            const existingParams = ["customerID"].filter(field => req.query[field]);

            if (existingParams.length) {
                queryoptions.where = " WHERE ";
                queryoptions.where += existingParams.map(field => {
                    switch(field){
                        case "customerID":
                            field = 'customer.id = ?';
                            break;
                    }
                    return field;
                }).join(" AND ")
            }

            let customer=['customers.id', 'customers.name'];

            queryoptions.select = [customer];

            const qrystring = 'SELECT ' + queryoptions.select.join(',') + ' ' +
                'FROM customers ' +
                queryoptions.where +
                '';
            connection.query(qrystring, existingParams.map(field => req.query[field]), function (error, results, fields) {
               console.log(this.sql)
                if (error) {
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    for(let i=0;i<results.length;i++){
                        let row = results[i]
                        results[i] = {
                            id: row.id,
                            name: row.name
                        }
                    }
                    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                    //If there is no error, all is good and response is 200OK.
                }
            });
        }else{
            res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        }
    });
};