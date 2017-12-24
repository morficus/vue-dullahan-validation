import list from '../src/validators/list';
import test from 'ava';

test('should match when given an Array', t => {
    const validation = list({}, ['A', 'B', 'C']);

    t.true(validation.isValid);
});

test('should match when given an empty Array', t => {
    const validation = list({}, []);

    t.true(validation.isValid);
});

test('should not match if given a String', t => {
    const validation = list({}, 'not a list');

    t.false(validation.isValid);
});

test('should not match if given a Number', t => {
    const validation = list({}, 1234);

    t.false(validation.isValid);
});

test('should not match if given an Object', t => {
    const validation = list({}, {key1: 'val1'});

    t.false(validation.isValid);
});
