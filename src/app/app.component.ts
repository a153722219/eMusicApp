import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav,ModalController} from 'ionic-angular';

import { indexPage } from '../pages/index/indexPage';
import { ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {CommServiceProvider} from '../providers/comm-service/comm-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = indexPage;
  pages: Array<{title: string, component: any , NavType:boolean}>;
  uanme:string='';
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public modelcontroll:ModalController,
    public comm:CommServiceProvider,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();
    this.uanme=this.comm.uname;
    // set our app's pages
    this.pages = [
      { title: '首页', component: indexPage,NavType:true},
      { title: '登陆', component: LoginPage,NavType:false },
      { title: '注册', component: RegisterPage,NavType:false  },
      { title: '检查更新', component: null ,NavType:false },
      { title: '退出', component: 'exit',NavType:false },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.NavType){
      this.nav.setRoot(page.component);
    }else{
      if(page.component==null){
        let toast = this.toastCtrl.create({
          message:'当前版本已经是最新版本!',
          duration: 1500
        });
        toast.present();
        return;
      }
      if(page.component=='exit'){
        this.platform.exitApp();
        return;
      }
      //this.nav.push(page.component);
      let modal = this.modelcontroll.create(page.component);
      modal.present();
    }
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page

  }
}
