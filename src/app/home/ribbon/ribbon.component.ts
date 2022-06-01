import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
declare var $: any;
declare var baseUrl: string;

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {

  baseUrl!: string;
  tabb: any;
  negligibleValue = null;


  menu:any = [{ "submenu": "", "icon": "", "Applicationid": 34093130461831102, "appname": "RMIS" },
   { "submenu": "", "icon": "cog", "Applicationid": 29482949869438657, "appname": "Configuration" }, 
   { "submenu": "", "icon": "briefcase", "Applicationid": 65846643517049436, "appname": "Budgeting" },
    { "submenu": "", "icon": "check-square", "Applicationid": 37781135689024285, "appname": "Authorization" }, 
    { "submenu": [{ "tabmenuname": "Revenue/Grant (Receipts)", "submenu": "", "icon": "menuimage/incomereport.gif", "menuid": 468523678350254 }, 
      { "tabmenuname": "Divisible Fund", "submenu": "", "icon": "menuimage/incomereport.gif", "menuid": 54753908995498879 }], 
      "icon": "money", "Applicationid": 61292789829646642, "appname": "Revenue" }, 
    { "submenu": "", "icon": "suitcase", "Applicationid": 43568434084660159, "appname": "Consolidated Fund" }, 
    { "submenu": [{ "tabmenuname": "Appropriation Expenses", "submenu": "", "icon": "menuimage/incomereport.gif", "menuid": 48502814592000644 }, { "tabmenuname": "Operational Fund", "submenu": "", "icon": "", "menuid": 13608868067344652 }, { "tabmenuname": "Inter Government Authorization", "submenu": "", "icon": "", "menuid": 5735018614412414 }], "icon": "credit-card", "Applicationid": 67007933039059703, "appname": "Appropriation Accounting" }, 
    { "submenu": "", "icon": "users", "Applicationid": 9438898077354189, "appname": "Payroll" }, 
    { "submenu": "", "icon": "tasks", "Applicationid": 29351938025498085, "appname": "Audit Queries" }, { "submenu": "", "icon": "folder", "Applicationid": 27323594384418359, "appname": "Dharauti" }, 
    { "submenu": "", "icon": "shopping-cart", "Applicationid": 7333032853174744, "appname": "Procurement Management" }, 
    { "submenu": "", "icon": "bar-chart", "Applicationid": 67888296731417193, "appname": "Annual Report" }, 
    { "submenu": "", "icon": "bank", "Applicationid": 48204062677068844, "appname": "Day Close" }, 
    { "submenu": "", "icon": "newspaper-o", "Applicationid": 35626181267833254, "appname": "Monitoring" }];

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.baseUrl = baseUrl;

  }
  ngAfterContentChecked() {
  }

  ngOnInit(): void {
    $.get(baseUrl + '/get-ribbon', (dt: any, staus: any, jqxhr: any) => {
      //console.log(jqxhr);
      if (dt && dt.length) {
        for (const tab of dt) {
          for (const group of tab.groupItems) {
            var items = [];
            if (group.groupItems.length <= 3) {
              for (const it of group.groupItems) {
                items.push(it);
              }
              group.groupItems = [items];
            } else {
              var git = [];
              let pushedItems = 0;
              for (const it of group.groupItems) {
                if (pushedItems < 3) {
                  git.push(it);
                  pushedItems++;
                } else {
                  items.push(git);
                  git = [];
                  git.push(it);
                  pushedItems = 1;
                }
              }
              if (git.length > 0) {
                items.push(git);
              }
              group.groupItems = items;
            }
          }
        }
        this.tabb = dt;
      }
    });

    var element = this.document.getElementsByClassName('variable-width')

    for (var i = 1; i < element.length; i++) {
      element[i].classList.remove('active');
      element[i].classList.remove('in');
    }


  }

  initializeParser() {
    $.parser.parse();
  }
  tabs() {
    // console.log(this.tabb)
    var element = this.document.getElementsByClassName('variable-width')

    for (var i = 0; i < element.length; i++) {
      element[i].classList.remove('active');
      element[i].classList.remove('in');
    }

  }

  openSubmenu(e: any) {

    const ele: HTMLElement = e.target;

    console.log(ele.childNodes[1])

    var elem: any= ele.childNodes[1];
    if (elem.classList.contains('hide')){
      elem.classList.add('show');
      elem.classList.remove('hide');

    }
    else{
      elem.classList.remove('show');
      elem.classList.add('hide');
    }
    // for (let i = 0; i < elem.length; i++) {
    //   // console.log(elem[i])
    //   elem[i].classList.remove('show');
    //   elem[i].classList.add('hide');

    // }
    // ele.nextElementSibling?.classList.remove('hide')
    // ele.nextElementSibling?.classList.add('show')

  }

  closeSubmenu(e: any) {
    const elem: HTMLElement = e.target;
    elem.classList.remove('show');
    elem.classList.add('hide');
  }

  closeAllSubMenus() {
    var elem = this.document.getElementsByClassName('custom-drop');
    for (let i = 0; i < elem.length; i++) {
      // console.log(elem[i])
      elem[i].classList.remove('show');
      elem[i].classList.add('hide');

    }

  }

}
