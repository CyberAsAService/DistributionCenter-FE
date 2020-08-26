import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material-module';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { AuthguardsGuard } from './guards/auth/authguards.guard';
import { FormsModule }  from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DeploymentComponent } from './views/deploy/deployment/deployment.component';
import { LogsComponent } from './views/logs/logs/logs.component';
import { HeatMapComponent } from './views/heatMap/heat-map/heat-map.component';
import { RepositoryComponent } from './views/repository/repository/repository.component';
import { UsersAndGroupsComponent } from './views/usersAndGroups/users-and-groups/users-and-groups.component';
import { MatInputModule } from '@angular/material/input';
import { MenuViewComponent } from './views/menu-view/menu-view.component';


const appRoutes: Routes = [
  { path: '', component: DeploymentComponent },
  { path: 'deploy', component: DeploymentComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'heatMap', component: HeatMapComponent },
  { path: 'repository', component: RepositoryComponent},
  { path: 'usersAndGroup', component: UsersAndGroupsComponent},
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [
    AppComponent,
    DeploymentComponent,
    LogsComponent,
    HeatMapComponent,
    RepositoryComponent,
    UsersAndGroupsComponent,
    MenuViewComponent
  ],
  exports: [],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ChartsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    HttpClientModule,
    MatInputModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
