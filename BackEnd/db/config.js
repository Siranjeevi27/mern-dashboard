const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://siranjeevisaminathan:siranjeevi@cluster0.qvlxjam.mongodb.net/?retryWrites=true&w=majority")
//mongoose.connect("mongodb+srv://siranjeevisaminathan:siranjeevi@cluster0.qvlxjam.mongodb.net/?retryWrites=true&w=majority", { bufferTimeoutMS: 30000 }); // Increase timeout to 30 seconds


const con=mongoose.connection

con.on('open',()=>{
    console.log("database connected");
})