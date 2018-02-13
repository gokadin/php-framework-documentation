import validator from '../../processors/validation.processor';

describe('formValidation', ()  => {
    describe('min', () => {
        it('should return true if min number is equal to given value', () => {
            // Act
            let result = validator.min(3, 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return true if min number is greater than given value', () => {
            // Act
            let result = validator.min(5, 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false if min number is less than given value', () => {
            // Act
            let result = validator.min(2, 3);

            // Assert
            expect(result).toBe(false);
        });

        it('should return true if min string length is equal to given string length', () => {
            // Act
            let result = validator.min('abc', 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return true if min string length is greater than given string length', () => {
            // Act
            let result = validator.min('abcdef', 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false if min string length is less than given string length', () => {
            // Act
            let result = validator.min('a', 3);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('max', () => {
        it('should return true if max number is equal to given value', () => {
            // Act
            let result = validator.max(3, 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return true if max number is less than given value', () => {
            // Act
            let result = validator.max(2, 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false if max number is greater than given value', () => {
            // Act
            let result = validator.max(5, 3);

            // Assert
            expect(result).toBe(false);
        });

        it('should return true if max string length is equal to given string length', () => {
            // Act
            let result = validator.max('abc', 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return true if max string length is less than given string length', () => {
            // Act
            let result = validator.max('a', 3);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false if max string length is greater than given string length', () => {
            // Act
            let result = validator.max('abcdef', 3);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('required', () => {
        it('should return false if value is undefined', () => {
            // Act
            let result = validator.required(undefined);

            // Assert
            expect(result).toBe(false);
        });

        it('should return false if value is null', () => {
            // Act
            let result = validator.required(null);

            // Assert
            expect(result).toBe(false);
        });

        it('should return false if value is empty string', () => {
            // Act
            let result = validator.required('');

            // Assert
            expect(result).toBe(false);
        });

        it('should return true if value is non empty string', () => {
            // Act
            let result = validator.required('a');

            // Assert
            expect(result).toBe(true);
        });

        it('should return true if value is zero', () => {
            // Act
            let result = validator.required(0);

            // Assert
            expect(result).toBe(true);
        });

        it('should return true if value is empty array', () => {
            // Act
            let result = validator.required([]);

            // Assert
            expect(result).toBe(true);
        });

        it('should return true if value is empty object', () => {
            // Act
            let result = validator.required({});

            // Assert
            expect(result).toBe(true);
        });
    });

    describe('email', () => {
        it('should return true on a valid email', () => {
            // Act
            let result = validator.email('some@email.com');

            // Assert
            expect(result).toBe(true);
        });

        it('should return false on an invalid email', () => {
            // Act
            let result = validator.email('rubbish');

            // Assert
            expect(result).toBe(false);
        });
    });
});