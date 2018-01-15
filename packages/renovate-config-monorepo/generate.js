const fs = require('fs');
const got = require('gh-got');
const pJson = require('./package.json');

const staticSources = {
  angular: {
    packagePatterns: ['^@angular/'],
  },
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
    const path = data.path || 'packages';
    const url = `https://api.github.com/repos/${data.repo}/contents/${path}`;
    const dirListing = (await got(url)).body;
    const packages = [];
    for (const item of dirListing) {
      if (item.type === 'dir') {
        // https://raw.githubusercontent.com/babel/babel/master/packages/babel-cli/package.json
        const packageJsonUrl = `https://raw.githubusercontent.com/${data.repo}/master/${path}/${item.name}/package.json`;
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
  fs.writeFileSync('package.json', `${JSON.stringify(pJson, null, 2)}\n`);
}

go();
