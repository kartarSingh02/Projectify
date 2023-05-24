import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
// import { exec } from 'child_process';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})


export class AddProjectComponent {
  // fileInput: ElementRef;
  form: FormGroup;

  selectedFile: File;
  filePath: any;

  onUpload() {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }


    //script run hogi
    // output 
  }
  

  onFileSelected(event: any) {
    this.filePath = event.target.files[0].path;
    this.http.post('/api/upload', { filePath: this.filePath })
    .subscribe((result) => {
      console.log(result);
    });
    // this.selectedFile = event.target.files[0];
    // if (this.selectedFile) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const text = reader.result as string;
    //     console.log(text);
    //   };
    //   reader.readAsText(this.selectedFile);
    // }
    // const file = event.target.files[0];

  }
  
  

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router){
  }
  ngOnInit() {
    this.form = this.fb.group({
      clientName: [''],
      projectName: [''],
      category: [''],
      projectDescription:[''],
      startDate: [''],
      endDate: [''],
      techstack:this.fb.array([]),
      country:[''],
      budget:[''],
      team: this.fb.array([]),
      toolUsed:this.fb.array([]),
      tagUsed:this.fb.array([]),
      webAddress:[''],
      documentUrl:[''],
    });
  }


  // ------tags used-------
  tagUsed() : FormArray{
    return this.form.get('tagUsed') as FormArray;
  }

  newTag():FormGroup{
    return this.fb.group({
      tags: ''
    });
  }

  addTags() {
    this.tagUsed().push(this.newTag());
  }


  removeTag(index:number) {
    this.tagUsed().removeAt(index);
  }
  
  // ------tags used--------

  //-------tools Used------
  toolUsed() : FormArray{
    return this.form.get('toolUsed') as FormArray;
  }

  newTools():FormGroup{
    return this.fb.group({
      tools: ''
    });
  }

  addTools() {
    this.toolUsed().push(this.newTools());
  }


  removeTools(index:number) {
    this.toolUsed().removeAt(index);
  }


  //-----tool Used------


  //------techstack-----
  techstack() : FormArray{
    return this.form.get('techstack') as FormArray;
  }

  newtechstack():FormGroup{
    return this.fb.group({
      skill: ''
    });
  }

  addTechstack() {
    this.techstack().push(this.newtechstack());
  }


  removeTechstack(index:number) {
    this.techstack().removeAt(index);
  }
  //------techstack-----

  //----- team array----- 
  employees(): FormArray {
    return this.form.get('team') as FormArray;
  }
  newEmployee(): FormGroup {
    return this.fb.group({
      membername: '',
      role: '',
      
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
  //----team array-----
 

  //--------------------------------- SUBMIT--------------------------------
  submit() {
    let endDate = new Date(this.form.value.endDate).getTime();
    let currentDate = new Date().getTime();
  
    console.log(this.form.value);
    this.http.post('http://localhost:3000/addprojects/', this.form.value)
      .subscribe(res => {
        console.log(res);
        // reset the form after successful submission
        this.form.reset();
        const toolUsed = this.form.get('toolUsed') as FormArray;
        toolUsed.clear();

        const techstack=this.form.get('techstack') as FormArray;
        techstack.clear();

        const team=this.form.get('team') as FormArray;
        team.clear();

        const tagUsed=this.form.get('tagUsed') as FormArray;
        tagUsed.clear();


        alert('form has been successfully submitted');
      });
  }
  
  
}
