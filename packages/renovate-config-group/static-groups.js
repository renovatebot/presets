module.exports = {
  all: {
    description: 'Group all updates together',
    groupName: 'all',
    packageRules: [
      {
        packagePatterns: ['*'],
        groupName: 'all',
      },
    ],
    lockFileMaintenance: {
      enabled: false,
    },
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
  linters: {
    extends: 'packages:linters',
    groupName: 'linters',
  },
};
