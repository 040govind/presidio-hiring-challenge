import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {verifySellerJWT} from '../middleware/seller.auth.js'
import { verifyJWT } from "../middleware/buyer.auth.js";
import { addProperty,fetchProperty,deleteProperty,updateProperty } from "../controllers/seller.controller.js";
const router =Router();

router.route('/add-property').post(verifySellerJWT,upload.single('image'),addProperty);
router.route('/fetch-property').get(verifySellerJWT,fetchProperty);
router.route('/delete-property/:id').delete(verifySellerJWT,deleteProperty);
router.route('/update-property').put(verifySellerJWT,updateProperty);
export default router;