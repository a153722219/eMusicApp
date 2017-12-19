import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ToastController } from 'ionic-angular';
import {HttpService} from "../../providers/http-service/http-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  uname:string='';
  upwd:string='';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myViewCtrl:ViewController,
    public http:HttpService,
    public tCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  closeModal(){

    this.myViewCtrl.dismiss();
  }

  reg(){
    let PassReg =/^[0-9a-zA-Z_]{6,12}$/;
    if(this.uname.length<4){
      let toast = this.tCtrl.create({
        message: '用户名长度不能小于4位(中文/字母/下划线)',
        duration: 1200
      });
      toast.present();
      return;
    }
    if(!PassReg.test(this.upwd)){
      let toast = this.tCtrl.create({
        message: '密码为6-12位(字母数字下划线)',
        duration: 1200
      });
      toast.present();
      return;
    }


    this.http.postData(
      'http://111.230.238.129/RSS/vail.php',
      'username='+this.uname).subscribe(data=>{
        if(data.code==-1){
          let toast = this.tCtrl.create({
            message: '用户名已存在',
            duration: 1200
          });
          toast.present();
          return;
        }else{
          this.http.postData(
            'http://111.230.238.129/RSS/reg.php',
            'username='+this.uname+"&password="+this.upwd).subscribe(data=>{
            if(data.code==-1){
              let toast = this.tCtrl.create({
                message: '注册失败',
                duration: 1200
              });
              toast.present();
              return;
            }else if(data.code==1){
              let toast = this.tCtrl.create({
                message: '注册成功',
                duration: 1200
              });
              toast.present();
              this.myViewCtrl.dismiss();
            }
          });

        }
    });



  }

}
