module.exports = {
  all: {
    description: 'Group all updates together',
    groupName: 'all',
    lockFileMaintenance: {
      enabled: false,
    },
  },
  linters: {
    extends: 'packages:linters',
    groupName: 'linters',
  },
};
