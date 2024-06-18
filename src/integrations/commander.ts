import {Option, type Command} from 'commander';
import type GloucesterEvaluator from '../evaluator.class.js';

export default function setupCommanderAndGloucester(program: Command, gloucester: GloucesterEvaluator) {
	gloucester.setVerbosityFromEnvironmentVariable([
		{prefix: program.name()},
		{variable: 'VERBOSITY'},
	]);

	program
		.addOption(
			new Option('--quiet', 'Suppress output')
				.conflicts([
					'verbose',
					'superVerbose',
					'ridiculouslyVerbose',
				]),
		)
		.addOption(
			new Option('-v, --verbose', 'Verbose Mode (Output debugging information)')
				.conflicts([
					'quiet',
					'superVerbose',
					'ridiculouslyVerbose',
				]),
		)
		.addOption(
			new Option('-vv, --super-verbose', 'Super Verbose Mode (Output lots of debugging information)')
				.conflicts([
					'quiet',
					'verbose',
					'ridiculouslyVerbose',
				]),
		)
		.addOption(
			new Option('-vvv, --ridiculously-verbose', 'Ridiculously Verbose Mode (Output lots of debugging information)')
				.conflicts([
					'quiet',
					'verbose',
					'superVerbose',
				]),
		)
		.hook('preAction', async command => {
			const options = command.opts();

			if (options.ridiculouslyVerbose === true) {
				gloucester.verbosity = 'ridiculouslyVerbose';
				return;
			}

			if (options.superVerbose === true) {
				gloucester.verbosity = 'superVerbose';
				return;
			}

			if (options.verbose === true) {
				gloucester.verbosity = 'verbose';
				return;
			}

			if (options.quiet === true) {
				gloucester.verbosity = 'quiet';
			}
		});

	return program;
}
