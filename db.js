/*
  MIT License
  Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
  Mindoro State University - Philippines
*/

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("CrudAlcantara", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
