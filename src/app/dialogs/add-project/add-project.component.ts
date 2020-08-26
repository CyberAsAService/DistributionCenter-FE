import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  hide = true;
  invalidErrorMsg;
  isError = true;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, 
              public dialogRef: MatDialogRef<AddProjectComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'proj_name': [null,Validators.required]
    });
  }

  get proj_name() {
    return this.formGroup.get('proj_name') as FormControl
  }

  async onSubmit(data) {
    let body = {
      projName: String(data.proj_name).toLowerCase(),
      user_id: localStorage.getItem('user_id')
    }
   const isExsist = await this.httpClient.get(environment.backendAddress + 'projects/specific',{params:{projectName: String(data.proj_name).toLowerCase()}}).toPromise()
                   .then(res => res != undefined ? false: true); 
   if (isExsist) {
    await this.httpClient.post(environment.backendAddress + 'projects', body).toPromise();
    await this.dialogRef.close();
   } else {
    this.invalidErrorMsg ='This project is exsist'; 
    setTimeout(() => {
      this.isError = true;
    }, 1000);
    this.isError = false;
   }
  };


}
