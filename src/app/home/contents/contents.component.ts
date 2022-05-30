import { Component, OnInit } from '@angular/core';
declare var $: any;

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
    $.parser.parse();
  }

}
