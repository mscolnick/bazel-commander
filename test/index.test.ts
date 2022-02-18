import { test, vitest, expect } from 'vitest';
import { BazelCommander } from '../src/BazelCommander';

const mockExec = vitest.fn().mockResolvedValue(() => {
  return {
    stdout: 'stdout',
    stderr: 'stderr',
  };
});

const Api = new BazelCommander(mockExec);

test('snapshots', () => {
  Api.run('//foo/bar:script').sandboxDebug().execute();
  expect(mockExec.mock.calls[0][0]).toMatchInlineSnapshot('"bazel run --sandbox_debug -- //foo/bar:script"');

  Api.build(['//foo/bar', '//baz:...']).sandboxDebug().execute();
  expect(mockExec.mock.calls[1][0]).toMatchInlineSnapshot('"bazel build --sandbox_debug //foo/bar //baz:..."');

  Api.test('//foo/bar').sandboxDebug().testOutput('errors').execute();
  expect(mockExec.mock.calls[2][0]).toMatchInlineSnapshot(
    '"bazel test --sandbox_debug --test_output=errors //foo/bar"'
  );
});
