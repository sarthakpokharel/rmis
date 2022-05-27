import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
declare var $: any;
declare var baseUrl:string;

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {

  baseUrl!:string;
  tabb:any;
  negligibleValue = null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.baseUrl = baseUrl;
    
   }
   ngAfterContentChecked(){

   }
   ngOnInit(): void {
    $.get(baseUrl+'/get-ribbon',(dt:any,staus:any,jqxhr:any)=>{
      //console.log(jqxhr);
      if(dt && dt.length){
        for(const tab of dt){
          for(const group of tab.groupItems){
            var items = [];
            if(group.groupItems.length <= 3){
              for(const it of group.groupItems){
                items.push(it);
              }
              group.groupItems=[items];
            }else{
              var git = [];
              let pushedItems = 0;
              for(const it of group.groupItems){
                if(pushedItems < 3 ){
                  git.push(it);
                  pushedItems++;
                }else{
                  items.push(git);
                  git = [];
                  git.push(it);
                  pushedItems = 1;
                }
              }
              if(git.length>0){
                items.push(git);
              }
              group.groupItems=items;
            }
          }
        }
        this.tabb = dt;
      }
    });

    var element = this.document.getElementsByClassName('variable-width')
    
    for (var i = 1; i<element.length; i++){
      element[i].classList.remove('active');
      element[i].classList.remove('in');
    }
  }

  initializeParser(){
    $.parser.parse();
  }
  tabs(){
    console.log(this.tabb)
    var element = this.document.getElementsByClassName('variable-width')

    for (var i = 0; i<element.length; i++){
      element[i].classList.remove('active');
      element[i].classList.remove('in');
    }

  }

  openSubmenu(e:any){

    const ele: HTMLElement = e.target;

    var elem = this.document.getElementsByClassName('custom-drop');
    for (let i=0; i<elem.length; i++){
      console.log(elem[i])
      elem[i].classList.remove('show');
      elem[i].classList.add('hide');

    }
    ele.nextElementSibling?.classList.remove('hide')
    ele.nextElementSibling?.classList.add('show')

  }

  closeSubmenu(e:any){
    const elem: HTMLElement = e.target;
    elem.classList.remove('show');
    elem.classList.add('hide');
  }

  closeAllSubMenus(){
    var elem = this.document.getElementsByClassName('custom-drop');
    for (let i=0; i<elem.length; i++){
      console.log(elem[i])
      elem[i].classList.remove('show');
      elem[i].classList.add('hide');

    }
    
  }

}
