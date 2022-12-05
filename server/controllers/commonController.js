require("../models/database");

/**
 * GET /
 * Contact Form
 */

exports.ContactForm = async (req, res) => {
  try {
    res.render("contact", {
      title: "Cooking Blog - Contact Us",
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
