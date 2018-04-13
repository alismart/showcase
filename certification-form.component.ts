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
  selector: 'certification-form',
  templateUrl: './certification-form.component.html'
})
export class CertificationFormComponent implements OnInit {

  mainForm: any;
  editForm: FormGroup;
  addForm: FormGroup;
  editable = true;

  activeEntry = 0;

  years = [];


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

  days = [
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
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'}
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
      title: null,
      authority: null,
      receipt_year: null,
      receipt_month: null,
      receipt_day: null,
      certificate: null,
      unique_number: null,
      url_code: null,
      valid_year: null,
      valid_month: null,
      valid_day: null,
      summary: null
    });
  }

  add(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];
    const formModel = this.addForm.value;
    const sendData = {
      title: formModel.title,
      authority: formModel.authority,
      receipt_date: new Date(formModel.receipt_year, formModel.receipt_month, formModel.receipt_day),
      unique_number: formModel.unique_number,
      url_code: formModel.url_code,
      valid_date: new Date(formModel.valid_year, formModel.valid_month, formModel.valid_day),
      summary: formModel.summary,
      certificate: formModel.certificate
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createCertification(sendData, this.resumeId).subscribe(
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
    this.cvService.removeCertification(this.resumeId, id).subscribe(
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
      title: myitem.get('title').value,
      authority: myitem.get('authority').value,
      receipt_year: myitem.get('receipt_year').value,
      receipt_month: myitem.get('receipt_month').value,
      receipt_day: myitem.get('receipt_day').value,
      unique_number: myitem.get('unique_number').value,
      url_code: myitem.get('url_code').value,
      valid_year: myitem.get('valid_year').value,
      valid_month: myitem.get('valid_month').value,
      valid_day: myitem.get('valid_day').value,
      summary: myitem.get('summary').value,
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
      title: formModel.title,
      authority: formModel.authority,
      receipt_date: new Date(formModel.receipt_year, formModel.receipt_month, formModel.receipt_day),
      unique_number: formModel.unique_number,
      url_code: formModel.url_code,
      valid_date: new Date(formModel.valid_year, formModel.valid_month, formModel.valid_day),
      summary: formModel.summary,
      certificate: formModel.certificate
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createCertification(sendData, this.resumeId).subscribe(
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
    this.cvService.getCertification(this.resumeId).subscribe(
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
          title: el.title,
          authority: el.authority,
          receipt_year: new Date(el.receipt_date).getFullYear(),
          receipt_month: new Date(el.receipt_date).getMonth(),
          receipt_day: new Date(el.receipt_date).getDay(),
          certificate: el.certificate,
          unique_number: el.unique_number,
          url_code: el.url_code,
          valid_year: new Date(el.valid_date).getFullYear(),
          valid_month: new Date(el.valid_date).getMonth(),
          valid_day: new Date(el.valid_date).getDay(),
          summary: el.summary
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
