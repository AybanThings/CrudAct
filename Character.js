/*
  MIT License
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines
*/

import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Character = sequelize.define("character", {
  Name: { type: DataTypes.STRING, allowNull: false },
  Species: { type: DataTypes.STRING, allowNull: false },
  Occupation: { type: DataTypes.STRING, allowNull: false },
  Residence: { type: DataTypes.STRING, allowNull: false },
  Catchphrase: { type: DataTypes.STRING, allowNull: true },
});

export { sequelize };
