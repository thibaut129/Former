import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Routing **/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** Component **/
import { PlatformComponent } from './platform/platform.component';
import { FormComponent } from './form/form.component';
import { GlobalComponent } from './global/global.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* Form */
import { TypeMobilityComponent } from './form/type-mobility/type-mobility.component';
import { LegalComponent } from './form/legal/legal.component';
import { CityComponent } from './form/city/city.component';
import { CompanyComponent } from './form/company/company.component';
import { PersonalInfoComponent } from './form/personal-info/personal-info.component';
import { PhotoComponent } from './form/photo/photo.component';
import { ConfirmationFormComponent } from './form/confirmation-form/confirmation-form.component';
import { SubjectComponent } from './form/subject/subject.component';
import {SchoolComponent} from "./form/school/school.component";
import { CountryComponent } from './form/country/country.component';
import { SummaryComponent } from './form/summary/summary.component';

import {FilterPipe, SortByPipe} from './form/pipes'

/* Platform */
import { BottomComponent } from './platform/bottom/bottom.component';
import { RightComponent } from './platform/right/right.component';
import { CenterComponent } from './platform/center/center.component';
import { DemoComponent } from './platform/demo/demo.component';

import {SwipeTestComponent} from './platform/swipe-test/swipe-test.component';

/** Plug in **/
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "./platform/modal/modal.component";
import { ModalContentComponent } from './platform/modal-content/modal-content.component';

import {DragAndDropModule} from 'angular-draggable-droppable';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { AngularOpenlayersModule } from 'ngx-openlayers';

/** Map **/
import {AgmSnazzyInfoWindowModule} from "@agm/snazzy-info-window";
import { MbscModule, mobiscroll } from '@mobiscroll/angular-trial';

/** Service **/
import {DataService} from "./services/data.service";
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';
import { ExperienceService } from './services/experience.service';
import { MarkerService } from './services/marker.service';
import { CompanyService } from './services/company.service';


mobiscroll.apiKey = 'f8d8cc78';

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
    SwipeTestComponent,
    ModalComponent,
    // NgbdModalContent,
    ModalContentComponent,
    FilterPipe, SortByPipe,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBm2qiQBy-OfNNSYy6vQ6pW3pIv2syva0c",
      libraries: ["places"]
    }),
    MbscModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AgmSnazzyInfoWindowModule,
    AngularOpenlayersModule,
    DragAndDropModule.forRoot(),
    NgbModule.forRoot()
  ],
  entryComponents: [
    // NgbdModalContent,
    ModalContentComponent
  ],
  providers: [
    TodoService,
    UserService,
    ExperienceService,
    MarkerService,
    CompanyService,
    DataService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
