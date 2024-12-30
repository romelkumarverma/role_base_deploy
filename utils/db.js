import mongoose from "mongoose";


const DbCon = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Mongodb is connected Successfully...')
    } catch(error) {
        console.log(error)
    }
}

export default DbCon;