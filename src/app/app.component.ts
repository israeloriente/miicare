import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private global: GlobalService) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.global.getStorage('isLoggedIn')) {
      this.global.navToRoot('tabs');
    } else {
      this.global.navToRoot('login');
    }
  }
}
