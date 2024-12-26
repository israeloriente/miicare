import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { DeviceService } from 'src/app/services/device.service';

type LoginError = 'Invalid username or password.' | 'An error occurred. Please try again.' | '';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styles: [
    `
      form {
        padding: 5%;
      }
    `,
  ],
  standalone: false,
})
export class LoginPage {
  public username: string = '';
  public password: string = '';
  public errorMessage: LoginError = '';

  constructor(private authService: AuthService, private global: GlobalService, private device: DeviceService) {}

  public login() {
    this.authService.authenticate(this.username, this.password).then(
      async (success) => {
        if (success) {
          this.global.navToRoot('tabs');
          this.global.setStorage('isLoggedIn', true);
          this.global.simpleToast('Login successful!');
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Invalid username or password.';
          await this.device.vibrate();
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}
