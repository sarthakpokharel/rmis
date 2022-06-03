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

  sameAsPerAddress(e: any){
    const el: any = e.target;

    const tempDistrictId = this.getFormDataElm('tempDistrictId');
      const tempLocalLevelId =  this.getFormDataElm('tempLocalLevelId');
      const tempWardNo =  this.getFormDataElm ('tempWardNo');
      const tempTole = this.getFormDataElm('tempTole');
      const tempStreet = this.getFormDataElm('tempStreet');
      const tempHouserNo = this.getFormDataElm('tempHouserNo');


    if (el.checked){
      //bring all permanent address and store in temp addresses
      const perDistrictId = this.getFormData('perDistrictId')
      const perLocalLevelId =  this.getFormData('perLocalLevelId');
      const perWardNo =  this.getFormData ('perWardNo');
      const perTole = this.getFormData('perTole');
      const perStreet = this.getFormData('perStreet');
      const perHouserNo = this.getFormData('perHouserNo');

      if (!perDistrictId || !perLocalLevelId || !perWardNo){
        alert("Permanant Address Fields Empty");
        el.checked = false
        return;
      }
      else{
        tempDistrictId.value = perDistrictId;
        tempDistrictId.disabled = true;
  
        tempLocalLevelId.value = perLocalLevelId;
        tempLocalLevelId.disabled = true;
  
        tempWardNo.value = perWardNo;
        tempWardNo.disabled = true;
  
        tempTole.value = perTole;
        tempTole.textContent = perTole;
        tempTole.disabled = true;
  
        tempStreet.value = perStreet;
        tempStreet.textContent = perStreet;
        tempStreet.disabled = true;
  
        tempHouserNo.value = perHouserNo;
        tempHouserNo.textContent = perHouserNo;
        tempHouserNo.disabled = true;
      }


    }
    else{
      tempDistrictId.value = "";
      tempDistrictId.disabled = false;

      tempLocalLevelId.value = "";
      tempLocalLevelId.disabled = false;

      tempWardNo.value = "";
      tempWardNo.disabled = false;

      tempTole.value = "";
      tempTole.textContent = "";
      tempTole.disabled = false;

      tempStreet.value = "";
      tempStreet.textContent = "";
      tempStreet.disabled = false;

      tempHouserNo.value = "";
      tempHouserNo.textContent = "";
      tempHouserNo.disabled = false;
    }
  }
    

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
    else if (this.getFormData('relationId') == ""){
      this.getFormDataElm('relationId').focus;
      alert("Select a relation");
      return;
    }

      var nameNp = this.getFormData("nameNp");
      var profession = this.getFormData("professions");
      var relation = this.getFormData("relationId");
      var remarks = this.getFormData("remarks");
      if (this.editIndex != -1) {
        this.table[this.editIndex] = [nameNp, relation, profession, remarks];
        this.editIndex = -1;
      } else {
        this.table.push([nameNp, relation, profession, remarks]);
      }
      this.addToTextElm();
      this.clearTblForm();
    

  }
  clearTblForm() {
    const formIds = ["nameNp", "remarks"];
    const otherFormIds = ["professions", "relationId"]
    for (const fid of formIds) {
      (document.getElementById(fid) as HTMLInputElement).value = "";
    }
    for (const i of otherFormIds){
      (document.getElementById(i) as HTMLInputElement).value = "";
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
    this.setFormData('professions', arr[2]);
    this.setFormData('remarks', arr[3]);
  }

  deleteData(index: any) {
    this.table.splice(index, 1);
    this.addToTextElm();
  }

}
