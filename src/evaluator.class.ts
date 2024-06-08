import {env} from 'node:process';
import {defaultVariableSource, verbosityLevels} from './constants.js';
import {type EnvironmentVariableSource, type Verbosity} from './types.js';
import {environmentVariableName, getVerbosityFromEnvironmentVariables} from './utils.js';

export default class VerbosityEvaluator {
	constructor(public verbosity: Verbosity) {}

	get level(): number {
		return verbosityLevels[this.verbosity];
	}

	setVerbosityFromEnvironmentVariable(source: EnvironmentVariableSource = defaultVariableSource) {
		const value = getVerbosityFromEnvironmentVariables(
			env as Record<string, string>,
			environmentVariableName(source),
		);

		if (value) {
			this.verbosity = value;
		}
	}
}
