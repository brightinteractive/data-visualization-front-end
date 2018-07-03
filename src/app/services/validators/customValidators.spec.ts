import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TestBed, inject } from '@angular/core/testing';
import { CustomValidators } from './customValidators';

describe('CustomValidators', () => {

    let customvalidator : CustomValidators

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: []
      });
      customvalidator = new CustomValidators;
    });


  
    it('should be created', () => {
      expect(customvalidator).toBeTruthy();
    });
  
    // describe('dateLessThan', () => {
    //   it('should return null if the second date entry is after the first', () => {
    //     const validatorReturn = customvalidator.dateLessThan()
     
    //   })
  
    // });
  
  });
  
  
  