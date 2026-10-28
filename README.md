# Gilded Rose

This is the Gilded Rose kata in TypeScript. The implementation in
`app/gilded-rose.ts` is the starting point for the refactoring exercise.

## Getting started

Use Node.js 24 and Bun 1.3.14 or later. The supported Node.js versions are
listed in `package.json`; `.node-version` pins the development version.

Install the locked dependencies:

```sh
bun install --frozen-lockfile
```

## Run the unit tests

Jest, Mocha, and Vitest are available. Choose whichever framework you prefer;
Vitest is the default:

```sh
bun run test
bun run test:watch
bun run test:coverage
```

The starter unit tests deliberately expect `fixme` instead of `foo` and fail.
This is part of the exercise. Jest and Vitest also include approval tests;
their snapshots are created on the first local run. Review the snapshots
before using them as a baseline for refactoring.

To use Jest:

```sh
bun run test:jest
bun run test:jest:watch
```

To use Mocha with Chai:

```sh
bun run test:mocha
```

The existing Vitest command runs with coverage and watches locally. Add `--run`
for a single run:

```sh
bun run test:vitest
bun run test:vitest --run
```

Coverage reports are written to `coverage/jest`, `coverage/mocha`, or
`coverage/vitest` so the frameworks do not overwrite each other's reports.

Use `bun run` for these scripts. `bun test` invokes Bun's own test runner,
which is not configured for this kata.

## Type checking and compilation

The test runners transform TypeScript without type checking. Check the
application, fixtures, and all three test suites separately with:

```sh
bun run typecheck
```

Compile the application and TextTest fixture to `dist`:

```sh
bun run compile
node dist/test/golden-master-text-test.js 10
```

`bun run clean` removes compiled output and coverage reports.

## Run the TextTest fixture

Run the fixture directly, optionally specifying the number of days:

```sh
bun run test:golden
bun run test:golden 10
```

The fixture uses `tsx` with Node.js; no global TypeScript runner is needed.
Make sure it works in a terminal before setting up TextTest.

## Run the TextTest approval test

Follow the [TextTest Readme](../texttests/README.md) to install and configure
TextTest. In [config.gr](../texttests/config.gr), point the executable at this
directory's wrapper and select your Python interpreter:

```text
executable:${TEXTTEST_HOME}/TypeScript/texttest_rig.py
interpreter:python3
```

The wrapper runs `bun run test:golden` from the TypeScript directory and
forwards the fixture's exit status. Ensure Bun and Node.js are on TextTest's
`PATH` and `TEXTTEST_HOME` points to the repository root.
