/**
 * Created by Ali Arous on 4/6/2017.
 */
import {Injectable} from "@angular/core";

import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable()
export class CVService {
  constructor(private http: HttpClient) {
  }

  uri = 'http://localhost/cvs/cvbackend/public/api';

  CompanyRegister(param){
    let body = param;
    return this.http.post(this.uri + '/company/sign-up', body);
  }
  CompanyLogin(param){
    let body = param;
    return this.http.post(this.uri + '/company/sign-in', body);
  }
  UserRegister(param){
    let body = param;
    return this.http.post(this.uri + '/person/sign-up', body);
  }
  UserLogin(param){
    let body = param;
    return this.http.post(this.uri + '/person/sign-in', body);
  }
  EmailExist(email){
    let body=email;
    return this.http.post(this.uri + '/checkIfEmailExist',body);
  }

  createPersonalInfo(pInfo, resumeId) {

    let body = pInfo;

    return this.http.post(this.uri + '/' + resumeId + '/submitpersonalinfo', body);
  }

  getPersonalInfo(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getpersonalinfo');
  }

  createSummary(summary, resumeId) {
    let body = summary;
    return this.http.post(this.uri + '/' + resumeId + '/submitsummary', body)
      ;

  }

  getSummary(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getsummary');
  }

  createContactInfo(contactInfo, resumeId) {
    let body = contactInfo;
    return this.http.post(this.uri + '/' + resumeId + '/submitcontactinfo', body)
      ;

  }

  getContactInfo(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getcontactinfo');
  }

  createEducation(education, resumeId) {
    let body = education;
    return this.http.post(this.uri + '/' + resumeId + '/submiteducation', body)
      ;

  }

  getEducation(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/geteducation');
  }

  removeEducation(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/deleducation/' + itemId);
  }

  removeResearch(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delresearch/' + itemId);
  }


  createSkill(skill, resumeId) {
    let body = skill;
    return this.http.post(this.uri + '/' + resumeId + '/submitskill', body)
      ;

  }

  getSkills(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getskills');
  }

  removeSkill(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delskill/' + itemId);
  }

  createLanguage(language, resumeId) {
    let body = language;
    return this.http.post(this.uri + '/' + resumeId + '/submitlanguage', body)
      ;

  }

  getLanguages(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getlanguages');
  }

  removeLanguage(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/dellanguage/' + itemId);
  }


  createHobby(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submithobby', body)
      ;

  }

  getHobbies(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/gethobbies');
  }

  removeHobby(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delhobby/' + itemId);
  }


  createDrivingLicense(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submitdrivinglicense', body)
      ;

  }

  getDrivingLicense(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getdrivinglicense');
  }

  createAchievement(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submitachievement', body)
      ;

  }

  getAchievements(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getachievements');
  }

  removeAchievement(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delachievement/' + itemId);
  }


  createPublication(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submitpublication', body)
      ;

  }

  getPublications(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getpublications');
  }

  removePublication(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delpublication/' + itemId);
  }


  createMembership(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submitmembership', body)
      ;

  }

  getMemberships(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getmemberships');
  }

  removeMembership(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delmembership/' + itemId);
  }


  createTraining(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submittraining', body)
      ;

  }

  getTraining(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/gettraining');
  }

  removeTraining(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/deltraining/' + itemId);
  }


  createCertification(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submitcertification', body)
      ;

  }

  getCertification(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getcertification');
  }

  removeCertification(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delcertification/' + itemId);
  }


  createWork(param, resumeId) {
    let body = param;
    return this.http.post(this.uri + '/' + resumeId + '/submitwork', body)
      ;

  }

  getWork(resumeId) {
    return this.http.get(this.uri + '/' + resumeId + '/getwork');
  }

  removeWork(resumeId, itemId) {
    return this.http.delete(this.uri + '/' + resumeId + '/delwork/' + itemId);
  }


  getResume(id) {
    return this.http.get(this.uri + '/getresume/' + id)
      ;
  }

  createResume() {
    return this.http.get(this.uri + '/createresume')
      ;
  }

  registerMe(param) {
    let body = param;
    console.log(body);
    return this.http.post(this.uri + '/createuser', body);
  }

  logMeIn(param) {
    let body = param;
    return this.http.post(this.uri + '/login', body);
  }

  getUserResumes() {
    return this.http.get(this.uri + '/getmyresumes');
  }
}
