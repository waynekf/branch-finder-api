const db = require("../db/connection.js");

const fetchBranches = function () {
  return db.query("SELECT * FROM Branches").then(({ rows: branches }) => {
    if (branches.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No branches found`,
      });
    }
    return { branches };
  });
};

module.exports = {
  fetchBranches,
};
