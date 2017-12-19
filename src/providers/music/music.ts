import { Injectable,NgZone } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';
import { HttpService } from '../../providers/http-service/http-service';
import { CommServiceProvider } from '../../providers/comm-service/comm-service';
import { ToastController } from 'ionic-angular';


import 'rxjs/add/operator/map';

@Injectable()
export class MusicProvider {
  MEDIA_NONE:number = 0;
  MEDIA_STARTING:number = 1;
  MEDIA_RUNNING:number = 2;
  MEDIA_PAUSED:number = 3;
  MEDIA_STOPPED:number = 4;

  isPlaying:boolean=false;
  list:Array<any>=[];
  index:number=0;
  FileHash:string="";
  song_name:string="简听音乐";
  author_name:string="听你想听";
  img:string="assets/img/avatar.jpg";
  progress:number=0;
  duration:number=0;
  currentPosition:number=0;
  timer:any=null;
  isSkip:boolean=false;
  times:Array<any>=[];
  lrcs:Array<any>=['简听音乐','听你想听','By:小白','...','...'];
  lrcIndex:number= 0;
  file: MediaObject = this.media.create('a.mp3');
  constructor(private media: Media,
              public ms:CommServiceProvider,
              public http:HttpService,
              public toastCtrl: ToastController,
              private nz:NgZone) {

  }

  pause(){
    this.file.pause();
  }
  plays(){
    this.file.play();
  }

  next(){
    if(this.file){
      if(this.index!=this.list.length-1){
        this.file.pause();
        this.file.release();
        this.index=this.index+1;
        this.FileHash=this.list[this.index].FileHash;
        this.play();
      }
    }
  }

  prev(){
    if(this.file){
      if(this.index!=0){
        this.file.pause();
        this.file.release();
        this.index=this.index-1;
        this.FileHash=this.list[this.index].FileHash;
        this.play();
      }
    }
  }



  play(){
    this.http.sendRequest('http://111.230.238.129/RSS/getMusic.php?hash='+this.FileHash
    ).subscribe(data=>{
      if(this.file){
        this.file.pause();
        this.file.release();
      }
      let lines = data.data.lyrics.split('\n');
      let timesPattern = /(\d{2}:)?\d{2}:\d{2}/g;
      let lrcsPattern = /\[(\d{2}:)?\d{2}:\d{2}.\d{2}\]/g;
      this.times=[];
      this.lrcs=[];
      for(let str of lines){
        let time = str.match(timesPattern);
        if(time){
          this.times.push(time[0]);
        }
        let lrc = str.replace(lrcsPattern,'');
        if(lrc){
          this.lrcs.push(lrc);
        }

      }

      if(this.times[this.times.length-1]==null){
        this.times.pop();
      }
      if(this.lrcs[this.lrcs.length-1]==""){
        this.lrcs.pop();
      }



      this.file=this.media.create(data.data.play_url);

      this.file.onStatusUpdate.subscribe((status:any) =>{
        if(status==this.MEDIA_STARTING){
          this.song_name = '缓冲中';
          this.author_name = '正在缓冲...';
        }
        if(status==this.MEDIA_RUNNING){
          this.song_name = data.data.song_name;
          this.author_name = data.data.author_name;
          this.img = data.data.img;
          this.isPlaying=true;

          this.timer=setInterval(()=>{
            if(!this.isSkip){
              this.file.getCurrentPosition().then((position) => {

                this.duration= this.file.getDuration();
                if(this.file.getDuration()>-1){
                  this.currentPosition=position;
                  this.progress =Math.ceil(position/this.duration*100) ;
                  this.nz.run(()=>{console.log(123);});
                  for(let i=0;i<this.times.length;i++){
                    if(this.getTime(position)==this.times[i]){
                        this.lrcIndex=i;
                    }
                  }
                }
              });
            }


          },1000);
        }

        if(status==this.MEDIA_PAUSED){
          this.isPlaying=false;
          clearInterval(this.timer);
        }
        if(status==this.MEDIA_STOPPED){
          this.isPlaying=false;
          clearInterval(this.timer);
          if(this.index!=this.list.length-1 && this.progress==100){
            this.index=this.index+1;
            this.FileHash=this.list[this.index].FileHash;
            this.play();
          }

        }

        let toast = this.toastCtrl.create({
          message: status,
          duration: 800
        });
        toast.present();

      });

      //
      // this.file.onSuccess.subscribe(() => console.log('播放成功'));
      //
      this.file.onError.subscribe((error:any) => {
        let toast = this.toastCtrl.create({
          message: '播放出错...',
          duration: 3000
        });
        toast.present();

      });

      this.file.play();

    });
  }

  getTime(s:number){
    let H=this.getZero(Math.floor(s/3600));
    let M=this.getZero(Math.floor((s%3600)/60));
    let S=this.getZero(Math.floor(s%60));
    if(s>3600){
      return H+":"+M+":"+S;
    }else{
      return M+":"+S;
    }
  }

  getZero(x){
    if(x>9){
      return x;
    }else{
      return "0"+x;
    }
  }

}
