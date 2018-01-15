# monorepo presets

This directory contains presets for defining monorepo groups.

These can be referenced using the `monorepo:` prefix, e.g. `monorepo:babel`.

In most cases, dependencies from the same monorepo should be upgraded at the same time (in same branch/PR) and these preset configs are used to group them together.

The goal of these lists and patterns is to define packages from within the monorepo and *not* any related packages. e.g. we want all the packages from the `facebook/react` repository and not to include just anything with `react` in its name, like `react-unofficial-videos`.

## Contributing

Do not edit the `package.json` directly. Instead, add entries to `generate.js`.
