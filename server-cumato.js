var express = require("express");

var mysql = require("mysql");

var app = express();
app.listen(5555, function () {
    console.log("Server started");
})
app.use(express.static("public"));

var dbConfiguration = {
    host: "localhost",//fixed
    user: "root",//pwd
    password: "", //""
    database: "cumato" //ur own database name 
}
var refDB = mysql.createConnection(dbConfiguration);
refDB.connect(function (errKuch) {
    if (errKuch)
        console.log(errKuch);
    else
        console.log("Server Connected");
})

app.get("/user-signup", function (req, res) {
    console.log("----------------");
    var dataAry = [req.query.signupemail, req.query.signuppwd, req.query.utype, 1];
    refDB.query("insert into users values(?,?,?,?)", dataAry, function (err, result) {
        if (err)
            res.send(err);
        else
            console.log("Inserted Successfully");
    })
})
app.get("/user-login", function (req, res) {
    var arry = [req.query.loginemail, req.query.loginpwd, 1]
    refDB.query("select * from users where emailid=? and password=? and status=?", arry, function (err, result) {
        if (err)
            res.send(err);
        else
            console.log("Login Successfully");
    })
});

app.get("/chklogin",function(req,res){
    var arry=[req.query.loginemail,req.query.loginpwd,1]
    refDB.query("select * from users where emailid=? and password=?",arry,function(err,result)
                {
                    if(err)
                    res.send(err);
                    else
                   res.send(result);
                 })
    });