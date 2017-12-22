import numeric from '../src/validators/numeric';
import test from 'ava';

console.log('Numeric validation');

test('should NOT match when given a string of letters', t => {
    const validation = numeric({}, 'ABcdEFg');

    t.false(validation.isValid);
});

test('should match when given a number', t => {
    const validation = numeric({}, 8001);

    t.true(validation.isValid);
});

test('should NOT match when given a string that contains numbers', t => {
    const validation = numeric({}, 'ABC123');

    t.false(validation.isValid);
});


test('should return a custom error msg when validations fails', t => {
    const myErrorMsg = 'this is my msg',
        validation = numeric({message: myErrorMsg}, 'ABC');

    t.false(validation.isValid);
    t.is(validation.errorMessage, myErrorMsg);
});

test('should not return a custom error msg when validations fails', t => {
    const myErrorMsg = 'this is my msg',
        validation = numeric({message: myErrorMsg}, 123);

    t.true(validation.isValid);
    t.is(validation.errorMessage, '');
});
