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
  selector: 'training-form',
  templateUrl: './training-form.component.html'
})
export class TrainingFormComponent implements OnInit {

  mainForm: any;
  editForm: FormGroup;
  addForm: FormGroup;
  editable = true;
  activeEntry = 0;

  years = [
    {label: '2017', value: '2017'},
    {label: '2016', value: '2016'},
    {label: '2015', value: '2015'},
    {label: '2014', value: '2014'},
    {label: '2013', value: '2013'},
    {label: '2012', value: '2012'},
    {label: '2011', value: '2011'},
    {label: '2010', value: '2010'}
  ];

  toyears = [
    {label: 'present', value: (new Date().getFullYear())},
    {label: '2017', value: '2017'},
    {label: '2016', value: '2016'},
    {label: '2015', value: '2015'},
    {label: '2014', value: '2014'},
    {label: '2013', value: '2013'},
    {label: '2012', value: '2012'},
    {label: '2011', value: '2011'},
    {label: '2010', value: '2010'}
  ];

  months = [
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
      source: null,
      from_year: null,
      from_month: null,
      from_day: null,
      to_year: null,
      to_month: null,
      to_day: null,
      total_hours: null,
      description: null,
      certificate: null
    });
  }

  add(): void {
    const mycontrol = <FormArray>this.mainForm.controls['items'];
    const formModel = this.addForm.value;
    const sendData = {
      title: formModel.title,
      source: formModel.source,
      from_date: new Date(formModel.from_year, formModel.from_month, formModel.from_day),
      to_date: new Date(formModel.to_year, formModel.to_month, formModel.to_day),
      total_hours: formModel.total_hours,
      description: formModel.description,
      certificate: formModel.certificate
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createTraining(sendData, this.resumeId).subscribe(
      data => {
        console.log(data);
        this.addForm.controls['id'].setValue(data['id']);
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
    this.cvService.removeTraining(this.resumeId, id).subscribe(
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
      source: myitem.get('source').value,
      from_year: myitem.get('from_year').value,
      from_month: myitem.get('from_month').value,
      from_day: myitem.get('from_day').value,
      to_year: myitem.get('to_year').value,
      to_month: myitem.get('to_month').value,
      to_day: myitem.get('to_day').value,
      total_hours: myitem.get('total_hours').value,
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
      title: formModel.title,
      source: formModel.source,
      from_date: new Date(formModel.from_year, formModel.from_month, formModel.from_day),
      to_date: new Date(formModel.to_year, formModel.to_month, formModel.to_day),
      total_hours: formModel.total_hours,
      description: formModel.description,
      certificate: formModel.certificate
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createTraining(sendData, this.resumeId).subscribe(
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
    this.cvService.getTraining(this.resumeId).subscribe(
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
          source: el.source,
          from_year: new Date(el.from_date).getFullYear(),
          from_month: new Date(el.from_date).getMonth(),
          from_day: new Date(el.from_date).getDay(),
          to_year: new Date(el.to_date).getFullYear(),
          to_month: new Date(el.to_date).getMonth(),
          to_day: new Date(el.to_date).getDay(),
          total_hours: el.total_hours,
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
