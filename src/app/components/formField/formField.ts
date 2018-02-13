import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';

import {FormActions} from "../../actions/form.actions";

@Component({
    selector: 'form-field',
    templateUrl: './formField.html',
    styleUrls: ['./formField.css']
})
export class FormField {
    control: FormControl;
    @Input() field: any;
    @Input() name: string;
    @Input() type: string;
    @Input() placeholder: string;
    @Input() options: any;
    @Output() formUpdates = new EventEmitter<any>();

    constructor(private formActions: FormActions) {
        this.control = new FormControl();
    }

    ngOnInit() {
        this.control.valueChanges
            .distinctUntilChanged()
            .subscribe(
                value => {
                    this.formUpdates.emit(this.formActions.updateValue(this.field.name, value));
                    this.formUpdates.emit(this.formActions.validateField(this.field.name));
                }
            );
    }

    updateOnBlur(): void {
        this.formUpdates.emit(this.formActions.touch(this.field.name));
        this.formUpdates.emit(this.formActions.validateField(this.field.name));
    }
}