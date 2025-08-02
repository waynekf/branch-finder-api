const db = require("../../db/connection");
const branches = require("../data/development-data/branches");

const getBranches = (branches) =>
  [...branches].map((branch) => [
    branch.name,
    [
      branch.address.addressLine1,
      branch.address.addressLine2,
      branch.address.town,
      branch.address.county,
      branch.address.postcode,
    ],
  ]);

module.exports = {
  getBranches,
};
