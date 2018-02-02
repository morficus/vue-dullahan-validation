import alphanumeric from '../../src/validators/alphanumeric';
import test from 'ava';

test('should match when given a string of letters', t => {
    const validation = alphanumeric({}, 'ABcdEFg');

    t.true(validation.isValid);
});

test('should match when given a string that contains spaces', t => {
    const validation = alphanumeric({}, 'ABC XYZ');

    t.true(validation.isValid);
});

test('should match when given a number', t => {
    const validation = alphanumeric({}, 8001);

    t.true(validation.isValid);
});

test('should match when given a string that contains numbers', t => {
    const validation = alphanumeric({}, 'ABC123');

    t.true(validation.isValid);
});

test('should NOT match when given a string that contains special characters', t => {
    const validation = alphanumeric({}, 'A-B-C');

    t.false(validation.isValid);
});

test('should return a custom error msg when validations fails', t => {
    const myErrorMsg = 'this is my msg',
        validation = alphanumeric({message: myErrorMsg}, '1-2-3');

    t.false(validation.isValid);
    t.is(validation.errorMessage, myErrorMsg);
});

test('should NOT return any message when validation passes', t => {
    const myErrorMsg = 'this is my msg',
        validation = alphanumeric({message: myErrorMsg}, 'ABC123');

    t.true(validation.isValid);
    t.falsy(validation.errorMessage);
});
