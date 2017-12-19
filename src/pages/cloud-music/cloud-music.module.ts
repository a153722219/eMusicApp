import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloudMusicPage } from './cloud-music';

@NgModule({
  declarations: [
    CloudMusicPage,
  ],
  imports: [
    IonicPageModule.forChild(CloudMusicPage),
  ],
  exports: [
    CloudMusicPage
  ]
})
export class CloudMusicPageModule {}
