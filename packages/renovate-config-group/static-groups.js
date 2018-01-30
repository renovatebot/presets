module.exports = {
  all: {
    description: 'Group all updates together',
    groupName: 'all',
    lockFileMaintenance: {
      enabled: false,
    },
  },
  definitelyTyped: {
    groupName: 'definitelyTyped',
    packagePatterns: ['^@types/'],
  },
  linters: {
    extends: 'packages:linters',
    groupName: 'linters',
  },
};
