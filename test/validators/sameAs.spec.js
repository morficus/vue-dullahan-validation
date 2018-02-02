import sameAs from '../../src/validators/sameAs';
import test from 'ava';

test('should match two identical strings', t => {
    const data = {
            sampleValue: 'hello',
            targetValue: 'hello'
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should NOT match two different strings', t => {
    const data = {
            sampleValue: 'hello',
            targetValue: 'goodbye'
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match things of different types', t => {
    const data = {
            sampleValue: 'this is a string',
            targetValue: 8002
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should match two identical array of strings', t => {
    const data = {
            sampleValue: ['val1', 'val2', 'val3'],
            targetValue: ['val1', 'val2', 'val3']
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should match two identical array of arrays', t => {
    const data = {
            sampleValue: [['val1'], ['val2', 'val3'], ['valA', 'valB', 'valC']],
            targetValue: [['val1'], ['val2', 'val3'], ['valA', 'valB', 'valC']]
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should NOT match two different array of arrays of different lengths (1)', t => {
    const data = {
            sampleValue: [['val1'], ['val2', 'val3'], ['valA', 'valB', 'valC']],
            targetValue: [['val1'], ['val2', 'val3']]
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match two different array of arrays of different lengths (2)', t => {
    const data = {
            sampleValue: [['val1'], ['val2', 'val3']],
            targetValue: [['val1'], ['val2', 'val3'], ['valA', 'valB', 'valC']]
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match two different array of arrays', t => {
    const data = {
            sampleValue: [['val1'], ['val2', 'val3'], ['valA', 'valB', 'valC']],
            targetValue: [['val1'], ['val2', 'val3'], ['valA', 'valB']]
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should not match if given an Array and not an Array', t => {
    const data = {
            sampleValue: ['val1', 'val2', 'val3'],
            targetValue: 'not an array'
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match two different array of strings', t => {
    const data = {
            sampleValue: ['val1', 'val2', 'val3'],
            targetValue: ['val0', 'val2', 'val3']
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match two Arrays of different lengths', t => {
    const data = {
            sampleValue: ['val1', 'val2', 'val3'],
            targetValue: ['val1', 'val2']
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});


test('should match two identical objects', t => {
    const data = {
            sampleValue: {
                key1: 'val1',
                key2: 'val2'
            },
            targetValue: {
                key1: 'val1',
                key2: 'val2'
            }
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should NOT match two different objects', t => {
    const data = {
            sampleValue: {
                key0: 'val0',
                key2: 'val2'
            },
            targetValue: {
                key1: 'val1',
                key2: 'val2'
            }
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should match an Array of matching Objects', t => {
    const data = {
            sampleValue: [{key1: 'val1', key2: 'val2'}, {key3: 'val3', key4: 'val4'}],
            targetValue: [{key1: 'val1', key2: 'val2'}, {key3: 'val3', key4: 'val4'}]
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should NOT match an Array of non-matching Objects', t => {
    const data = {
            sampleValue: [{key0: 'val0', key2: 'val2'}, {key3: 'val3', key4: 'val4'}],
            targetValue: [{key1: 'val1', key2: 'val2'}, {key3: 'val3', key4: 'val4'}]
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should match an Object with Arrays as its values', t => {
    const data = {
            sampleValue: {
                key1: ['A', 'B', 'C', 'D']
            },
            targetValue: {
                key1: ['A', 'B', 'C', 'D']
            }
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should NOT match an Object with different Arrays as its values', t => {
    const data = {
            sampleValue: {
                key1: ['A', 'B', 'C', 'D', 'E']
            },
            targetValue: {
                key1: ['A', 'B', 'C', 'D']
            }
        },
        validation = sameAs('targetValue', data.sampleValue, data);

    t.false(validation.isValid);
});
