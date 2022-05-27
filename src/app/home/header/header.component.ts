import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var baseUrl:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  appName:any;
  userInfo:any;
  url = baseUrl;
  

  ngOnInit():void {
    $.get(baseUrl+'/rmis/app-info?ribbonid=30792989813406866',(data:any,status:any)=>{
      this.appName = data.appName+"["+data.module+"]"; // "संचितकोष व्यवस्थापन प्रणाली" + "["+ "कन्फिगरेसन" +"]";
      this.userInfo = data.userInfo; // "पंकज अधिकारी [अर्थ मन्त्रालय काठमाडौ]";
    });
  }

  logOut(){
    $.get(baseUrl+"/logout",(dt:any)=>{
      window.location.href = baseUrl+"/login";
    });
  }
}
