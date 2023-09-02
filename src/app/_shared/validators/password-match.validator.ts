import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName)!;
    const confirmPasswordControl = formGroup.get(matchingControlName)!;

    if (!passwordControl.value || !confirmPasswordControl.value) {
      // Don't show error if either field is empty
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
