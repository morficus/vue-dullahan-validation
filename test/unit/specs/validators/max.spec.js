import max from '../../../../src/validators/max';

describe('`max` validator', () => {
    describe('when given a Number...', () => {
        it ('should pass if it is lower than the given max', () => {
            const validation = max(100, 99);

            expect(validation.isValid).to.be.true;
        });

        it ('should fail if it is higher than the given max', () => {
            const validation = max(100, 101);

            expect(validation.isValid).to.be.false;
        });

        it ('should pass if it is equal than the given max', () => {
            const validation = max(100, 100);

            expect(validation.isValid).to.be.true;
        });
    });

    describe('when given a String...', () => {
        it ('should pass if the string length is less than the max', () => {
            const validation = max(100, 'this is less than 100');

            expect(validation.isValid).to.be.true;
        });

        it ('should fail if the string length is higher than the max', () => {
            const validation = max(10, 'this is more than 10');

            expect(validation.isValid).to.be.false;
        });

        it ('should pass if the string length is the same as the max', () => {
            const validation = max(10, '1234567890');

            expect(validation.isValid).to.be.true;
        });
    });

    describe('when given an Array...', () => {
        it ('should pass if the Array length is below the max', () => {
            const validation = max(100, [1,2,3,4]);

            expect(validation.isValid).to.be.true;
        });

        it ('should fail if the array length is higher than the max', () => {
            const validation = max(2, [1,2,3,4]);

            expect(validation.isValid).to.be.false;
        });

        it ('should pass if the array length is the same as the max', () => {
            const validation = max(2, [1,2]);

            expect(validation.isValid).to.be.true;
        });
    });
});
