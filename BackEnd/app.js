const express=require('express')
require('./db/config')
const User=require('./db/User')
const jwt=require("jsonwebtoken");
const Product=require('./db/Product')
const cors=require('cors');
const app=express()
require("dotenv").config();
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');
function validation(token)
{
  const result=jwt.verify(token,process.env.jwtkey);
  return result;

}


app.post('/register',async (req,res)=>{
    //  let user=new User(req.body);
    //  let result=await user.save();
    console.log(req.body.password);
    const hashedPassword=await bcrypt.hash(req.body.password, 10)
    const newuser=await User.create({name:req.body.name,email:req.body.email,password:hashedPassword})
    // result=result.toObject();
    // delete result.password
    res.send(newuser);
})
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
      let user = await User.findOne({
        email: req.body.email
      });
      const resu=await bcrypt.compare(req.body.password,user.password);
      if (user && resu) {
        const token=await jwt.sign({time:Date(),userId:user.email},process.env.jwtkey,{expiresIn:'6h'});
        res.send({user,jwt:token});
      } else {
        res.send({ result: "No user found" });
      }
    } else {
      res.send({ result: "No user found" });
    }
  });
  
app.post("/addproduct",async(req,res)=>{
  if(validation(req.body.jwt))
  {
   let product=new Product(req.body);
   let result=await product.save();
   res.send(result)
  }
  else
  {
     res.status(400).send("result");
  }

})
app.get("/",(req,res)=>{
   
        res.write("hello world");
        res.end();
    console.log("app started");
});
app.get("/products",async(req,res)=>{
    let products=await Product.find();
    if(products.length>0)
    {
        res.send(products)
    }
    else{
        res.send({result:"no Products found"})
    }
})
app.delete("/products/:id", async (req, res) => {
    try {
      const result = await Product.findOneAndDelete({ _id: req.params.id });
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: "An error occurred while deleting the product." });
    }
  });
  
app.get('/products/:id',async(req,res)=>{
    let result=await Product.findOne({ _id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send({result:"No Records found"})
    }
})
app.put('/products/:id',async(req,res)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result)
})
app.get('/search/:key',async(req,res)=>{
    let result=await Product.find({
        "$or":[
            {productname:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    res.send(result);
})
app.listen(5000,()=>{
    console.log("app is listening at port 5000");
});