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
  selector: 'memberships-form',
  templateUrl: './memberships-form.component.html'
})
export class MembershipsFormComponent implements OnInit {

  mainForm: any;
  editForm: FormGroup;
  addForm: FormGroup;
  editable = true;

  activeEntry = 0;

  years = [];

  toyears = [
    {label: 'present', value: 'present'}
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

  }

  initItem() {
    return this.fb.group({
      id: null,
      organization_name: null,
      membership_name: null,
      location: null,
      from_year: null,
      from_month: null,
      to_year: null,
      to_month: null,
      description: null
    });
  }

  add(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];

    const formModel = this.addForm.value;
    const sendData = {
      organization_name: formModel.organization_name,
      membership_name: formModel.membership_name,
      location: formModel.location,
      from_date: new Date(formModel.from_year, formModel.from_month, 1),
      to_date: new Date(formModel.to_year, formModel.to_month, 1),
      description: formModel.description
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createMembership(sendData, this.resumeId).subscribe(
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
    this.cvService.removeMembership(this.resumeId, id).subscribe(
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
    const mycontrol = <FormArray>this.mainForm.controls['items'];
    const myitem = <FormGroup>mycontrol.at(i);

    this.editForm = this.fb.group({
      id: myitem.get('id').value,
      organization_name: myitem.get('organization_name').value,
      membership_name: myitem.get('membership_name').value,
      location: myitem.get('location').value,
      from_year: myitem.get('from_year').value,
      from_month: myitem.get('from_month').value,
      to_year: myitem.get('to_year').value,
      to_month: myitem.get('to_month').value,
      description: myitem.get('description').value
    });
    console.log(this.editForm.value);
    this.showDialog();
  }

  save(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];

    const formModel = this.editForm.value;
    const sendData = {
      id: formModel.id,
      organization_name: formModel.organization_name,
      membership_name: formModel.membership_name,
      location: formModel.location,
      from_date: new Date(formModel.from_year, formModel.from_month, 1),
      to_date: new Date(formModel.to_year, formModel.to_month, 1),
      description: formModel.description
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createMembership(sendData, this.resumeId).subscribe(
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
    this.cvService.getMemberships(this.resumeId).subscribe(
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
          organization_name: el.organization_name,
          membership_name: el.membership_name,
          location: el.location,
          from_year: new Date(el.from_date).getFullYear(),
          from_month: new Date(el.from_date).getMonth(),
          to_year: new Date(el.to_date).getFullYear(),
          to_month: new Date(el.to_date).getMonth(),
          description: el.description
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
