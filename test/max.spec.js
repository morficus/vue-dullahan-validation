import max from '../src/validators/max';
import test from 'ava';

// test numeric values
test('should pass if given number is lower than the given max', t => {
    const validation = max(100, 99);

    t.true(validation.isValid);
});

test('should fail if given number is higher than the given max', t => {
    const validation = max(100, 101);

    t.false(validation.isValid);
});

test('should pass if the given number is equal to the given max', t => {
    const validation = max(100, 100);

    t.true(validation.isValid);
});


// test string values
test('should pass if the string length is less than the given max', t => {
    const validation = max(100, 'this is less than 100');

    t.true(validation.isValid);
});

test('should not pass if the string length is less than the given max', t => {
    const validation = max(10, 'this is more than 10');

    t.false(validation.isValid);
});

test('should pass if the string length is the same as the given max', t => {
    const validation = max(10, 'this is 10');

    t.true(validation.isValid);
});

// testing array length
test('should pass if the Array length is below the max', t => {
    const validation = max(100, [1, 2, 3, 4]);

    t.true(validation.isValid);
});

test('should fail if the Array length is below the max', t => {
    const validation = max(2, [1, 2, 3, 4]);

    t.false(validation.isValid);
});

test('should pass if the array length is the same as the max', t => {
    const validation = max(2, [1, 2]);

    t.true(validation.isValid);
});


test('should not pass if given an object', t => {
    const validation = max(10, {});

    t.false(validation.isValid);
});
