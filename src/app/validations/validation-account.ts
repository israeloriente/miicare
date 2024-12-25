import { Validators } from '@angular/forms';

export class ValidationAccount {
  public static validationMessages: any = {
    fullName: [
      { type: 'required', message: 'Name is required.' },
      {
        type: 'minlength',
        message: 'Name must be at least 4 characters long.',
      },
      { type: 'maxlength', message: 'Name cannot exceed 20 characters.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' },
    ],
    phone: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'pattern', message: 'Phone must have exactly 9 digits.' },
    ],
    dob: [{ type: 'required', message: 'Date of Birth is required.' }],
  };

  public static getValidationRules() {
    return {
      fullName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\d{9})$/)]],
      dob: ['', [Validators.required]],
    };
  }

  public static getErrors(field: string, control: any): string[] {
    if (control && control.errors) {
      return Object.keys(control.errors).map((errorKey) => {
        const errorMessage = this.validationMessages[field].find((v: any) => v.type === errorKey);
        return errorMessage ? errorMessage.message : '';
      });
    }
    return [];
  }
}
