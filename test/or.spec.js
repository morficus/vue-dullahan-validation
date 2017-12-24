import or from '../src/validators/or';
import test from 'ava';

test('should match when both values are Strings', t => {
    const data = {
            sampleValue: 'hello',
            companionValue: 'goodbye'
        },

        validation = or('companionValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should match when both values are non-empty Arrays', t => {
    const data = {
            sampleValue: ['A', 'B', 'C'],
            companionValue: ['X', 'Y', 'Z']
        },

        validation = or('companionValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should match when both values areNumbers', t => {
    const data = {
            sampleValue: 55,
            companionValue: 0
        },

        validation = or('companionValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should match if one is an empty Array and the other is not', t => {
    const data = {
            sampleValue: [],
            companionValue: 100
        },

        validation = or('companionValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should match one is an empty String and the other is not', t => {
    const data = {
            sampleValue: '',
            companionValue: 100
        },

        validation = or('companionValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should match one is undefined and the other is not', t => {
    const data = {
            sampleValue: 'hello',
            companionValue: undefined
        },

        validation = or('companionValue', data.sampleValue, data);

    t.true(validation.isValid);
});

test('should NOT match if both are empty Arrays', t => {
    const data = {
            sampleValue: [],
            companionValue: []
        },

        validation = or('companionValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match if both are empty Strings', t => {
    const data = {
            sampleValue: '',
            companionValue: ''
        },

        validation = or('companionValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match if both are undefined', t => {
    const data = {
            sampleValue: undefined,
            companionValue: undefined
        },

        validation = or('companionValue', data.sampleValue, data);

    t.false(validation.isValid);
});

test('should NOT match if both are null', t => {
    const data = {
            sampleValue: null,
            companionValue: null
        },

        validation = or('companionValue', data.sampleValue, data);

    t.false(validation.isValid);
});
