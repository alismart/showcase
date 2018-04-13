import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CVService} from '../services/cvservice.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
/**
 * Created by ASUS on 7/7/2017.
 */
@Component({
  moduleId: module.id,
  selector: 'skills-form',
  templateUrl: './skills-form.component.html'
})
export class SkillsFormComponent implements OnInit {
  editable = true;
  activeEntry = 0;
  singleMode = true;
  display = false;

  extraChecked = false;
  levels = [
    {label: 'Beginner', value: 'Beginner'},
    {label: 'Intermediate', value: 'Intermediate'},
    {label: 'Expert', value: 'Expert'},
  ];

  years = [];

  completion_years = [
    {label: 'Present', value: 'Present'},

  ];

  months = [
    {label: 'January', value: '1'},
    {label: 'February', value: '2'},
    {label: 'March', value: '3'},
    {label: 'April', value: '4'},
    {label: 'May', value: '5'},
    {label: 'June', value: '6'},
    {label: 'July', value: '7'},
    {label: 'August', value: '8'},
    {label: 'September', value: '9'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'}
  ];
  skillsForm: FormGroup;
  skillEditForm: FormGroup;

  resumeId = null;

  constructor(private fb: FormBuilder, private cvService: CVService, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId: ' + this.resumeId);
    });
  }

  ngOnInit(): void {

    let d = new Date();
    let currentYear = d.getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      this.years.push({label: i.toString(), value: i.toString()});
      this.completion_years.push({label: i.toString(), value: i.toString()});
    }

    this.formBuild();
    this.getItems();
  }

  formBuild(): void {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([this.initSkill()])
    });
    this.skillEditForm = this.initSkill();
  }

  percentage = 0;

  onFullMarkBlurr(x, y) {
    this.percentage = Math.round(x * 100 / y);
    if (y == 0) this.percentage = 0;
  }

  initSkill() {
    return this.fb.group({
      id: null,
      name: '',
      level: '',
      start_year: '', start_month: '',
      completion_year: '', completion_month: '',
      description: ''
    });
  }

  save(): void {
    const mycontrol = <FormArray>this.skillsForm.controls['skills'];

    const formModel = this.skillEditForm.value;

    const skill = {
      id: formModel.id,
      name: formModel.name,
      level: formModel.level,
      start_date: new Date(formModel.start_year, formModel.start_month, 1),
      completion_date: new Date(formModel.completion_year, formModel.completion_month, 1),
      description: formModel.description
    };

    console.log(JSON.stringify(skill));
    this.cvService.createSkill(skill, this.resumeId).subscribe(
      data => {
        console.log(data);

        mycontrol.setControl(this.activeEntry, this.skillEditForm);
        this.display = false;

        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );


  }

  edit(i): void {
    this.activeEntry = i;
    const mycontrol = <FormArray>this.skillsForm.controls['skills'];
    const myskill = <FormGroup>mycontrol.at(i);
    this.skillEditForm = this.fb.group({
      id: myskill.get('id').value,
      name: myskill.get('name').value,
      level: myskill.get('level').value,
      start_year: myskill.get('start_year').value, start_month: myskill.get('start_month').value,
      completion_year: myskill.get('completion_year').value, completion_month: myskill.get('completion_month').value,
      description: myskill.get('description').value
    });
    this.showDialog();
  }

  remove(i): void {
    const mycontrol = <FormArray>this.skillsForm.controls['skills'];
    const id = mycontrol.at(i).get('id').value;
    this.cvService.removeSkill(this.resumeId, id).subscribe(
      data => {
        console.log(data);
        mycontrol.removeAt(i);
      },
      error => {
        console.log(error);
      }
    );
  }

  add(): void {
    const mycontrol = <FormArray>this.skillsForm.controls['skills'];
    const myskill = <FormGroup>mycontrol.controls[mycontrol.length - 1];
    const formModel = mycontrol.controls[mycontrol.length - 1].value;
    console.log(formModel);
    const skill = {
      name: formModel.name,
      level: formModel.level,
      start_date: new Date(formModel.start_year, formModel.start_month, 1),
      completion_date: new Date(formModel.completion_year, formModel.completion_month, 1),
      description: formModel.description
    };
    console.log(JSON.stringify(skill));
    this.cvService.createSkill(skill, this.resumeId).subscribe(
      data => {
        console.log(data);
        if (data['id'])
          myskill.controls['id'].setValue(data['id']);
        console.log('after updating id: ');
        console.log(myskill.value);

        mycontrol.push(this.initSkill());
        this.activeEntry = mycontrol.length - 1;
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );

  }

  items = [];

  getItems() {
    this.cvService.getSkills(this.resumeId).subscribe(
      data => {
        this.items = data['items'];
        this.fillItems();
      },
      error => {
        console.log(error);
      }
    );
  }

  fillItems() {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([])
    });
    const myItems = <FormArray>this.skillsForm.controls['skills'];
    this.items.forEach(
      (el) => {
        console.log(el);
        const item = this.fb.group({
          id: el.id,
          name: el.name,
          level: el.level,
          start_year: new Date(el.start_date).getFullYear(),
          start_month: new Date(el.start_date).getMonth(),
          completion_year: new Date(el.completion_date).getFullYear(),
          completion_month: new Date(el.completion_date).getMonth(),
          description: el.description
        });
        myItems.push(item);
      }
    );
    myItems.push(this.initSkill());
  }

  preview(): void {
    this.getItems();
    this.editable = false;
  }

  editPreview(): void {
    this.editable = true;
  }

  showDialog() {
    this.display = true;
  }
}
