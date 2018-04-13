/**
 * Created by ASUS on 10/14/2017.
 */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../auth/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CVService} from "../services/cvservice.service";
import {Router} from "@angular/router";
@Component({
  moduleId: module.id,
  templateUrl: './user-resumes.component.html',
  styles: [`body {
    background-color: rgba(255, 251, 15, 0.34);
  }

  .vertical-offset-100 {
    padding-top: 100px;
  }`]
})
export class UserResumesComponent implements OnInit {
  myResumes = null;

  constructor(private http: HttpClient, private cvService: CVService, private router: Router) {
  }

  ngOnInit() {
    this.getUserResumes();
  }

  getUserResumes() {
    this.cvService.getUserResumes().subscribe(
      data => {
        this.myResumes = data;
        console.log(this.myResumes);
      },
      err => console.log(err)
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  createCV() {
    this.cvService.createResume().subscribe(
      data => {
        console.log(data);
        this.getUserResumes();

      },
      error => {
        console.log(error);
      });
  }
}
