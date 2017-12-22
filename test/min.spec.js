import min from '../src/validators/min';
import test from 'ava';

console.log('Min validation');

// test numeric values
test('should not pass if given a number that is lower than the given min', t => {
    const validation = min(100, 99);

    t.false(validation.isValid);
});

test('should pass if given a number that is higher than the given min', t => {
    const validation = min(100, 101);

    t.true(validation.isValid);
});

test('should pass if given a number that is equal to the given min', t => {
    const validation = min(100, 100);

    t.true(validation.isValid);
});


// test strings
test('should pass if given a string string with length  above the min', t => {
    const validation = min(10, 'this is more than 10');

    t.true(validation.isValid);
});

test('should not pass if given a string string with length  below the min', t => {
    const validation = min(100, 'this is less than 100');

    t.false(validation.isValid);
});

test('should pass if given a string string with length equal to the min', t => {
    const validation = min(10, 'this is 10');

    t.true(validation.isValid);
});

test('should not pass if given an empty string', t => {
    const validation = min(100, '');

    t.false(validation.isValid);
});


// test arrays and array-equivalents
test('should fail if given an Array with length below the min', t => {
    const validation = min(100, [1, 2, 3, 4]);

    t.false(validation.isValid);
});

test('should pass if the array length is higher than the min', t => {
    const validation = min(2, [1, 2, 3, 4]);

    t.true(validation.isValid);
});

test('should pass if the array length is the same as the min', t => {
    const validation = min(2, [1, 2]);

    t.true(validation.isValid);
});

test('should not pass if given an object', t => {
    const validation = min(10, {});

    t.false(validation.isValid);
});
