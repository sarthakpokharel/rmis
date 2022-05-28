import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BusinessRegisterComponent } from './business-register/business-register.component';
import { ContentsComponent } from './home/contents/contents.component';
import { HeaderComponent } from './home/header/header.component';
import { InfrastructureCategoryComponent } from './infrastructure-category/infrastructure-category.component';
import { InfrastructureDepreciationComponent } from './infrastructure-depreciation/infrastructure-depreciation.component';
import { InfrastructureTypeComponent } from './infrastructure-type/infrastructure-type.component';
import { JaggaBibaranComponent } from './jagga-bibaran/jagga-bibaran.component';
import { LandNatureComponent } from './land-nature/land-nature.component';
import { LandReceivedTypeComponent } from './land-received-type/land-received-type.component';
import { LandTypeComponent } from './land-type/land-type.component';
import { LandValuationSectorComponent } from './land-valuation-sector/land-valuation-sector.component';
import { ProfessionComponent } from './profession/profession.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { RevenueActivityComponent } from './revenue-activity/revenue-activity.component';
import { RoadInformationComponent } from './road-information/road-information.component';
import { RoadRelationComponent } from './road-relation/road-relation.component';
import { RoadTypeComponent } from './road-type/road-type.component';

const routes: Routes = [
  {

      path: '',
      //component: DesignComponent,
      children: [
        {
          path: '',
          component: HeaderComponent,
          children:[
           
            {
              path: 'rmis/revenue-activity',
              component: RevenueActivityComponent
            },
            {
              path: 'rmis/contents',
              component: ContentsComponent
            },
            {
              path: 'rmis/land-type',
              component: LandTypeComponent
            },
            {
              path: 'rmis/land-nature',
              component: LandNatureComponent
            },
            {
              path: 'rmis/land-received-type',
              component: LandReceivedTypeComponent
            },
            {
              path: 'rmis/land-valuation-sector',
              component:LandValuationSectorComponent
            },
            {
              path: 'rmis/profession',
              component:ProfessionComponent
            },
            {
              path: 'rmis/relationship',
              component:RelationshipComponent
            },
            {
              path: 'rmis/infrastructure-category',
              component:InfrastructureCategoryComponent
            },
            {
              path: 'rmis/infrastructure-type',
              component:InfrastructureTypeComponent
            },
            {
              path: 'rmis/depreciation-rate',
              component:InfrastructureDepreciationComponent
            },
            {
              path: 'rmis/road-type',
              component: RoadTypeComponent
            },
            {
              path: 'rmis/road-relation',
              component: RoadRelationComponent
            },
            {
              path: 'rmis/road-info',
              component: RoadInformationComponent
            },
           {
              path: 'rmis/land-information',
              component: JaggaBibaranComponent
            }
            ,
            {
              path: 'rmis/business-register',
              component: BusinessRegisterComponent
            },
            {
              path: 'business-register',
              component: BusinessRegisterComponent
            },
          ]
        }
      ]
    },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
