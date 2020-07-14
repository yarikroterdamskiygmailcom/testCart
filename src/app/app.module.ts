import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from "./pages/pages.module";
import {MaterialModule} from "./material.module";
import {StoreService} from "./_service/store.service";
import {StoreHistoryService} from "./_service/store.history.service";
import {SitebarComponent} from "./components/sitebar/sitebar.component";
import {InfiniteScrollDirective} from "./directives/infinit.scroll.directive";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SitebarComponent,
    InfiniteScrollDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [StoreService, StoreHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
