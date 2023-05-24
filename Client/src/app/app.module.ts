import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ActiveProjectComponent } from './active-project/active-project.component';
import { CompletedProjectComponent } from './completed-project/completed-project.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DatePipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { TruncatePipe } from './truncate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    // SignupComponent,
    AddProjectComponent,
    ActiveProjectComponent,
    CompletedProjectComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    // ToastrModule.forRoot(),
    AppRoutingModule,
    TooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
