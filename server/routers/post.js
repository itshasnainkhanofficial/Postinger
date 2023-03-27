import express from 'express'
import {getAllPosts, addPost, updatePost, deletePost} from '../controllers/post.js'


const router = express()



// router.get("/", getAllPosts)

// router.post("/", addPost)

// router.patch("/:id", updatePost)

// router.delete("/:id", deletePost)


// // for better readablity we can reduce it to below

router.route("/").get(getAllPosts).post(addPost)
router.route("/:id").patch(updatePost).delete(deletePost)

export default router 