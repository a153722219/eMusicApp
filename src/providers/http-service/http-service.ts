import {Injectable} from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//Http服务
@Injectable()
export class HttpService {
  constructor(private http: Http) {
  }

  //a-http-get
  sendRequest(url:string){
    return this.http.get(url,{withCredentials:true})
      .map((response: Response) => response.json());
  }


  postData(url: string, options: any, myheaders?: any): Observable<any> {
    const myHeaders: Headers = new Headers();
    //multipart/form-data
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    // tslint:disable-next-line:forin
    for (const key in myheaders) {
      myHeaders.append(key, myheaders[key]);
    }
    return this.http.post(url, options, { headers: myHeaders,withCredentials:true})
      .map((response: Response) => response.json());

  }

  upFile(url: string, options: any, myheaders?: any): Observable<any> {
    const myHeaders: Headers = new Headers();
    // tslint:disable-next-line:forin
    for (const key in myheaders) {
      myHeaders.append(key, myheaders[key]);
    }
    return this.http.post(url, options, { headers: myHeaders,withCredentials:true})
      .map((response: Response) => response.json());

  }
}


