import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-active-project',
  templateUrl: './active-project.component.html',
  styleUrls: ['./active-project.component.css']
})
export class ActiveProjectComponent implements OnInit {
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
  searchTerm: string;
  keyword: any;
  activeProjects: any[] = [];

  constructor(private http: HttpClient,private fb: FormBuilder) {
    this.http.get<any[]>('http://localhost:3000/getactiveprojects/')
    .subscribe((data) => {
      this.activeProjects = data;
    });
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/getactiveprojects/')
      .subscribe((data) => {
        this.projects = data;
        this.totalProjects = this.projects.length;
      });
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }

  getVisibleProjects() {
    return this.projects.slice(this.currentPage * this.projectsPerPage, (this.currentPage + 1) * this.projectsPerPage);
  }

  showDetails(project:any ) {
    this.showDiv = true;
    this.selectedProject = project;
  }

  myFun() {
    this.selectedProject = null;
    this.editMode = false;
  }

  saveChanges() {
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

  // truncate description
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


  searchProjects() {
    // if (!this.searchTerm) {
    //   alert('Please provide a search term');
    //   return;
    // }

    this.http.get(`http://localhost:3000/activesearch/${this.searchTerm}`)
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


  onSearchTermChanged() {
    if (!this.searchTerm) {
    // If the search term is empty, show all active projects
     this.projects = this.activeProjects;
    this.totalProjects = this.projects.length;
    }
    }

// techstack add and remove
addTechStack() {
  this.selectedProject.techstack.push({ skill: '' });
}

deleteTechStack(index:any) {
  this.selectedProject.techstack.splice(index, 1);
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

documenturl(){
  this.selectedProject.documentUrl;
  window.open(this.selectedProject.documentUrl, '_blank');
  console.log(this.selectedProject.documentUrl);
}

}
