require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  try {
    const limitnumber = 5;
    const categories = await Category.find({}).limit(limitnumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitnumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitnumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitnumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitnumber
    );

    const food = { latest, thai, american, chinese };
    res.render("index", {
      title: "Cooking Blog - Home",
      categories,
      food,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /
 * Categories
 */

exports.exploreCategories = async (req, res) => {
  try {
    const limitnumber = 20;
    const categories = await Category.find({}).limit(limitnumber);

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /
 * recipe/:id
 */

exports.exploreRecipe = async (req, res) => {
  try {
    let recipeid = req.params.id;
    const recipe = await Recipe.findById(recipeid);

    res.render("recipe", {
      title: "Cooking Blog - Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /
 * category/:id
 */

exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitnumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitnumber
    );

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * POST /
 * search/
 */

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });

    res.render("search", {
      title: "Cooking Blog - Search",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /
 * explore-latest
 * Explore latest
 */

exports.exploreLatest = async (req, res) => {
  try {
    const limitnumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitnumber);

    res.render("explore-latest", {
      title: "Cooking Blog - Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /
 * explore-random
 * Explore Random
 */

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();

    res.render("explore-random", {
      title: "Cooking Blog - Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * Get /
 * submit-recipe
 * Submit Recipe
 */

exports.submitRecipe = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();

    res.render("submit-recipe", {
      title: "Cooking Blog - Post Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

// async function insertDymmyRecipeData() {
//   try {
//     await Recipe.insertMany([
//       {
//         name: "Recipe Name Goes Here",
//         description: `Recipe Description Goes Here`,
//         email: "recipeemail@raddy.co.uk",
//         ingredients: [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         category: "American",
//         image: "southern-friend-chicken.jpg",
//       },
//       {
//         name: "Recipe Name Goes Here",
//         description: `Recipe Description Goes Here`,
//         email: "recipeemail@raddy.co.uk",
//         ingredients: [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         category: "American",
//         image: "southern-friend-chicken.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDymmyRecipeData();
