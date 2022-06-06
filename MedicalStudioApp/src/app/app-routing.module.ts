import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'appointments',
    loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {path: 'form', loadChildren: () => import('./features/form/form.module').then(m => m.FormModule)},
  {path: '', redirectTo: 'appointments', pathMatch: 'full'},
  {path: '**', redirectTo: 'appointments'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
