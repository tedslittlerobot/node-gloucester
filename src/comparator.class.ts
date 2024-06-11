import {verbosityLevels} from './constants.js';
import {type Verbosity} from './types.js';

export default class GloucesterComparator {
	private readonly level: number;

	constructor(private readonly verbosity: Verbosity) {
		this.level = verbosityLevels[this.verbosity];
	}

	get quiet() {
		return this.verbosity === 'quiet';
	}

	get normal() {
		return this.verbosity === 'normal';
	}

	get verbose() {
		return this.verbosity === 'verbose';
	}

	get superVerbose() {
		return this.verbosity === 'superVerbose';
	}

	get ridiculouslyVerbose() {
		return this.verbosity === 'ridiculouslyVerbose';
	}

	eq(verbosity: Verbosity) {
		return this.verbosity === verbosity;
	}

	gt(verbosity: Verbosity) {
		return this.level > verbosityLevels[verbosity];
	}

	gte(verbosity: Verbosity) {
		return this.level >= verbosityLevels[verbosity];
	}

	lt(verbosity: Verbosity) {
		return this.level < verbosityLevels[verbosity];
	}

	lte(verbosity: Verbosity) {
		return this.level <= verbosityLevels[verbosity];
	}
}
