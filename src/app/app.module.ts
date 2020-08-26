import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material-module';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginViewComponent } from './views/login/login-view/login-view.component';
import { SignUpViewComponent } from './views/login/sign-up-view/sign-up-view.component';
import { MenuViewComponent } from './views/menu-view/menu-view.component';
import { ClusterPageComponent } from './components/cluster/cluster-page/cluster-page.component';
import { StatisticsPageComponent } from './components/statistics/statistics-page/statistics-page.component';
import { AddClusterComponent } from './dialogs/cluster/add-cluster/add-cluster.component';
import { EditClusterComponent } from './dialogs/cluster/edit-cluster/edit-cluster.component';
import { DeleteClusterComponent } from './dialogs/cluster/delete-cluster/delete-cluster.component';
import { ChartsModule } from 'ng2-charts';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { AuthguardsGuard } from './guards/auth/authguards.guard';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule }  from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UsersAndProjectsComponent } from './components/users-and-projects/users-and-projects.component';
import { AddProjectComponent } from './dialogs/add-project/add-project.component';
import { DeleteProjectComponent } from './dialogs/delete-project/delete-project.component';
import { AddUserToProjectComponent } from './dialogs/add-user-to-project/add-user-to-project.component';
import { UpgardeClusterComponent } from './dialogs/cluster/upgarde-cluster/upgarde-cluster.component';
import { DeploymentComponent } from './views/deploy/deployment/deployment.component';
import { LogsComponent } from './views/logs/logs/logs.component';
import { HeatMapComponent } from './views/heatMap/heat-map/heat-map.component';
import { RepositoryComponent } from './views/repository/repository/repository.component';
import { UsersAndGroupsComponent } from './views/usersAndGroups/users-and-groups/users-and-groups.component';
import { MatInputModule } from '@angular/material/input';


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
    LoginViewComponent,
    MenuViewComponent,
    SignUpViewComponent,
    ClusterPageComponent,
    StatisticsPageComponent,
    AddClusterComponent,
    EditClusterComponent,
    DeleteClusterComponent,
    UsersAndProjectsComponent,
    AddProjectComponent,
    AddUserToProjectComponent,
    DeleteProjectComponent,
    AddUserToProjectComponent,
    UpgardeClusterComponent,
    DeploymentComponent,
    LogsComponent,
    HeatMapComponent,
    RepositoryComponent,
    UsersAndGroupsComponent
  ],
  exports: [MenuViewComponent],
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
  entryComponents: [AddClusterComponent, EditClusterComponent, DeleteClusterComponent, AddProjectComponent, AddUserToProjectComponent,DeleteProjectComponent, UpgardeClusterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
