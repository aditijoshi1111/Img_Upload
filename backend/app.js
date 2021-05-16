const express= require('express');
const cors=require('cors');
const path=require('path');
const multer=require('multer');


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




app.get('/', (req,res)=>{
    console.log("home");
})
app.post('/postImage', upload, (req, res)=>{
    console.log(req.file);
})

app.listen(3003);