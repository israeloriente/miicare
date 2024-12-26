import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  styles: [
    `
      ion-skeleton-text {
        width: 94%;
        height: 250px;
        margin: auto;
        margin-top: 10px;
        border-radius: 5px;
      }
    `,
  ],
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar>
          <ion-title>Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content #content>
        <div [ngStyle]="{ display: isLoading ? 'block' : 'none' }">
          <app-bar-chart (scrollToTop)="scrollToTop()"></app-bar-chart>
          <app-pie-chart></app-pie-chart>
          <app-task-table></app-task-table>
        </div>
        <div *ngIf="!isLoading">
          <ion-skeleton-text [animated]="true"></ion-skeleton-text>
          <ion-skeleton-text [animated]="true"></ion-skeleton-text>
          <ion-skeleton-text [animated]="true"></ion-skeleton-text>
        </div>
      </ion-content>
    </ion-app>
  `,
  standalone: false,
})
export class HomeComponent {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  protected isLoading: boolean = false;

  public scrollToTop() {
    this.content.scrollToTop(300);
  }

  public ionViewWillEnter() {
    setTimeout(() => {
      this.isLoading = true;
    }, 1500);
  }

  public ionViewDidLeave() {
    this.isLoading = false;
  }
}
