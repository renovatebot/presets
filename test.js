const fs = require('fs-extra');
const { validateConfig } = require('renovate/dist/config/validation');
const { massageConfig } = require('renovate/dist/config/massage');

const presetsJson = JSON.parse(fs.readFileSync('presets.json', 'utf8'));

let returnVal = 0;

async function validate(desc, config, isPreset = false) {
  const res = await validateConfig(massageConfig(config), isPreset);
  if (res.errors.length) {
    console.log(
      `${desc} contains errors:\n\n${JSON.stringify(res.errors, null, 2)}`
    );
    returnVal = 1;
  }
  if (res.warnings.length) {
    console.log(
      `${desc} contains warnings:\n\n${JSON.stringify(res.warnings, null, 2)}`
    );
    returnVal = 1;
  }
}

(async () => {
  try {
    for (const [category, presets] of Object.entries(presetsJson)) {
      for (const [subcategory, preset] of Object.entries(presets)) {
        const name = category + ':' + subcategory;
        if (subcategory != 'description') {
          console.log('Validating ' + name);
          try {
            await validate(name, preset, true);
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  } catch (err) {
    returnVal = 1;
    console.log(err);
  }
  if (returnVal !== 0) {
    process.exit(returnVal);
  }
  console.log('OK');
})();
