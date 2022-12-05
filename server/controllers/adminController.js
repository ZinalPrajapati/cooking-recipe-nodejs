require("../models/database");
var User = require("../models/User");

/**
 * GET /
 * Admin Form
 */

exports.AdminForm = async (req, res) => {
  try {
    if (req.session.userId) {
      res.redirect("/admin/dashboard");
    } else {
      res.render("admin", {
        title: "Cooking Blog - Admin",
        layout: false,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.verifyAdmin = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    //console.log(req.body);
    User.findOne({ username: username }, function (err, data) {
      if (data) {
        if (data.password == password) {
          //console.log("Done Login");
          req.session.userId = data._id;
          res.redirect("/admin/dashboard");
        } else {
          res.send({ Error: "Wrong password!" });
        }
      } else {
        res.send({ Error: "This Email Is not regestered!" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.dashboard = async (req, res) => {
  try {
    res.render("admin/dashboard", {
      title: "Cooking Blog - Admin",
      layout: "./layouts/admin",
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.logout = async (req, res) => {
  try {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect("/admin");
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.GetAllUsers = async (req, res) => {
  try {
    if (req.session) {
      const limitnumber = 20;
      const users = await User.find({}).limit(limitnumber);

      res.render("admin/users", {
        title: "Cooking Blog - Admin",
        layout: "./layouts/admin",
        users,
      });
    } else {
      res.redirect("/admin");
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
