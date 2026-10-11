/*
  MIT License
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines

  ACT 2 — Modifying existing records (JSON API)
    • update  → change an existing character by id
    • destroy → remove an existing character by id
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

const act2Controller = {
  // UPDATE — PUT /api/act2/characters/:id
  update: async (req, res) => {
    try {
      const row = await Character.findByPk(req.params.id);
      if (!row) {
        return res.status(404).json({ success: false, message: "Character not found." });
      }
      await row.update(fields(req.body));
      res.json({ success: true, message: "Character updated.", data: row });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // DELETE — DELETE /api/act2/characters/:id
  destroy: async (req, res) => {
    try {
      const row = await Character.findByPk(req.params.id);
      if (!row) {
        return res.status(404).json({ success: false, message: "Character not found." });
      }
      await row.destroy();
      res.json({ success: true, message: "Character deleted." });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};

export { act2Controller };
