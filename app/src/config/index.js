const pjson = require('../../package.json');

module.exports = {
  version: pjson.version,
  isDockerized: process.env.RUNNING_IN_DOCKER || false,

};
