# Renovate Presets

## Deprecation Warning

This repository is no longer used to host/publish Renovate's built-in presets. They are instead included within the main Renovate repository: https://github.com/renovatebot/renovate/tree/master/lib/config/presets/internal

## Old Content

This repository hosts all of Renovate's "built-in" presets. Renovate pulls from this repo's `master` branch at runtime whenever a config references presets with any of the following prefixes:

- None: e.g. `:preserveSemverRanges`
- Default: e.g. `default:preserveSemverRanges` (None is an alias to Default)
- Docker: e.g. `docker:disable`
- Group: e.g. `group:monorepos`
- Helpers: e.g. `helpers:followTypescriptNext`
- Monorepo: e.g. `monorepo:angular`
- Packages: e.g. `packages:apollographql`
- Preview: e.g. `preview:buildkite`
- Schedule: e.g. `schedule:daily`

## Contributing

1. Fork and clone the repository
2. Edit one or more files in `src/`. Be sure to include the `description` field if relevant.
3. Run `yarn build` then `yarn test`
4. Commit your changes including `presets.json`, push to GitHub, and raise a PR

Once PRs are committed to `master`, they are effectively "live" - there is no publish step.

## Examples

If you have identified a "monorepo" that's missing, add it to `src/monorepo.js`. A monorepo definition as well as a group will be automatically added by `yarn build`.

If there is some other non-monorepo group of packages you think should be updated together, then you can contribute them directly to `src/group.js`.

If you think there is any config you repeat frequently that others could benefit from, add it to `src/default.js`.
