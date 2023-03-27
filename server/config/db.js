import mongoose from 'mongoose'

const ConnectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB Connected")

  } catch (error) {
    console.log("MongoDb not connected: ", error)
    process.exit(1)
  }
}

export default ConnectDB