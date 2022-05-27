import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
declare var $: any;
declare var baseUrl:string;
@Component({
  selector: 'app-road-information',
  templateUrl: './road-information.component.html',
  styleUrls: ['./road-information.component.scss']
})
export class RoadInformationComponent implements OnInit {

  url='';
  partUrl = 'rmis/road-info';
  gridOptions:any;
  constructor(public gs:GeneralService) {
    this.url=baseUrl+'/'+this.partUrl;
    this.gridOptions = "singleSelect:true,collapsible:true,"
                      +"method:'get',"                    
                      +"rownumbers:true, pagination:true,"
                      +"url:'"+this.url+"/list-data'";
                      //  +"title:'Load Data',iconCls:'icon-save',"
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
