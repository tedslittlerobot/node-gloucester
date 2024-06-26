import {env} from 'node:process';
import {defaultVariableSource, verbosityLevels} from './constants.js';
import {type EnvironmentVariableSource, type Verbosity} from './types.js';
import {environmentVariableName, getVerbosityFromEnvironmentVariables} from './utils.js';
import GloucesterComparator from './comparator.class.js';

export default class GloucesterEvaluator {
	constructor(public verbosity: Verbosity) {}

	get level(): number {
		return verbosityLevels[this.verbosity];
	}

	get is() {
		return new GloucesterComparator(this.verbosity);
	}

	setVerbosityFromEnvironmentVariable(sources: EnvironmentVariableSource | EnvironmentVariableSource[] = defaultVariableSource) {
		for (const source of Array.isArray(sources) ? sources : [sources]) {
			const value = getVerbosityFromEnvironmentVariables(
				env as Record<string, string>,
				environmentVariableName(source),
			);

			if (value) {
				this.verbosity = value;
				return;
			}
		}
	}

	levelForVerbosity(verbosity: Verbosity) {
		return verbosityLevels[verbosity];
	}
}
