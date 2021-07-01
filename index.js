
const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')


const app=express();
app.use(express.urlencoded({extended:true})) 
app.use(cors())
app.use(express.json())

// database connectivity
let dbString = "mongodb+srv://harshitsuyal4:Hem1234@cluster0.wfrag.mongodb.net/feedback?retryWrites=true&w=majority"
mongoose.connect(dbString,{useUnifiedTopology:true,useNewUrlParser:true})
mongoose.connection.on('error',console.error.bind(console,"error in db connection"))
mongoose.connection.once('open',()=>{
    console.log('connected to database server');
})
// model
let Feedback = mongoose.model("feedback",{name:String,feedback:String})

app.post('/process_post',async(req,res)=>{
    let nm=req.body.fnamee
    let fk=req.body.sugg

    let newfeed=new Feedback({
        name:nm,
        feedback:fk
    })
    let result = await newfeed.save()
    if(result!==''){
        res.send({data:result})
    }else{
        res.send({"error":'no'})
    }
    
})

// saving feeds itno database
app.get("/getAllFeeds", async (req, res) => {
    let allfeed = await Feedback.find();
    console.log(allfeed);
    if(allfeed!==[]){
      res.status(200).send(allfeed)
    }else{
      res.status(400).send({error:"some error occur"})
    }
  });
  
app.listen(process.env.PORT || 8081,()=>{
    console.log('connected to port @8081');
})