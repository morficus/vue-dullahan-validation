import {sameAs} from '../../../../src/validators/sameAs';

describe ('`sameAs` validator', () => {
    it ('should match two identical strings', () => {
        const data = {
                sampleValue: 'hello',
                targetValue: 'hello'
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should NOT match two different strings', () => {
        const data = {
                sampleValue: 'hello',
                targetValue: 'goodbye'
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should NOT match things of different types', () => {
        const data = {
                sampleValue: 'this is a string',
                targetValue: 8002
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should match two identical array of strings', () => {
        const data = {
                sampleValue: ['val1', 'val2', 'val3'],
                targetValue: ['val1', 'val2', 'val3']
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match two identical array of arrays', () => {
        const data = {
                sampleValue: [['val1'], ['val2', 'val3']],
                targetValue: [['val1'], ['val2', 'val3']]
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should NOT match two different array of arrays', () => {
        const data = {
                sampleValue: [['val1'], ['val2', 'val3']],
                targetValue: [['val1', 'val2'], ['val3']]
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should not match if given an Array and not an Array', () => {
        const data = {
                sampleValue: ['val1', 'val2', 'val3'],
                targetValue: 'not an array'
            },
            isValid1 = sameAs('targetValue', data.sampleValue, data),
            isValid2 = sameAs('sampleValue', data.targetValue, data);

        expect(isValid1.isValid).to.be.false;
        expect(isValid2.isValid).to.be.false;
    });

    it ('should NOT match two different array of strings', () => {
        const data = {
                sampleValue: ['val1', 'val2', 'val3'],
                targetValue: ['val0', 'val2', 'val3']
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should NOT match two Arrays of different lengths', () => {
        const data = {
                sampleValue: ['val1', 'val2', 'val3'],
                targetValue: ['val0', 'val2']
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should match two identical objects', () => {
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
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should NOT match two different objects', () => {
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
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should match an Array of matching Objects', () => {
        const data = {
                sampleValue: [{key1: 'val1', key2: 'val2'}, {key3: 'val3', key4: 'val4'}],
                targetValue: [{key1: 'val1', key2: 'val2'}, {key3: 'val3', key4: 'val4'}]
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });


    it ('should NOT match an Array of non-matching Objects', () => {
        const data = {
                sampleValue: [{key0: 'val0', key2: 'val2'}, {key3: 'val3', key4: 'val4'}],
                targetValue: [{key1: 'val1', key2: 'val2'}, {key3: 'val3', key4: 'val4'}]
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should match an Object with Arrays as its values', () => {
        const data = {
                sampleValue: {
                    key1: ['A', 'B', 'C', 'D']
                },
                targetValue: {
                    key1: ['A', 'B', 'C', 'D']
                }
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should NOT match an Object with different Arrays as its values', () => {
        const data = {
                sampleValue: {
                    key1: ['A', 'B', 'C', 'D', 'E']
                },
                targetValue: {
                    key1: ['A', 'B', 'C', 'D']
                }
            },
            isValid = sameAs('targetValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });
});
