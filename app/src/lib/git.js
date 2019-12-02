const git = require('simple-git')();


async function commitBack(files, commitMessage) {
  git.add(files);
  git.commit(commitMessage, files);
  await git.push();
}


module.exports = {
  commitBack,
};
