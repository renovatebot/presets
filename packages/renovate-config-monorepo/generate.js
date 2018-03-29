const fs = require('fs');
const got = require('gh-got');
const path = require('path');
const pJson = require('./package.json');

const staticSources = {
  angular1: {
    packageNames: [
      'angular',
      'angular-animate',
      'angular-aria',
      'angular-cookies',
      'angular-loader',
      'angular-message-format',
      'angular-messages',
      'angular-mocks',
      'angular-parse-ext',
      'angular-resource',
      'angular-route',
      'angular-sanitize',
      'angular-scenario',
      'angular-touch',
    ],
  },
  commitlint: {
    packageNames: ['commitlint'],
    packagePatterns: ['^@commitlint/'],
  },
  lodash: {
    packageNames: ['babel-plugin-lodash', 'lodash-webpack-plugin', 'lodash-es'],
    packagePatterns: ['^lodash'],
  },
  neutrino: {
    packageNames: ['neutrino'],
    packagePatterns: ['^@neutrinojs/'],
  },
  ngrx: {
    packageNames: ['ngrx'],
    packagePatterns: ['^@ngrx/'],
  },
  nrwl: {
    packageNames: ['nrwl'],
    packagePatterns: ['^@nrwl/'],
  },
  storybook: {
    packagePatterns: ['^@storybook/'],
  },
};

const dynamicSources = {
  accounts: {
    repo: 'accounts-js/accounts',
  },
  angular: {
    repo: 'angular/angular',
    path: 'packages',
  },
  babel6: {
    repo: 'babel/babel',
    branch: '6.x',
  },
  babel: {
    repo: 'babel/babel',
  },
  jest: {
    repo: 'facebook/jest',
  },
  pouchdb: {
    repo: 'pouchdb/pouchdb',
    path: 'packages/node_modules',
  },
  react: {
    repo: 'facebook/react',
  },
  gatsby: {
    repo: 'gatsbyjs/gatsby',
  },
  material: {
    repo: 'material-components/material-components-web',
  },
};

async function go() {
  const config = {};
  for (const monorepo of Object.keys(staticSources)) {
    config[monorepo] = {
      description: `${monorepo} monorepo`,
      ...staticSources[monorepo],
    };
  }
  for (const monorepo of Object.keys(dynamicSources)) {
    const data = dynamicSources[monorepo];
    const branch = data.branch || 'master';
    const path = data.path || 'packages';
    const url = `https://api.github.com/repos/${data.repo}/contents/${path}`;
    const dirListing = (await got(url)).body;
    const packages = [];
    for (const item of dirListing) {
      if (item.type === 'dir') {
        const packageJsonUrl = `https://raw.githubusercontent.com/${data.repo}/${branch}/${path}/${item.name}/package.json`;
        try {
          const packageJson = (await got(packageJsonUrl)).body;
          if (packageJson.name && packageJson.private !== true) {
            packages.push(packageJson.name);
          }
        } catch (err) {
          // No package.json
        }
      }
    }
    config[monorepo] = {
      description: `${monorepo} monorepo`,
      packageNames: packages,
    };
  }
  // Write rules in alphabetical order
  pJson['renovate-config'] = {};
  for (const rule of Object.keys(config).sort()) {
    pJson['renovate-config'][rule] = config[rule];
  }
  fs.writeFileSync(path.join(__dirname, 'package.json'), `${JSON.stringify(pJson, null, 2)}\n`);
}

go();
