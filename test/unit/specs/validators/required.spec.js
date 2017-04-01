import required from '../../../../src/validators/required';

describe('`required` validation', () => {
    it ('should NOT match when given a null object', () => {
        const isValid = required(true, null);

        expect (isValid.isValid).to.be.false;
    });

    it ('should NOT match when given an `undefined` object', () => {
        const isValid = required(true, undefined);

        expect (isValid.isValid).to.be.false;
    });

    it ('should NOT match when given an empty string', () => {
        const isValid = required(true, '');

        expect (isValid.isValid).to.be.false;
    });

    it ('should NOT match when given an empty Array', () => {
        const isValid = required(true, []);

        expect (isValid.isValid).to.be.false;
    });

    it ('should match when given aNumber', () => {
        const isValid = required(true, 1234);

        expect (isValid.isValid).to.be.true;
    });

    it ('should match when given String', () => {
        const isValid = required(true, 'ABC123');

        expect (isValid.isValid).to.be.true;
    });

    it ('should match when given a non-empty Array', () => {
        const isValid = required(true, ['A', 'B', 'C']);

        expect (isValid.isValid).to.be.true;
    });

    it ('should match when given a Boolean', () => {
        const isValid = required(true, true);

        expect (isValid.isValid).to.be.true;
    });

    it ('should return a custom error msg when validations fails', () => {
        const myErrorMsg = 'this is my msg',
            validation = required({message: myErrorMsg}, '');

        expect(validation.isValid).to.be.false;
        expect(validation.errorMessage).to.be.equal(myErrorMsg)
    });

    it ('should NOT return any message when validation passes', () => {
        const myErrorMsg = 'this is my msg',
            validation = required({message: myErrorMsg}, 'ABC123');

        expect(validation.isValid).to.be.true;
        expect(validation.errorMessage).to.be.equal('')
    });

});
