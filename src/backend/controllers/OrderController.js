var moment = require('moment');

exports.get_order = function(req, res) {

    req.getConnection(function(err,connection){
        // errorhandling
        if(!err) {
            var queryoptions = {
                where : "",
                groupby : ""
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
            let customer=['customers.id as customerID', 'customers.name as customerName'];
            let retouraddress=['customers_retour.street', 'customers_retour.postal'];
            let dates=['orders.created as date_created','orders.date_delivery as date_delivery','orders.date_return_data as date_return_data','orders.date_return_article as date_return_article'];
            let comment='orders.comment';
            let cg_set = ['CONCAT("[", GROUP_CONCAT(JSON_OBJECT("cg", orders_articlegroup.cgID, "gender", orders_articlegroup.genderID, "amount", orders_articlegroup.amount, "process", orders_articlegroup.process)),"]") as cg_set'];

            queryoptions.select = [id,customer,retouraddress,dates,comment,cg_set];
            queryoptions.groupby = " GROUP BY orders.id ";
            const qrystring = 'SELECT ' + queryoptions.select.join(',') + ' ' +
                'FROM orders ' +
                'LEFT JOIN customers ON customers.id = orders.customerID ' +
                'LEFT JOIN customers_retour ON retourID = customers_retour.id ' +
                'LEFT JOIN orders_articlegroup ON orders_articlegroup.orderID = orders.id ' +
                queryoptions.where +
                queryoptions.groupby +
                '';

            connection.query(qrystring, existingParams.map(field => req.query[field]), function (error, results, fields) {
                if (error) {
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    for(let i=0;i<results.length;i++){
                        let row = results[i];
                        console.log(row.cg_set);
                        results[i] = {
                            id: row.orderID,
                            number: row.orderID + '_' + new Date(row.date_created).toISOString().slice(0, 10),
                            customer: {
                                id: row.customerID,
                                name: row.customerName
                            },
                            retouraddress: {
                                street: row.street,
                                postal: row.postal
                            },
                            date_delivery: row.date_delivery,
                            date_return_article: row.date_return_article,
                            date_return_data: row.date_return_data,
                            comment: row.comment,
                            logistik_retourap: "",
                            cg_set: JSON.parse(row.cg_set),

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
            changed: null,
            comment:req.body.comment || null,
            date_delivery: (req.body.date_delivery.length>0)?moment(req.body.date_delivery).format("YY-MM-DD hh:mm:ss"):null || null,
            date_return_data: (req.body.date_return_data.length>0)?moment(req.body.date_return_data).format("YY-MM-DD hh:mm:ss"):null || null,
            date_return_article: (req.body.date_return_article.length>0)?moment(req.body.date_return_article).format("YY-MM-DD hh:mm:ss"):null || null,
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
                    if (results.affectedRows > 0) {
                        let orderID = results.insertId;
                        let insert_articles = [];
                        if(req.body.cg_set.length>0){
                            req.body.cg_set.forEach(item => {
                                insert_articles.push([
                                    orderID,
                                    item.cg,
                                    item.gender,
                                    JSON.stringify(item.process),
                                    item.amount
                                ]);
                            });

                            connection.query("INSERT INTO orders_articlegroup (orderID, cgID, genderID, process, amount) VALUES ?", [insert_articles], function(error, results){
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
                                            "response": {message: "ok", insertID: results.insertID}
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
                        }else{
                            connection.commit(function(err){
                                if(err){
                                    return connection.rollback(function(){
                                        res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
                                    })
                                }
                                res.send(JSON.stringify({
                                    "status": 200,
                                    "error": null,
                                    "response": {message: "ok", insertID: results.insertId}
                                }));
                            })
                        }
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
exports.update_articles = function(req,res){
    req.getConnection(function(err,connection) {
        if (err) {
            res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        }
    });
};
exports.update_order = function(req,res){
    req.getConnection(function(err,connection){
        if(err){
            res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
        }
        let insert_order = {
            customerID:req.body.customer.id,
            userID:1,
            changed: moment().format("YY-MM-DD hh:mm:ss"),
            comment:req.body.comment || null,
            date_delivery: (req.body.date_delivery!= null && req.body.date_delivery.length>0)?moment(req.body.date_delivery).format("YY-MM-DD hh:mm:ss"):null || null,
            date_return_data: (req.body.date_return_data!= null && req.body.date_return_data.length>0)?moment(req.body.date_return_data).format("YY-MM-DD hh:mm:ss"):null || null,
            date_return_article: (req.body.date_return_article!= null && req.body.date_return_article.length>0)?moment(req.body.date_return_article).format("YY-MM-DD hh:mm:ss"):null || null,
            retourID: req.body.retouraddress.id || null
        };
        console.log(req.body.date_return_data)
        if(connection){
            connection.beginTransaction(function(err) {
                if (err) {
                    res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
                }
                connection.query("UPDATE orders SET ? WHERE orders.id=?", [insert_order,req.body.id], function(error, results) {

                    if (error) {
                        console.log(error.message)
                        return connection.rollback(function() {
                            res.send(JSON.stringify({"status": 400, "error": error.message, "response": error.message}));
                        });
                    }
                    if (results.affectedRows > 0) {
                        //#######
                        let insert_articles = [];
                        if(req.body.cg_set.length>0){
                            req.body.cg_set.forEach(item => {
                                insert_articles.push([
                                    req.body.id,
                                    item.cg,
                                    item.gender,
                                    JSON.stringify(item.process),
                                    item.amount
                                ]);
                            });
                            connection.query("DELETE FROM orders_articlegroup WHERE orderID = ?", [req.body.id], function(error, results){});
                            connection.query("INSERT INTO orders_articlegroup (orderID, cgID, genderID, process, amount) VALUES ?", [insert_articles], function(error, results){
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
                                            "response": {message: "ok", insertID: results.insertID}
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
                        }else{
                            connection.commit(function(err){
                                if(err){
                                    return connection.rollback(function(){
                                        res.send(JSON.stringify({"status": 500, "error": err, "response": null}))
                                    })
                                }
                                res.send(JSON.stringify({
                                    "status": 200,
                                    "error": null,
                                    "response": {message: "ok"}
                                }));
                            })
                        }
                        //#######

                    };
                    if (results.affectedRows == 0) {
                        res.send(JSON.stringify({
                            "status": 200,
                            "error": "Der Dtaensatz wurde nicht geändert",
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