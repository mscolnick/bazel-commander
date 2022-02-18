import {
  IBazelCommander,
  IBazelCommanderBuild,
  IBazelCommanderQuery,
  IBazelCommanderRun,
  IBazelCommanderTest,
  IBazelCommon,
} from './api';
import { exec } from './exec';

export class BazelCommander implements IBazelCommander {
  constructor(private readonly execFnc: typeof exec) {}
  run(target: string, flagsToBinary: string[] = []): IBazelCommanderRun {
    return new BazelCommon(this.execFnc, (flags) => ['run', ...flags, '--', target, ...flagsToBinary]);
  }
  build(target: string | string[]): IBazelCommanderBuild {
    return new BazelCommon(this.execFnc, (flags) => ['build', ...flags, ...toArray(target)]);
  }
  test(target: string | string[]): IBazelCommanderTest {
    return new BazelCommanderTest(this.execFnc, (flags) => ['test', ...flags, ...toArray(target)]);
  }
  query(): IBazelCommanderQuery {
    throw new Error('Method not implemented.');
  }
}

class BazelCommon implements IBazelCommon {
  private flags: string[] = [];
  constructor(private readonly execFnc: typeof exec, private buildCommand: (flag: string[]) => string[]) {}

  sandboxDebug(): this {
    this.flags.push('--sandbox_debug');
    return this;
  }
  runUnder(dir: string): this {
    this.flags.push(`--run_under=${dir}`);
    return this;
  }
  with(flag: string) {
    this.flags.push(flag);
    return this;
  }
  async execute(): Promise<string> {
    const command = 'bazel ' + this.buildCommand(this.flags).join(' ');
    const { stdout, stderr } = await this.execFnc(command);
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  }
}

class BazelCommanderTest extends BazelCommon implements IBazelCommanderTest {
  testOutput(output: 'summary' | 'errors' | 'all' | 'streamed'): IBazelCommanderTest {
    this.with(`--test_output=${output}`);
    return this;
  }
}

function toArray(target: string | string[]): string[] {
  return Array.isArray(target) ? target : [target];
}
