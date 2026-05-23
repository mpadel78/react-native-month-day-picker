const { existsSync } = require('node:fs');
const { spawnSync } = require('node:child_process');

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(args) {
  const result = spawnSync(npmCommand, args, { stdio: 'inherit' });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (existsSync('.git')) {
  run(['exec', '--', 'husky']);
} else {
  console.log('Skipping Husky install because .git was not found.');
}

run(['exec', '--', 'bob', 'build']);
