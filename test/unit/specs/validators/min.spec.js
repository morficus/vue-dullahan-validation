import min from '../../../../src/validators/min';

describe('`min` validator', () => {
    describe('when given a Number...', () => {
        it ('should pass if it is higher than the given min', () => {
            const validation = min(100, 99);

            expect(validation.isValid).to.be.false;
        });

        it ('should fail if it is lower than the given min', () => {
            const validation = min(100, 101);

            expect(validation.isValid).to.be.true;
        });

        it ('should pass if it is equal than the given min', () => {
            const validation = min(100, 100);

            expect(validation.isValid).to.be.true;
        });
    });

    describe('when given a String...', () => {
        it ('should fail if the string length is below the min', () => {
            const validation = min(100, 'this is less than 100');

            expect(validation.isValid).to.be.false;
        });

        it ('should pass if the string length is higher than the min', () => {
            const validation = min(10, 'this is more than 10');

            expect(validation.isValid).to.be.true;
        });

        it ('should pass if the string length is the same as the min', () => {
            const validation = min(10, '1234567890');

            expect(validation.isValid).to.be.true;
        });
    });

    describe('when given an Array...', () => {
        it ('should fail if the Array length is below the min', () => {
            const validation = min(100, [1,2,3,4]);

            expect(validation.isValid).to.be.false;
        });

        it ('should pass if the array length is higher than the min', () => {
            const validation = min(2, [1,2,3,4]);

            expect(validation.isValid).to.be.true;
        });

        it ('should pass if the array length is the same as the min', () => {
            const validation = min(2, [1,2]);

            expect(validation.isValid).to.be.true;
        });
    });
});
