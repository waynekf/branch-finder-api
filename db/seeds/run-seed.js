const devData = require("../data/development-data/index.js");
const { seed } = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  console.log(devData);

  return seed(devData).then(() => db.end());
};

runSeed();
