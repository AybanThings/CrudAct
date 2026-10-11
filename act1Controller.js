/*
  MIT License
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines

  ACT 1 — Basic model operations (JSON API)
    • insert → create a new SpongeBob character
    • all    → list every character
    • one    → fetch a single character by id
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

const act1Controller = {
  // INSERT — POST /api/act1/characters
  insert: async (req, res) => {
    try {
      const row = await Character.create(fields(req.body));
      res.status(201).json({ success: true, message: "Character inserted.", data: row });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // ALL — GET /api/act1/characters
  all: async (req, res) => {
    try {
      const rows = await Character.findAll({ order: [["id", "DESC"]] });
      res.json({ success: true, count: rows.length, data: rows });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // ONE — GET /api/act1/characters/:id
  one: async (req, res) => {
    try {
      const row = await Character.findByPk(req.params.id);
      if (!row) {
        return res.status(404).json({ success: false, message: "Character not found." });
      }
      res.json({ success: true, data: row });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};

export { act1Controller };
