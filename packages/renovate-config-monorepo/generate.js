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
  angularcli: {
    sourceUrlPrefixes: ['https://github.com/angular/angular-cli'],
  },
  'bugsnag-js': {
    sourceUrlPrefixes: ['https://github.com/bugsnag/bugsnag-js'],
  },
  flopflip: {
    sourceUrlPrefixes: ['https://github.com/tdeekens/flopflip'],
  },
  uppy: {
    sourceUrlPrefixes: ['https://github.com/transloadit/uppy'],
  },
  strapi: {
    sourceUrlPrefixes: ['https://github.com/strapi/strapi'],
  },
  'telus-tds': {
    sourceUrlPrefixes: ['https://github.com/telusdigital/tds'],
  },
  'devextreme-reactive': {
    sourceUrlPrefixes: ['https://github.com/DevExpress/devextreme-reactive'],
  },
  'react-dnd': {
    sourceUrlPrefixes: ['https://github.com/react-dnd/react-dnd'],
  },
  'ag-grid': {
    sourceUrlPrefixes: ['https://github.com/ag-grid/ag-grid'],
  },
  stryker: {
    sourceUrlPrefixes: ['https://github.com/stryker-mutator/stryker'],
  },
  'typography-js': {
    sourceUrlPrefixes: ['https://github.com/KyleAMathews/typography.js'],
  },
  'aws-java-sdk': {
    packagePatterns: ['^com.amazonaws:aws-java-sdk-'],
  },
  capacitor: {
    sourceUrlPrefixes: ['https://github.com/ionic-team/capacitor'],
  },
  'algolia-react-instantsearch': {
    sourceUrlPrefixes: ['https://github.com/algolia/react-instantsearch'],
  },
  typefaces: {
    sourceUrlPrefixes: ['https://github.com/KyleAMathews/typefaces'],
  },
  expo: {
    sourceUrlPrefixes: ['https://github.com/expo/expo'],
  },
  'ionic-native': {
    sourceUrlPrefixes: ['https://github.com/ionic-team/ionic-native'],
  },
  'ngxs-store': {
    sourceUrlPrefixes: ['https://github.com/ngxs/store'],
  },
  mdx: {
    sourceUrlPrefixes: ['https://github.com/mdx-js/mdx'],
  },
  vuepress: {
    sourceUrlPrefixes: ['https://github.com/vuejs/vuepress'],
  },
  workbox: {
    sourceUrlPrefixes: ['https://github.com/googlechrome/workbox'],
  },
  sentry: {
    sourceUrlPrefixes: ['https://github.com/getsentry/sentry-javascript'],
  },
  lingui: {
    sourceUrlPrefixes: ['https://github.com/lingui/js-lingui'],
  },
  'typescript-eslint': {
    sourceUrlPrefixes: [
      'https://github.com/typescript-eslint/typescript-eslint',
    ],
  },
  nest: {
    sourceUrlPrefixes: ['https://github.com/nestjs/nest'],
  },
  'ember-decorators': {
    sourceUrlPrefixes: ['https://github.com/ember-decorators/ember-decorators'],
  },
  'apollo-server': {
    sourceUrlPrefixes: ['https://github.com/apollographql/apollo-server'],
  },
  surveyjs: {
    sourceUrlPrefixes: ['https://github.com/surveyjs/surveyjs'],
  },
  'aspnet Extensions': {
    sourceUrlPrefixes: ['https://github.com/aspnet/Extensions'],
  },
  'aspnet AspNetWebStack': {
    sourceUrlPrefixes: ['https://github.com/aspnet/AspNetWebStack'],
  },
  'azure azure-libraries-for-net': {
    sourceUrlPrefixes: ['https://github.com/Azure/azure-libraries-for-net'],
  },
  'azure azure-storage-net': {
    sourceUrlPrefixes: ['https://github.com/Azure/azure-storage-net'],
  },
  'azure azure-sdk-for-net': {
    sourceUrlPrefixes: ['https://github.com/Azure/azure-sdk-for-net'],
  },
  framework7: {
    sourceUrlPrefixes: ['https://github.com/framework7io/framework7'],
  },
  emotion: {
    sourceUrlPrefixes: ['https://github.com/emotion-js/emotion'],
  },
  nextjs: {
    sourceUrlPrefixes: ['https://github.com/zeit/next.js'],
  },
  picasso: {
    sourceUrlPrefixes: ['https://github.com/qlik-oss/picasso.js'],
  },
  clarity: {
    sourceUrlPrefixes: ['https://github.com/vmware/clarity'],
  },
  infrastructure: {
    sourceUrlPrefixes: ['https://github.com/instructure/instructure-ui'],
  },
  webdriverio: {
    sourceUrlPrefixes: ['https://github.com/webdriverio/webdriverio'],
  },
  'reactivestack-cookies': {
    sourceUrlPrefixes: ['https://github.com/reactivestack/cookies'],
  },
  router5: {
    sourceUrlPrefixes: ['https://github.com/router5/router5'],
  },
  lerna: {
    sourceUrlPrefixes: ['https://github.com/lerna/lerna'],
  },
  'electron-forge': {
    sourceUrlPrefixes: ['https://github.com/electron-userland/electron-forge'],
  },
  graphqlcodegenerator: {
    sourceUrlPrefixes: [
      'https://github.com/dotansimha/graphql-code-generator',
      'https://github.com/dotansimha/graphql-codegen',
    ],
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
  jest: {
    repo: 'facebook/jest',
    includeTypes: true,
  },
  pouchdb: {
    repo: 'pouchdb/pouchdb',
    path: 'packages/node_modules',
  },
  react: {
    repo: 'facebook/react',
    includeTypes: true,
  },
  reactrouter: {
    repo: 'ReactTraining/react-router',
    includeTypes: true,
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
      packageNames: data.includeTypes
        ? packages.concat(
            packages.map(
              packageName =>
                `@types/${packageName.replace('/', '__').replace('@', '')}`
            )
          )
        : packages,
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
