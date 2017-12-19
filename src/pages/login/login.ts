import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import {CommServiceProvider} from '../../providers/comm-service/comm-service';
import {HttpService} from "../../providers/http-service/http-service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname:string='';
  upwd:string='';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myViewCtrl:ViewController,
    public tCtrl:ToastController,
    public comm:CommServiceProvider,
    public http:HttpService) {
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.myViewCtrl.dismiss();
  }
  logins(){
     if(this.uname=='' || this.upwd=='') {
       let toast = this.tCtrl.create({
         message: '请输入用户名或密码!',
         duration: 1200
       });
       toast.present();
       return;
     }
     this.http.postData(
       'http://111.230.238.129/RSS/login.php',
       'username='+this.uname+'&password='+this.upwd).subscribe(
         data=>{
           if(data.code!=1){
             let toast = this.tCtrl.create({
               message: '登陆失败!',
               duration: 1200
             });
             toast.present();
             return;
           }else{
             this.comm.uname=this.uname;
             this.comm.isLogin=true;
             this.http.sendRequest('http://111.230.238.129/RSS/downData.php').subscribe(
               data=>{
                 localStorage.subList=JSON.stringify(data);
                 this.comm.getCount();
                 this.myViewCtrl.dismiss();
               }
             );

           }
         }
     );
  }

}
