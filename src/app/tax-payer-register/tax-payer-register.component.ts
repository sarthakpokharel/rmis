import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
declare var $: any;
declare var baseUrl:string;


@Component({
  selector: 'app-tax-payer-register',
  templateUrl: './tax-payer-register.component.html',
  styleUrls: ['./tax-payer-register.component.css']
})
export class TaxPayerRegisterComponent implements OnInit {
  url='';
  partUrl = 'rmis/landtype';
  gridOptions:any;
  table: any[] = [];
  editIndex = -1;
  rn: any = 0;

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

  ngOnInit(): void {}
    

  clearForm(formId:string){
    $("#"+formId+" input[data-id='true']").val("");
    $("#"+formId).form('reset');
  }

  addRow() {

    if (!this.getFormData('nameNp')){
      this.getFormDataElm('nameNp').focus;
      alert("Name Cannot Be Empty")
      return;
    }
    else if (this.getFormData('relationId') == "initialState"){
      this.getFormDataElm('relationId').focus;
      alert("Select a relation");
      return;
    }

      var nameNp = this.getFormData("nameNp");
      var profession = this.getFormData("profession");
      var relation = this.getFormData("relationId");
      var remarks = this.getFormData("remarks");
      if (this.editIndex != -1) {
        this.table[this.editIndex] = [nameNp, profession, relation, remarks];
        this.editIndex = -1;
      } else {
        this.table.push([nameNp, profession, relation, remarks]);
      }
      this.addToTextElm();
      this.clearTblForm();
    

  }
  clearTblForm() {
    const formIds = ["nameNp", "remarks"];
    const otherFormIds = ["profession", "relationId"]
    for (const fid of formIds) {
      (document.getElementById(fid) as HTMLInputElement).value = "";
    }
    for (const i of otherFormIds){
      (document.getElementById(i) as HTMLInputElement).value = "initialState";
    }
  }

  addToTextElm() {
    let stringVals = "";
    for (const row of this.table) {
      for (const v of row) {
        stringVals += v + "#";
      }
      stringVals = stringVals.slice(0, -1) + ";;";
    }
    this.setFormData('fldvls', stringVals);
  }

  getFormData(id: string) {
    return (document.getElementById(id) as HTMLInputElement).value
  }

  getFormDataElm(id: string) {
    return (document.getElementById(id) as HTMLInputElement)
  }

  setFormData(id: string, val: string) {
    (document.getElementById(id) as HTMLInputElement).value = val;
  }

  editData(arr: any, index: any) {
    this.editIndex = index;
    this.setFormData('nameNp', arr[0]);
    this.setFormData('relationId', arr[1]);
    this.setFormData('profession', arr[2]);
    this.setFormData('remarks', arr[3]);
  }
  fieldArray: Array<any> = [];
  newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index: any) {
    this.fieldArray.splice(index, 1);
  }

  deleteData(index: any) {
    this.table.splice(index, 1);
    this.addToTextElm();
  }

}
