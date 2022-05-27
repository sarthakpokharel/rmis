import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var baseUrl:string;
@Component({
  selector: 'app-land-nature',
  templateUrl: './land-nature.component.html',
  styleUrls: ['./land-nature.component.scss']
})
export class LandNatureComponent implements OnInit {

  
  url='';
  partUrl = 'rmis/land-nature';
  gridOptions:any;
  constructor() {
    this.url=baseUrl+'/'+this.partUrl;
    this.gridOptions = "singleSelect:true,collapsible:true,"
                      +"method:'get',"                     
                      +"rownumbers:true, pagination:true,"
                      +"url:'"+this.url+"/list-data'";
  }
  ngAfterViewInit(): void {
    $.parser.parse();
  }

  ngOnInit(): void {
    
  }

  clearForm(formId:string){
    $("#"+formId+" input[data-id='true']").val("");
    $("#"+formId).form('reset');
  }

}
