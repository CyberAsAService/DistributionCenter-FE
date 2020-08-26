import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from 'src/app/components/cluster/cluster-page/cluster-page.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-cluster',
  templateUrl: './delete-cluster.component.html',
  styleUrls: ['./delete-cluster.component.css']
})
export class DeleteClusterComponent implements OnInit {
  selector: any;
  panelOpenState = false;


  constructor(public dialogRef: MatDialogRef<DeleteClusterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selector: any, namespace: any}, private httpClient: HttpClient) { }

  ngOnInit() {
    this.selector = this.data.selector;
  }

  deleteClusters() {
    return this.selector.forEach(cluster => {
      return this.httpClient.delete(environment.backendAddress + 'clusters/' + cluster.metadata.name, {params: {namespace: this.data.namespace }}).subscribe();
    }, this.dialogRef.close()); 

  }

}
