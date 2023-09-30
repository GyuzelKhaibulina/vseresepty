import express from "express";
import { checkTempPassword, 
         resetPasswordAuth, 
         addUser, 
         checkCodeRegister, 
         login, 
         logout, 
         authorization, 
         resetPassword, 
         sendRegisterMail, 
         temporaryRegister,
         addCode,
         checkResetKey,
        } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/authorization", authorization);
router.put("/reset_password", resetPassword);
router.post("/reset_password_auth", resetPasswordAuth);
router.post("/send_regmail", sendRegisterMail);
router.post("/temp_register", temporaryRegister);
router.post("/check_code", checkCodeRegister);
router.post("/add_user", addUser);
router.post("/check_temp_password", checkTempPassword)
router.put("/add_code", addCode);
router.post("/chek_reset_key", checkResetKey);

export default router;
