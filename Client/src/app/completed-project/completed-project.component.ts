import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
// import axios from 'axios';


@Component({
  selector: 'app-completed-project',
  templateUrl: './completed-project.component.html',
  styleUrls: ['./completed-project.component.css']
})
export class CompletedProjectComponent {
  form: FormGroup;
  showFilterOptions = false;
  projects: any[] = [];
  currentDate = new Date();
  startdate: any;
  projectsPerPage = 10;
  currentPage = 0;
  totalProjects: number;
  isTechstackEdit = false;
  showDiv = false;
  selectedProject:any;
  editMode: boolean;
  searchTerm: string = '';
  keyword: any;
  completedProjects: any[] = [];


  

  constructor(private http: HttpClient,private fb: FormBuilder) {
    // this.http.get<any[]>('http://localhost:3000/getactiveprojects/')
    // .subscribe((data) => {
    //   this.completedProjects = data;
    // });
  }



  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/getcompletedprojects/')
      .subscribe((data) => {
        this.projects = data;
        this.totalProjects = this.projects.length;
        this.currentPage = 0;
      });


  }

  //  -----------------pagination-------------------
  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }

  getVisibleProjects() {
    return this.projects.slice(this.currentPage * this.projectsPerPage, (this.currentPage + 1) * this.projectsPerPage);
  }
  // ------------------------------------------------

  showDetails(project:any ) {
    this.showDiv = true;
    this.selectedProject = project;
  }

  myFun() {
    this.selectedProject = null;
    this.editMode = false;
    // console.log(this.selectedProject,"Kartart");
  }

  saveChanges() {
    // console.log('isNaN?', isNaN(this.selectedProject.projectID));
    const id = this.selectedProject.projectID;
    const url = `http://localhost:3000/updateproject/${id}`;
    
    this.http.patch(url, this.selectedProject).subscribe(
      (response) => {
        console.log('Project updated successfully!', response);
        this.editMode = false;
        alert('Project Updated Successfully');
      },
      (error) => {
        console.error('Error updating project: ', error);
      }
    );  
  }  

// search functionality
  searchProjects() {
    this.http.get(`http://localhost:3000/completedsearch/${this.searchTerm}`)
      .subscribe(
        (data:any) => {
          // Handle the response from the server here
          this.projects =data;
          this.totalProjects = this.projects.length;
          console.log(this.projects);
        },
        (error: any) => {
          // Handle any errors that occurred during the request
          console.error(error);
        }
      );
  }

//  truncated description
truncateDescription(description: string): string {
  const maxWords = 40;
  const words = description.split(' ');
  if (words.length <= maxWords) {
    return description;
  } else {
    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(' ') + '......';
  }
}


// techstack add and remove
  addTechStack() {
    this.selectedProject.techstack.push({ skill: '' });
  }
  
  deleteTechStack(index:any) {
    this.selectedProject.techstack.splice(index, 1);
  }


  // tags add and remove
  addTags() {
    this.selectedProject.tagUsed.push({ tags: '' });
  }
  
  deleteTags(index:any) {
    this.selectedProject.tagUsed.splice(index, 1);
  } 


  // tools add and remove
  addTools() {
    this.selectedProject.toolUsed.push({ tools: '' });
  }
  
  deleteTools(index:any) {
    this.selectedProject.toolUsed.splice(index, 1);
  }

  // team add and remove
  addTeam() {
    this.selectedProject.team.push({ memebername: '' ,role: ''});
  }
  
  deleteTeam(index:any) {
    this.selectedProject.team.splice(index, 1);
  }

  // document url
  documenturl(){
    this.selectedProject.documentUrl;
    window.open(this.selectedProject.documentUrl, '_blank');
    console.log(this.selectedProject.documentUrl);
  }
  
}



