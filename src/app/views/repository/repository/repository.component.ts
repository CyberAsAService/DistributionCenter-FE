import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  hide = true;
  isloading = false;
  operatingSystems = [{os:'windows 7'}, {os:'windows 10'}, {os: 'rhel 7'}];
  ous = [{ou:'Pazan'}, {ou:'Padam'}, {ou: 'Mador 70'}];
  fileToUpload: File = null;

  
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required], 
      'os': [null, Validators.required],
      'ou': [null, Validators.required]
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  get os() {
    return this.formGroup.get('os') as FormControl
  }

  get ou() {
    return this.formGroup.get('ou') as FormControl
  } 


  onSubmit(data) {
    console.log(data);
  }

}
