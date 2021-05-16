const express= require('express');
const cors=require('cors');
const path=require('path');
const multer=require('multer');
const mongoose=require('mongoose');
const fs = require('fs');


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.static(path.join(__dirname,'../imageupload/build')))



var storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer({storage: storage}).single('file')



mongoose
  .connect(
    "mongodb+srv://db:NpSYtogd2B5MNzRD@cluster0.4vsw4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
});


var imageSchema=new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String
  },
  description: String
});

const Image= mongoose.model('Image', imageSchema);



app.get('/getImage', (req,res)=>{
    Image.find({}, function(err,data){
      if(err) console.log("Error getting data");

      res.json(data);
    })
    console.log("home");
})
app.post('/postImage', upload, (req, res)=>{
    var newImage=new Image({
      img: {
        data: fs.readFileSync(path.join(__dirname,'/uploads/',req.file.filename)),
        ContentType: 'image'
      },
      description: req.body.description
    })

    console.log(newImage);
    newImage.save(function(err,data){
      if(err) console.log("Error in saving image");

      res.json(data);
    })
})


// Image.deleteMany({}, function(req, res){
//   console.log("done");
// })
app.listen(3003);