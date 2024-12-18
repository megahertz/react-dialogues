#!/usr/bin/env node

'use strict';

/* eslint-disable no-underscore-dangle,no-console */

const { exec } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const __root = __dirname;

main(process.argv.slice(2)).catch((e) => {
  console.error(e.message);
  process.exit(1);
});

async function main([command]) {
  if (['major', 'minor', 'patch'].includes(command)) {
    await checkIfGitClean();
    await runBump(command);
    return;
  }

  const version = await readVersion();
  console.info('Usage: version.js <major|minor|patch>');
  console.info(`Current version: ${version}`);
}

async function runBump(command) {
  await cmd(`npm version ${command}`, {
    cwd: `${__root}/packages/react-dialogues`,
  });
  const version = await readVersion();

  await cmd(
    `git add ${__root}/package-lock.json ${__root}/packages/react-dialogues/package.json`,
  );
  await cmd(`git commit -m "${version}"`);
  await cmd(`git tag -a v${version} -m "${version}"`);
  await cmd('git push');
  await cmd(`git push origin v${version}`);
}

async function checkIfGitClean() {
  const output = await cmd('git status -u --porcelain', { echo: false });
  if (output.trim()) {
    await cmd('git status');
    throw new Error('Working directory is not clean');
  }
}

async function readVersion() {
  const jsonPath = path.join(__root, 'packages/react-dialogues/package.json');
  const content = await fs.promises.readFile(jsonPath, 'utf-8');
  const json = JSON.parse(content);
  if (!json.version) {
    throw new Error('Version is not defined');
  }

  return json.version;
}

async function cmd(command, options = {}) {
  const mergedOptions = {
    echo: true,
    ...options,
  };

  return new Promise((resolve, reject) => {
    // noinspection JSCheckFunctionSignatures
    const proc = exec(command, mergedOptions, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });

    if (mergedOptions.echo) {
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
    }
  });
}
