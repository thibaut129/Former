import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
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
import { NewCompanyComponent } from './form/new-company/new-company.component';
import { DemoComponent } from './platform/demo/demo.component';
import { SubjectComponent } from './form/subject/subject.component';

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
    NewCompanyComponent,
    DemoComponent,
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    DragAndDropModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
