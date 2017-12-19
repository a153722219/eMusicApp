import { Component} from '@angular/core';
import { CommServiceProvider } from '../../providers/comm-service/comm-service';
import {MusicProvider} from "../../providers/music/music";
import { ModalController } from 'ionic-angular';
import {DetailPage} from "../../pages/detail/detail";

@Component({
  selector: 'player',
  templateUrl: 'player.html'
})
export class PlayerComponent {

  constructor(
    public ms:CommServiceProvider,
    public music:MusicProvider,
    public mCtr:ModalController) {

    this.ms.change.subscribe((data:any)=>{
        for(let item of data.list){
          if(!item.FileHash){
            item.FileHash=item.hash;
          }
        }

        this.music.list=data.list;
        this.music.index=data.index;
        this.music.FileHash=data.list[data.index].FileHash;
        this.music.play();
    })

  }
  openDetail(){
    let modal = this.mCtr.create(DetailPage);
    modal.present();
  }

}
