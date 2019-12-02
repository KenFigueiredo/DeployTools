const program = require('commander');
const path = require('path');

const helm = require('./lib/helm');


async function build(argPath, opts) {
  if (!argPath) {
    program.outputHelp();
    process.exit(1);
  }

  const qualifiedPath = path.resolve(process.cwd(), argPath);
  const bundlePath = helm.bundle(qualifiedPath);

  helm.push();

  console.log('ARGPATH', bundlePath);
  // console.log(opts);
  // helm.bundle();
}

program
  .arguments('build [helm-chart-path]', 'Build the given helm chart')
  .option('-v, --verbose', 'Log level verbosity. Default: "info"', 'info')
  .action((argPath, opts) => build(argPath, opts))
  .parse(process.argv);
