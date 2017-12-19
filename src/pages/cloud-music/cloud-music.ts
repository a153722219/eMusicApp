import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {HttpService} from "../../providers/http-service/http-service";
import { CommServiceProvider } from '../../providers/comm-service/comm-service';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the CloudMusicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cloud-music',
  templateUrl: 'cloud-music.html',
})
export class CloudMusicPage {
  list:Array<any>=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lc:LoadingController,
    public http:HttpService,
    public ms:CommServiceProvider,
    public toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    let myl = this.lc.create({
      content:"正在获取",
      //duration:3000
    });
    myl.present();
    this.http.sendRequest('http://111.230.238.129/RSS/downData.php').subscribe(
      data=>{
        console.log(data);
        this.list=data;
        myl.dismiss();
      }
    );

  }

  play(index){

      this.ms.change.emit({list:this.list,index:index});

  }

  download(){
    this.showToast( '下载功能暂未开放');
  }

  showToast(msg){
    let toast = this.toastCtrl.create({
      message:msg,
      duration: 1500
    });
    toast.present();
  }

  cancelSub(hash){
    this.http.postData('http://111.230.238.129/RSS/delSub.php','hash='+hash
    ).subscribe(data=>{
      if(data.code==1){
        for(let i=0;i<this.list.length;i++){
            if(hash==this.list[i].hash){
              this.list.splice(i,1);
            }
        }
        let slist = JSON.parse(localStorage.subList);
        for(let i=0;i<slist.length;i++){
          if(hash==slist[i].hash){
            slist.splice(i,1);
          }
        }
        localStorage.subList=JSON.stringify(slist);
        this.ms.getCount();
      }else {
        this.showToast('删除失败.请重试');
      }
    });
  }

}
