/**
 * Created by ASUS on 8/10/2017.
 */
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CVService} from "../services/cvservice.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../node_modules/custom-alert/_services/alert.service";
@Component({
  moduleId: module.id,
  selector: 'driving-license-form',
  templateUrl: './driving-license-form.component.html'
})
export class DrivingLicenseFormComponent implements OnInit {

  mainForm: any;
  editForm: FormGroup;
  addForm: FormGroup;
  editable = true;
  activeEntry = 0;

  licenseExist = false;
  intLicenseExist = false;
  selectedValues: string[] = [];


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

  countries = [
    {label: 'Afghanistan', value: 'Afghanistan'},
    {label: 'Albania', value: 'Albania'},
    {label: 'Andorra', value: 'Andorra'},
    {label: 'Anguilla', value: 'Anguilla'},
    {label: 'Argentina', value: 'Argentina'},
    {label: 'Armenia', value: 'Armenia'},
    {label: 'Australia', value: 'Australia'},
    {label: 'Austria', value: 'Austria'},
    {label: 'Azerbaijan', value: 'Azerbaijan'},
    {label: 'Bahamas', value: 'Bahamas'},
    {label: 'Bahrain', value: 'Bahrain'},
    {label: 'Bangladesh', value: 'Bangladesh'},
    {label: 'Barbados', value: 'Barbados'},
    {label: 'Belarus', value: 'Belarus'},
    {label: 'Belgium', value: 'Belgium'},
    {label: 'Belize', value: 'Belize'},
    {label: 'Benin', value: 'Benin'},
    {label: 'Bhutan', value: 'Bhutan'},
    {label: 'Bolivia', value: 'Bolivia'},
    {label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina'},
    {label: 'Botswana', value: 'Botswana'},
    {label: 'Brazil', value: 'Brazil'},
    {label: 'Brunei', value: 'Brunei'},
    {label: 'Bulgaria', value: 'Bulgaria'},
    {label: 'Burkina Faso', value: 'Burkina Faso'},
    {label: 'Burma', value: 'Burma'},
    {label: 'Burundi', value: 'Burundi'},
    {label: 'Cambodia', value: 'Cambodia'},
    {label: 'Cameroon', value: 'Cameroon'},
    {label: 'Canada', value: 'Canada'},
    {label: 'Cape Verde', value: 'Cape Verde'},
    {label: 'Chad', value: 'Chad'},
    {label: 'Chile', value: 'Chile'},
    {label: 'China', value: 'China'},
    {label: 'Colombia', value: 'Colombia'},
    {label: 'Congo', value: 'Congo'},
    {label: 'Costa Rica', value: 'Costa Rica'},
    {label: 'Croatia(Hrvatska)', value: 'Croatia(Hrvatska)'},
    {label: 'Cuba', value: 'Cuba'},
    {label: 'Cyprus', value: 'Cyprus'},
    {label: 'Czech Republic', value: 'Czech Republic'},
    {label: 'Denmark', value: 'Denmark'},
    {label: 'Djibouti', value: 'Djibouti'},
    {label: 'Dominica', value: 'Dominica'},
    {label: 'Dominican Republic', value: 'Dominican Republic'},
    {label: 'Ecuador', value: 'Ecuador'},
    {label: 'Egypt', value: 'Egypt'},
    {label: 'El Salvador', value: 'El Salvador'},
    {label: 'england', value: 'england'},
    {label: 'Eritrea', value: 'Eritrea'},
    {label: 'Estonia', value: 'Estonia'},
    {label: 'Ethiopia', value: 'Ethiopia'},
    {label: 'Fiji', value: 'Fiji'},
    {label: 'Finland', value: 'Finland'},
    {label: 'France', value: 'France'},
    {label: 'Gabon', value: 'Gabon'},
    {label: 'Gambia', value: 'Gambia'},
    {label: 'Georgia', value: 'Georgia'},
    {label: 'Germany', value: 'Germany'},
    {label: 'Ghana', value: 'Ghana'},
    {label: 'Greece', value: 'Greece'},
    {label: 'Grenada', value: 'Grenada'},
    {label: 'Guatemala', value: 'Guatemala'},
    {label: 'Guinea', value: 'Guinea'},
    {label: 'Guyana', value: 'Guyana'},
    {label: 'Haiti', value: 'Haiti'},
    {label: 'holland', value: 'holland'},
    {label: 'Honduras', value: 'Honduras'},
    {label: 'Hungary', value: 'Hungary'},
    {label: 'Iceland', value: 'Iceland'},
    {label: 'India', value: 'India'},
    {label: 'Indonesia', value: 'Indonesia'},
    {label: 'Iran', value: 'Iran'},
    {label: 'Iraq', value: 'Iraq'},
    {label: 'Ireland', value: 'Ireland'},
    {label: 'Italy', value: 'Italy'},
    {label: 'Jamaica', value: 'Jamaica'},
    {label: 'Japan', value: 'Japan'},
    {label: 'jordan', value: 'jordan'},
    {label: 'Kazakhstan', value: 'Kazakhstan'},
    {label: 'Kenya', value: 'Kenya'},
    {label: 'Kuwait', value: 'Kuwait'},
    {label: 'Laos', value: 'Laos'},
    {label: 'Latvia', value: 'Latvia'},
    {label: 'lebanon', value: 'lebanon'},
    {label: 'Liberia', value: 'Liberia'},
    {label: 'Libya', value: 'Libya'},
    {label: 'Liechtenstein', value: 'Liechtenstein'},
    {label: 'Lithuania', value: 'Lithuania'},
    {label: 'Luxembourg', value: 'Luxembourg'},
    {label: 'Macedonia', value: 'Macedonia'},
    {label: 'Madagascar', value: 'Madagascar'},
    {label: 'Malawi', value: 'Malawi'},
    {label: 'Malaysia', value: 'Malaysia'},
    {label: 'Maldives', value: 'Maldives'},
    {label: 'Mali', value: 'Mali'},
    {label: 'Malta', value: 'Malta'},
    {label: 'Mauritania', value: 'Mauritania'},
    {label: 'Mauritius', value: 'Mauritius'},
    {label: 'Mexico', value: 'Mexico'},
    {label: 'Moldova', value: 'Moldova'},
    {label: 'Monaco', value: 'Monaco'},
    {label: 'Mongolia', value: 'Mongolia'},
    {label: 'Montenegro', value: 'Montenegro'},
    {label: 'Morocco', value: 'Morocco'},
    {label: 'Mozambique', value: 'Mozambique'},
    {label: 'Namibia', value: 'Namibia'},
    {label: 'Nepal', value: 'Nepal'},
    {label: 'Netherlands', value: 'Netherlands'},
    {label: 'New Zealand', value: 'New Zealand'},
    {label: 'Nicaragua', value: 'Nicaragua'},
    {label: 'Niger', value: 'Niger'},
    {label: 'Nigeria', value: 'Nigeria'},
    {label: 'North Korea', value: 'North Korea'},
    {label: 'Norway', value: 'Norway'},
    {label: 'Oman', value: 'Oman'},
    {label: 'Pakistan', value: 'Pakistan'},
    {label: 'Panama', value: 'Panama'},
    {label: 'Papua New Guinea', value: 'Papua New Guinea'},
    {label: 'Paraguay', value: 'Paraguay'},
    {label: 'Peru', value: 'Peru'},
    {label: 'Philippine', value: 'Philippine'},
    {label: 'Poland', value: 'Poland'},
    {label: 'Portugal', value: 'Portugal'},
    {label: 'Qatar', value: 'Qatar'},
    {label: 'Romania', value: 'Romania'},
    {label: 'Russia', value: 'Russia'},
    {label: 'Rwanda', value: 'Rwanda'},
    {label: 'Saudi Arabia', value: 'Saudi Arabia'},
    {label: 'scotland', value: 'scotland'},
    {label: 'Senegal', value: 'Senegal'},
    {label: 'Serbia', value: 'Serbia'},
    {label: 'Seychelles', value: 'Seychelles'},
    {label: 'Sierra Leone	', value: 'Sierra Leone	'},
    {label: 'Singapore', value: 'Singapore'},
    {label: 'Slovakia', value: 'Slovakia'},
    {label: 'Slovenia', value: 'Slovenia'},
    {label: 'Solomon Islands', value: 'Solomon Islands'},
    {label: 'Somalia', value: 'Somalia'},
    {label: 'South Africa', value: 'South Africa'},
    {label: 'South Korea', value: 'South Korea'},
    {label: 'Spain', value: 'Spain'},
    {label: 'Sri Lanka', value: 'Sri Lanka'},
    {label: 'Sudan', value: 'Sudan'},
    {label: 'Suriname', value: 'Suriname'},
    {label: 'Swaziland', value: 'Swaziland'},
    {label: 'Sweden', value: 'Sweden'},
    {label: 'Switzerland', value: 'Switzerland'},
    {label: 'syria', value: 'syria'},
    {label: 'Taiwan', value: 'Taiwan'},
    {label: 'Tajikistan', value: 'Tajikistan'},
    {label: 'Tanzania', value: 'Tanzania'},
    {label: 'Thailand', value: 'Thailand'},
    {label: 'Togo', value: 'Togo'},
    {label: 'Trinidad and Tobago', value: 'Trinidad and Tobago'},
    {label: 'Tunisia', value: 'Tunisia'},
    {label: 'Turkey', value: 'Turkey'},
    {label: 'Turkmenistan', value: 'Turkmenistan'},
    {label: 'Tuvalu', value: 'Tuvalu'},
    {label: 'Uganda', value: 'Uganda'},
    {label: 'Ukraine', value: 'Ukraine'},
    {label: 'United Arab Emirates', value: 'United Arab Emirates'},
    {label: 'United Kingdom', value: 'United Kingdom'},
    {label: 'United States', value: 'United States'},
    {label: 'Uruguay', value: 'Uruguay'},
    {label: 'Uzbekistan', value: 'Uzbekistan'},
    {label: 'Vanuatu', value: 'Vanuatu'},
    {label: 'Venezuela', value: 'Venezuela'},
    {label: 'Vietnam', value: 'Vietnam'},
    {label: 'wales', value: 'wales'},
    {label: 'Samoa', value: 'Samoa'},
    {label: 'Yemen', value: 'Yemen'},
    {label: 'Yugoslavia', value: 'Yugoslavia'},
    {label: 'Zaire', value: 'Zaire'},
    {label: 'Zambia', value: 'Zambia'},
    {label: 'Zimbabwe', value: 'Zimbabwe'},
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

  constructor(private fb: FormBuilder, private cvService: CVService,
              private route: ActivatedRoute, private alertService: AlertService) {
    this.route.parent.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId: ' + this.resumeId)
    });
  }

