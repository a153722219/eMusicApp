import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ItemDetailsPage} from "../item-details/item-details";
import {CommServiceProvider} from '../../providers/comm-service/comm-service';
import {CloudMusicPage} from "../cloud-music/cloud-music";
import { ToastController,ModalController } from 'ionic-angular';
import {LoginPage} from "../login/login";

@Component({

  selector: 'page-index',
  templateUrl: 'indexPage.html'
})
export class indexPage {
  items:Array<any>=['1','2','3'];
  uname:string='';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public comm:CommServiceProvider,
    public toastCtrl: ToastController,
    public modelcontroll:ModalController,) {
    this.uname=this.comm.uname;
  }
  openCloudPage(){
    if(this.comm.isLogin){
      this.navCtrl.push(CloudMusicPage);
    }else{
      this.showToast('请先登陆!');
    }
  }
  openLocalPage(){
    this.showToast('下载功能暂未开放!');
  }
  openFavPage(){
    this.showToast('喜欢功能暂未开放!');
  }
  openShopPage(){
    this.showToast('购买功能暂未开放!');
  }
  showLogin(){
    let modal = this.modelcontroll.create(LoginPage);
    modal.present();
  }

  onEnter(e){
    let queryStr =  e.target.value;
    this.navCtrl.push(ItemDetailsPage, {
      query: queryStr
    });
  }
  showToast(msg){
    let toast = this.toastCtrl.create({
      message:msg,
      duration: 1500
    });
    toast.present();
  }
}
