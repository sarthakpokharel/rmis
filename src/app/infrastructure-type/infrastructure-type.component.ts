import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
declare var $: any;
declare var baseUrl:string;

@Component({
  selector: 'app-infrastructure-type',
  templateUrl: './infrastructure-type.component.html',
  styleUrls: ['./infrastructure-type.component.scss']
})
export class InfrastructureTypeComponent implements OnInit {

  url='';
  partUrl = 'rmis/infrastructure-type';
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
