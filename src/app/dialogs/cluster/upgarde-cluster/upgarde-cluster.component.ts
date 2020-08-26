import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upgarde-cluster',
  templateUrl: './upgarde-cluster.component.html',
  styleUrls: ['./upgarde-cluster.component.css']
})
export class UpgardeClusterComponent implements OnInit {
  selector: any;
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  hide = true;
  versions = [{version:'6.5.0'}, {version:'6.5.1'} ,{version: '6.6.0'}];
  currentVersion: {version: string};
  isloading = false;
  
  constructor(public dialogRef: MatDialogRef<UpgardeClusterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selector: any, namespace: any},
    private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.selector = this.data.selector;
    this.currentVersion = { version: this.selector[0].spec.image.split(':')[1]};
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'cluster_id': [{value: '', disabled: true}, Validators.required],
      'version': [null, Validators.required]
    });

    this.versions = this.versions.filter(x=> (x.version > this.currentVersion.version));
  }

  async onSubmit(data) {
    let body = {
      cbversion: data.version.version
    }
    this.isloading = true;
    await this.httpClient.patch(environment.backendAddress + 'clusters/' + this.selector[0].metadata.name, body, {params: {namespace: this.data.namespace}}).toPromise().then(() => this.isloading = false);
    await this.dialogRef.close();
   // console.log(data);
  }

}
