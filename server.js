var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors=require('cors')
app.use(express.urlencoded({extended:true})) 
app.use(cors())
app.use(express.json())
const feedback1=require("./model")
const url = 'mongodb+srv://harshitsuyal4:Hem1234@cluster0.wfrag.mongodb.net/feedback?retryWrites=true&w=majority';
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
useFindAndModify:false
   }
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
   
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true})

app.use(express.static('public'));

app.post('/process_post',urlencodedParser,async(req,res)=>{
    let namee=req.body.name

let suggg=req.body.feedback
    const feed=new feedback1({
        name:namee,
        sugg:suggg})
        try{
         await feed.save();
         res.send({data:feed})
         console.log("Good boy")
         console.log(feed)
         
        }
        catch(err){
            console.log(err)
        }
    })
app.get("/read",async(req,res)=>{
feedback1.find({},(err,result)=>{
    if(err){
        res.send(err)
    }
res.send(result)
})

})

var server = app.listen(process.env.PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})