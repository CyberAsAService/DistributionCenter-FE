import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, merge, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, startWith, map, catchError } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AddProjectComponent } from 'src/app/dialogs/add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProjectComponent } from 'src/app/dialogs/delete-project/delete-project.component';
import { AddUserToProjectComponent } from 'src/app/dialogs/add-user-to-project/add-user-to-project.component';

@Component({
  selector: 'app-users-and-projects',
  templateUrl: './users-and-projects.component.html',
  styleUrls: ['./users-and-projects.component.css']
})
export class UsersAndProjectsComponent implements OnInit {
  projects$: Observable<any>;
  projectPerUserData: DataBaseRequest | null;
  data: any = [];
  resultsLength = 0;
  rawData: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['select','projName', 'Project users'];
  panelOpenState = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedProject: string;
  selection = new SelectionModel<any>(true, []);
  userPerProject$: Observable<any>;

  




  constructor(private _httpClient: HttpClient, private dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {

    // let params = new HttpParams().set('user_id',localStorage.getItem('user_id'));
    // this.projects$ = this._httpClient.get<any>(environment.backendAddress + 'users/project', {params: params});
    // this.projects$.subscribe(x=> console.log(x));
   
  }

  ngAfterViewInit() {
    this.projectPerUserData = new DataBaseRequest(this._httpClient);
    this.getData();
  }

  getData() {
    merge()
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.projectPerUserData!.getProjectPerUser(localStorage.getItem('user_id'));
      }),
      map(data => {
        this.resultsLength = data[0].projects.length;
        console.log(data);
        return data[0].projects;
      }),
      catchError(() => {
        return of([]);
      })
    ).subscribe(data => {
      this.rawData = data;
      this.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data = this.rawData.filter(x => x.projName.includes(filterValue.trim().toLowerCase()) || !filterValue.trim().toLowerCase());

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  popUpAddUserToProject(){
    const dialogRef = this.dialog.open(AddUserToProjectComponent, {
      width: '30%',
      height: '40%',
      disableClose: true,
      data: { selector: this.selection.selected }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    setTimeout(() => {
      this.selection = new SelectionModel<any>(true, []);
      this.getData();
      
    }, 1000);
  });
}

  popUpAddProject() {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '30%',
      height: '30%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      setTimeout(() => {
        this.getData();
        this.selection = new SelectionModel<any>(true, []);
      }, 1000);
    });
  }



  popUptoDeleteProject() {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      width: '30%',
      height: '40%',
      disableClose: true,
      data: { selector: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      setTimeout(() => {
        this.getData();
        this.selection = new SelectionModel<any>(true, []);
      }, 1000);
    });
 

  }

 

isOpen(projName) {
  this.panelOpenState = true;
  this.userPerProject$ = this._httpClient.get<any>(environment.backendAddress + 'projects/user', { params: { proj_name: projName }});
}

isClose() {
  this.panelOpenState = false;
}

}

export class DataBaseRequest {
  constructor(private _httpClient: HttpClient) { }

  getProjectPerUser(userId: string) {
    let params = new HttpParams().set('user_id',userId);
    return this._httpClient.get<any>(environment.backendAddress + 'users/project', {params: params});

    // return of({
    //  "projects": [
    //     { "id": 2,
    //    "pass": "Aa123456",
    //     "firstName": "coral",
    //      "lastName": "ezra", 
    //      "age": 18,
    //       "email": 
    //       "coral123456@gmail.com",
    //        "birthDate": "1999-11-25T22:00:00.000Z",
    //         "phone": 93848484,
    //          "gender": "female",
    //           "projects": [{ "id": 1, "projName": "Project1" }, { "id": 2, "projName": "Project2" }]
    //   }]
    // })
  }


  
}
