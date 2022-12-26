import mongoose from 'mongoose';

const connectMongo=async()=>{
    try{
        mongoose.set("strictQuery", false)
        const {connection} = await mongoose.connect(process.env.MONGO_URL,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
            () => {
              console.log('Connected to MongoDB');
            }
        );
        if(connection.readyState==1){
            return Promise.resolve(true)
        }
    }catch(error){
        return Promise.reject(error)
    }
}
export default connectMongo;