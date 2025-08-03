const db = require("../db/connection.js");

const fetchBranches = function (name) {
  let sql = ``;
  if (name !== undefined) {
    sql = `SELECT * FROM Branches WHERE UPPER(name) LIKE '%${name.toUpperCase()}%'`;
  } else {
    sql = `SELECT * FROM Branches`;
  }
  return db.query(sql).then(({ rows: branches }) => {
    if (branches.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No branches found`,
      });
    }
    return { branches };
  });
};

const fetchBranch = function (name) {
  const sql = `SELECT * FROM Branches WHERE UPPER(name) = '${name.toUpperCase()}'`;
  return db.query(sql).then(({ rows: branches }) => {
    if (branches.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `Branch not found`,
      });
    }
    return { branch: branches[0] };
  });
};

module.exports = {
  fetchBranches,
  fetchBranch,
};
