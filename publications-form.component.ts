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
  selector: 'publications-form',
  templateUrl: './publications-form.component.html'
})
export class PublicationsFormComponent implements OnInit {


  mainForm: any;
  editForm: FormGroup;
  addForm: FormGroup;
  editable = true;
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
      name: null,
      type: null,
      from_year: null,
      from_month: null,
      to_year: null,
      to_month: null,
      url: null,
      description: null,
      certificate: null
    });
  }

  add(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];

    const formModel = this.addForm.value;
    const sendData = {
      name: formModel.name,
      type: formModel.type,
      from_date: new Date(formModel.from_year, formModel.from_month, 1),
      to_date: new Date(formModel.to_year, formModel.to_month, 1),
      url: formModel.url,
      description: formModel.description,
      certificate: formModel.certificate
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createPublication(sendData, this.resumeId).subscribe(
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
    this.cvService.removePublication(this.resumeId, id).subscribe(
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
      name: myitem.get('name').value,
      type: myitem.get('type').value,
      from_year: myitem.get('from_year').value,
      from_month: myitem.get('from_month').value,
      to_year: myitem.get('to_year').value,
      to_month: myitem.get('to_month').value,
      url: myitem.get('url').value,
      description: myitem.get('description').value,
      certificate: myitem.get('certificate').value
    });
    console.log(this.editForm.value);
    this.showDialog();
  }

  save(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];

    const formModel = this.editForm.value;
    const sendData = {
      id: formModel.id,
      name: formModel.name,
      type: formModel.type,
      from_date: new Date(formModel.from_year, formModel.from_month, 1),
      to_date: new Date(formModel.to_year, formModel.to_month, 1),
      url: formModel.url,
      description: formModel.description,
      certificate: formModel.certificate
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createPublication(sendData, this.resumeId).subscribe(
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
    this.cvService.getPublications(this.resumeId).subscribe(
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
          name: el.name,
          type: el.type,
          from_year: new Date(el.from_date).getFullYear(),
          from_month: new Date(el.from_date).getMonth(),
          to_year: new Date(el.to_date).getFullYear(),
          to_month: new Date(el.to_date).getMonth(),
          url: el.url,
          description: el.description,
          certificate: el.certificate

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
