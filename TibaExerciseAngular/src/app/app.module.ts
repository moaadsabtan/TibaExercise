import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { JwtInterceptor } from "./_helpers";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from "./login";
import { HomeComponent } from "./home";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [BrowserModule,FormsModule,ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatButtonToggleModule,MatToolbarModule,MatTooltipModule,
        MatAutocompleteModule

    ],
    declarations: [AppComponent,
      LoginComponent,
      HomeComponent],

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
