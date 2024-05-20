const mongoose= require("mongoose")

require("dotenv").config()

const connectDb=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,                               
    })
    .then(console.log("Db successfull"))
    .catch((e)=>{
        console.log("DB error")
        console.log(e)
        process.exit(1)
    })
}
module.exports=connectDb