import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['test/vitest/**/*.{spec,test}.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['app/**/*.ts'],
      reportsDirectory: 'coverage/vitest',
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
