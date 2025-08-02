const { fetchBranches } = require("../models/branches.model.js");

const getBranches = function (req, res) {
  return fetchBranches().then(({ branches }) => {
    res.status(200);
    res.send({ branches });
    return branches;
  });
};

module.exports = {
  getBranches,
};
