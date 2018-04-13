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
  selector: 'hobbies-form',
  templateUrl: './hobbies-form.component.html'
})
export class HobbiesFormComponent implements OnInit {

  hobbiesForm: any;
  hobbyEditForm: FormGroup;
  hobbyAddForm: FormGroup;
  editable = true;
  activeEntry = 0;


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
    this.hobbiesForm = this.fb.group({
      hobbies: this.fb.array([])
    });
    this.hobbyEditForm = this.initHobby();
    this.hobbyAddForm = this.initHobby();

  }

  initHobby() {
    return this.fb.group({
      id: null,
      name: null,
      description: null
    });
  }

  add(): void {
    const mycontrol = <FormArray>this.hobbiesForm.controls['hobbies'];

    const formModel = this.hobbyAddForm.value;
    const hobby = {
      name: formModel.name,
      description: formModel.description
    };
    console.log(JSON.stringify(hobby));
    this.cvService.createHobby(hobby, this.resumeId).subscribe(
      data => {
        console.log(data);
        this.hobbyAddForm.controls['id'].setValue(data['id']);
        console.log('after updating id: ');
        console.log(this.hobbyAddForm.value);
        mycontrol.push(this.hobbyAddForm);
        this.hobbyAddForm = this.initHobby();
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  remove(i): void {
    const mycontrol = <FormArray>this.hobbiesForm.controls['hobbies'];
    const id = mycontrol.at(i).get('id').value;
    this.cvService.removeHobby(this.resumeId, id).subscribe(
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
    const mycontrol = <FormArray>this.hobbiesForm.controls['hobbies'];
    const myhobby = <FormGroup>mycontrol.at(i);

    this.hobbyEditForm = this.fb.group({
      id: myhobby.get('id').value,
      name: myhobby.get('name').value,
      description: myhobby.get('description').value
    });
    console.log(this.hobbyEditForm.value);
    this.showDialog();
  }

  save(): void {
    const mycontrol = <FormArray>this.hobbiesForm.controls['hobbies'];

    const formModel = this.hobbyEditForm.value;
    const hobby = {
      id: formModel.id,
      name: formModel.name,
      description: formModel.description
    };
    console.log(JSON.stringify(hobby));
    this.cvService.createHobby(hobby, this.resumeId).subscribe(
      data => {
        console.log(data);
        mycontrol.setControl(this.activeEntry, this.hobbyEditForm);
        this.display = false;
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
    this.cvService.getHobbies(this.resumeId).subscribe(
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
    this.hobbiesForm = this.fb.group({
      hobbies: this.fb.array([])
    });
    const myItems = <FormArray>this.hobbiesForm.controls['hobbies'];
    this.items.forEach(
      (el) => {
        console.log(el);
        const item = this.fb.group({
          id: el.id,
          name: el.name,
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