  ngOnInit() {

    let d = new Date();
    let currentYear = d.getFullYear();
    for (let i = currentYear; i < currentYear + 8; i++) {
      this.years.push({label: i.toString(), value: i.toString()});
    }

    this.formBuild();
    this.getItems();
  }

  formBuild(): void {

    this.addForm = this.initFormGroup();

  }

  initFormGroup() {
    return this.fb.group({
      id: null,
      exist: false,
      category: null,
      country: null,
      valid_year: null,
      valid_month: null,
      certificate: null,
      int_exist: false,
      int_country: null,
      int_valid_year: null,
      int_valid_month: null,
      int_certificate: null
    });
  }

  add(): void {

    const formModel = this.addForm.value;
    const sendData = {
      id: formModel.id,
      exist: formModel.exist,
      category: this.selectedValues.toString(),
      country: formModel.country,
      valid_date: new Date(formModel.valid_year, formModel.valid_month, 1),
      certificate: formModel.certificate,
      int_exist: formModel.int_exist,
      int_country: formModel.int_country,
      int_valid_date: new Date(formModel.int_valid_year, formModel.int_valid_month, 1),
      int_certificate: formModel.int_certificate
    };
    console.log(JSON.stringify(sendData));
    this.cvService.createDrivingLicense(sendData, this.resumeId).subscribe(
      data => {
        console.log(data);
        if (data['id'])
          this.addForm.controls['id'].setValue(data['id']);
        console.log('after updating id: ');
        console.log(this.addForm.value);
        this.preview();
        //this.alertService.success('Saving Succeeded!');

        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  license = null;

  getItems() {
    this.cvService.getDrivingLicense(this.resumeId).subscribe(
      data => {
        this.license = data['license'];
        console.log(this.license);
        this.fillItems();
      },
      error => {
        console.log(error);
      }
    );
  }

  licenseNotExist = false;
  intLicenseNotExist = false;

  fillItems() {
    const cats = this.license.category.split(',');
    console.log(cats);
    this.selectedValues = cats;
    this.addForm =
      this.fb.group({
        id: this.license.id,
        exist: this.license.exist,
        category: null,
        country: this.license.country,
        valid_year: new Date(this.license.valid_date).getFullYear(),
        valid_month: new Date(this.license.valid_date).getMonth(),
        certificate: this.license.certificate,
        int_exist: this.license.int_exist,
        int_country: this.license.int_country,
        int_valid_year: new Date(this.license.int_valid_date).getFullYear(),
        int_valid_month: new Date(this.license.int_valid_date).getMonth(),
        int_certificate: this.license.int_certificate
      });
    this.licenseExist = this.license.exist == 1;
    this.intLicenseExist = this.license.int_exist == 1;
    this.licenseNotExist = !this.licenseExist;
    this.intLicenseNotExist = !this.intLicenseExist;
    console.log('this.licenseExist = ' + this.licenseExist);
    console.log('this.intLicenseExist = ' + this.intLicenseExist);
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
