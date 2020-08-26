import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface User {
  id: number;
  fullName: string;
  email: string;
  pass: string;
}


@Component({
  selector: 'app-add-user-to-project',
  templateUrl: './add-user-to-project.component.html',
  styleUrls: ['./add-user-to-project.component.css']
})
export class AddUserToProjectComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  hide = true;
  invalidErrorMsg;
  isError = true;

  selector: any;
  panelOpenState = false;


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,
    public dialogRef: MatDialogRef<AddUserToProjectComponent>,  @Inject(MAT_DIALOG_DATA) public data: {selector: any}) { }

  ngOnInit() {
    this.selector = this.data.selector;
    this.createForm();
   
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'user_email': [null, [Validators.required, Validators.pattern(emailregex)]]
    });
  }

  getErrorEmail() {
    return this.formGroup.get('user_email').hasError('required') ? 'Field is required' :
      this.formGroup.get('user_email').hasError('pattern') ? 'Not a valid emailaddress' : '';
  }

  get user_email() {
    return this.formGroup.get('user_email') as FormControl
  }




  async onSubmit(data) {

        if (localStorage.getItem('username') == data.user_email) {
          this.invalidErrorMsg = "You can't add yourself to a project this way, you should use: Add Project buttom"
        } 
        else {

              const isExsist = await this.httpClient.get(environment.backendAddress + 'users/specific', { params: { email: data.user_email } }).toPromise()
            .then(res => res != undefined ? false : true);
            console.log(isExsist);
            if (!isExsist) {

              this.selector.forEach(async project => {
            
                let body = {
                  projName: project.projName,
                  user_id: await this.httpClient.get(environment.backendAddress + 'users/specific', { params: { email: data.user_email } }).toPromise()
                    .then(res => {
                      console.log(res)
                      return res[0].id })
                }

                console.log(body);
                // Add the user to the project 
                await this.httpClient.post(environment.backendAddress + 'projects', body).toPromise();
                await this.dialogRef.close();

              })
            
            }
            else {
            this.invalidErrorMsg ='This user is not exsist'; 
            setTimeout(() => {
              this.isError = true;
            }, 1000);
            this.isError = false;
          }
        }
      }
        
      
  }
