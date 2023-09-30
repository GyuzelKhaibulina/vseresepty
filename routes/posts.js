import express from "express";
import {
  getCookingSingle,
  getRecipe,
  editRecipe,
  addRatingRecipe,
  addRecipe,
  deleteKitchenSingle,
  getSearchRecipes,
  getRecipes,
  findUser
} from "../controllers/post.js";

const router = express.Router();

router.get("/:cooking", getRecipes);
router.post("/add", addRecipe);
router.get("/:cooking/:type/:id", getCookingSingle);
router.get("/:cooking/:type/:id/edit", getRecipe);
router.put("/:cooking/:type/:id/edit", editRecipe);
router.put("/:cooking/:type/:id/edit_rating", addRatingRecipe);
router.delete("/:cooking/:type/:id", deleteKitchenSingle);
router.get("/cooking/search", getSearchRecipes);
router.get("/autorization-check/:name", findUser);



export default router;
