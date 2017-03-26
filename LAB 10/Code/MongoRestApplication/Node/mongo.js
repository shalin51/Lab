

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://MrMongo:1234@ds161049.mlab.com:61049/asetutorial10';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
           
        });
         db.close();
    });
})

app.get('/home',function (req, res) {      
    var UserData=[];
      MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }   
       var cursor=db.collection('lab10').find();
        cursor.forEach(function(doc,err){
            assert.equal(null,err);
            UserData.push(doc);
            },function(){
            db.close();
            res.send(UserData);
        });
      });
});

app.post('/login',function (req, res) {      
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }         
        getDocument(db,req.body,function(){          
           var user={};
          var cursor = db.collection('lab10').find({"fname":"shalin"});
       cursor.each(function(err,doc){
       assert.equal(err,null);
       if(doc != null)
       {
             user.fname=doc.fname,
             user.lname=doc.lname,
             user.email=doc.email,
             user.pw=doc.pw
            Add_UserData(user);
            console.log(UserData);
        }
    });    
        });         
        res.send(UserData);
    });
});


app.post('/update',function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while updating to Database");
            res.end();
        }
        updateDocument(db, req.body.filter, req.body.replacement,function() {
            res.write("Successfully updated");
            res.end();
        });
         db.close();
    });
});

app.post('/delete',function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while deleting to Database");
            res.end();
        }
        deleteDocument(db, req.body.fname, function() {
            res.write("Successfully deleted");
            res.end();
        });
         db.close();
    });
});

var insertDocument = function(db, data, callback) {
    db.collection('lab10').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the restaurants collection.");
        callback();

    });
};

var getDocument = function(db,uData ,callback) {
    
    var cursor = db.collection('lab10').find({"fname":"shalin"});
       cursor.forEach(function(err,doc){
       assert.equal(err,null);
       if(doc != null)
       {
             user.fname=doc.fname,
             user.lname=doc.lname,
             user.email=doc.email,
             user.pw=doc.pw
            Add_UserData(user);
            console.log(UserData);
        }
    });    
 callback();
};

var temp;
function Add_UserData(user){
    UserData.push(user);  
    console.log(UserData[0].fname + "Data"); 
    temp=UserData; 
}

var updateDocument = function(db,filter, replacement, callback) {
    db.collection('lab10').replaceOne(  { "fname" : filter } // filter
    , replacement,//replacement
    function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        callback();
    });
};

var deleteDocument = function(db, data, callback) {
    db.collection('lab10').deleteOne( {'fname':data}, function(err, result) {
        if(err)
        {
            res.write("Erron in deleting");
            res.end();
        }
        console.log("Sucessfully Deleted.");
        callback();
    });
};


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("server running on 8081");
})

