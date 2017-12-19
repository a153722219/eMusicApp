import { Injectable,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/http-service/http-service";
@Injectable()
export class CommServiceProvider {
  change: EventEmitter<any>;
  isLogin:boolean=false;
  uname:string='未登陆';
  count:number=0;
  isPlaying:boolean=false;
  constructor(public http:HttpService) {
    this.change = new EventEmitter();
  }
  getCount(){
    this.http.sendRequest('http://111.230.238.129/RSS/getCount.php').subscribe(data=>{
        this.count=data.count || 0;
    });
  }
}
