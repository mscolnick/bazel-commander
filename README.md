# Bazel commander

[![npm version](https://badgen.net/npm/v/bazel-commander)](https://npm.im/bazel-commander) [![npm downloads](https://badgen.net/npm/dm/bazel-commander)](https://npm.im/bazel-commander)

## Install

```bash
npm i bazel-commander
yarn add bazel-commander
```

## Usage

```ts
import { BazelApi } from 'bazel-commander';

BazelApi.build(['//foo/bar', '//baz:...']).sandboxDebug().execute();
```

## Development

- Package manager [pnpm](https://pnpm.js.org/), safe and fast
- Release with [semantic-release](https://npm.im/semantic-release)
- Bundle with [tsup](https://github.com/egoist/tsup)
- Test with [vitest](https://vitest.dev)

To skip CI (GitHub action), add `skip-ci` to commit message. To skip release, add `skip-release` to commit message.

## License

MIT &copy; [Myles Scolnick](https://github.com/sponsors/mscolnick)

```

```
