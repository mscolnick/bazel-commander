export interface IBazelCommander {
  /**
   * Usage: bazel run <options> -- <binary target> <flags to binary>
   */
  run(target: string): IBazelCommanderRun;
  run(target: string, flagsToBinary: string[]): IBazelCommanderRun;
  /**
   * Usage: bazel build <options> <targets>
   */
  build(target: string): IBazelCommanderBuild;
  build(targets: string[]): IBazelCommanderBuild;
  /**
   * bazel test <options> <test-targets>
   */
  test(target: string): IBazelCommanderTest;
  test(targets: string[]): IBazelCommanderTest;

  /**
   * Usage: bazel query <options> <query-expression>
   */
  query(): IBazelCommanderQuery;
}

export interface IBazelCommanderRun extends IBazelCommon {}

export interface IBazelCommanderBuild extends IBazelCommon {}

export interface IBazelCommanderTest extends IBazelCommon {
  /**
   * @param default summary
   */
  testOutput(output: 'summary' | 'errors' | 'all' | 'streamed'): IBazelCommanderTest;
}

export interface IBazelCommanderQuery extends IBazelCommon {
  deps(target: string): IBazelCommanderQuery;
  kind(): Promise<string>;
}

export interface IBazelCommon {
  sandboxDebug(): this;
  runUnder(dir: string): this;
  with(flag: string): this;
  execute(): Promise<string>;
}
