const { execSync } = require('child_process');
const { createReadStream } = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const loggerUtil = require('../util/logger');

/**
 * Bundles a given helm chart directory
 * @note This requires that the helm binary is installed and in the execution path.
 * @param {string} filePath Path to the given helm directory
 * @returns {string} Fully qualified path to the helm bundle.
 * @throws {Error} If helm package command fails
 *
 */
function bundle(filePath) {
  const logger = loggerUtil.getLogger();
  try {
    const output = execSync(['helm', 'package', filePath].join(' '), { encoding: 'utf-8' });
    return output.split(':').pop();
  } catch (err) {
    logger.error('Failed to bundle helm chart', err.stack);
    throw new Error(err);
  }
}

/**
 * Pushes the given bundled helm chart to the given helm repository
 * @param {string} helmURL Fully qualified url to the helm repository
 * @param {string} bundlePath Fully qualified path to the bundled helm chart
 * @returns {Promise<boolean>} true if chart was successfully uploaded
 * @throws {Error} If post to helm repository fails
 */
async function push(helmURL, bundlePath) {
  const logger = loggerUtil.getLogger();
  try {
    const form = new FormData();
    form.append('helm_chart', createReadStream(bundlePath), 'helm.tgz');
    const raw = await axios.post(helmURL, form);
    return raw;
  } catch (err) {
    logger.error('Failed to push helm chart', err.stack);
    throw new Error(err);
  }
}


module.exports = {
  push,
  bundle,
};
