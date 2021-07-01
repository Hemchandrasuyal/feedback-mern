const mongoose=require('mongoose')
const feedback=new mongoose.Schema({
    name:{
        type:String, 
        
    },sugg:{
        type:String, 
        
    }
})
const feed=mongoose.model("feeddeck",feedback)
module.exports=feed