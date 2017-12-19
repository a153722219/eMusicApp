import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerComponent } from './player';

@NgModule({
  declarations: [
    PlayerComponent,
  ],
  imports: [
    IonicPageModule.forChild(PlayerComponent),
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerComponentModule {}
