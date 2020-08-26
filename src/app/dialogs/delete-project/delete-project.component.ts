import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {
  selector: any;
  panelOpenState = false;


  constructor(public dialogRef: MatDialogRef<DeleteProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selector: any}, private httpClient: HttpClient) { }

  ngOnInit() {
    this.selector = this.data.selector;
    console.log(this.selector);
  }

  async deleteProjects() {
   await this.selector.forEach(async project => {
      await this.httpClient.delete(environment.backendAddress + 'projects', {params:{projectName: project.projName}}).toPromise();
    });
    await this.dialogRef.close(); 

  }

}
