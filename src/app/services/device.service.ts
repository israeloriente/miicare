import { Injectable } from '@angular/core';
import { Haptics } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}

  public vibrate = async () => {
    await Haptics.vibrate({ duration: 42 });
  };
}
