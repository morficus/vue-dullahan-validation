import alphabetic from '../../../../src/validators/alphabetic';

describe ('`alphabetic` validator', () => {
    it ('should match when given a string of letters', () => {
        const validation = alphabetic({}, 'ABcdEFg');

        expect (validation.isValid).to.be.true;
    });

    it ('should match when given a string that contains spaces', () => {
        const validation = alphabetic({}, 'ABC XYZ');

        expect (validation.isValid).to.be.true;
    });

    it ('should NOT match when given a number', () => {
        const validation = alphabetic({}, 8001);

        expect (validation.isValid).to.be.false;
    });

    it ('should NOT match when given a string that contains numbers', () => {
        const validation = alphabetic({}, 'ABC123');

        expect (validation.isValid).to.be.false;
    });

    it ('should NOT match when given a string that contains special characters', () => {
        const validation = alphabetic({}, 'A-B,C');

        expect (validation.isValid).to.be.false;
    });

    it ('should return a custom error msg when validations fails', () => {
        const myErrorMsg = 'this is my msg',
            validation = alphabetic({message: myErrorMsg}, '123');

        expect(validation.isValid).to.be.false;
        expect(validation.errorMessage).to.be.equal(myErrorMsg)
    });

    it ('should NOT return any message when validation passes', () => {
        const myErrorMsg = 'this is my msg',
            validation = alphabetic({message: myErrorMsg}, 'ABC');

        expect(validation.isValid).to.be.true;
        expect(validation.errorMessage).to.be.equal('')
    });
});
