import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddClusterComponent } from 'src/app/dialogs/cluster/add-cluster/add-cluster.component';
import { EditClusterComponent } from 'src/app/dialogs/cluster/edit-cluster/edit-cluster.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteClusterComponent } from 'src/app/dialogs/cluster/delete-cluster/delete-cluster.component';
import { version } from 'punycode';
import { of, Observable, merge, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { startWith, switchMap, map, catchError, pluck, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataBaseRequest, UsersAndProjectsComponent } from '../../users-and-projects/users-and-projects.component';
import { UpgardeClusterComponent } from 'src/app/dialogs/cluster/upgarde-cluster/upgarde-cluster.component';

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
  selector: 'app-cluster-page',
  templateUrl: './cluster-page.component.html',
  styleUrls: ['./cluster-page.component.css']

})
export class ClusterPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'adminUI', 'phase', 'version' , 'ready', 'size', 'connectionString'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  projects: object[] = [{projectName:'project1', projectId: 1}, {projectName:'project2', projectId: 2}];
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

  constructor(public dialog: MatDialog, private _httpClient: HttpClient) {
      
     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource();
  }

  async ngOnInit() {
     this.exampleDatabase = new HttpDatabase(this._httpClient);
   //   this.selectedProject = 'testtt'
     // this.projects$.pipe(map(x=> this.selectedProject = x.projects[0].projName));
     let params = new HttpParams().set('user_id',localStorage.getItem('user_id'));
     this.projects$ = await this._httpClient.get<any>(environment.backendAddress + 'users/project', {params: params});
     this.projects$.subscribe(x=> this.selectedProject = (x[0].projects[0].projName));

     setTimeout(async ()=>{
      await this.getData();

    }, 2000);
  }


  ngAfterViewInit() {
      
      // if (this.data.length == 0) {
      //    this.selectedProject = await this.data[0].metadata.name;
      // }
      
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
          this.resultsLength = data.clusters.length;
          
 
          return data.clusters;
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data = this.rawData.filter(x => x.metadata.name.includes(filterValue.trim().toLowerCase()) || !filterValue.trim().toLowerCase()); 

    if (this.paginator) {
      this.paginator.firstPage();
    }

    console.log(this.selection);
  }

  popUpToAddCluster() {
    const dialogRef = this.dialog.open(AddClusterComponent, {
      width: '50%',
      height: '70%',
      disableClose: true,
      data:  {namespace: this.selectedProject}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      setTimeout(() => {
        this.getData();
        this.selection = new SelectionModel<any>(true, []);
      }, 1000);
    });
  }

  popUpToEditCluster() {
    const dialogRef = this.dialog.open(EditClusterComponent, {
      width: '40%',
      height: '45',
      disableClose: true,
      data: { selector: this.selection.selected, namespace: this.selectedProject }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was updated');
      setTimeout(() => {
        this.getData();
        this.selection = new SelectionModel<any>(true, []);
      }, 1000);
    });

  }

  popUpToUpgradeCluster() {
    const dialogRef = this.dialog.open(UpgardeClusterComponent, {
      width: '30%',
      height: '40%',
      disableClose: true,
      data: { selector: this.selection.selected, namespace: this.selectedProject }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      setTimeout(() => {
        this.getData();
        this.selection = new SelectionModel<any>(true, []);
      }, 1000);
    });
  }

  popUpDeleteToEditCluster() {
    const dialogRef = this.dialog.open(DeleteClusterComponent, {
      width: '30%',
      height: '40%',
      disableClose: true,
      data: { selector: this.selection.selected, namespace: this.selectedProject }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      setTimeout(() => {
        this.getData();
        this.selection = new SelectionModel<any>(true, []);
      }, 1000);
    });

  }  
}

export class HttpDatabase {
   constructor(private _httpClient: HttpClient) {}
   
