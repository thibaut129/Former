import { MbscModule, mobiscroll } from '@mobiscroll/angular-trial';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';
import { ExperienceService } from './services/experience.service';
import { MarkerService } from './services/marker.service';
import { CompanyService } from './services/company.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DragAndDropModule} from 'angular-draggable-droppable';


import { PlatformComponent } from './platform/platform.component';
import { FormComponent } from './form/form.component';
import { GlobalComponent } from './global/global.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TypeMobilityComponent } from './form/type-mobility/type-mobility.component';
import { LegalComponent } from './form/legal/legal.component';
import { CityComponent } from './form/city/city.component';
import { CompanyComponent } from './form/company/company.component';
import { PersonalInfoComponent } from './form/personal-info/personal-info.component';
import { PhotoComponent } from './form/photo/photo.component';
import { ConfirmationFormComponent } from './form/confirmation-form/confirmation-form.component';
import { BottomComponent } from './platform/bottom/bottom.component';
import { RightComponent } from './platform/right/right.component';
import { CenterComponent } from './platform/center/center.component';
import { DemoComponent } from './platform/demo/demo.component';
import { SubjectComponent } from './form/subject/subject.component';
import {SwipeTestComponent} from './swipe-test/swipe-test.component';
import {SchoolComponent} from "./form/school/school.component";


import { SummaryComponent } from './form/summary/summary.component';
import { CountryComponent } from './form/country/country.component';

mobiscroll.apiKey = 'b81b2fcd';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    GlobalComponent,
    PlatformComponent,
    PageNotFoundComponent,
    TypeMobilityComponent,
    LegalComponent,
    CityComponent,
    CompanyComponent,
    PersonalInfoComponent,
    PhotoComponent,
    ConfirmationFormComponent,
    BottomComponent,
    RightComponent,
    CenterComponent,
    DemoComponent,
    SubjectComponent,
    SummaryComponent,
    CountryComponent,
    SchoolComponent,
    SwipeTestComponent
  ],
  imports: [ 
    MbscModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    DragAndDropModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    TodoService,
    UserService,
    ExperienceService,
    MarkerService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
