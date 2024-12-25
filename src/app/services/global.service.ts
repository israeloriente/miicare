import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(
    private nav: NavController,
    private toast: ToastController,
    private alert: AlertController,
  ) {}

  /** Opens a new page and closes all previously open pages.
   * @param route string containing the route to the page. */
  navToRoot(route: string) {
    this.nav.navigateRoot(route);
  }

  /** Opens a new page after the other the user is currently in.
   * @param url string containing the route to the page. */
  goTo(url: string) {
    this.nav.navigateForward(url);
  }

  async simpleToast(message: string, duration?: number) {
    const toast = await this.toast.create({
      message,
      position: 'bottom',
      duration: duration || 2000,
    });
    toast.present();
  }

  async simpleAlert(header: string, message?: string) {
    const alert = await this.alert.create({
      header,
      message,
      mode: 'ios',
      buttons: ['Ok'],
    });
    await alert.present();
    return await alert.onWillDismiss();
  }

  logout() {
    this.setStorage('isLoggedIn', false);
    this.navToRoot('login');
  }

  /** Updates information related to "key" by replacing it with information from "value".
   *
   * If value is a string, it will be stored right away. Else, it will be converted to string and then stored.
   * @param key keyword associated with information to be updated in storage.
   * @param value information to be stored. */
  setStorage(key: string, value: any) {
    if (typeof value == 'string') localStorage.setItem(key, value);
    else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /** Gets information related to "key" from storage.
   * @param key keyword associated with information to be retrieved from storage.
   * @returns information. */
  getStorage(key: string) {
    const value: any = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
}
