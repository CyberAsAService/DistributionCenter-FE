import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from 'src/app/components/cluster/cluster-page/cluster-page.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.css']
})
export class EditClusterComponent implements OnInit {
  selector: any;
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  hide = true;
  isloading = false;

  constructor(public dialogRef: MatDialogRef<EditClusterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selector: any, namespace: any},
              private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.selector = this.data.selector;
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'cluster_id': [{value: '', disabled: true}, Validators.required],
      'count': [this.selector[0].status.size, [Validators.required, this.isNumber]],
    });
  }


  isNumber(control) {
    let enteredNumber = control.value
    let numberCheck = /^([1-9]|[1-9][0-9]*)$/;
    return (!numberCheck.test(enteredNumber) && enteredNumber) ? { 'requirements': true } : null;
  }

  getErrorCount() {
    return this.formGroup.get('count').hasError('required') ? 'Field is required' :
      this.formGroup.get('count').hasError('requirements') ? 'Need to be a number' : '';
  }


  get cluster_id() {
    return this.formGroup.get('cluster_id') as FormControl
  }

  get count() {
    return this.formGroup.get('count') as FormControl
  }

  // get version() {
  //   return this.formGroup.get('version') as FormControl
  // }

  async onSubmit(data) {
    let body = {
      count: +data.count
    }
    this.isloading = true;
    await this.httpClient.patch(environment.backendAddress + 'clusters/' + this.selector[0].metadata.name, body, {params: {namespace: this.data.namespace}}).toPromise().then(() => this.isloading = false);
    await this.dialogRef.close();
  }

}
