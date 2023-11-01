import express from "express"
const router = express.Router();
import chatController from "../controllers/chatController.js";
// import  {protect}  from "../../middleware/ChatMiddleware/authMiddleware.js";
import  {protect}  from "../middleware/authMiddleware.js";



router.get("get-createRoom",chatController.createRoom)

export default router