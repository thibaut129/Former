import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformComponent } from './platform/platform.component';
import { FormComponent } from './form/form.component';
import { GlobalComponent } from './global/global.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/platform', pathMatch: 'full' },
  { path: 'platform', component: PlatformComponent },
  { path: 'form', component: FormComponent },
  { path: 'global', component: GlobalComponent },
  // { path: '**', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/platform', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
