import or from '../../../../src/validators/or';

describe('`or` validator', () => {
    it ('should match when both values are Strings', () => {
        const data = {
                sampleValue: 'hello',
                companionValue: 'goodbye'
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match when both values are non-empty Arrays', () => {
        const data = {
                sampleValue: ['A', 'B', 'C'],
                companionValue: ['X', 'Y', 'Z']
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match when both values are Numbers', () => {
        const data = {
                sampleValue: 55,
                companionValue: 0
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match if one is an empty Array and the other isn ot', () => {
        const data = {
                sampleValue: [],
                companionValue: 0
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match one is an empty String and the other is not', () => {
        const data = {
                sampleValue: '',
                companionValue: 0
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match one is an empty null and the other is not', () => {
        const data = {
                sampleValue: 'hello',
                companionValue: null
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match one is an empty undefined and the other is not', () => {
        const data = {
                sampleValue: 'hello',
                companionValue: undefined
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.true;
    });

    it ('should NOT match if both are empty Arrays', () => {
        const data = {
                sampleValue: [],
                companionValue: []
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

    it ('should NOT match if both are empty Strings', () => {
        const data = {
                sampleValue: '',
                companionValue: ''
            },

            isValid = or('companionValue', data.sampleValue, data);

        expect(isValid.isValid).to.be.false;
    });

});
