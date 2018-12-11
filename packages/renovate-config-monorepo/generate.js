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
      '@types/angular',
      '@types/angular-animate',
      '@types/angular-aria',
      '@types/angular-cookies',
      '@types/angular-loader',
      '@types/angular-message-format',
      '@types/angular-messages',
      '@types/angular-mocks',
      '@types/angular-parse-ext',
      '@types/angular-resource',
      '@types/angular-route',
      '@types/angular-sanitize',
      '@types/angular-scenario',
      '@types/angular-touch',
    ],
  },
  commitlint: {
    packageNames: ['commitlint'],
    packagePatterns: ['^@commitlint/'],
  },
  'semantic-release': {
    packageNames: ['semantic-release'],
    packagePatterns: ['^@semantic-release/'],
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
  fimbullinter: {
    packagePatterns: ['^@fimbul/'],
  },
  wordpress: {
    packagePatterns: ['^@wordpress/'],
  },
  angularmaterial: {
    packageNames: ['@angular/material', '@angular/cdk'],
  },
};

const dynamicSources = {
  accounts: {
    repo: 'accounts-js/accounts',
  },
  angular: {
    repo: 'angular/angular',
  },
  awsappsync: {
    repo: 'awslabs/aws-mobile-appsync-sdk-js',
  },
  apolloclient: {
    repo: 'apollographql/apollo-client',
    includePrivatePackage: true,
  },
  apollolink: {
    repo: 'apollographql/apollo-link',
    includePrivatePackage: true,
  },
  babel6: {
    repo: 'babel/babel',
    branch: '6.x',
  },
  babel: {
    repo: 'babel/babel',
  },
  baset: {
    repo: 'igmat/baset',
  },
  emotion: {
    repo: 'emotion-js/emotion',
  },
  graphqlcodegenerator: {
    repo: 'dotansimha/graphql-code-generator',
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
  reactrouter: {
    repo: 'ReactTraining/react-router',
  },
  mui: {
    repo: 'mui-org/material-ui',
    includePrivatePackage: true,
  },
  gatsby: {
    repo: 'gatsbyjs/gatsby',
  },
  material: {
    repo: 'material-components/material-components-web',
  },
  'graphql-modules': {
    repo: 'Urigo/graphql-modules',
  },
  vue: {
    repo: 'vuejs/vue',
    includeRoot: true,
  },
  'vue-cli': {
    repo: 'vuejs/vue-cli',
    branch: 'dev',
    path: 'packages/@vue',
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
    const packagesPath = data.path || 'packages';
    const includePrivatePackage = !!data.includePrivatePackage;
    const url = `https://api.github.com/repos/${
      data.repo
    }/contents/${packagesPath}`;
    const dirListing = (await got(url)).body;
    const packages = [];
    for (const item of dirListing) {
      if (item.type === 'dir') {
        const packageJsonUrl = `https://raw.githubusercontent.com/${
          data.repo
        }/${branch}/${packagesPath}/${item.name}/package.json`.replace(
          /@/g,
          '%40'
        );
        try {
          const packageJson = (await got(packageJsonUrl)).body;
          if (
            packageJson.name &&
            (includePrivatePackage || packageJson.private !== true)
          ) {
            packages.push(packageJson.name);
          }
        } catch (err) {
          // No package.json
        }
      }
    }
    if (data.includeRoot) {
      // Now check root of repo
      try {
        const packageJsonUrl = `https://raw.githubusercontent.com/${
          data.repo
        }/${branch}/package.json`;
        const packageJson = (await got(packageJsonUrl)).body;
        if (
          packageJson.name &&
          (includePrivatePackage || packageJson.private !== true)
        ) {
          packages.push(packageJson.name);
        }
      } catch (err) {
        // No package.json
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
  fs.writeFileSync(
    path.join(__dirname, 'package.json'),
    `${JSON.stringify(pJson, null, 2)}\n`
  );
}

go();
