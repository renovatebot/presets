# monorepo presets

This directory contains presets for defining monorepo groups.

In most cases, dependencies from the same monorepo should be upgraded at the same time (in same branch/PR) and these preset configs are used to group them together.

They can be referenced using the `monorepo:` prefix, e.g. `monorepo:babel`.
