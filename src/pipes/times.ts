import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'times' })
export class TimesPipe implements PipeTransform {
  transform(value: number): string {

    if(typeof value !== 'number') {
      throw new Error('Invalid pipe argument for timePipe');
    }

    let H=this.getZero(Math.floor(value/3600));
    let M=this.getZero(Math.floor((value%3600)/60));
    let S=this.getZero(Math.floor(value%60));
    if(value>3600){
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
