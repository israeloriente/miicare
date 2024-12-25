import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';
import { BarChartComponent } from 'src/app/components/bar-chart/bar-chart.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { TaskTableComponent } from 'src/app/components/task-table/task-table.component';
import { HomeComponent } from './home/home.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  declarations: [
    TabsPage,
    HomeComponent,
    AccountComponent,
    AboutComponent,
    BarChartComponent,
    PieChartComponent,
    TaskTableComponent
  ],
})
export class TabsPageModule {}
