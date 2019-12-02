#!/usr/bin/env node

const program = require('commander');
const { version } = require('./config');

program
  .version(version)
  .command('build [helm-chart-path]', 'Build the given helm chart')
  .command('install [name]', 'install one or more packages')
  .command('search [query]', 'search with optional query')
  .command('update', 'update installed packages', { executableFile: 'myUpdateSubCommand' })
  .parse(process.argv);
