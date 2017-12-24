import alphabetic from '../src/validators/alphabetic';
import test from 'ava';

test('should match when given a string of letters', t => {
    const validation = alphabetic({}, 'ABcdEFg');
    t.true(validation.isValid);
});

test('should match when given a string that contains spaces', t => {
    const validation = alphabetic({}, 'ABC XYZ');
    t.true(validation.isValid);
});

test('should NOT match when given a number', t => {
    const validation = alphabetic({}, 8001);
    t.false(validation.isValid);
});

test('should NOT match when given a string that contains numbers', t => {
    const validation = alphabetic({}, 'ABC123');
    t.false(validation.isValid);
});

test('should NOT match when given a string that contains special characters', t => {
    const validation = alphabetic({}, 'A-B-C');
    t.false(validation.isValid);
});

test('should return a custom error msg when validations fails', t => {
    const myErrorMsg = 'this is my msg',
        validation = alphabetic({message: myErrorMsg}, '123');

    t.false(validation.isValid);
    t.is(validation.errorMessage, myErrorMsg);
});

test('should NOT return any message when validation passes', t => {
    const myErrorMsg = 'this is my msg',
        validation = alphabetic({message: myErrorMsg}, 'ABC');

    t.true(validation.isValid);
    t.falsy(validation.errorMessage);
});
