import express from "express"
import { authHr,
    HRregister } from "../controllers/hrControllers.js"

const HRrouter = express.Router()

// import { protect } from "../middleware/authMiddleware.js"

HRrouter.post('/authHr',authHr)
HRrouter.post('/HrRegister',HRregister)



export default HRrouter

