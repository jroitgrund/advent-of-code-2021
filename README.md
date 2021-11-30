# advent-of-code-2021

This uses https://yarnpkg.com/features/zero-installs so you shouldn't need to ever run `yarn install`, the cache is part of the repo.

Puzzles are in `puzzles/01`, `puzzles/02`, etc. Each directory has 3 input files (one for jonathan, one for lewis, one for romain). Each directory also has a test input file, with the easy test case from the AoC website, and a test answer file, with the answers to that easy test case. Running unit tests checks that the test inputs work.

To output solutions, run `yarn solutions user [puzzle-number]`, where `user` must be `jonathan`, `lewis`, or `romain`, and `puzzle-number` optionally selects a single puzzle to print answers for.

CI runs unit tests, eslint and prettier, all of which you can also run locally with `yarn test`, `yarn check-lint` and `yarn check-prettier`.
