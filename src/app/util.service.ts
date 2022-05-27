import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public AppName:string="SuTRA";// = '{{appinfo.get("name")}}';
	public AppFullName:string="Sub National Treasury Regulatory Application";// = '{{appinfo.get("fullname")}}';
	public CopyRight:string = "FCGO";//'{{appinfo.get("copyright")}}';
	public AppId:string="100542491070891777";//='{{appinfo.get("id")}}';
	public isdirty:boolean = false;
	public baseUrl:string="http://localhost:4200/";//= '{{baseUrl}}';
	public lang:string="Np";// = '{{session('language')}}';
//	window.localStorage.setItem('loggedin','0');
  constructor() { }
}
