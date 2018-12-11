module.exports = {
  all: {
    description: 'Group all updates together',
    groupName: 'all dependencies',
    separateMajorMinor: false,
    groupSlug: 'all',
    packageRules: [
      {
        packagePatterns: ['*'],
        groupName: 'all dependencies',
        groupSlug: 'all',
      },
    ],
    lockFileMaintenance: {
      enabled: false,
    },
  },
  allNonMajor: {
    description: 'Group all minor and patch updates together',
    packageRules: [
      {
        packagePatterns: ['*'],
        minor: {
          groupName: 'all non-major dependencies',
          groupSlug: 'all-minor-patch',
        },
      },
    ],
  },
  recommended: {
    description:
      'Use curated list of recommended non-monorepo package groupings',
    extends: [
      'group:allApollographql',
      'group:fortawesome',
      'group:fusionjs',
      'group:polymer',
      'group:illuminate',
      'group:symfony',
      'group:socketio',
    ],
    ignoreDeps: [],
  },
  allApollographql: {
    description: 'Group all packages published by Apollo GraphQL together',
    packageRules: [
      {
        extends: 'packages:apollographql',
        groupName: 'Apollo GraphQL packages',
      },
    ],
  },
  definitelyTyped: {
    description: 'Group all @types packages together',
    packageRules: [
      {
        groupName: 'definitelyTyped',
        packagePatterns: ['^@types/'],
      },
    ],
  },
  fortawesome: {
    description: 'Group all packages by Font Awesome together',
    packageRules: [
      {
        groupName: 'Font Awesome',
        packagePatterns: ['^@fortawesome/'],
      },
    ],
  },
  fusionjs: {
    description: 'Fusion.js packages',
    packageNames: [
      'fusion-cli',
      'fusion-core',
      'fusion-test-utils',
      'fusion-tokens',
    ],
    packagePatterns: ['^fusion-plugin-*', '^fusion-react*', '^fusion-apollo*'],
  },
  illuminate: {
    description: 'Group PHP illuminate packages together',
    packageRules: [
      {
        packagePatterns: ['^illuminate/'],
        groupName: 'illuminate packages',
        groupSlug: 'illuminate',
      },
    ],
  },
  symfony: {
    description: 'Group PHP symfony packages together',
    packageRules: [
      {
        packagePatterns: ['^symfony/'],
        groupName: 'symfony packages',
        groupSlug: 'symfony',
      },
    ],
  },
  polymer: {
    description: 'Group all @polymer packages together',
    packageRules: [
      {
        groupName: 'polymer packages',
        packagePatterns: ['^@polymer/'],
      },
    ],
  },
  socketio: {
    description: 'Group socket.io packages',
    packageRules: [
      {
        groupName: 'socket.io packages',
        packagePatterns: ['^socket.io'],
      },
    ],
  },
  postcss: {
    description: 'Group postcss packages together',
    packageRules: [
      {
        extends: 'packages:postcss',
        groupName: 'postcss packages',
      },
    ],
  },
  linters: {
    description: 'Group various lint packages together',
    packageRules: [
      {
        extends: 'packages:linters',
        groupName: 'linters',
      },
    ],
  },
  jsUnitTest: {
    description: 'Group JS unit test packages together',
    packageRules: [
      {
        extends: 'packages:jsUnitTest',
        groupName: 'JS unit test packages',
      },
    ],
  },
  jsUnitTestNonMajor: {
    description: 'Group JS unit test packages together',
    packageRules: [
      {
        extends: 'packages:jsUnitTest',
        minor: {
          groupName: 'JS unit test packages',
        },
      },
    ],
  },
  unitTest: {
    description: 'Group all unit test packages together',
    packageRules: [
      {
        extends: 'packages:unitTest',
        groupName: 'unit test packages',
      },
    ],
  },
  unitTestNonMajor: {
    description: 'Group all unit test packages together',
    packageRules: [
      {
        extends: 'packages:unitTest',
        minor: {
          groupName: 'unit test packages',
        },
      },
    ],
  },
  jsTest: {
    description: 'Group JS test packages together',
    packageRules: [
      {
        extends: 'packages:jsTest',
        groupName: 'JS test packages',
      },
    ],
  },
  jsTestMonMajor: {
    description: 'Group non-major JS test package updates together',
    packageRules: [
      {
        extends: 'packages:jsTest',
        minor: {
          groupName: 'JS test packages',
        },
      },
    ],
  },
  test: {
    description: 'Group all test packages together',
    packageRules: [
      {
        extends: 'packages:test',
        groupName: 'test packages',
      },
    ],
  },
  testNonMajor: {
    description: 'Group all non-major test package updates together',
    packageRules: [
      {
        extends: 'packages:test',
        minor: {
          groupName: 'test packages',
        },
      },
    ],
  },
};
