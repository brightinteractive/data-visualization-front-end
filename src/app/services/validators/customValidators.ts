import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            console.log(dateField1);
            console.log(dateField2);
            const d1 = new Date(c.get(dateField1).value).getTime();
            const d2 = new Date(c.get(dateField2).value).getTime();

            if ((d1 !== null && d2 !== null) && d1 > d2) {
                return validatorField;
            }
            return null;
        };
    }
}
