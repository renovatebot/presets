const fs = require('fs');
const got = require('gh-got');
const pJson = require('./package.json');

const staticSources = {
  angular: {
    packagePatterns: ['^@angular/'],
  },
  lodash: {
    packageNames: ['babel-plugin-lodash', 'lodash-webpack-plugin', 'lodash-es'],
    packagePatterns: ['^lodash'],
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
        packages.push(item.name);
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
  fs.writeFileSync('package.json', JSON.stringify(pJson, null, 2));
}

go();
