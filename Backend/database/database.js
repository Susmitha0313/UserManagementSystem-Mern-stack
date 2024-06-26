const mongoose=require('mongoose')
require('dotenv').config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB).then(()=>{
            console.log('Database connect')
        })
        
    } catch (error) {
        console.log('mongoDB Not connect')
    }
}
module.exports=connectDB