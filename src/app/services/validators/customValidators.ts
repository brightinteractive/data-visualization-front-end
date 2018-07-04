import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static dateLessThan(dateField1: string, dateField2: string, validatorError: { [key: string]: boolean }): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const date1 = new Date(control.get(dateField1).value).getTime();
            const date2 = new Date(control.get(dateField2).value).getTime();

            if ((date1 !== null && date2 !== null) && date1 > date2) {
                return validatorError;
            }
            return null;
        };
    }
}
