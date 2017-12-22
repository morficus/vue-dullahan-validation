import required from '../src/validators/required';
import test from 'ava';

console.log('Required validation');

test('should NOT match when given null', t => {
    const validation = required(true, null);

    t.false(validation.isValid);
});

test('should NOT match when given undefined', t => {
    const validation = required(true, undefined);

    t.false(validation.isValid);
});

test('should NOT match when given an empty string', t => {
    const validation = required(true, '');

    t.false(validation.isValid);
});

test('should NOT match when given an empty array', t => {
    const validation = required(true, []);

    t.false(validation.isValid);
});

test('should match when given a number of any value', t => {
    const validation1 = required(true, 200),
        validation2 = required(true, 0),
        validation3 = required(true, -200);

    t.true(validation1.isValid);
    t.true(validation2.isValid);
    t.true(validation3.isValid);
});


test('should match when given non-empty string', t => {
    const validation = required(true, 'ABC123');

    t.true(validation.isValid);
});

test('should match when given non-empty array', t => {
    const validation = required(true, [1, 2, 3]);

    t.true(validation.isValid);
});

test('should match when given a boolean', t => {
    const validation1 = required(true, true),
        validation2 = required(true, false);

    t.true(validation1.isValid);
    t.true(validation2.isValid);
});

test('should return a custom error msg when validations fails', t => {
    const myErrorMsg = 'this is my msg',
        validation = required({message: myErrorMsg}, '');

    t.false(validation.isValid);
    t.is(validation.errorMessage, myErrorMsg);
});

test('should not return a custom error msg when validations fails', t => {
    const myErrorMsg = 'this is my msg',
        validation = required({message: myErrorMsg}, 'ABC123');

    t.true(validation.isValid);
    t.is(validation.errorMessage, '');
});

test('should not match if given an empty object', t => {
    const validation = required({}, {});

    t.false(validation.isValid);
});

test('should not match if given an empty with a key but no value', t => {
    const validation = required({}, {key1: ''});

    t.false(validation.isValid);
});

test('should match if given an object with non-falsy values', t => {
    const validation = required({}, {key1: 123, key2: 'abc'});

    t.true(validation.isValid);
});
