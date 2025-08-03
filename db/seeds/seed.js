const db = require("../connection.js");
var format = require("pg-format");
const { getBranches } = require("../seeds/utils.js");

const seed = ({ branchesData }) => {
  return db
    .query(`DROP TABLE IF EXISTS Branches`)
    .then(() => {
      const sql = `CREATE TABLE Branches (
      name varchar(250) PRIMARY KEY NOT NULL ,
      addressLine1 varchar(250) NOT NULL,
      addressLine2 varchar(250) NOT NULL,
      town varchar(250) NOT NULL,
      county varchar(250) NOT NULL,
      postcode varchar(250) NOT NULL)`;

      return db.query(sql);
    })
    .then(() => {
      const sql = format(
        "INSERT INTO Branches (name, addressLine1, addressLine2, town, county, postcode) VALUES %L RETURNING *",
        getBranches(branchesData),
      );

      return db.query(sql);
    })
    .catch((error) => {
      console.log("ERROR CAUGHT IN CATCH!", "<<<---");
      console.log(error);
    })
    .finally(() => {});
};

module.exports = {
  seed,
};
