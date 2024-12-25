import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar>
          <ion-title>Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content #content>
        <app-bar-chart (scrollToTop)="scrollToTop()"></app-bar-chart>
        <app-pie-chart></app-pie-chart>
        <app-task-table></app-task-table>
      </ion-content>
    </ion-app>
  `,
  standalone: false,
})
export class HomeComponent {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  scrollToTop() {
    if (this.content) {
      this.content.scrollToTop(300);
    }
  }
}
