import numeric from '../../../../src/validators/numeric';

describe ('`numeric` validator', () => {
    it ('should NOT match when given a string of letters', () => {
        const validation = numeric({}, 'ABcdEFg');

        expect (validation.isValid).to.be.false;
    });

    it ('should match when given a number', () => {
        const validation = numeric({}, 8001);

        expect (validation.isValid).to.be.true;
    });

    it ('should NOT match when given a string that contains numbers', () => {
        const validation = numeric({}, 'ABC123');

        expect (validation.isValid).to.be.false;
    });

    it ('should return a custom error msg when validations fails', () => {
        const myErrorMsg = 'this is my msg',
            validation = numeric({message: myErrorMsg}, 'ABC');

        expect(validation.isValid).to.be.false;
        expect(validation.errorMessage).to.be.equal(myErrorMsg)
    });

    it ('should NOT return any message when validation passes', () => {
        const myErrorMsg = 'this is my msg',
            validation = numeric({message: myErrorMsg}, 123);

        expect(validation.isValid).to.be.true;
        expect(validation.errorMessage).to.be.equal('')
    });
});
