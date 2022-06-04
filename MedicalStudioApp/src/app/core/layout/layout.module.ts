import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavSxComponent} from './sidenav-sx/sidenav-sx.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ContactsComponent} from './contacts/contacts.component';
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    SidenavSxComponent,
    NavbarComponent,
    ContactsComponent
  ],
  exports: [
    SidenavSxComponent,
    NavbarComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class LayoutModule {
}
