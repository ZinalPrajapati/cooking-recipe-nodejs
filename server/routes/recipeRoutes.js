const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const commonController = require("../controllers/commonController");
const adminController = require("../controllers/adminController");

/**
 * App Routes
 */

router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/categories/:id", recipeController.exploreCategoriesById);
router.post("/search", recipeController.searchRecipe);

router.get("/explore-latest", recipeController.exploreLatest);
router.get("/explore-random", recipeController.exploreRandom);

router.get("/submit-recipe", recipeController.submitRecipe);

router.get("/contact", commonController.ContactForm);

router.get("/admin", adminController.AdminForm);
router.post("/admin/verify-admin", adminController.verifyAdmin);
router.get("/admin/dashboard", adminController.dashboard);
router.get("/admin/logout", adminController.logout);

router.get("/admin/users", adminController.GetAllUsers);

module.exports = router;
