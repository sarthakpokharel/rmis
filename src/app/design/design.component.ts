import { Component, OnInit } from '@angular/core';
import { tabList } from '../tabs/tablist';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menuOpen(e:any){
    const element: HTMLElement = e.target;
    var ele = element.nextElementSibling
    
    if (ele?.classList.contains('show')){
      ele?.classList.remove('show')
    }
    else{
      ele?.classList.add('show')
    }

  }

  tabb = tabList;

  reloadPage(rout:any){
    window.history.pushState({}, document.title, "/");
    window.location.pathname = location.pathname + rout;
  }

  openMenu(e:any){
    const element: HTMLElement = e.target;
    const ele = element.nextElementSibling?.nextElementSibling
    const elem = element.nextElementSibling
    if (ele?.classList.contains('show') || elem?.classList.contains('show')){
      ele?.classList.remove('show') 
      elem?.classList.remove('show') 
    }
    else{
      ele?.classList.add('show') 
      elem?.classList.add('show')
    }
    
  }
  openSubMenu(e:any){
    const element: HTMLElement = e.target
    element.nextElementSibling?.classList.add('show')
  } 

  closeSubMenu(e:any){
    const element: HTMLElement = e.target
    element.nextElementSibling?.classList.remove('show')
  }

  hidesidebar(e:any){
    const element: HTMLElement = e.target;
    const ele = element.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
    const icon = document.getElementsByClassName('hideSection')[0]
    const icons = document.getElementsByClassName('bi-chevron-double-right')[0]
    if (ele!.classList.contains('toCollapse')){
      ele!.style.width = '2%';
      ele?.classList.remove('toCollapse')
      icon.setAttribute ('style','display:none')
      icons.setAttribute ('style','margin-left:-22px');
     
      // ele!.style.margin = "0 0 0 35px"
        }
    else{
      ele?.classList.add('toCollapse')
      ele!.style.width = '16%';
      icon.setAttribute ('style','display:')
      icons.setAttribute ('style','margin-left:')
      
    }
    
  }
  

}
