import { execFileSync } from 'node:child_process';

describe('Gilded Rose Approval', () => {
  it('should thirtyDays', () => {
    const consoleOutput = execFileSync(
      process.execPath,
      ['--import', 'tsx', 'test/golden-master-text-test.ts', '30'],
      { encoding: 'utf-8' }
    );

    expect(consoleOutput).toMatchSnapshot();
  });
});
