import {type EnvironmentVariableSource, type Verbosity} from './types.js';

export const verbosityLevels: Record<Verbosity, number> = {
	quiet: 0,
	normal: 1,
	verbose: 2,
	superVerbose: 3,
	ridiculouslyVerbose: 4,
} as const;

export const defaultVariableSource: EnvironmentVariableSource = {variable: 'VERBOSITY'};
