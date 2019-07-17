const fs = require('fs');
const got = require('gh-got');
const path = require('path');
const pJson = require('./package.json');
const is = require('@sindresorhus/is');

const repoGroups = {
  angular1: 'https://github.com/angular/angular.js',
  angularcli: 'https://github.com/angular/angular-cli',
  'bugsnag-js': 'https://github.com/bugsnag/bugsnag-js',
  commitlint: 'https://github.com/conventional-changelog/commitlint',
  flopflip: 'https://github.com/tdeekens/flopflip',
  neutrino: 'https://github.com/neutrinojs/neutrino',
  'semantic-release': 'https://github.com/semantic-release/',
  lodash: 'https://github.com/lodash/',
  uppy: 'https://github.com/transloadit/uppy',
  strapi: 'https://github.com/strapi/strapi',
  'telus-tds': 'https://github.com/telusdigital/tds',
  'devextreme-reactive': 'https://github.com/DevExpress/devextreme-reactive',
  'react-dnd': 'https://github.com/react-dnd/react-dnd',
  'ag-grid': 'https://github.com/ag-grid/ag-grid',
  stryker: 'https://github.com/stryker-mutator/stryker',
  'typography-js': 'https://github.com/KyleAMathews/typography.js',
  capacitor: 'https://github.com/ionic-team/capacitor',
  'algolia-react-instantsearch':
    'https://github.com/algolia/react-instantsearch',
  typefaces: 'https://github.com/KyleAMathews/typefaces',
  expo: 'https://github.com/expo/expo',
  'ionic-native': 'https://github.com/ionic-team/ionic-native',
  'ngxs-store': 'https://github.com/ngxs/store',
  mdx: 'https://github.com/mdx-js/mdx',
  workbox: 'https://github.com/googlechrome/workbox',
  sentry: 'https://github.com/getsentry/sentry-javascript',
  lingui: 'https://github.com/lingui/js-lingui',
  nest: 'https://github.com/nestjs/nest',
  'ember-decorators': 'https://github.com/ember-decorators/ember-decorators',
  'apollo-server': 'https://github.com/apollographql/apollo-server',
  surveyjs: 'https://github.com/surveyjs/surveyjs',
  'aspnet Extensions': 'https://github.com/aspnet/Extensions',
  'aspnet AspNetWebStack': 'https://github.com/aspnet/AspNetWebStack',
  'azure azure-libraries-for-net':
    'https://github.com/Azure/azure-libraries-for-net',
  'azure azure-storage-net': 'https://github.com/Azure/azure-storage-net',
  'azure azure-sdk-for-net': 'https://github.com/Azure/azure-sdk-for-net',
  framework7: 'https://github.com/framework7io/framework7',
  emotion: 'https://github.com/emotion-js/emotion',
  nextjs: 'https://github.com/zeit/next.js',
  picasso: 'https://github.com/qlik-oss/picasso.js',
  clarity: 'https://github.com/vmware/clarity',
  infrastructure: 'https://github.com/instructure/instructure-ui',
  webdriverio: 'https://github.com/webdriverio/webdriverio',
  'reactivestack-cookies': 'https://github.com/reactivestack/cookies',
  router5: 'https://github.com/router5/router5',
  lerna: 'https://github.com/lerna/lerna',
  'electron-forge': 'https://github.com/electron-userland/electron-forge',
  'typescript-eslint': 'https://github.com/typescript-eslint/typescript-eslint',
  graphqlcodegenerator: [
    'https://github.com/dotansimha/graphql-code-generator',
    'https://github.com/dotansimha/graphql-codegen',
  ],
  ngrx: 'https://github.com/ngrx/',
  nrwl: 'https://github.com/nrwl/',
  storybook: 'https://github.com/storybooks',
  fimbullinter: 'https://github.com/fimbullinter/wotan',
  accounts: 'https://github.com/accounts-js/accounts',
  angular: 'https://github.com/angular/angular',
  awsappsync: 'https://github.com/awslabs/aws-mobile-appsync-sdk-js',
  apolloclient: 'https://github.com/apollographql/apollo-client',
  apollolink: 'https://github.com/apollographql/apollo-link',
  babel: 'https://github.com/babel/babel',
  baset: 'https://github.com/igmat/baset',
  emotion: 'https://github.com/emotion-js/emotion',
  jest: 'https://github.com/facebook/jest',
  pouchdb: 'https://github.com/pouchdb/pouchdb',
  react: 'https://github.com/facebook/react',
  reactrouter: 'https://github.com/ReactTraining/react-router',
  mui: 'https://github.com/mui-org/material-ui',
  gatsby: 'https://github.com/gatsbyjs/gatsby',
  material: 'https://github.com/material-components/material-components-web',
  'graphql-modules': 'https://github.com/Urigo/graphql-modules',
  vue: 'https://github.com/vuejs/vue',
  'vue-cli': 'https://github.com/vuejs/vue-cli',
  'aws-cdk': 'https://github.com/aws/aws-cdk',
  'mdc-react': 'material-components/material-components-web-react',
  nuxtjs: 'https://github.com/nuxt/nuxt.js',
  remark: 'https://github.com/remarkjs/remark',
  vuepress: 'https://github.com/vuejs/vuepress',
};

const patternGroups = {
  wordpress: '^@wordpress/',
  angularmaterial: ['^@angular/material', '^@angular/cdk'],
  'aws-java-sdk': '^com.amazonaws:aws-java-sdk-',
};

async function go() {
  const config = {};
  for (const [name, value] of Object.entries(repoGroups)) {
    config[name] = {
      description: `${name} monorepo`,
      sourceUrlPrefixes: is.array(value) ? value : [value],
    };
  }
  for (const [name, value] of Object.entries(patternGroups)) {
    config[name] = {
      description: `${name} monorepo`,
      packagePatterns: is.array(value) ? value : [value],
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
