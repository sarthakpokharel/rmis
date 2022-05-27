import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AjxService {
  private _width:number;
  private _height:number;
  constructor() { 
    this._width=screen.width;
    this._height=screen.height;
  }
  set Width(value:number){
    this._width=value;
  }
  get Width(){
    return this._width;
  }
  set Height(value:number){
    this._height=value;
  }
  get Height(){
    return this._height;
  }
  wds(key:string){
    //check in local db
    // if found return
    //else
    // post to the server and return key
  }

  proceedServer(a:any){
    alert("this is test");
  }

}
