import alphanumeric from '../../../../src/validators/alphanumeric';

describe ('`alphanumeric` validator', () => {
    it ('should match when given a string of letters', () => {
        const validation = alphanumeric({}, 'ABcdEFg');

        expect (validation.isValid).to.be.true;
    });

    it ('should match when given a string that contains spaces', () => {
        const validation = alphanumeric({}, 'ABC XYZ');

        expect (validation.isValid).to.be.true;
    });

    it ('should match when given a number', () => {
        const validation = alphanumeric({}, 8001);

        expect (validation.isValid).to.be.true;
    });

    it ('should match when given a string that contains numbers', () => {
        const validation = alphanumeric({}, 'ABC123');

        expect (validation.isValid).to.be.true;
    });

    it ('should NOT match when given a string that contains special characters', () => {
        const validation = alphanumeric({}, 'A-B,C');

        expect (validation.isValid).to.be.false;
    });

    it ('should return a custom error msg when validations fails', () => {
        const myErrorMsg = 'this is my msg',
            validation = alphanumeric({message: myErrorMsg}, '1-2-3');

        expect(validation.isValid).to.be.false;
        expect(validation.errorMessage).to.be.equal(myErrorMsg)
    });

    it ('should NOT return any message when validation passes', () => {
        const myErrorMsg = 'this is my msg',
            validation = alphanumeric({message: myErrorMsg}, 'ABC123');

        expect(validation.isValid).to.be.true;
        expect(validation.errorMessage).to.be.equal('')
    });
});
