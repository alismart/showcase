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
  templateUrl: './print.component.html'
})
export class PrintComponent implements OnInit {
  myResumes = null;

  constructor(private http: HttpClient, private cvService: CVService, private router: Router) {
  }

  ngOnInit() {

  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
    body{
      box-sizing:border-box;
      font-family: sans-serif;
    }
    .temp2{
      width: 21cm;
      height: 29.7cm;
      margin:auto;
      box-shadow: 0 0 10px black;
      background:#fffff2;
    }
    .img-corner{
      width:35%;
      height:auto;
      float:left;
    }
    .img-corner .person-img{
      width:80%;
      height:auto;
      margin:10%;
      background-color:#eee;
      border-radius:50%;
      border: 1px solid #ec4c00;
    }
    .contact-info{
      width: 65%;
      float: left;
      height: auto;
      margin: 30px 0;
    }
    .contact-info .contact-item{
      width: 40%;
      margin: 5px 5%;
      float: left;
      display: flex;
      align-items: center;
    }
    .contact-info .contact-icon{
      text-align: center;
      width: 20%;
      font-size: 1.5rem;
    }
    .contact-info .contact-desc{
      line-height: 8px;
      font-size: 0.9rem;
    }
    .contact-info .desc-title{
      color: #ec4c00;
      font-weight: bold;
    }
    .left-side{
      width:45%;
      float:left;
      height:auto;
    }
    .name-corner{
      padding: 0 20px 20px 30px;
    }
    .name-corner .name{
      font-size: 30px;
      margin: 5px 0;
      font-family: 'Fjalla One', sans-serif;
    }
    .name-corner .work{
      margin: 5px 0;
      font-size: 18px;
      color: #ec4c00;
    }
    .summary-corner{
      padding:0 30px 20px;
      font-size:.9rem;
    }
    .personal-info{
      padding: 0 20px 20px 30px;
      font-size: .9rem;
      line-height: 20px;
    }
    .personal-info p{
      font-size: 24px;
      color: #ed4c00;
      margin: 15px 0;
      border-bottom: 2px solid #ddd;
      font-family: 'Fjalla One', sans-serif;
    }
    .languages-corner{
      position:relative;
      height: 150px;
    }
    .languages-corner .lang1{
      width: 85px;
      height: 85px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(237, 76, 0, 0.84);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      left: calc(40% - 35px);
    }
    .languages-corner .lang2{
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(119, 119, 119, 0.83);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      left: calc(40% - 75px);
      top: 50px;
    }
    .languages-corner .lang3{
      width: 65px;
      height: 65px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(237, 76, 0, 0.67);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      left: calc(40% + 50px);
      top: 35px;
    }
    .languages-corner .lang4{
      width: 65px;
      height: 65px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(102, 102, 102, 0.9);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      left: 40%;
      top: 70px;
    }
    .achievements-corner{
      padding: 0 20px 0 30px;
      font-size: .9rem;
      line-height: 20px;
    }
    .achievements-corner p{
      font-size: 24px;
      color: #ed4c00;
      margin: 15px 0;
      font-family: 'Fjalla One', sans-serif;
      border-bottom: 2px solid #ddd;
    }
    .achievements-corner .ach-item{
      margin-bottom:20px;
    }
    .achievements-corner .ach-item .ach-title{
      font-size: 17px;
      color: #ed4c00;
      font-weight: bold;
    }
    .achievements-corner .ach-item .ach-time{
      float:right;
    }
    .achievements-corner .ach-item .ach-desc h4{
      margin:10px 0;
    }
    .right-side{
      width:55%;
      float:left;
      height:auto;
      margin-top: -30px;
    }
    .education-corner .corner-title, .work-experience-corner .corner-title , .skills-corner .corner-title , .hoppy-corner .corner-title , .driving-corner .corner-title {
      font-size: 24px;
      color: #ed4c00;
      margin: 15px 15px 15px 0;
      font-family: 'Fjalla One', sans-serif;
      border-bottom: 2px solid #ddd;
    }
    .education-corner .edu-item{ width:100%;}
    .education-corner .edu-time{
      width: 22%;
      float: left;
      font-weight: bold;
    }
    .education-corner .edu-desc{
      width: 76%;
      float: left;
      padding-right: 2%;
      font-size:.9rem;
    //padding-bottom: 10px;
    }
    .education-corner .edu-desc h3{
      margin: 0;
      font-size: 17px;
      color: #ed4c00;
    }
    .work-experience-corner{
      padding-bottom:15px;
    }
    .work-experience-corner .work-item{
      font-size:.9rem;
    }
    .work-experience-corner .work-name{
      font-size: 17px;
      color: #ed4c00;
      font-weight:bold;
    }
    .work-experience-corner .work-time{
      float: right;
      padding: 0 30px 0 0;
    }
    .work-experience-corner .work-desc{
      padding-right: 30px;
    }
    .skills-corner {
      padding-bottom:15px;
    }
    .skills-corner .skill-item{
      font-size:.9rem;
      padding:10px 30px 10px 0;
    }
    .skills-corner progress{
      float:right;
      width: 160px;
      height: 14px;
      display: block;
      /* Important Thing */
      -webkit-appearance: none;
      border: none;
    }
    .skills-corner progress::-webkit-progress-bar {
      background: #ddd;
      border-radius: 50px;
      padding: 2px;
      box-shadow: 0 1px 0px 0 rgba(255, 255, 255, 0.2);
    }
    .skills-corner progress::-webkit-progress-value {
      border-radius: 50px;
      box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.4);
      background: #ed4c00;
    }
    .hoppy-driving{
      width:100%;
    }
    .hoppy-corner{
      width:40%;
      float:left;
      font-size:.9rem;
    }
    .driving-corner{
      width:60%;
      float:left;
      font-size:.9rem;

    }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
