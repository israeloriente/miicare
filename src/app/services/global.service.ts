import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private nav: NavController, private toast: ToastController) {}

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
}
