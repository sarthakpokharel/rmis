import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentsComponent } from './home/contents/contents.component';
import { HeaderComponent } from './home/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children:[{
      path: '',
      component: HeaderComponent,
      children: [
        {
          path: 'contents',
          component: ContentsComponent
        }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
