var db = require("../models");

module.exports = function(app) {
  // Get all menuItems
  app.get("/api/menuItems", function(req, res) {
    db.MenuItem.findAll({}).then(function(dbMenuItems) {
      res.json(dbMenuItems);
    });
  });

  // Create a new menuItem
  app.post("/api/menuItems", function(req, res) {
    db.MenuItem.create(req.body).then(function(dbMenuItem) {
      res.json(dbMenuItem);
    });
  });

  // Delete an menuItem by id
  app.delete("/api/menuItems/:id", function(req, res) {
    db.MenuItem.destroy({ where: { id: req.params.id } }).then(function(
      dbMenuItem
    ) {
      res.json(dbMenuItem);
    });
  });

  app.get("/api/menuItems/playmenu", function(req, res) {
    db.MenuItem.findAll({}).then(function(dbMenuItems) {
      res.json(dbMenuItems);
    });
  });
};
