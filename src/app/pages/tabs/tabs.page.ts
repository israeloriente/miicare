import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  standalone: false,
})
export class TabsPage {
  constructor(public global: GlobalService) {}
}
