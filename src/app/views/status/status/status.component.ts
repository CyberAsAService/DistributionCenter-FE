import { StatusService } from 'src/app/services/status/status.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { version } from 'punycode';
import { of, Observable, merge, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { startWith, switchMap, map, catchError, pluck, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

export interface UserData {
  id: string;
  name: string;
  version: string;
}

export interface ClusterData {
  name: string;
  size: number;
  phase: string;
  version: string;
}


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

   titleAlert: string = 'This field is required';
  displayedColumns: string[] = ['select', 'tasks', 'assignedTo', 'likes'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  exampleDatabase: HttpDatabase | null;
  data: any = [];
  rawData:any = [];
  projects$: Observable<any>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedValue = '';
  // selectedProject: BehaviorSubject<string> = new BehaviorSubject("a");
  selectedProject: string;
  formGroup: FormGroup;
  isOpen = false;
  header = '';

  constructor(private formBuilder: FormBuilder,private statusService: StatusService, public dialog: MatDialog, private _httpClient: HttpClient) {
      
     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource();
  }

   ngOnInit() {
     this.exampleDatabase = new HttpDatabase(this._httpClient);
     this.createForm();
      this.getData();
      // setInterval(() => {
    //   this.statusService.getStatus(1); 
    // }, 5000);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'task': [null, Validators.required],
      'assignedTo': [null, Validators.required],
      'likes': [null, Validators.required]
    });
  }
  get task() {
    return this.formGroup.get('task') as FormControl
  }

  get assignedTo() {
    return this.formGroup.get('assignedTo') as FormControl
  }
  
  get likes() {
    return this.formGroup.get('likes') as FormControl
  }

  getData() {
      merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getClustersOfProject(this.selectedProject);
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.tasks.length;
          
 
          return data.tasks;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => {
         this.rawData = data;
         this.data = data;
       });
   }

   onSubmit(data) {
    console.log(data);
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
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openBanner(task: string) {
    if (this.isOpen) {
      this.isOpen = false;
      this.header = '';
    } else {
      this.isOpen = true;
      this.header = task;
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data = this.rawData.filter(x => x.task.includes(filterValue.trim().toLowerCase()) || !filterValue.trim().toLowerCase()); 

    if (this.paginator) {
      this.paginator.firstPage();
    }

    console.log(this.selection);
  }

}

export class HttpDatabase {
   constructor(private _httpClient: HttpClient) {}
   
   getClustersOfProject(selectedProject: string): Observable<any> {

      //  let params = new HttpParams().set('namespace',selectedProject);
      //  return this._httpClient.get<any>(environment.backendAddress + 'clusters', {params: params});

      return of({
         "tasks": [
            {
              "task": "Task1",
               "assignedTo": "Maor Lahav",
                "likes": "5"
            },
            {
              "task": "Task2",
               "assignedTo": "Tal Shafir",
                "likes": "10"
            }
         ]
      });
   }
 }

