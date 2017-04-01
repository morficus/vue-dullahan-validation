import list from '../../../../src/validators/list';

describe ('`list` validator', () => {
    it ('should match when given an Array', () => {
        const isValid = list({}, ['A', 'B', 'C']);

        expect(isValid.isValid).to.be.true;
    });

    it ('should match when given an empty Array', () => {
        const isValid = list({}, []);

        expect(isValid.isValid).to.be.true;
    });

    it ('should not match if given a String', () => {
        const isValid = list({}, 'not a list');

        expect(isValid.isValid).to.be.false;
    });

    it ('should not match if given a Number', () => {
        const isValid = list({}, 8001);

        expect(isValid.isValid).to.be.false;
    });

    it ('should not match if given an Object', () => {
        const isValid = list({}, {key1: 'val1'});

        expect(isValid.isValid).to.be.false;
    });
});
