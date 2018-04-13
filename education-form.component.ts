import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Education, AcademicResearch} from "./education-data-model";
import {CVService} from "../services/cvservice.service";
import {Observable} from "rxjs";
// import {MapsAPILoader} from "angular2-google-maps/core";
import {ActivatedRoute} from "@angular/router";
/**
 * Created by Ali Arous on 7/7/2017.
 */
@Component({
  moduleId: module.id,
  selector: 'education-form',
  templateUrl: './education-form.component.html',
  styles: []
})
export class EducationFormComponent implements OnInit {
  editable = true;
  activeEntry = 0;

  extraChecked = false;
  levels = [
    {label: 'Some secondary school coursework', value: 'Some secondary school coursework'},
    {label: 'Secondary School Or Equivalent', value: 'Secondary School Or Equivalent'},
    {label: 'Vocational', value: 'Vocational'},
    {label: 'Some College Coursework Complete', value: 'Some College Coursework Complete'},
    {label: 'Bachelor\'s Degree', value: 'Bachelor\'s Degree'},
    {label: 'Diploma', value: 'Diploma'},
    {label: 'Doctorate', value: 'Doctorate'},
    {label: 'Higher diploma', value: 'Higher diploma'},
    {label: 'High school or equivalent', value: 'High school or equivalent'},
    {label: 'Master\'s degree', value: 'Master\'s degree'}
  ];

  years = [];

