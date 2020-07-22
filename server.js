const express = require("express");
const sequelize = require("./sequelize");
var cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Here is my checkpoint API!");
});

async function main() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Database succesfully joined");
    app.listen(PORT, (err) => {
      if (err) throw new Error(err.message);
      console.log(`Server is running on htpp://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Unable to join database", err.message);
  }
}

main();