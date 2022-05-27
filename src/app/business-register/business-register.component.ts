import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-business-register',
  templateUrl: './business-register.component.html',
  styleUrls: ['./business-register.component.scss']
})
export class BusinessRegisterComponent implements OnInit {

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
