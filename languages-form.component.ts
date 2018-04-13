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
  selector: 'languages-form',
  templateUrl: './languages-form.component.html'
})
export class LanguagesFormComponent implements OnInit {

  languagesForm: any;
  languageEditForm: FormGroup;
  languageAddForm: FormGroup;
  editable = true;
  activeEntry = 0;
  languages = [
    {label: 'Arabic', value: 'Arabic'},
    {label: 'English', value: 'English'},
    {label: 'French', value: 'French'}
  ];
  levels = [
    {label: 'A1', value: 'A1'},
    {label: 'A2', value: 'A2'},
    {label: 'B1', value: 'B1'},
    {label: 'B2', value: 'B2'},
    {label: 'C1', value: 'C1'},
    {label: 'C2', value: 'C2'}
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
    this.languagesForm = this.fb.group({
      languages: this.fb.array([])
    });
    this.languageEditForm = this.initLanguage();
    this.languageAddForm = this.initLanguage();

  }

  initLanguage() {
    return this.fb.group({
      id: null,
      name: null,
      type: 'Native',
      listening: 'A1',
      reading: 'A1',
      speaking: 'A1',
      writing: 'A1'
    });
  }

  add(): void {
    const mycontrol = <FormArray>this.languagesForm.controls['languages'];

    const formModel = this.languageAddForm.value;
    const language = {
      name: formModel.name,
      type: formModel.type,
      listening: formModel.listening,
      reading: formModel.reading,
      speaking: formModel.speaking,
      writing: formModel.writing
    };
    console.log(JSON.stringify(language));
    this.cvService.createLanguage(language, this.resumeId).subscribe(
      data => {
        console.log(data);
        this.languageAddForm.controls['id'].setValue(data['id']);
        console.log('after updating id: ');
        console.log(this.languageAddForm.value);
        mycontrol.push(this.languageAddForm);
        this.languageAddForm = this.initLanguage();
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  remove(i): void {
    const mycontrol = <FormArray>this.languagesForm.controls['languages'];
    const id = mycontrol.at(i).get('id').value;
    this.cvService.removeLanguage(this.resumeId, id).subscribe(
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
    const mycontrol = <FormArray>this.languagesForm.controls['languages'];
    const mylanguage = <FormGroup>mycontrol.at(i);


    this.languageEditForm = this.fb.group({
      id: mylanguage.get('id').value,
      name: mylanguage.get('name').value,
      type: mylanguage.get('type').value,
      listening: mylanguage.get('listening').value,
      reading: mylanguage.get('reading').value,
      speaking: mylanguage.get('speaking').value,
      writing: mylanguage.get('writing').value
    });
    console.log(this.languageEditForm.value);
    this.showDialog();
  }

  save(): void {
    const mycontrol = <FormArray>this.languagesForm.controls['languages'];

    const formModel = this.languageEditForm.value;
    const language = {
      id: formModel.id,
      name: formModel.name,
      type: formModel.type,
      listening: formModel.listening,
      reading: formModel.listening,
      speaking: formModel.speaking,
      writing: formModel.writing
    };
    console.log(JSON.stringify(language));
    this.cvService.createLanguage(language, this.resumeId).subscribe(
      data => {
        console.log(data);
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );

    mycontrol.setControl(this.activeEntry, this.languageEditForm);
    this.display = false;
  }

  items = [];

  getItems() {
    this.cvService.getLanguages(this.resumeId).subscribe(
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

    this.languagesForm = this.fb.group({
      languages: this.fb.array([])
    });
    const myItems = <FormArray>this.languagesForm.controls['languages'];
    this.items.forEach(
      (el) => {
        console.log(el);
        const item = this.fb.group({
          id: el.id,
          name: el.name,
          type: el.type,
          listening: el.listening,
          reading: el.reading,
          speaking: el.speaking,
          writing: el.writing
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
