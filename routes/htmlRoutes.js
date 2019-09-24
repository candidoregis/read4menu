var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.MenuItem.findAll({}).then(function(dbMenuItems) {
      res.render("index", {
        msg: "Welcome!",
        menuItems: dbMenuItems
      });
    });
  });

  // Load menuItem page and pass in an menuItem by id
  app.get("/menuItem/:id", function(req, res) {
    db.MenuItem.findOne({ where: { id: req.params.id } }).then(function(
      dbMenuItem
    ) {
      res.render("menuItem", {
        menuItem: dbMenuItem
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
