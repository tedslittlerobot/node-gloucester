import {type Command} from 'commander';
import type GloucesterEvaluator from '../evaluator.class.js';

export default function setupCommanderAndGloucester(program: Command, gloucester: GloucesterEvaluator) {
	gloucester.setVerbosityFromEnvironmentVariable({prefix: program.name()});

	program
		.option('--quiet', 'Suppress output')
		.on('option:quiet', () => {
			gloucester.verbosity = 'quiet';
		})
		.option('-v, --verbose', 'Verbose Mode (Output debugging information)')
		.on('option:verbose', () => {
			gloucester.verbosity = 'verbose';
		})
		.option('-vv, --super-verbose', 'Super Verbose Mode (Output lots of debugging information)')
		.on('option:super-verbose', () => {
			gloucester.verbosity = 'superVerbose';
		})
		.option('-vvv, --ridiculously-verbose', 'Ridiculously Verbose Mode (Output lots of debugging information)')
		.on('option:super-verbose', () => {
			gloucester.verbosity = 'ridiculouslyVerbose';
		});

	return program;
}
