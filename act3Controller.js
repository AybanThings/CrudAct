/*
  MIT License
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines

  ACT 3 — Full CRUD rendered with .xian views
    • index   → list all + add form   (views/character.xian)
    • store   → create a record, then redirect back to the list
    • show    → single record detail  (views/character-show.xian)
    • edit    → edit form             (views/character-edit.xian)
    • update  → save changes, then redirect back to the list
    • destroy → delete a record, then redirect back to the list
*/

import { Character, sequelize } from "../models/Character.js";
await sequelize.sync();

const fields = (body) => ({
  Name: body.Name,
  Species: body.Species,
  Occupation: body.Occupation,
  Residence: body.Residence,
  Catchphrase: body.Catchphrase,
});

const act3Controller = {
  // READ — list every record (GET /characters)
  index: async (req, res) => {
    const rows = await Character.findAll({ order: [["id", "ASC"]] });
    res.render("character", {
      title: "SpongeBob Characters",
      characters: rows.map((row) => row.get({ plain: true })),
    });
  },

  // CREATE — save a new record (POST /characters)
  store: async (req, res) => {
    try {
      await Character.create(fields(req.body));
      req.flash("success_msg", "Character added successfully.");
    } catch (err) {
      req.flash("error_msg", `Could not add character: ${err.message}`);
    }
    res.redirect("/characters");
  },

  // READ — show one record (GET /characters/:id)
  show: async (req, res) => {
    const row = await Character.findByPk(req.params.id);
    if (!row) {
      req.flash("error_msg", "Character not found.");
      return res.redirect("/characters");
    }
    res.render("character-show", {
      title: "Character Details",
      character: row.get({ plain: true }),
    });
  },

  // READ — show the edit form for one record (GET /characters/:id/edit)
  edit: async (req, res) => {
    const row = await Character.findByPk(req.params.id);
    if (!row) {
      req.flash("error_msg", "Character not found.");
      return res.redirect("/characters");
    }
    res.render("character-edit", {
      title: "Edit Character",
      character: row.get({ plain: true }),
    });
  },

  // UPDATE — save changes to a record (POST /characters/:id)
  update: async (req, res) => {
    try {
      const row = await Character.findByPk(req.params.id);
      if (!row) {
        req.flash("error_msg", "Character not found.");
      } else {
        await row.update(fields(req.body));
        req.flash("success_msg", "Character updated successfully.");
      }
    } catch (err) {
      req.flash("error_msg", `Could not update character: ${err.message}`);
    }
    res.redirect("/characters");
  },

  // DELETE — remove a record (POST /characters/:id/delete)
  destroy: async (req, res) => {
    try {
      const deleted = await Character.destroy({ where: { id: req.params.id } });
      req.flash(
        deleted ? "success_msg" : "error_msg",
        deleted ? "Character deleted successfully." : "Character not found."
      );
    } catch (err) {
      req.flash("error_msg", `Could not delete character: ${err.message}`);
    }
    res.redirect("/characters");
  },
};

export { act3Controller };
