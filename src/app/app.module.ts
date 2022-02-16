import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CamaraComponent } from './components/camara/camara.component';


import { ToastrModule } from 'ngx-toastr';
import { WebcamModule } from 'ngx-webcam';
import { LuxandService } from './services/luxand.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { DialogresultadoComponent } from './components/dialogresultado/dialogresultado.component';

@NgModule({
  declarations: [
    AppComponent,
    CamaraComponent,
    DialogresultadoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    WebcamModule,
    FormsModule,
    MaterialModule
  ],
  providers: [LuxandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
