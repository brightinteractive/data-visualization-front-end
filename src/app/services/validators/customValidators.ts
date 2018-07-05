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

    static numberLessThan(field1: string, field2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
          return (c: AbstractControl): { [key: string]: boolean } | null => {
                const n1 = c.get(field1).value;
                const n2 = c.get(field2).value;

                  if ((n1 !== null && n2 !== null) && n1 > n2) {
                      return validatorField;
                  }
                return null;
            };
      }
}
