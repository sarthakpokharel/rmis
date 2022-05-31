import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { RibbonComponent } from './home/ribbon/ribbon.component';
import { ContentsComponent } from './home/contents/contents.component';
import { FooterComponent } from './home/footer/footer.component';
import { LandTypeComponent } from './land-type/land-type.component';
import { JaggaBibaranComponent } from './jagga-bibaran/jagga-bibaran.component';
import { BusinessRegisterComponent } from './business-register/business-register.component';
import { RoadTypeComponent } from './road-type/road-type.component';
import { LandNatureComponent } from './land-nature/land-nature.component';
import { LandReceivedTypeComponent } from './land-received-type/land-received-type.component';
import { RoadRelationComponent } from './road-relation/road-relation.component';
import { InfrastructureCategoryComponent } from './infrastructure-category/infrastructure-category.component';
import { ProfessionComponent } from './profession/profession.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { LandValuationSectorComponent } from './land-valuation-sector/land-valuation-sector.component';
import { RoadInformationComponent } from './road-information/road-information.component';
import { RevenueActivityComponent } from './revenue-activity/revenue-activity.component';
import { InfrastructureTypeComponent } from './infrastructure-type/infrastructure-type.component';
import { InfrastructureDepreciationComponent } from './infrastructure-depreciation/infrastructure-depreciation.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RibbonComponent,
    ContentsComponent,
    FooterComponent,
    LandTypeComponent,
    JaggaBibaranComponent,
    BusinessRegisterComponent,
    RoadTypeComponent,
    LandNatureComponent,
    LandReceivedTypeComponent,
    RoadRelationComponent,
    InfrastructureCategoryComponent,
    ProfessionComponent,
    RelationshipComponent,
    LandValuationSectorComponent,
    RoadInformationComponent,
    RevenueActivityComponent,
    InfrastructureTypeComponent,
    InfrastructureDepreciationComponent,
    SampleFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
