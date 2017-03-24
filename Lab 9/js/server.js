
var express = require('express');
var Clarifai = require('clarifai');

// instantiate a new Clarifai clarifaiApp passing in your clientId and clientSecret
var clarifaiApp = new Clarifai.App(
  'RVV_tv4y2QSXJrkM982vK-hJAKPezC1QkM2Jl7-J',
  'vz1-DGZklLIdEzXJ9yKBtqDDrKzDtBaWQ3RvNsPF'
);

var app = express();

app.post('/GetImageContains', function(req, res) {
    //res.send([{name:'wine1'}, {name:'wine2'}]);
    console.log(req.params);

    clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, "http://www.gettyimages.com/gi-resources/images/frontdoor/creative/PanoramicImagesRM/FD_image.jpg").then(
    function(response) {
         res.send(response);
        },
    function(err) {
        console.error(err);
    })
});

app.get('/getCelebrity', function(req, res) {

// add inputs with concepts
  clarifaiApp.models.predict("e466caa0619f444ab97497640cefc4dc", "https://images-na.ssl-images-amazon.com/images/M/MV5BNTk1OTUxMzIzMV5BMl5BanBnXkFtZTcwMzMxMjI0Nw@@._V1_UY317_CR8,0,214,317_AL_.jpg").then(
    function(response) {
      res.send(response);
    },
    function(err) {
      res.send(err);
    }
  );
    
});

app.listen(3000);
console.log('Listening on port 3000...');


