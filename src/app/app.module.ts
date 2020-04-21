import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { TotalCasesComponent } from './total-cases/total-cases.component';
import { DataDisplayComponent } from './data-display/data-display.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TotalCasesComponent,
    DataDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    LoadingBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
