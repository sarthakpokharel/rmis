import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
declare var $: any;
declare var baseUrl:string;

@Component({
  selector: 'app-revenue-activity',
  templateUrl: './revenue-activity.component.html',
  styleUrls: ['./revenue-activity.component.scss']
})
export class RevenueActivityComponent implements OnInit {

  url='';
  partUrl = 'rmis/revenue-activity';
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
