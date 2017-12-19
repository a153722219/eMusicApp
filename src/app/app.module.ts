import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import {TimesPipe} from "../pipes/times";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { indexPage } from '../pages/index/indexPage';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import { Media } from '@ionic-native/media';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlayerComponent } from '../components/player/player';
import { HttpService } from '../providers/http-service/http-service';
import { CommServiceProvider } from '../providers/comm-service/comm-service';
import { MusicProvider } from '../providers/music/music';
import {CloudMusicPage} from "../pages/cloud-music/cloud-music";
import {DetailPage} from "../pages/detail/detail";

@NgModule({
  declarations: [
    TimesPipe,
    DetailPage,
    CloudMusicPage,
    RegisterPage,
    LoginPage,
    MyApp,
    indexPage,
    ItemDetailsPage,
    ListPage,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DetailPage,
    CloudMusicPage,
    RegisterPage,
    LoginPage,
    PlayerComponent,
    MyApp,
    indexPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    CommServiceProvider,
    MusicProvider,
    Media
  ]
})
export class AppModule {}
