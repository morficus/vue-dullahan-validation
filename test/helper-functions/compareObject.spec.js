import compareObject from '../../src/helpers/compareObject';
import test from 'ava';

test('should not fail if null is passed in', t => {
    const validation1 = compareObject({}, null),
        validation2 = compareObject(null, {});

    t.false(validation1);
    t.false(validation2);
});

test('should not fail if undefined is passed in', t => {
    const validation1 = compareObject({}, undefined),
        validation2 = compareObject(undefined, {});

    t.false(validation1);
    t.false(validation2);
});

test('should match object that are the same', t => {
    const obj1 = {a: 1, b: 2, c: 3},
        obj2 = {a: 1, b: 2, c: 3},
        validation = compareObject(obj1, obj2);

    t.true(validation);
});

test('should match object that have keys in different order', t => {
    const obj1 = {a: 1, b: 2, c: 3},
        obj2 = {c: 3, b: 2, a: 1},
        validation = compareObject(obj1, obj2);

    t.true(validation);
});

test('should not match object that have same keys but different values', t => {
    const obj1 = {a: 1, b: 2, c: 3},
        obj2 = {a: 10, b: 20, c: 30},
        validation = compareObject(obj1, obj2);

    t.false(validation);
});