   getClustersOfProject(selectedProject: string): Observable<any> {

      //  let params = new HttpParams().set('namespace',selectedProject);
      //  return this._httpClient.get<any>(environment.backendAddress + 'clusters', {params: params});

      return of({
         "clusters": [
            {
               "apiVersion": "couchbase.com/v2",
               "kind": "CouchbaseCluster",
               "metadata": {
                  "creationTimestamp": "2020-08-10T16:38:12Z",
                  "generation": 108,
                  "managedFields": [
                     {
                        "apiVersion": "couchbase.com/v2",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                           "f:spec": {
                              ".": {},
                              "f:buckets": {
                                 ".": {},
                                 "f:managed": {}
                              },
                              "f:image": {},
                              "f:security": {
                                 ".": {},
                                 "f:adminSecret": {}
                              }
                           }
                        },
                        "manager": "unknown",
                        "operation": "Update",
                        "time": "2020-08-10T16:38:12Z"
                     },
                     {
                        "apiVersion": "couchbase.com/v2",
                        "fieldsType": "FieldsV1",
                        "fieldsV1": {
                           "f:spec": {
                              "f:backup": {},
                              "f:cluster": {
                                 "f:autoCompaction": {
                                    "f:timeWindow": {},
                                    "f:tombstonePurgeInterval": {}
                                 },
                                 "f:autoFailoverOnDataDiskIssuesTimePeriod": {},
                                 "f:autoFailoverTimeout": {}
                              },
                              "f:logging": {},
                              "f:security": {
                                 "f:rbac": {}
                              },
                              "f:servers": {},
                              "f:softwareUpdateNotifications": {},
                              "f:xdcr": {}
                           },
                           "f:status": {
                              ".": {},
                              "f:buckets": {},
                              "f:clusterId": {},
                              "f:conditions": {},
                              "f:currentVersion": {},
                              "f:members": {
                                 ".": {},
                                 "f:ready": {}
                              },
                              "f:phase": {},
                              "f:size": {}
                           }
                        },
                        "manager": "couchbase-operator",
                        "operation": "Update",
                        "time": "2020-08-10T16:39:48Z"
                     }
                  ],
                  "name": "test",
                  "namespace": "default",
                  "resourceVersion": "1254659",
                  "selfLink": "/apis/couchbase.com/v2/namespaces/default/couchbaseclusters/test",
                  "uid": "601a3adf-a686-42ab-9aa9-ae48f085fb73"
               },
               "spec": {
                  "backup": {},
                  "buckets": {
                     "managed": true
                  },
                  "cluster": {
                     "analyticsServiceMemoryQuota": "1Gi",
                     "autoCompaction": {
                        "databaseFragmentationThreshold": {
                           "percent": 30
                        },
                        "timeWindow": {},
                        "tombstonePurgeInterval": "72h0m0s",
                        "viewFragmentationThreshold": {
                           "percent": 30
                        }
                     },
                     "autoFailoverMaxCount": 3,
                     "autoFailoverOnDataDiskIssuesTimePeriod": "2m0s",
                     "autoFailoverTimeout": "2m0s",
                     "dataServiceMemoryQuota": "256Mi",
                     "eventingServiceMemoryQuota": "256Mi",
                     "indexServiceMemoryQuota": "256Mi",
                     "indexStorageSetting": "memory_optimized",
                     "searchServiceMemoryQuota": "256Mi"
                  },
                  "image": "couchbase/server:6.5.0",
                  "logging": {},
                  "networking": {
                     "adminConsoleServiceType": "NodePort",
                     "exposedFeatureServiceType": "NodePort"
                  },
                  "security": {
                     "adminSecret": "test-auth",
                     "rbac": {}
                  },
                  "securityContext": {
                     "fsGroup": 1000
                  },
                  "servers": [
                     {
                        "name": "all_services",
                        "resources": {},
                        "services": [
                           "data",
                           "index",
                           "query",
                           "search",
                           "eventing",
                           "analytics"
                        ],
                        "size": 1
                     }
                  ],
                  "softwareUpdateNotifications": false,
                  "xdcr": {}
               },
               "status": {
                  "buckets": [
                     {
                        "compressionMode": "passive",
                        "conflictResolution": "seqno",
                        "enableFlush": false,
                        "enableIndexReplica": false,
                        "evictionPolicy": "valueOnly",
                        "ioPriority": "low",
                        "memoryQuota": 100,
                        "name": "default",
                        "password": "",
                        "replicas": 1,
                        "type": "couchbase"
                     }
                  ],
                  "clusterId": "7d016e3829ee73143370c8582da3a8bd",
                  "conditions": [
                     {
                        "lastTransitionTime": "2020-08-10T16:39:47Z",
                        "lastUpdateTime": "2020-08-10T16:39:47Z",
                        "message": "Data is equally distributed across all nodes in the cluster",
                        "reason": "Balanced",
                        "status": "True",
                        "type": "Balanced"
                     },
                     {
                        "lastTransitionTime": "2020-08-10T16:39:44Z",
                        "lastUpdateTime": "2020-08-10T16:39:44Z",
                        "reason": "Available",
                        "status": "True",
                        "type": "Available"
                     }
                  ],
                  "currentVersion": "6.5.0",
                  "members": {
                     "ready": [
                        "test-0000"
                     ]
                  },
                  "phase": "Running",
                  "size": 1
               },
               "adminUI": "https://ui.zeif.couchbaas.xyz",
              "connectionString": "https://console.zeif.couchbaas.xyz:30633"
            }
         ]
      });
   }
 }




