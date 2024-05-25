import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {verifySellerJWT} from '../middleware/seller.auth.js'
import { verifyJWT } from "../middleware/buyer.auth.js";
import { getAllProperty,sendMail } from "../controllers/buyer.controller.js";
const router =Router();
router.route('/fetch-property').get(verifyJWT,getAllProperty);
router.route('/send-mail').post(verifyJWT,sendMail);

export default router;