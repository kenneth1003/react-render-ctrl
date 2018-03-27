const path = require('path');
const fse = require('fs-extra');
const { exec } = require('child_process');

async function copyPackageJson() {
  const packageJsonData = await fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
  const { devDependencies, scripts, jest, ...packageData } = JSON.parse(packageJsonData);
  const newPackageData = {
    ...packageData,
    main: "index.js",
  }

  const buildPath = path.resolve(__dirname, '../dist/package.json');

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${buildPath}`);
}

function copyReadme() {
  exec('cp README.md dist');
}

copyPackageJson();
copyReadme();
