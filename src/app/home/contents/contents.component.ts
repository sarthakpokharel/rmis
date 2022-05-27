import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {

  public baseUrl="http://localhost:8020";
  constructor() {
    
   }
  
  ngOnInit(): void {
  }

  wds(keys:string){
    return keys;
  }
  session(keys:string){
    return keys;
  }
  moduleName(){
    return "RMIS"
  }

}
