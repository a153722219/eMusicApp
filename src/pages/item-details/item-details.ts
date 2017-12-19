import { Component } from '@angular/core';
import { HttpService } from '../../providers/http-service/http-service';
import {  LoadingController, NavController, NavParams } from 'ionic-angular';
import { CommServiceProvider } from '../../providers/comm-service/comm-service';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  title:string='搜索结果';
  page:number=1;
  list:Array<any>=[];
  isLoading:boolean=false;

  constructor(
    private http:HttpService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public lc:LoadingController,
    public ms:CommServiceProvider,
    public toastCtrl: ToastController,
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
  }


  ionViewDidLoad(){
    let myl = this.lc.create({
      content:"正在搜索",
      //duration:3000
    });
    myl.present();

    this.http.sendRequest(
      'http://111.230.238.129/RSS/getMList.php?page='+this.page+"&key="+this.navParams.data.query
    ).subscribe(data=>{
      this.list=data.data.lists;
      myl.dismiss();
    });

  }
  play(index){
    this.ms.change.emit({list:this.list,index:index});
  }

  sub(index){
    if(!this.ms.isLogin){
      this.showToast( '请先登录之后再收藏歌曲');
    }else{
      let hash  = this.list[index].FileHash;

      let list =localStorage.subList;

      if(!list){
        let newlist=[];
        this.http.postData(
          'http://111.230.238.129/RSS/getMusic.php','hash='+hash).subscribe(data=>{
          let item =data.data;
          newlist.push(item);
          localStorage.subList = JSON.stringify(newlist);
          this.http.postData(
            'http://111.230.238.129/RSS/upData.php',
            'jsonStr='+localStorage.subList
          ).subscribe(data=>{
            console.log(data);
            if(data.code!=1){
              this.showToast('收藏失败');
            }else{
              this.showToast('收藏成功');
              this.ms.getCount();
            }
          });
          });
      }else{

        let oldList = JSON.parse(list);
        for(let i of oldList){
          if(i.hash==hash){
            this.showToast('该歌曲已经收藏过!');
            return;
          }
        }

        this.http.postData(
          'http://111.230.238.129/RSS/getMusic.php','hash='+hash).subscribe(data=>{
          let item =data.data;
          oldList.push(item);
          localStorage.subList = JSON.stringify(oldList);
          this.http.postData(
            'http://111.230.238.129/RSS/upData.php',
            'jsonStr='+localStorage.subList
          ).subscribe(data=>{
            console.log(data);
            if(data.code!=1){
              this.showToast('收藏失败');
            }else{
              this.showToast('收藏成功');
              this.ms.getCount();
            }
          });

        });

      }



    }


  }

  onScroll(e){
    if(!this.isLoading){
      this.isLoading=true;
      this.page++;
      this.http.sendRequest(
        'http://111.230.238.129/RSS/getMList.php?page='+this.page+"&key="+this.navParams.data.query
      ).subscribe(data=>{
        setTimeout(()=>{
            this.list=this.list.concat(data.data.lists);
            e.complete();
            this.isLoading=false;
        },1200);

      });

    }


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
}
