import express from "express";
import {
  getUser,
  updateUser,
  updatePublicUser,
  getSavedRecipes,
  updateSavedRecipes,
  sendMail,
} from "../controllers/account.js";

const router = express.Router();

router.get("/:id", getUser);

router.put("/saved/:id", updateSavedRecipes);

router.get("/saved/:id", getSavedRecipes);

router.put("/personal/:id", updateUser);

router.put("/public/:id", updatePublicUser);

router.post("/send_mail", sendMail);







export default router;
