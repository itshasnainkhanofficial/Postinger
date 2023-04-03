import express from 'express'
import {getAllPosts, getSpecificUserPosts, addPost, updatePost, deletePost, getSinglePost} from '../controllers/post.js'
import { protect } from '../midddleware/auth.js'

const router = express()




router.route("/").get(getAllPosts).post(protect, addPost)
router.get("/postBySpecificUser", protect, getSpecificUserPosts)
router.route("/:id").patch(protect, updatePost).delete(protect, deletePost).get(protect, getSinglePost)




// simple routes
// router.get("/", getAllPosts)

// router.post("/", addPost)

// router.patch("/:id", updatePost)

// router.delete("/:id", deletePost)


// // for better readablity we can reduce it to below
router.route("/").get(getAllPosts).post(addPost)
router.route("/:id").patch(updatePost).delete(deletePost)

export default router 