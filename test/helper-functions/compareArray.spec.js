import compareArray from '../../src/helpers/compareArray';
import test from 'ava';

test('should not fail if null is passed in', t => {
    const validation1 = compareArray([], null),
        validation2 = compareArray(null, []);

    t.false(validation1);
    t.false(validation2);
});

test('should not fail if undefined is passed in', t => {
    const validation1 = compareArray([], undefined),
        validation2 = compareArray(undefined, []);

    t.false(validation1);
    t.false(validation2);
});

test('should match arrays that are the same', t => {
    const obj1 = [1, 2, 3, 4, 5],
        obj2 = [1, 2, 3, 4, 5],
        validation = compareArray(obj1, obj2);

    t.true(validation);
});

test('should not match arrays that have same values in different orders', t => {
    const obj1 = [1, 2, 3, 4, 5],
        obj2 = [5, 4, 3, 2, 1],
        validation = compareArray(obj1, obj2);

    t.false(validation);
});
