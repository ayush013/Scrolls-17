import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgsRevealModule } from 'ng-scrollreveal';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { RouterModule, Routes } from '@angular/router';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import { AuthGuard } from './auth.guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { MemberPipe } from './dashboard/member.pipe';


const DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '',
  maxFilesize: 2,
  maxFiles: 1,
  acceptedFiles: '.pdf'
};

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: '**', redirectTo: '/' },
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingComponent,
    MemberPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    Ng2Webstorage,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    NgsRevealModule.forRoot(),
    DropzoneModule.forRoot(DROPZONE_CONFIG),
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [ServerService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule  { 


}
