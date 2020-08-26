import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-cluster',
  templateUrl: './add-cluster.component.html',
  styleUrls: ['./add-cluster.component.css']
})
export class AddClusterComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  hide = true;
  isloading = false;
  versions = [{version:'6.5.0'}, {version:'6.5.1'}, {version: '6.6.0'}];

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, 
              public dialogRef: MatDialogRef<AddClusterComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: { namespace: any}) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'user_name': [null, Validators.required],
      'password': [null, [Validators.required,  this.checkPassword]],
      'namespace': [{value: '', disabled: true}, Validators.required],
      'storage_size': [null, [Validators.required, this.isNumber]],
      'cluster_id': [null, Validators.required],
      'count': [null, [Validators.required, this.isNumber]],
      'version': [null, Validators.required]
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

  getErrorStorageSize() {
    return this.formGroup.get('storage_size').hasError('required') ? 'Field is required' :
      this.formGroup.get('storage_size').hasError('requirements') ? 'Need to be a number' : '';
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  get cluster_id() {
    return this.formGroup.get('cluster_id') as FormControl
  }

  get count() {
    return this.formGroup.get('count') as FormControl
  }

  get user_name() {
    return this.formGroup.get('user_name') as FormControl
  }

  get password() {
    return this.formGroup.get('password') as FormControl
  }

  get namespace() {
    return this.formGroup.get('namespace') as FormControl
  }

  get storage_size() {
    return this.formGroup.get('storage_size') as FormControl
  }

  async onSubmit(data) {
    let body = {
      cluster_id: data.cluster_id,
      count: +data.count,
      user_name: data.user_name,
      storage_size: data.storage_size,
      password: data.password,
      namespace: this.data.namespace,
      cbversion: data.version.version
    }
    this.isloading = true;
    await this.httpClient.post(environment.backendAddress + 'clusters', body).toPromise().then(() => this.isloading = false);
    await this.dialogRef.close();
    // console.log(data);

    // // check 
    // this.isloading = true;
    // await this.httpClient.get<any>(environment.backendAddress + 'users').toPromise().then(() => this.isloading = false);
    // await this.dialogRef.close();
    // console.log(data);
   }

}
