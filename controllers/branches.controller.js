const { fetchBranches, fetchBranch } = require("../models/branches.model.js");

const getBranches = function (req, res, next) {
  const { name } = req.params;
  return fetchBranches(name)
    .then(({ branches }) => {
      res.status(200);
      res.send({ branches });
      return branches;
    })
    .catch(next);
};

const getBranch = function (req, res, next) {
  const { name } = req.params;
  return fetchBranch(name)
    .then(({ branch }) => {
      res.status(200);
      res.send({ branch });
      return branch;
    })
    .catch(next);
};

module.exports = {
  getBranches,
  getBranch,
};
