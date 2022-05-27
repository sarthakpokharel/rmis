import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-jagga-bibaran',
  templateUrl: './jagga-bibaran.component.html',
  styleUrls: ['./jagga-bibaran.component.scss']
})
export class JaggaBibaranComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.parser.parse();
  }

  
  clearForm(formId:string){
    $("#"+formId).form('reset');
  }

  submitForm(formId: string) {
    $("#"+formId).submit();
  }

}
