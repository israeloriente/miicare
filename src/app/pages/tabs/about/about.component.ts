import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public packageJson: any = environment.packageJson;
  constructor(public global: GlobalService) {}
}
