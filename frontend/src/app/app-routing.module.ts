import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformComponent } from './platform/platform.component';
import { FormComponent } from './form/form.component';
import { GlobalComponent } from './global/global.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppComponent} from "./app.component";
import {SwipeTestComponent} from "./platform/swipe-test/swipe-test.component";

const routes: Routes = [
  { path: '', component: PageNotFoundComponent },
  { path: 'platform', component: PlatformComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'global', component: GlobalComponent },
  { path: 'swipe', component: SwipeTestComponent },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'form', redirectTo: '/form/1', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
