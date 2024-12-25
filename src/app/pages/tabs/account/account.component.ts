import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { ValidationAccount } from 'src/app/validations/validation-account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  public accountForm: FormGroup;
  public isEditing: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private global: GlobalService,
  ) {
    this.accountForm = this.fb.group(ValidationAccount.getValidationRules());
  }

  ionViewWillEnter() {
    this.refresh();
  }

  public getErrors(field: string): string[] {
    const control = this.accountForm.get(field);
    return ValidationAccount.getErrors(field, control);
  }

  public onSubmit() {
    if (this.accountForm.valid) {
      this.global.setStorage('account', this.accountForm.value);
      this.isEditing = !this.isEditing;
    }
  }

  public refresh() {
    this.isLoading = true;
    const account = this.global.getStorage('account');
    if (account) this.accountForm.patchValue(account);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
