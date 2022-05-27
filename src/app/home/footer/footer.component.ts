import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public baseUrl="http://localhost:8020";
  constructor() { }

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
