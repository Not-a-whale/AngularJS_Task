import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }]
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') targetControlName!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const targetControl = control.root.get(this.targetControlName);

    if (targetControl && control.value !== targetControl.value) {
      return { passwordMatch: true };
    }

    return null;
  }
}
