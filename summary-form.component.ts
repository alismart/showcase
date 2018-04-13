import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CVService} from "../services/cvservice.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'summary-form',

  templateUrl: './summary-form.component.html'
})
export class SummaryFormComponent implements OnInit {
  summaryForm: any;
  summary: any;
  editable = true;
  resumeId = null;
  myDate = null;

  constructor(private fb: FormBuilder, private cvService: CVService, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId: ' + this.resumeId)
    });
  }

  ngOnInit() {
    this.summaryForm = this.fb.group({
      id: null,
      description: null
    });
    this.getSummary();
    this.myDate = new Date(Date.UTC(1992, 7, 7));

    console.log(JSON.stringify(this.myDate));
  }

  save() {
    const formModel = this.summaryForm.value;
    const summaryContent = {
      id: formModel.id,
      description: formModel.description
    };
    console.log(JSON.stringify(summaryContent));
    this.cvService.createSummary(summaryContent, this.resumeId).subscribe(
      data => {
        console.log(data);
        this.summaryForm.controls['id'].setValue(data['id']);

        this.editable = false;
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  getSummary() {
    this.cvService.getSummary(this.resumeId).subscribe(
      data => {
        console.log(data);
        this.summary = data;
        if (this.summary['id']) this.fillSummary();
      },
      error => {
        console.log(error)
      }
    );
  }

  fillSummary() {
    this.summaryForm.patchValue({
      id: this.summary['id'],
      description: this.summary['description']
    });
  }

  edit() {
    this.editable = true;
  }
}
