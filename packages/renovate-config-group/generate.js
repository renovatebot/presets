const fs = require('fs');
const path = require('path');
const pJson = require('./package.json');
const staticGroups = require('./static-groups');
const monorepos = require('../renovate-config-monorepo/package.json')[
  'renovate-config'
];

async function go() {
  const config = { ...staticGroups };

  const monorepoNames = [];
  for (const monorepo of Object.keys(monorepos)) {
    const name = `${monorepo}Monorepo`;
    monorepoNames.push(`group:${name}`);
    config[name] = {
      packageRules: [
        {
          description: `Group packages from ${monorepo} monorepo together`,
          extends: `monorepo:${monorepo}`,
          groupName: `${monorepo} monorepo`,
        },
      ],
    };
  }
  config.monorepos = {
    description: 'Group known monorepo packages together',
    ignoreDeps: [],
    extends: monorepoNames,
  };

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
