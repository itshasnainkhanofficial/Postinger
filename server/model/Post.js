import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
    PostTitle: {
        type: String,
        required: [true, "Please Add Title"],
        minlength: 1,
        maxlength: 1000,
      },
    PostContent: {
        type: String,
        required: [true, "Please Add Content"],
        minlength: 5,
        maxlength: 1000,
      },
},
 { timestamps: true }
)


const Post = mongoose.model("Post", postSchema)

export default Post