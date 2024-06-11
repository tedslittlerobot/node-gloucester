Gloucester
==========

A verbosity detection and comparison library with integration with Commander JS.

Named after Richard, Duke of Gloucester - the Shakespearian character with the longest monolog.

## Installation

```bash
npm install gloucester
```

## Verbosity

Typically, a CLI application will be in a single state of verbosity at any given time.

There are five verbosity levels:

- `quiet`
- `normal`
- `verbose`
- `superVerbose`
- `ridiculouslyVerbose`

The default, or "normal" verbosity level is `normal`. A user of a CLI application can typcally request more or less output through the use of either environment variables or flags (such as the `-v` flag). It is then up to the CLI application to determine what to output.

## Basic Usage

Starting very simply, you can retrieve and set verbosity through a globally available singleton instance of the `GloucesterEvaluator` class:

```typescript
import gloucester from 'gloucester';

console.info(gloucester.verbosity); // normal
gloucester.verbosity = 'verbose';
console.info(gloucester.verbosity); // verbose
```

Then, one might want to output some details based on a comparison of verbosity levels:

```typescript
if (gloucester.is.quiet) {
	return;
}

if (gloucester.is.normal) {
	console.info('Here is a normal level of detail');
}

if (gloucester.is.gte('verbose')) {
	stderr.write('Here are some details');
}

if (gloucester.is.gte('superVerbose')) {
	stderr.write('Here are some finickity tiny little details');
}
```

```typescript
// Checks against exact verbosity levels

gloucester.is.quiet;
gloucester.is.normal;
gloucester.is.verbose;
gloucester.is.superVerbose;
gloucester.is.ridiculouslyVerbose;

gloucester.is.gt('normal'); // greater than
gloucester.is.gte('normal'); // greater than or equal to
gloucester.is.lt('normal'); // less than
gloucester.is.lte('normal'); // less than or equal to
```

## Getting from Environment Variables

There is a helper function to get the current verbosity from an environment variable:

```typescript
// This will look for an environment variable called VERBOSITY
gloucester.setVerbosityFromEnvironmentVariable();

// This will look for an environment variable called APP_NAME_VERBOSITY
gloucester.setVerbosityFromEnvironmentVariable({ prefix: 'app_name' });

// This will look for an environment variable with a completely custom name called MONKEY
gloucester.setVerbosityFromEnvironmentVariable({ variable: 'monkey' });
```

## Setting verbosity in CommanderJS

If you are using [CommanderJS](https://github.com/tj/commander.js), there is a helper function to set up commander.

This will set up the following flags as global flags in your CLI application which will set the verbosity in your `gloucester` instance:

- `--quiet`
- `-v | --verbose`
- `-vv | --super-verbose`
- `-vvv | --ridiculously-verbose`

It will fall back to using the `APP_NAME_VERBOSITY` environment variable if no flags are used (where APP_NAME is your CommanderJS `.name()` - in the example below the variable would be `MY_CLI_APP_VERBOSITY`).

```typescript
import { Command } from 'commander';
import gloucester from 'gloucester';
import setupCommanderAndGloucester from 'gloucester/lib/integrations/commander';

const program = new Command();

program.name('my-cli-app');

setupCommanderAndGloucester(program, gloucester);
```
