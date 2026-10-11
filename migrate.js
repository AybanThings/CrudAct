/*
  XianFire Framework — Migration
  Creates the "CrudAlcantara" database (if missing), syncs all models,
  and seeds the SpongeBob SquarePants characters.
*/

import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import { Character } from "./models/Character.js";

const rootSequelize = new Sequelize("mysql://root:@localhost:3306/");

try {
  await rootSequelize.query("CREATE DATABASE IF NOT EXISTS CrudAlcantara;");
  console.log("✅ Database 'CrudAlcantara' ready (created if it did not exist)");
} catch (err) {
  console.error("❌ Could not create database:", err.message);
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL database!");
  await sequelize.sync({ force: true });
  console.log("✅ Tables created for all models!");

  const characters = [
    { Name: "SpongeBob SquarePants", Species: "Sea Sponge", Occupation: "Fry Cook at the Krusty Krab", Residence: "Pineapple under the sea", Catchphrase: "I'm ready!" },
    { Name: "Patrick Star", Species: "Starfish", Occupation: "Professional Goofball", Residence: "Rock under the sea", Catchphrase: "Is mayonnaise an instrument?" },
    { Name: "Squidward Tentacles", Species: "Octopus", Occupation: "Cashier at the Krusty Krab", Residence: "Easter Island Head", Catchphrase: "How lovely." },
    { Name: "Eugene H. Krabs", Species: "Crab", Occupation: "Owner of the Krusty Krab", Residence: "Anchor House", Catchphrase: "Me precious dimes!" },
    { Name: "Sandy Cheeks", Species: "Squirrel", Occupation: "Scientist and Karate Expert", Residence: "Treedome", Catchphrase: "Yee-haw!" },
    { Name: "Sheldon J. Plankton", Species: "Copepod", Occupation: "Owner of the Chum Bucket", Residence: "Chum Bucket", Catchphrase: "I will rule the world!" },
    { Name: "Gary the Snail", Species: "Snail", Occupation: "Pet", Residence: "Pineapple under the sea", Catchphrase: "Meow." },
    { Name: "Pearl Krabs", Species: "Sperm Whale", Occupation: "Student and Cheerleader", Residence: "Anchor House", Catchphrase: "Daddy!" },
  ];

  await Character.bulkCreate(characters);
  console.log(`✅ Seeded ${characters.length} SpongeBob characters!`);
} catch (err) {
  console.error("❌ Migration failed:", err);
} finally {
  process.exit();
}