  yearsWithPresent = [
    {label: 'Present', value: 'null'},
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
  educationForm: FormGroup;
  editForm: FormGroup;

  @ViewChild('loc')
  public locationSearch: ElementRef;

  resumeId = null;

  constructor(private fb: FormBuilder, private cvService: CVService,
              /*private mapsAPILoader: MapsAPILoader,*/
              private ngZone: NgZone,
              private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId: ' + this.resumeId)
    });
  }

  display = false;

  showDialog() {
    this.display = true;
  }


  ngOnInit(): void {
    let d = new Date();
    let currentYear = d.getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      this.years.push({label: i.toString(), value: i.toString()});
      this.yearsWithPresent.push({label: i.toString(), value: i.toString()});
    }

    this.formBuild();
    this.getEducation();
    // this.mapsAPILoader.load().then(()=>{
    //   new google.maps.places.Autocomplete(this.locationSearch.nativeElement);
    // });
  }

  formBuild(): void {
    this.educationForm = this.fb.group({
      degrees: this.fb.array([this.initDegree()])
    });
    this.editForm = this.initDegree();
  }

  percentage = 0;

  onFullMarkBlurr(x, y) {
    this.percentage = Math.round(x * 100 / y);
    if (y == 0) this.percentage = 0;
  }

  initDegree() {
    return this.fb.group({
      id: null,
      college: '',
      location: '',
      degree_level: '',
      major: null,
      start_year: '', start_month: '',
      completion_year: '', completion_month: '',
      grade: '', full_grade: '',
      certificate: '',
      college_website: '',
      description: '',
      subject: '',
      academic_researches: this.fb.array([])
    });
  }

  initResearch() {
    return this.fb.group({
      id: null,
      project_title: null,
      project_description: null
    });
  }

  prepareAcademicResearches(ar) {
    let res = [];
    for (let x of ar) {
      if (x.project_title != null)
        res.push(Object.assign({}, x))
    }
    return res;
  }

  save(): void {
    const mycontrol = <FormArray>this.educationForm.controls['degrees'];

    const formModel = this.editForm.value;
    const d = formModel;
    const academicResearchesDeepCopy = this.prepareAcademicResearches(d.academic_researches);
    const myresearches = <FormArray>this.editForm.controls['academic_researches'];
    for (let i = 0; i < myresearches.length; i++) {
      if (!myresearches.at(i).get('project_title').value)
        myresearches.removeAt(i);
    }
    let comp_date = null;
    console.log(d.completion_year);
    if (d.completion_year == "present") {
      comp_date = 'present';
      console.log('helloooo');
    }
    else {
      console.log('else part');
      comp_date = new Date(d.completion_year, d.completion_month, 1);
    }
    const degree = {
      id: d.id,
      college: d.college,
      location: d.location,
      degree_level: d.degree_level,
      major: d.major,
      start_date: new Date(d.start_year, d.start_month, 1),
      completion_date: comp_date,
      grade: d.grade,
      full_grade: d.full_grade,
      certificate: d.certificate,
      college_website: d.college_website,
      description: d.description,
      subject: d.subject,
      academic_researches: academicResearchesDeepCopy
    };

    console.log(JSON.stringify(degree));
    this.cvService.createEducation(degree, this.resumeId).subscribe(
      data => {
        console.log(data);

        const myars = <FormArray>this.editForm.controls['academic_researches'];

        for (let i = 0; i < myars.length; i++) {
          if (myars.at(i).get('id').value == null)
            if (data['academic_researches'][i]) (<FormGroup>myars.at(i)).controls['id'].setValue(data['academic_researches'][i]['id']);
        }
        mycontrol.setControl(this.activeEntry, this.editForm);
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
    const mycontrol = <FormArray>this.educationForm.controls['degrees'];
    const myDegree = <FormGroup>mycontrol.at(i);
    let academicResearchesDeepCopy = this.fb.array([this.initResearch()]);
    if ((<FormArray>myDegree.controls['academic_researches']).controls.length > 0) {
      console.log('YES');
      console.log((<FormArray>myDegree.controls['academic_researches']).controls.length);
      academicResearchesDeepCopy = this.fb.array([]);

      (<FormArray>myDegree.controls['academic_researches']).value.forEach(
        (el) => {
          academicResearchesDeepCopy.push(this.fb.group({
            id: el.id,
            project_title: el.project_title,
            project_description: el.project_description
          }));
        }
      );
      console.log(academicResearchesDeepCopy.value);
    }
    this.editForm = this.fb.group({
      id: myDegree.get('id').value,
      college: myDegree.get('college').value,
      location: myDegree.get('location').value,
      degree_level: myDegree.get('degree_level').value,
      major: myDegree.get('major').value,
      start_year: myDegree.get('start_year').value, start_month: myDegree.get('start_month').value,
      completion_year: myDegree.get('completion_year').value, completion_month: myDegree.get('completion_month').value,
      grade: myDegree.get('grade').value,
      full_grade: myDegree.get('full_grade').value,
      certificate: myDegree.get('certificate').value,
      college_website: myDegree.get('college_website').value,
      description: myDegree.get('description').value,
      subject: myDegree.get('subject').value,
      academic_researches: academicResearchesDeepCopy
    });
    console.log((this.editForm.controls.academic_researches as FormArray).length);
    this.display = true;
  }

  remove(i): void {
    const mycontrol = <FormArray>this.educationForm.controls['degrees'];
    const id = mycontrol.at(i).get('id').value;
    this.cvService.removeEducation(this.resumeId, id).subscribe(
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

    const mycontrol = <FormArray>this.educationForm.controls['degrees'];
    const myDegree = <FormGroup>mycontrol.controls[mycontrol.length - 1];
    const formModel = mycontrol.controls[mycontrol.length - 1].value;
    console.log(formModel);
    const d = formModel;
    const academicResearchesDeepCopy = this.prepareAcademicResearches(d.academic_researches);
    let comp_date = null;
    console.log(d.completion_year);
    if (d.completion_year == "present" || d.completion_year == null) {
      comp_date = null;
    }
    else {
      comp_date = new Date(d.completion_year, d.completion_month, 1);
    }
    const degree = {
      college: d.college,
      location: d.location,
      degree_level: d.degree_level,
      major: d.major,
      start_date: new Date(d.start_year, d.start_month, 1),
      completion_date: comp_date,
      grade: d.grade,
      full_grade: d.full_grade,
      certificate: d.certificate,
      college_website: d.college_website,
      description: d.description,
      subject: d.subject,
      academic_researches: []
    };
    console.log(JSON.stringify(degree));
    this.cvService.createEducation(degree, this.resumeId).subscribe(
      data => {
        console.log(data);
        myDegree.controls['id'].setValue(data['degree'].id);
        console.log('after updating id: ');
        console.log(JSON.stringify(myDegree.value));
        mycontrol.push(this.initDegree());
        this.activeEntry = mycontrol.length - 1;
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  degrees = [];

  getEducation() {
    this.cvService.getEducation(this.resumeId).subscribe(
      data => {
        this.degrees = data['degrees'];
        this.fillEducation();
      },
      error => {
        console.log(error);
      }
    );
  }

  fillEducation() {
    this.educationForm = this.fb.group({
      degrees: this.fb.array([])
    });
    const myDegs = <FormArray>this.educationForm.controls['degrees'];
    this.degrees.forEach(
      (el) => {
        const myRes = this.fb.array([]);
        el.academic_researches.forEach(
          (x) => {
            myRes.push(this.fb.group({
              id: x.id,
              project_title: x.project_title,
              project_description: x.project_description
            }));
          }
        );
        console.log(el);
        let comp_date = null, comp_year = null, comp_month = null;

        if (el.completion_date != null) {
          const myCompDate = new Date(el.completion_date);
          comp_year = myCompDate.getFullYear();
          comp_month = myCompDate.getMonth();
        }
        comp_date == null;
        const dg = this.fb.group({
          id: el.id,
          college: el.college,
          location: el.location,
          degree_level: el.degree_level,
          major: el.major,
          start_year: new Date(el.start_date).getFullYear(), start_month: new Date(el.start_date).getMonth(),
          completion_year: comp_year, completion_month: comp_month,
          grade: el.grade, full_grade: el.full_grade,
          certificate: el.certificate,
          college_website: el.college_website,
          description: el.description,
          subject: el.subject,
          academic_researches: myRes
        });
        myDegs.push(dg);
      }
    );
    myDegs.push(this.initDegree());
  }

  addResearch(degree): void {
    const mycontrol = <FormArray>degree.controls['academic_researches'];
    mycontrol.push(this.initResearch());
  }

  removeResearch(degree, j): void {
    const mycontrol = <FormArray>degree.controls['academic_researches'];
    const id = mycontrol.at(j).get('id').value;
    this.cvService.removeResearch(this.resumeId, id).subscribe(
      data => {
        console.log(data);
        mycontrol.removeAt(j);
      },
      error => {
        console.log(error);
      }
    );

  }

  preview(): void {
    this.getEducation();
    this.editable = false;
  }

  editPreview(): void {
    this.editable = true;
  }
}
