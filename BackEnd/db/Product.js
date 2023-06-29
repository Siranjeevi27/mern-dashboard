
const mongoose = require('mongoose');


const ProductSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true,
        
    },
    price:{
        type:String,
        required:true,
       
    },
    category:{
        type:String,
        required:true,
        
    },
    userId:{
        type:String,
    
    },
    company:{
        type:String,
        required:true,
        
    }
});

module.exports=mongoose.model("Products",ProductSchema);