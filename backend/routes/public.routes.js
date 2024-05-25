import { Router } from "express";
const router =Router();
import { Register,Login } from "../controllers/public.controller.js";
router.route('/register').post(Register);
router.route('/login').post(Login);


export default router;