# monorepo presets

This directory contains presets for defining monorepo groups.

These can be referenced using the `monorepo:` prefix, e.g. `monorepo:babel`.

In most cases, dependencies from the same monorepo should be upgraded at the same time (in same branch/PR) and these preset configs are used to group them together.

The goal of these lists and patterns is to define packages from within the monorepo and _not_ any related packages. e.g. we want all the packages from the `facebook/react` repository and not to include just anything with `react` in its name, like `react-unofficial-videos`.

## Contributing

Do not edit the `package.json` directly. Instead, add entries to `generate.js` and then run `node generate.js` to update the `package.json` from there. Often there may be other updates included since the last time it was generated - if so then you may want to run `generate.js` once on its own and commit and that and then push your own changes afterwards in a second commit. Please also bump the `package.json` version too.
