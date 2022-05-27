import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var baseUrl:string;
@Component({
  selector: 'app-road-relation',
  templateUrl: './road-relation.component.html',
  styleUrls: ['./road-relation.component.scss']
})
export class RoadRelationComponent implements OnInit {

  url='';
  partUrl = 'rmis/road-relation';
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
