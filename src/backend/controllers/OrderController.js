var moment = require('moment');

exports.get_order = function(req, res) {

    req.getConnection(function(err,connection){
        // errorhandling
        if(!err) {
            var queryoptions = {
                where : ""
            };

            if(req.params && req.params.orderID != null){
                req.query.orderID=req.params.orderID;
            }

            const existingParams = ["orderID", "customerID","created","start","end"].filter(field => req.query[field]);

            if (existingParams.length) {
                queryoptions.where = " WHERE ";
                queryoptions.where += existingParams.map(field => {
                    switch(field){
                        case "orderID":
                            field = 'orders.id = ?';
                            break;
                        case "customerID":
                            field = 'orders.customerID = ?';
                            break;
                        case "created":
                            field = 'DATE(orders.created) = ?';
                            break;
                        case "start":
                            field = 'DATE(orders.created) >= ?';
                            break;
                        case "end":
                            field = 'DATE(orders.created) <= ?';
                            break;
                    }
                    return field;
                }).join(" AND ")
            }

            let id= ['orders.id as orderID','orders.id as number'];
            let customer=['customers.id', 'customers.name'];
            let retouraddress=['customers_retour.street', 'customers_retour.postal'];
            let dates=['orders.created as date_delivery','orders.created as date_return_data','orders.created as date_return_article'];
            let comment='orders.comment';

            queryoptions.select = [id,customer,retouraddress,dates,comment];

            const qrystring = 'SELECT ' + queryoptions.select.join(',') + ' ' +
                'FROM orders ' +
                'LEFT JOIN customers ON customers.id = orders.customerID ' +
                'LEFT JOIN customers_retour ON retourID = customers_retour.id ' +
                queryoptions.where +
                '';
            connection.query(qrystring, existingParams.map(field => req.query[field]), function (error, results, fields) {
                if (error) {
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    for(let i=0;i<results.length;i++){
                        let row = results[i]
                        results[i] = {
                            id: row.orderID,
                            number: row.id + '_' + new Date(row.date_delivery).toISOString().slice(0, 10),
                            customer: {
                                id: row.customerID,
                                name: row.name
                            },
                            retouraddress: {
                                street: row.street,
                                postal: row.postal
                            },
                            date_delivery: row.date_delivery,
                            date_return_article: row.date_return_article,
                            date_return_data: row.date_return_data,
                            comment: row.comment
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

exports.delete_order = function(req,res){
    req.getConnection(function(err,connection){
        if(err){
            res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        }
        if(connection){
            connection.query("DELETE FROM orders WHERE id = ?", req.params.id, function(error, results){
                if(error){
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                }
                if(results.affectedRows>0){
                    res.send(JSON.stringify({"status": 200, "error": null, "response": "OK"}));
                }
                if(results.affectedRows==0){
                    res.send(JSON.stringify({"status": 200, "error": "Datensatz nicht gefunden", "response": null}));
                }
                if(results.affectedRows<0){
                    res.send(JSON.stringify({"status": 500, "error": "Löschen fehlgeschlagen", "response": null}));
                }
            })
        }
    });
};

exports.create_order = function(req,res){
    req.getConnection(function(err,connection){
        if(err){
            res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        }
        let insert_order = {
            customerID:req.body.customer.id,
            userID:1,
            created: moment().format("YY-MM-DD hh:mm:ss"),
            comment:req.body.comment || null,
            date_delivery: moment(req.body.date_delivery).format("YY-MM-DD hh:mm:ss") || null,
            date_return_data: req.body.date_return_data || null,
            date_return_article: req.body.date_return_article || null,
            retourID: req.body.retouraddress.id || null
        };
        if(connection){
            connection.beginTransaction(function(err) {
                if (err) {
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                }
                connection.query("INSERT INTO orders SET ?", insert_order, function(error, results) {
                    if (error) {
                        return connection.rollback(function() {
                            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        });
                    }
                    console.log(error);
                    console.log(this.sql);

                    if (results.affectedRows > 0) {
                        let orderID = results.insertId;
                        let insert_articles = [];
                        req.body.cg_set.forEach(item => {
                           insert_articles.push({
                               cgID:item.cg,
                               genderID:item.gender,
                               process:item.process,
                               amount:item.amount
                           });
                        });
                        connection.query("INSERT INTO articles SET ?", insert_articles, function(error, results){
                            console.log(this.sql);
                            if (error) {
                                return connection.rollback(function() {
                                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                                });
                            }
                            if (results.affectedRows > 0) {
                                connection.commit(function(err) {
                                    if (err) {
                                        return connection.rollback(function() {
                                            res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                                        });
                                    }
                                    res.send(JSON.stringify({
                                        "status": 200,
                                        "error": null,
                                        "response": {message: "ok", insertID: insertID}
                                    }));
                                });
                            }
                            if (results.affectedRows == 0) {
                                res.send(JSON.stringify({
                                    "status": 200,
                                    "error": "Datensatz Artikel nicht eingefügt",
                                    "response": null
                                }));
                            }
                            if (results.affectedRows < 0) {
                                connection.rollback(function() {
                                    res.send(JSON.stringify({
                                        "status": 500,
                                        "error": "Anlage fehlgeschlagen",
                                        "response": null
                                    }));
                                });
                            }
                        });
                    }
                    if (results.affectedRows == 0) {
                        res.send(JSON.stringify({
                            "status": 200,
                            "error": "Datensatz Auftrag nicht eingefügt",
                            "response": null
                        }));
                    }
                    if (results.affectedRows < 0) {
                        connection.rollback(function() {
                            res.send(JSON.stringify({
                                "status": 500,
                                "error": "Anlage fehlgeschlagen",
                                "response": null
                            }));
                        });
                    }
                });
            });
        }
    });
};