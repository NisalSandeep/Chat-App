import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"


const   router = express.Router();

router.use( protectRoute) //these middlewares run by order


router.get("/contacts", getAllContacts);
router.get("/chat", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage );

export default router;