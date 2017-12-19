import { Component,ElementRef,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {CommServiceProvider} from "../../providers/comm-service/comm-service";
import {MusicProvider} from "../../providers/music/music";
import {TimesPipe} from "../../pipes/times";

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {
  @ViewChild('myRange') myRange1:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ms:CommServiceProvider,
    public music:MusicProvider,
    public Vctrl:ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.myRange1._slider.nativeElement.ontouchend=()=>{
      console.log(this.myRange1.ratio);
      this.music.isSkip=true;
      let sec  = this.music.duration*this.myRange1.ratio*1000;
      this.music.file.seekTo(sec);
      this.music.isSkip=false;
    }

  }

  closePage(){
    this.Vctrl.dismiss();
  }


}
