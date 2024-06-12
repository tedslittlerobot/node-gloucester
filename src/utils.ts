import {verbosityLevels} from './constants.js';
import {type EnvironmentVariableSource, type Verbosity} from './types.js';

export function environmentVariableName(source: EnvironmentVariableSource): string {
	if ('variable' in source) {
		return source.variable;
	}

	if ('prefix' in source) {
		return `${source.prefix.replace('-', '_')}_VERBOSITY`.toUpperCase();
	}

	throw new Error('Invalid environment variable name source');
}

export function getVerbosityFromEnvironmentVariables(variables: Record<string, string>, key: string): Verbosity | undefined {
	const value = variables[key] as Verbosity;

	if (value === undefined) {
		return undefined;
	}

	if (verbosityLevels[value] === undefined) {
		throw new Error(`Invalid Verbosity value found from Environment Variable ${key}=${value}`);
	}

	return value;
}
