import { Component } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public packageJson: any = environment.packageJson;
  public deviceInfo: any = {};

  constructor(public global: GlobalService, private device: DeviceService) {
    device.getDeviceInfo().then((info) => {
      this.deviceInfo = info;
    });
  }
}
