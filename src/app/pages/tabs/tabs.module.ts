import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TabsPage, AccountComponent, AboutComponent],
})
export class TabsPageModule {}
