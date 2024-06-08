// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava';
import {environmentVariableName, getVerbosityFromEnvironmentVariables} from './utils.js';

test('environmentVariableName variable', t => {
	t.is(
		environmentVariableName({variable: 'foo'}),
		'foo',
	);
});

test('environmentVariableName prefix', t => {
	t.is(
		environmentVariableName({prefix: 'foo'}),
		'FOO_VERBOSITY',
	);
});

test('getVerbosityFromEnvironmentVariables matches', t => {
	t.is(
		getVerbosityFromEnvironmentVariables({foo: 'ridiculouslyVerbose', bar: 'bar'}, 'foo'),
		'ridiculouslyVerbose',
	);
});

test('getVerbosityFromEnvironmentVariables variable does not exist', t => {
	t.is(
		getVerbosityFromEnvironmentVariables({foo: 'foo', bar: 'bar'}, 'baz'),
		undefined,
	);
});

test('getVerbosityFromEnvironmentVariables invalid verbosity', t => {
	t.throws(
		() => getVerbosityFromEnvironmentVariables({foo: 'foo', bar: 'bar'}, 'foo'),
		{message: 'Invalid Verbosity value found from Environment Variable foo=foo'},
	);
});
