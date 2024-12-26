import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  standalone: false,
})
export class TabsPage {
  constructor(private global: GlobalService) {}

  public logout() {
    this.global.confirmAlert('Warning', 'Do you really want to sign out?', 'Logout').then((yes) => {
      if (yes) this.global.logout();
    });
  }
}
