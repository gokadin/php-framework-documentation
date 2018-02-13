import {TestBed, inject} from '@angular/core/testing';

import {FormActions} from '../../../actions/form.actions';
import {formReducer as reducer, initialState, buildFormState} from '../../../reducers/generic/form.reducer';
import {getFields} from "../../fixtures/form.fixtures";
import {getValidations} from "../../fixtures/form.fixtures";

describe('formReducer', ()  => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [FormActions]
        });
    });

    describe('general', () => {
        it('should have an empty initial state', () => {
            // Act
            const state = reducer(undefined, {type: 'test'});

            // Assert
            expect(state.isValid).toBe(false);
            expect(state.fieldIds).toEqual([]);
            expect(state.fields).toEqual({});
        });
    });

    describe('buildFormState', () => {
        it('should copy the the name, value and validations to the generated object', () => {
            // Arrange
            let data = getFields(2);
            let validations = getValidations(2);
            data[0].validations = [validations[0]];
            data[1].validations = [validations[1]];

            // Act
            let state = buildFormState(data);

            // Assert
            expect('name1' in state.fields).toBe(true);
            expect(state.fields.name1.name).toBe('name1');
            expect(state.fields.name1.value).toBe('value1');
            expect(state.fields.name1.validations.length).toBe(1);
            expect(state.fields.name1.validations[0].type).toBe('required');
            expect(state.fields.name1.validations[0].message).toBe('message1');

            expect('name2' in state.fields).toBe(true);
            expect(state.fields.name2.name).toBe('name2');
            expect(state.fields.name2.value).toBe('value2');
            expect(state.fields.name2.validations.length).toBe(1);
            expect(state.fields.name2.validations[0].type).toBe('required');
            expect(state.fields.name2.validations[0].message).toBe('message2');
        });

        it('should copy the value of each field to an initialValue property', () => {
            // Arrange
            let data = getFields(1);

            // Act
            let state = buildFormState(data);

            // Assert
            expect(state.fields.name1.value).toBe('value1');
            expect(state.fields.name1.initialValue).toBe('value1');
        });

        it('should assign an empty array to validations if not present in data', () => {
            // Arrange
            let data = getFields(1);

            // Act
            let state = buildFormState(data);

            // Assert
            expect(state.fields.name1.validations).toEqual([]);
        });

        it('should generate an isValid property per field with default value of false', () => {
            // Arrange
            let data = getFields(1);

            // Act
            let state = buildFormState(data);

            // Assert
            expect(state.fields.name1.isValid).toBe(false);
        });

        it('should generate an isTouched property per field with default value of false', () => {
            // Arrange
            let data = getFields(1);

            // Act
            let state = buildFormState(data);

            // Assert
            expect(state.fields.name1.isTouched).toBe(false);
        });

        it('should generate an error property per field with default value of an empty string', () => {
            // Arrange
            let data = getFields(1);

            // Act
            let state = buildFormState(data);

            // Assert
            expect(state.fields.name1.error).toBe('');
        });

        it('should generate fieldIds with names as ids', () => {
            // Arrange
            let data = getFields(2);

            // Act
            let state = buildFormState(data);

            // Assert
            expect(state.fieldIds).toEqual(['name1', 'name2']);
        });

        it('should generate an isValid property with default value of false', () => {
            // Arrange
            let data = getFields(1);

            // Act
            let state = buildFormState(data);

            // Assert
            expect(state.isValid).toBe(false);
        });
    });

    describe('actions', () => {
        describe('form actions', () => {
            beforeEach(inject([FormActions], (formActions: FormActions) => {
                this.formActions = formActions;
            }));

            describe(FormActions.TOUCH, () => {
                describe('fields', () => {
                    it('should change the isTouched property of the given field id to true', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));

                        // Act
                        let fields = reducer(state, this.formActions.touch('name1')).fields;

                        // Assert
                        expect(fields.name1.isTouched).toBe(true);
                        expect(fields.name2.isTouched).toBe(false);
                    });
                });
            });

            describe(FormActions.UPDATE_VALUE, () => {
                describe('fields', () => {
                    it('should change the value property to the given one', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));

                        // Act
                        let fields = reducer(state, this.formActions.updateValue('name1', 'newVal')).fields;

                        // Assert
                        expect(fields.name1.value).toBe('newVal');
                        expect(fields.name2.value).toBe('value2');
                    });
                });
            });

            describe(FormActions.VALIDATE_FIELD, () => {
                describe('isValid', () => {
                    it('should return true if field validation passed and all other fields are also valid', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));

                        // Act
                        let newState = reducer(state, this.formActions.validateField('name1'));
                        newState = reducer(newState, this.formActions.validateField('name2'));

                        // Assert
                        expect(newState.fields.name1.isValid).toBe(true);
                        expect(newState.fields.name2.isValid).toBe(true);
                        expect(newState.isValid).toBe(true);
                    });

                    it('should return false if field validation passed but at least one more field is invalid', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));

                        // Act
                        let newState = reducer(state, this.formActions.validateField('name1'));

                        // Assert
                        expect(newState.fields.name1.isValid).toBe(true);
                        expect(newState.fields.name2.isValid).toBe(false);
                        expect(newState.isValid).toBe(false);
                    });
                });
            });

            describe(FormActions.VALIDATE_FORM, () => {
                describe('fields', () => {
                    it('should mark all fields as touched', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));

                        // Assert
                        expect(state.fields.name1.isTouched).toBe(false);
                        expect(state.fields.name2.isTouched).toBe(false);

                        // Act
                        let fields = reducer(state, this.formActions.validateForm()).fields;

                        // Assert
                        expect(fields.name1.isTouched).toBe(true);
                        expect(fields.name2.isTouched).toBe(true);
                    });
                });

                describe('isValid', () => {
                    it('should return true all fields are valid', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));

                        // Act
                        let newState = reducer(state, this.formActions.validateForm());

                        // Assert
                        expect(newState.fields.name1.isValid).toBe(true);
                        expect(newState.fields.name2.isValid).toBe(true);
                        expect(newState.isValid).toBe(true);
                    });

                    it('should return false at least one field is invalid', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));
                        state.fields.name2.value = '';
                        state.fields.name2.validations = getValidations(1);

                        // Act
                        let newState = reducer(state, this.formActions.validateForm());

                        // Assert
                        expect(newState.fields.name1.isValid).toBe(true);
                        expect(newState.fields.name2.isValid).toBe(false);
                        expect(newState.isValid).toBe(false);
                    });
                });
            });

            describe(FormActions.RESET, () => {
                describe('fields', () => {
                    it('should copy the initialValue value of each field into the value property', () => {
                        // Arrange
                        let state = buildFormState(getFields(2));

                        // Act
                        let newState = reducer(state, this.formActions.updateValue('name1', 'changed1'));
                        newState = reducer(newState, this.formActions.updateValue('name2', 'changed2'));

                        // Assert
                        expect(newState.fields.name1.value).toBe('changed1');
                        expect(newState.fields.name2.value).toBe('changed2');

                        // Act
                        let fields = reducer(newState, this.formActions.reset()).fields;

                        // Assert
                        expect(fields.name1.value).toBe('value1');
                        expect(fields.name2.value).toBe('value2');
                    });
                });
            });
        });
    });
});