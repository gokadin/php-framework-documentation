import {validateField} from '../../utils/form.utils';
import {buildFormState} from '../../reducers/generic/form.reducer';
import {getFields, getValidations} from '../fixtures/form.fixtures';

describe('formUtils', () => {
    describe('validateField', () => {
        it('should return the field as valid if there are no validations to be done', () => {
            // Arrange
            let form = buildFormState(getFields(1));

            // Act
            let validatedField = validateField(form.fields.name1);

            // Assert
            expect(validatedField.isValid).toBe(true);
        });

        it('should return the field as valid if all validations pass', () => {
            // Arrange
            let form = buildFormState(getFields(1, {
                validations: [
                    {type: 'required', message: ''},
                    {type: 'min', args: [3], message: ''}
                ]
            }));
            form.fields.name1.value = 5;

            // Act
            let validatedField = validateField(form.fields.name1);

            // Assert
            expect(validatedField.isValid).toBe(true);
        });

        it('should return the field as invalid if at least one validation does not pass', () => {
            // Arrange
            let form = buildFormState(getFields(1, {
                validations: [
                    {type: 'required', message: ''},
                    {type: 'min', args: [3], message: ''}
                ]
            }));
            form.fields.name1.value = 2;

            // Act
            let validatedField = validateField(form.fields.name1);

            // Assert
            expect(validatedField.isValid).toBe(false);
        });

        it('should assign the first failed validation error message to the field', () => {
            // Arrange
            let form = buildFormState(getFields(1, {
                validations: [
                    {type: 'max', args: [10], message: 'max error message'},
                    {type: 'min', args: [3], message: 'min error message'}
                ]
            }));
            form.fields.name1.value = 11;

            // Act
            let validatedField = validateField(form.fields.name1);

            // Assert
            expect(validatedField.isValid).toBe(false);
            expect(validatedField.error).toBe('max error message');
        });
    });
});