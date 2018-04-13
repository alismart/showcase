/**
 * Created by ASUS on 8/10/2017.
 */
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CVService} from "../services/cvservice.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: 'work-form',
  templateUrl: './work-form.component.html'
})
export class WorkFormComponent implements OnInit {

  mainForm: any;
  editForm: FormGroup;
  addForm: FormGroup;
  editable = true;
  extraChecked: boolean = false;
  activeEntry = 0;

  years = [];

  toyears = [
    {label: 'present', value: 'present'},
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

  industs = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'}
  ];

  roles = [
    {label: 'Commission', value: '1'},
    {label: 'Contractor', value: 'Contractor'},
    {label: 'Freelancer', value: 'Freelancer'},
    {label: 'Full Time', value: 'Full Time'},
    {label: 'Internship', value: 'Internship'},
    {label: 'Part Time', value: 'Part Time'},
    {label: 'Temporary Work', value: 'Temporary Work'},
    {label: 'Volunteer Work', value: 'Volunteer Work'},
    {label: 'Apprenticeship', value: 'Apprenticeship'},
    {label: 'Cooperative Education Work', value: 'Cooperative Education Work'},
    {label: 'Consultant', value: 'Consultant'},
    {label: 'Student Project', value: 'Student Project'}
  ];

  sizes = [
    {label: '1-9 Employees', value: '1-9 Employees'},
    {label: '10-49 Employees ', value: '10-49 Employees '},
    {label: '50-99 Employees', value: '50-99 Employees'},
    {label: '100-499 Employees', value: '100-499 Employees'},
    {label: '500 Employees or More', value: '500 Employees or More'},
  ];

  emptypes = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'}
  ];

  display = false;

  resumeId = null;

  constructor(private fb: FormBuilder, private cvService: CVService, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId: ' + this.resumeId)
    });
  }

  ngOnInit() {

    let d = new Date();
    let currentYear = d.getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      this.years.push({label: i.toString(), value: i.toString()});
      this.toyears.push({label: i.toString(), value: i.toString()});
    }

    this.formBuild();
    this.getItems();
  }

  formBuild(): void {
    this.mainForm = this.fb.group({
      items: this.fb.array([])
    });
    this.editForm = this.initItem();
    this.addForm = this.initItem();
    //console.log(this.languageEditForm.value);
  }

  initItem() {
    return this.fb.group({
      id: null,
      co_name: null,
      location: null,
      from_year: null,
      from_month: null,
      to_year: null,
      to_month: null,
      co_industry: null,
      job_role: null,
      emp_type: null,
      job_description: null,
      co_size: null,
      last_salary: null,
      website: null,
      co_description: null,
      co_logo: null
    });
  }

  add(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];
    // mycontrol.push(this.initItem());
    const formModel = this.addForm.value;
    const sendData = {
      co_name: formModel.co_name,
      location: formModel.location,
      from_date: new Date(formModel.from_year, formModel.from_month, 1),
      to_date: new Date(formModel.to_year, formModel.to_month, 1),
      co_industry: formModel.co_industry,
      job_role: formModel.job_role,
      emp_type: formModel.emp_type,
      job_description: formModel.job_description,
      co_size: formModel.co_size,
      last_salary: formModel.last_salary,
      website: formModel.website,
      co_description: formModel.co_description,
      co_logo: formModel.co_logo
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createWork(sendData, this.resumeId).subscribe(
      data => {
        console.log(data);
        this.addForm.controls['id'].setValue(data['id']);
        console.log('after updating id: ');
        console.log(this.addForm.value);
        mycontrol.push(this.addForm);
        this.addForm = this.initItem();
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  remove(i): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];
    const id = mycontrol.at(i).get('id').value;
    this.cvService.removeWork(this.resumeId, id).subscribe(
      data => {
        console.log(data);
        mycontrol.removeAt(i);
      },
      error => {
        console.log(error);
      }
    );
  }

  edit(i): void {
    this.activeEntry = i;
    this.extraChecked = false;
    const mycontrol = <FormArray>this.mainForm.controls['items'];
    const myitem = <FormGroup>mycontrol.at(i);

    this.editForm = this.fb.group({
      id: myitem.get('id').value,
      co_name: myitem.get('co_name').value,
      location: myitem.get('location').value,
      from_year: myitem.get('from_year').value,
      from_month: myitem.get('from_month').value,
      to_year: myitem.get('to_year').value,
      to_month: myitem.get('to_month').value,
      co_industry: myitem.get('co_industry').value,
      job_role: myitem.get('job_role').value,
      emp_type: myitem.get('emp_type').value,
      job_description: myitem.get('job_description').value,
      co_size: myitem.get('co_size').value,
      last_salary: myitem.get('last_salary').value,
      website: myitem.get('website').value,
      co_description: myitem.get('co_description').value,
      co_logo: myitem.get('co_logo').value
    });
    console.log(this.editForm.value);
    const editVal = this.editForm.value;
    if (editVal.emp_type || editVal.job_description || editVal.co_size || editVal.last_salary || editVal.website || editVal.co_description || editVal.co_logo)
      this.extraChecked = true;
    this.showDialog();
  }

  save(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];

    const formModel = this.editForm.value;
    const sendData = {
      id: formModel.id,
      co_name: formModel.co_name,
      location: formModel.location,
      from_date: new Date(formModel.from_year, formModel.from_month, 1),
      to_date: new Date(formModel.to_year, formModel.to_month, 1),
      co_industry: formModel.co_industry,
      job_role: formModel.job_role,
      emp_type: formModel.emp_type,
      job_description: formModel.job_description,
      co_size: formModel.co_size,
      last_salary: formModel.last_salary,
      website: formModel.website,
      co_description: formModel.co_description,
      co_logo: formModel.co_logo
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createWork(sendData, this.resumeId).subscribe(
      data => {
        console.log(data);
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );

    mycontrol.setControl(this.activeEntry, this.editForm);
    this.display = false;
  }

  items = [];

  getItems() {
    this.cvService.getWork(this.resumeId).subscribe(
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
    this.mainForm = this.fb.group({
      items: this.fb.array([])
    });
    const myItems = <FormArray>this.mainForm.controls['items'];
    this.items.forEach(
      (el) => {
        console.log(el);
        const item = this.fb.group({
          id: el.id,
          co_name: el.co_name,
          location: el.location,
          from_year: new Date(el.from_date).getFullYear(),
          from_month: new Date(el.from_date).getMonth(),
          to_year: new Date(el.to_date).getFullYear(),
          to_month: new Date(el.to_date).getMonth(),
          co_industry: el.co_industry,
          job_role: el.job_role,
          emp_type: el.emp_type,
          job_description: el.job_description,
          co_size: el.co_size,
          last_salary: el.last_salary,
          website: el.website,
          co_description: el.co_description,
          co_logo: el.co_logo
        });
        myItems.push(item);
      }
    );
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
