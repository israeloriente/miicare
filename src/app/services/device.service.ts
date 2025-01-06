import { Injectable } from '@angular/core';
import { Haptics } from '@capacitor/haptics';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}

  public vibrate = async () => {
    await Haptics.vibrate({ duration: 42 });
  };

  public getDeviceInfo = async () => {
    return await Device.getInfo();
  };
}
