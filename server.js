const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const PORT = 3004;
const photoboothRoutes = express.Router();

let PhotoboothModel = require('./models/ImageSchema')
let ImageSchemaShare = require('./models/ImageSchemaShare')

app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));


mongoose.connect('mongodb://localhost/yvetteeric', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log('MongoDB connection established without a hitch :)')
})

// Posting to the database for all  the pics
photoboothRoutes.route("/").post(function(req, res,next){
    PhotoboothModel.create(req.body).then(function(image){
        res.send("image saved");
    })
})

//Get the last 90 images from all the pics
  photoboothRoutes.route("/").get(function(req,res,next){
    PhotoboothModel.find({}, function(err,images){
        res.json(images);
    }).sort({date:-1}).limit(60)
});  

   photoboothRoutes.route("/download").get(function(req,res,next){
    PhotoboothModel.find({}, function(err,images){
        res.json(images);
    }).skip(500)
});  

/*   photoboothRoutes.route("/download").get(function(req,res,next){
    PhotoboothModel.find({}, function(err,images){
        res.json(images);
    }).limit(500)
});  */

// Posting to the database
photoboothRoutes.route("/share").post(function(req, res,next){
    ImageSchemaShare.create(req.body).then(function(image){
        res.send("image saved");
    })
})

//Get the last 90 images
photoboothRoutes.route("/share").get(function(req,res,next){
    ImageSchemaShare.find({}, function(err,images){
        res.json(images);
    }).sort({date:-1}).limit(60)
});


app.use('/photobooth',photoboothRoutes);


app.listen(PORT, function() {
    console.log("Photobooth Server is running on port: "+ PORT)
})



