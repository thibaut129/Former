import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformComponent } from './platform/platform.component';
import { FormComponent } from './form/form.component';
import { GlobalComponent } from './global/global.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'platform', component: PlatformComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'global', component: GlobalComponent },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'form', redirectTo: '/form/1', pathMatch: 'full' },
  { path: '**', redirectTo: '/form/1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
