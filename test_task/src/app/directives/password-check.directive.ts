import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {createPasswordCheckValidator} from "../../shared/functions/password-check.validator";


@Directive({
  selector: "[passwordCheck]",
  providers: [{
    provide: NG_VALIDATORS,
    useExisting:PasswordCheckDirective,
    multi: true
  }]
})
export class PasswordCheckDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordCheckValidator()(control);
  }


}
