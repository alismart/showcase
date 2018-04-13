import {
  Component, OnInit, ElementRef, NgZone, ViewChild, TemplateRef, ContentChild,
  ChangeDetectorRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MapsAPILoader} from '@agm/core';
import {} from 'googlemaps';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {CVService} from '../services/cvservice.service';
import {Observable} from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styles: ['.sebm-google-map-container {height: 200px; width: 100%;float:left;}']
})
export class PersonalInfoFormComponent implements OnInit {

  edit = true;
  isCreated = false;
  id: any;
  titles = [
    {label: '-- unspecified --', value: 'null'},
    {label: 'Mr.', value: 'Mr.'},
    {label: 'Mrs.', value: 'Mrs.'},
    {label: 'Miss', value: 'Miss'},
    {label: 'Ms.', value: 'Ms.'},
    {label: 'Dr.', value: 'Dr.'},
    {label: 'Prof.', value: 'Prof.'}
  ];
  genders = ['male', 'female'];
  maritals = [
    {label: '-- unspecified --', value: 'null'},
    {label: 'Single', value: 'single'},
    {label: 'Married', value: 'married'},
    {label: 'Widow/Widower', value: 'widow/widower'},
    {label: 'Separated', value: 'separated'},
    {label: 'Divorced', value: 'divorced'}
  ];


  nats = [
    {label: 'Afghan', value: 'Afghan'},
    {label: 'Albanian', value: 'Albanian'},
    {label: 'Andorran', value: 'Andorran'},
    {label: 'Angolan', value: 'Angolan'},
    {label: 'Argentinian', value: 'Argentinian'},
    {label: 'Armenian', value: 'Armenian'},
    {label: 'Australian', value: 'Australian'},
    {label: 'Austrian', value: 'Austrian'},
    {label: 'Azerbaijani', value: 'Azerbaijani'},
    {label: 'Bahamian', value: 'Bahamian'},
    {label: 'Bahraini', value: 'Bahraini'},
    {label: 'Bangladeshi', value: 'Bangladeshi'},
    {label: 'Barbadian', value: 'Barbadian'},
    {label: 'Belarusian', value: 'Belarusian'},
    {label: 'Belgian', value: 'Belgian'},
    {label: 'Belizean', value: 'Belizean'},
    {label: 'Beninese', value: 'Beninese'},
    {label: 'Bhutanese', value: 'Bhutanese'},
    {label: 'Bolivian', value: 'Bolivian'},
    {label: 'Bosnian', value: 'Bosnian'},
    {label: 'Botswanan', value: 'Botswanan'},
    {label: 'Brazilian', value: 'Brazilian'},
    {label: 'Bruneian', value: 'Bruneian'},
    {label: 'Bulgarian', value: 'Bulgarian'},
    {label: 'Burkinese', value: 'Burkinese'},
    {label: 'Burmese', value: 'Burmese'},
    {label: 'Burundian', value: 'Burundian'},
    {label: 'Cambodian', value: 'Cambodian'},
    {label: 'Cameroonian', value: 'Cameroonian'},
    {label: 'Canadian', value: 'Canadian'},
    {label: 'Cape Verdean', value: 'Cape Verdean'},
    {label: 'Chadian', value: 'Chadian'},
    {label: 'Chilean', value: 'Chilean'},
    {label: 'Chinese', value: 'Chinese'},
    {label: 'Colombian', value: 'Colombian'},
    {label: 'Congolese', value: 'Congolese'},
    {label: 'Costa Rican', value: 'Costa Rican'},
    {label: 'Croatian', value: 'Croatian'},
    {label: 'Cuban', value: 'Cuban'},
    {label: 'Cypriot', value: 'Cypriot'},
    {label: 'Czech', value: 'Czech'},
    {label: 'Danish', value: 'Danish'},
    {label: 'Djiboutian', value: 'Djiboutian'},
    // {label:'Dominican',value:'Dominica'},
    {label: 'Dominican', value: 'Dominican'},
    {label: 'Ecuadorean', value: 'Ecuadorean'},
    {label: 'Egyptian', value: 'Egyptian'},
    {label: 'Salvadorean', value: 'Salvadorean'},
    {label: 'English', value: 'English'},
    {label: 'Eritrean', value: 'Eritrean'},
    {label: 'Estonian', value: 'Estonian'},
    {label: 'Ethiopian', value: 'Ethiopian'},
    {label: 'Fijian', value: 'Fijian'},
    {label: 'Finnish', value: 'Finnish'},
    {label: 'French', value: 'French'},
    {label: 'Gabonese', value: 'Gabonese'},
    {label: 'Gambian', value: 'Gambian'},
    {label: 'Georgian', value: 'Georgian'},
    {label: 'German', value: 'German'},
    {label: 'Ghanaian', value: 'Ghanaian'},
    {label: 'Greek', value: 'Greek'},
    {label: 'Grenadian', value: 'Grenadian'},
    {label: 'Guatemalan', value: 'Guatemalan'},
    {label: 'Guinean', value: 'Guinean'},
    {label: 'Guyanese', value: 'Guyanese'},
    {label: 'Haitian', value: 'Haitian'},
    {label: 'Dutch', value: 'Dutch'},
    {label: 'Honduran', value: 'Honduran'},
    {label: 'Hungarian', value: 'Hungarian'},
    {label: 'Icelandic', value: 'Icelandic'},
    {label: 'Indian', value: 'Indian'},
    {label: 'Indonesian', value: 'Indonesian'},
    {label: 'Iranian', value: 'Iranian'},
    {label: 'Iraqi', value: 'Iraqi'},
    {label: 'Irish', value: 'Irish'},
    {label: 'Italian', value: 'Italian'},
    {label: 'Jamaican', value: 'Jamaican'},
    {label: 'Japanese', value: 'Japanese'},
    {label: 'Jordanian', value: 'Jordanian'},
    {label: 'Kazakh', value: 'Kazakh'},
    {label: 'Kenyan', value: 'Kenyan'},
    {label: 'Kuwaiti', value: 'Kuwaiti'},
    {label: 'Laotian', value: 'Laotian'},
    {label: 'Latvian', value: 'Latvian'},
    {label: 'Lebanese', value: 'Lebanese'},
    {label: 'Liberian', value: 'Liberian'},
    {label: 'Libyan', value: 'Libyan'},
    {label: 'Liechtensteiner', value: 'Liechtensteiner'},
    {label: 'Lithuanian', value: 'Lithuanian'},
    {label: 'Luxembourger', value: 'Luxembourger'},
    {label: 'Macedonian', value: 'Macedonian'},
    {label: 'Malagasy', value: 'Malagasy'},
    {label: 'Malawian', value: 'Malawian'},
    {label: 'Malaysian', value: 'Malaysian'},
    {label: 'Maldivian', value: 'Maldivian'},
    {label: 'Malian', value: 'Malian'},
    {label: 'Maltese', value: 'Maltese'},
    {label: 'Mauritanian', value: 'Mauritanian'},
    {label: 'Mauritian', value: 'Mauritian'},
    {label: 'Mexican', value: 'Mexican'},
    {label: 'Moldovan', value: 'Moldovan'},
    {label: 'Monacan', value: 'Monacan'},
    {label: 'Mongolian', value: 'Mongolian'},
    {label: 'Montenegrin', value: 'Montenegrin'},
    {label: 'Moroccan', value: 'Moroccan'},
    {label: 'Mozambican', value: 'Mozambican'},
    {label: 'Namibian', value: 'Namibian'},
    {label: 'Nepalese', value: 'Nepalese'},
    // {label:'Dutch',value:'Netherlands'},
    {label: 'New Zealand butter', value: 'New Zealand butter'},
    {label: 'Nicaraguan', value: 'Nicaraguan'},
    {label: 'Nigerien', value: 'Nigerien'},
    {label: 'Nigerian', value: 'Nigerian'},
    {label: 'North Korean', value: 'North Korean'},
    {label: 'Norwegian', value: 'Norwegian'},
    {label: 'Omani', value: 'Omani'},
    {label: 'Pakistani', value: 'Pakistani'},
    {label: 'Panamanian', value: 'Panamanian'},
    {label: 'Papua New Guinean', value: 'Papua New Guinean'},
    {label: 'Paraguayan', value: 'Paraguayan'},
    {label: 'Peruvian', value: 'Peruvian'},
    {label: 'Philippine', value: 'Philippine'},
    {label: 'Polish', value: 'Polish'},
    {label: 'Portuguese', value: 'Portuguese'},
    {label: 'Qatari', value: 'Qatari'},
    {label: 'Romanian', value: 'Romanian'},
    {label: 'Russian', value: 'Russian'},
    {label: 'Rwandan', value: 'Rwandan'},
    {label: 'Saudi Arabian', value: 'Saudi Arabian'},
    {label: 'Scottish', value: 'Scottish'},
    {label: 'Senegalese', value: 'Senegalese'},
    {label: 'Serbian', value: 'Serbian'},
    {label: 'Seychellois', value: 'Seychellois'},
    {label: 'Sierra Leonian', value: 'Sierra Leonian'},
    {label: 'Singaporean', value: 'Singaporean'},
    {label: 'Slovak', value: 'Slovak'},
    {label: 'Slovenian', value: 'Slovenian'},
    {label: 'Solomon Islander', value: 'Solomon Islander'},
    {label: 'Somali', value: 'Somali'},
    {label: 'South African', value: 'South African'},
    {label: 'South Korean', value: 'South Korean'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'Sri Lankan', value: 'Sri Lankan'},
    {label: 'Sudanese', value: 'Sudanese'},
    {label: 'Surinamese', value: 'Surinamese'},
    {label: 'Swazi', value: 'Swazi'},
    {label: 'Swedish', value: 'Swedish'},
    {label: 'Swiss', value: 'Swiss'},
    {label: 'Syrian', value: 'Syrian'},
    {label: 'Taiwanese', value: 'Taiwanese'},
    {label: 'Tajik', value: 'Tajik'},
    {label: 'Tanzanian', value: 'Tanzanian'},
    {label: 'Thai', value: 'Thai'},
    {label: 'Togolese', value: 'Togolese'},
    {label: 'Trinidadian', value: 'Trinidadian'},
    {label: 'Tunisian', value: 'Tunisian'},
    {label: 'Turkish', value: 'Turkish'},
    {label: 'Turkoman', value: 'Turkoman'},
    {label: 'Tuvaluan', value: 'Tuvaluan'},
    {label: 'Ugandan', value: 'Ugandan'},
    {label: 'Ukrainian', value: 'Ukrainian'},
    {label: 'Emirates', value: 'Emirates'},
    {label: 'British', value: 'British'},
    {label: 'US citizen', value: 'US citizen'},
    {label: 'Uruguayan', value: 'Uruguayan'},
    {label: 'Uzbek', value: 'Uzbek'},
    {label: 'Vanuatuan', value: 'Vanuatuan'},
    {label: 'Venezuelan', value: 'Venezuelan'},
    {label: 'Vietnamese', value: 'Vietnamese'},
    {label: 'Welsh', value: 'Welsh'},
    {label: 'Western Samoan', value: 'Western Samoan'},
    {label: 'Yemeni', value: 'Yemeni'},
    {label: 'Yugoslav', value: 'Yugoslav'},
    {label: 'Zaïrean', value: 'Zaïrean'},
    {label: 'Zambian', value: 'Zambian'},
    {label: 'Zimbabwean', value: 'Zimbabwean'},
  ];
  mapper = [];

  visastats = [
    {label: '-- unspecified --', value: 'null'},
    {label: 'Citizen', value: 'Citizen'},
    {label: 'No Visa', value: 'No Visa'},
    {label: 'Residency Visa (Non-Transferable)', value: 'Residency Visa (Non-Transferable)'},
    {label: 'Residency Visa (Transferable)', value: 'Residency Visa (Transferable)'},
    {label: 'Student Visa', value: 'Student Visa'},
    {label: 'Transit Visa', value: 'Transit Visa'},
    {label: 'Visit Visa', value: 'Visit Visa'}
  ];

  days: SelectItem[];
  months: SelectItem[];
  years: SelectItem[];


  personalInfoForm: FormGroup;

  public latitude1: number;
  public longitude1: number;

  public zoom1: number;

  public latitude2: number;
  public longitude2: number;
  public zoom2: number;

  dragEnded(event) {
    this.latitude1 = event.coords.lat;
    this.longitude1 = event.coords.lng;
  }

  dragEnded2(event) {
    this.latitude2 = event.coords.lat;
    this.longitude2 = event.coords.lng;
  }


  resumeId = null;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private formBuilder: FormBuilder,
              private cvService: CVService,
              private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId:' + this.resumeId)
    });
  }

  toggleEdit() {
    this.edit = true;
  }

  pInfo: any;

  createPersonalInfo() {
    this.pInfo = {
      id: this.personalInfoForm.get('id').value,
      titlebefore: this.personalInfoForm.get('titlebefore').value,
      firstname: this.personalInfoForm.get('firstname').value,
      middlename: this.personalInfoForm.get('middlename').value,
      lastname: this.personalInfoForm.get('lastname').value,
      titleafter: this.personalInfoForm.get('titleafter').value,
      prefvname: this.personalInfoForm.get('prefvname').value,
      resumetitle: this.personalInfoForm.get('resumetitle').value,
      nationalities: (this.personalInfoForm.get('nationalities') as FormArray).value,
      gender: this.personalInfoForm.get('gender').value,
      maritalstatus: this.personalInfoForm.get('maritalstatus').value,
      dateofbirth: new Date(Date.UTC(this.personalInfoForm.get('dateofbirth_year').value,
        this.personalInfoForm.get('dateofbirth_month').value - 1, this.personalInfoForm.get('dateofbirth_day').value)),
      countryofbirth: this.personalInfoForm.get('countryofbirth').value,
      cityofbirth: this.personalInfoForm.get('cityofbirth').value,
      currentcountry: this.personalInfoForm.get('currentcountry').value,
      currentcity: this.personalInfoForm.get('currentcity').value,
      postalcode: this.personalInfoForm.get('postalcode').value,
      streetaddress: this.personalInfoForm.get('streetaddress').value,
      visastatus: this.personalInfoForm.get('visastatus').value,
      picture: this.personalInfoForm.get('picture').value
    };

    this.pInfo.nationalities = this.pInfo.nationalities.filter((x) => {
      return x.nationality && true;
    });
    if (this.isCreated)
      this.pInfo.id = this.id;
    //console.log(JSON.stringify(this.pInfo));
    this.cvService.createPersonalInfo(this.pInfo, this.resumeId).subscribe(
      data => {
        //console.log(data);
        if (data.hasOwnProperty('id')) {
          this.id = data['id'];
          this.personalInfoForm.controls['id'].setValue(data['id']);
          const returnedNats = data['nationalities'];
          const nationsHandle = <FormArray>this.personalInfoForm.controls['nationalities'];
          while (nationsHandle.length)
            nationsHandle.removeAt(0);
          returnedNats.forEach((nat) => {
            nationsHandle.push(this.formBuilder.group({id: nat.id, nationality: nat.nationality}));
          });

          this.isCreated = true;
        }
        this.edit = false;
        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }


  getPersonalInfo() {
    this.cvService.getPersonalInfo(this.resumeId).subscribe(
      data => {
        this.pInfo = data;
        if (!this.pInfo['id']) console.log("NULL");
        else {
          console.log(data);
          this.fillPersonalInfo();
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  fillPersonalInfo() {
    const natsArray = <FormArray>this.personalInfoForm.controls['nationalities'];
    const mynats = this.pInfo['nationalities'];
    if (mynats.length)
      natsArray.removeAt(0);
    mynats.forEach((nat) => {
      natsArray.push(this.formBuilder.group({id: nat.id, nationality: nat.nationality}));
    });
    this.personalInfoForm.patchValue(
      {
        id: this.pInfo['id'],
        titlebefore: this.pInfo['title_before'],
        firstname: this.pInfo['first_name'],
        middlename: this.pInfo['middle_name'],
        lastname: this.pInfo['last_name'],
        titleafter: this.pInfo['title_after'],
        prefvname: this.pInfo['pref_vname'],
        resumetitle: this.pInfo['resume_title'],
        nationality: (this.personalInfoForm.get('nationalities') as FormArray).controls[0].value,
        gender: this.pInfo['gender'],
        maritalstatus: this.pInfo['marital_status'],

        dateofbirth_day: new Date(this.pInfo['date_of_birth']).getDate(),
        dateofbirth_month: new Date(this.pInfo['date_of_birth']).getMonth() + 1,
        dateofbirth_year: new Date(this.pInfo['date_of_birth']).getFullYear(),

        countryofbirth: this.pInfo['country_of_birth'],
        cityofbirth: this.pInfo['city_of_birth'],
        currentcountry: this.pInfo['current_country'],
        currentcity: this.pInfo['current_city'],
        postalcode: this.pInfo['postal_code'],
        streetaddress: this.pInfo['street_address'],
        visastatus: this.pInfo['visa_status'],
        picture: this.pInfo['picture']
      }
    );

  }


  @ViewChild("pobsearch") public searchElementRef1: ElementRef;
  @ViewChild("cpsearch") public searchElementRef2: ElementRef;


  ngOnInit() {

    this.mapper['Afghan'] = 'Afghanistan';
    this.mapper['Albanian'] = 'Albania';
    this.mapper['Andorran'] = 'Andorra';
    this.mapper['Angolan'] = 'Anguilla';
    this.mapper['Argentinian'] = 'Argentina';
    this.mapper['Armenian'] = 'Armenia';
    this.mapper['Australian'] = 'Australia';
    this.mapper['Austrian'] = 'Austria';
    this.mapper['Azerbaijani'] = 'Azerbaijan';
    this.mapper['Bahamian'] = 'Bahamas';
    this.mapper['Bahraini'] = 'Bahrain';
    this.mapper['Bangladeshi'] = 'Bangladesh';
    this.mapper['Barbadian'] = 'Barbados';
    this.mapper['Belarusian'] = 'Belarus';
    this.mapper['Belgian'] = 'Belgium';
    this.mapper['Belizean'] = 'Belize';
    this.mapper['Beninese'] = 'Benin';
    this.mapper['Bhutanese'] = 'Bhutan';
    this.mapper['Bolivian'] = 'Bolivia';
    this.mapper['Bosnian'] = 'Bosnia and Herzegovina';
    this.mapper['Botswanan'] = 'Botswana';
    this.mapper['Brazilian'] = 'Brazil';
    this.mapper['Bruneian'] = 'Brunei';
    this.mapper['Bulgarian'] = 'Bulgaria';
    this.mapper['Burkinese'] = 'Burkina Faso';
    this.mapper['Burmese'] = 'Burma';
    this.mapper['Burundian'] = 'Burundi';
    this.mapper['Cambodian'] = 'Cambodia';
    this.mapper['Cameroonian'] = 'Cameroon';
    this.mapper['Canadian'] = 'Canada';
    this.mapper['Cape Verdean'] = 'Cape Verde';
    this.mapper['Chadian'] = 'Chad';
    this.mapper['Chilean'] = 'Chile';
    this.mapper['Chinese'] = 'China';
    this.mapper['Colombian'] = 'Colombia';
    this.mapper['Congolese'] = 'Congo';
    this.mapper['Costa Rican'] = 'Costa Rica';
    this.mapper['Croatian'] = 'Croatia(Hrvatska)';
    this.mapper['Cuban'] = 'Cuba';
    this.mapper['Cypriot'] = 'Cyprus';
    this.mapper['Czech'] = 'Czech Republic';
    this.mapper['Danish'] = 'Denmark';
    this.mapper['Djiboutian'] = 'Djibouti';
    // this.mapper['Dominican']='Dominica';
    this.mapper['Dominican'] = 'Dominican Republic';
    this.mapper['Ecuadorean'] = 'Ecuador';
    this.mapper['Egyptian'] = 'Egypt';
    this.mapper['Salvadorean'] = 'El Salvador';
    this.mapper['English'] = 'england';
    this.mapper['Eritrean'] = 'Eritrea';
    this.mapper['Estonian'] = 'Estonia';
    this.mapper['Ethiopian'] = 'Ethiopia';
    this.mapper['Fijian'] = 'Fiji';
    this.mapper['Finnish'] = 'Finland';
    this.mapper['French'] = 'France';
    this.mapper['Gabonese'] = 'Gabon';
    this.mapper['Gambian'] = 'Gambia';
    this.mapper['Georgian'] = 'Georgia';
    this.mapper['German'] = 'Germany';
    this.mapper['Ghanaian'] = 'Ghana';
    this.mapper['Greek'] = 'Greece';
    this.mapper['Grenadian'] = 'Grenada';
    this.mapper['Guatemalan'] = 'Guatemala';
    this.mapper['Guinean'] = 'Guinea';
    this.mapper['Guyanese'] = 'Guyana';
    this.mapper['Haitian'] = 'Haiti';
    this.mapper['Dutch'] = 'holland';
    this.mapper['Honduran'] = 'Honduras';
    this.mapper['Hungarian'] = 'Hungary';
    this.mapper['Icelandic'] = 'Iceland';
    this.mapper['Indian'] = 'India';
    this.mapper['Indonesian'] = 'Indonesia';
    this.mapper['Iranian'] = 'Iran';
    this.mapper['Iraqi'] = 'Iraq';
    this.mapper['Irish'] = 'Ireland';
    this.mapper['Italian'] = 'Italy';
    this.mapper['Jamaican'] = 'Jamaica';
    this.mapper['Japanese'] = 'Japan';
    this.mapper['Jordanian'] = 'jordan';
    this.mapper['Kazakh'] = 'Kazakhstan';
    this.mapper['Kenyan'] = 'Kenya';
    this.mapper['Kuwaiti'] = 'Kuwait';
    this.mapper['Laotian'] = 'Laos';
    this.mapper['Latvian'] = 'Latvia';
    this.mapper['Lebanese'] = 'lebanon';
    this.mapper['Liberian'] = 'Liberia';
    this.mapper['Libyan'] = 'Libya';
    this.mapper['Liechtensteiner'] = 'Liechtenstein';
    this.mapper['Lithuanian'] = 'Lithuania';
    this.mapper['Luxembourger'] = 'Luxembourg';
    this.mapper['Macedonian'] = 'Macedonia';
    this.mapper['Malagasy'] = 'Madagascar';
    this.mapper['Malawian'] = 'Malawi';
    this.mapper['Malaysian'] = 'Malaysia';
    this.mapper['Maldivian'] = 'Maldives';
    this.mapper['Malian'] = 'Mali';
    this.mapper['Maltese'] = 'Malta';
    this.mapper['Mauritanian'] = 'Mauritania';
    this.mapper['Mauritian'] = 'Mauritius';
    this.mapper['Mexican'] = 'Mexico';
    this.mapper['Moldovan'] = 'Moldova';
    this.mapper['Monacan'] = 'Monaco';
    this.mapper['Mongolian'] = 'Mongolia';
    this.mapper['Montenegrin'] = 'Montenegro';
    this.mapper['Moroccan'] = 'Morocco';
    this.mapper['Mozambican'] = 'Mozambique';
    this.mapper['Namibian'] = 'Namibia';
    this.mapper['Nepalese'] = 'Nepal';
    // this.mapper['Dutch']='Netherlands';
    this.mapper['New Zealand butter'] = 'New Zealand';
    this.mapper['Nicaraguan'] = 'Nicaragua';
    this.mapper['Nigerien'] = 'Niger';
    this.mapper['Nigerian'] = 'Nigeria';
    this.mapper['North Korean'] = 'North Korea';
    this.mapper['Norwegian'] = 'Norway';
    this.mapper['Omani'] = 'Oman';
    this.mapper['Pakistani'] = 'Pakistan';
    this.mapper['Panamanian'] = 'Panama';
    this.mapper['Papua New Guinean'] = 'Papua New Guinea';
    this.mapper['Paraguayan'] = 'Paraguay';
    this.mapper['Peruvian'] = 'Peru';
    this.mapper['Philippine'] = 'Philippine';
    this.mapper['Polish'] = 'Poland';
    this.mapper['Portuguese'] = 'Portugal';
    this.mapper['Qatari'] = 'Qatar';
    this.mapper['Romanian'] = 'Romania';
    this.mapper['Russian'] = 'Russia';
    this.mapper['Rwandan'] = 'Rwanda';
    this.mapper['Saudi Arabian'] = 'Saudi Arabia';
    this.mapper['Scottish'] = 'scotland';
    this.mapper['Senegalese'] = 'Senegal';
    this.mapper['Serbian'] = 'Serbia';
    this.mapper['Seychellois'] = 'Seychelles';
    this.mapper['Sierra Leonian'] = 'Sierra Leone	';
    this.mapper['Singaporean'] = 'Singapore';
    this.mapper['Slovak'] = 'Slovakia';
    this.mapper['Slovenian'] = 'Slovenia';
    this.mapper['Solomon Islander'] = 'Solomon Islands';
    this.mapper['Somali'] = 'Somalia';
    this.mapper['South African'] = 'South Africa';
    this.mapper['South Korean'] = 'South Korea';
    this.mapper['Spanish'] = 'Spain';
    this.mapper['Sri Lankan'] = 'Sri Lanka';
    this.mapper['Sudanese'] = 'Sudan';
    this.mapper['Surinamese'] = 'Suriname';
    this.mapper['Swazi'] = 'Swaziland';
    this.mapper['Swedish'] = 'Sweden';
    this.mapper['Swiss'] = 'Switzerland';
    this.mapper['Syrian'] = 'syria';
    this.mapper['Taiwanese'] = 'Taiwan';
    this.mapper['Tajik'] = 'Tajikistan';
    this.mapper['Tanzanian'] = 'Tanzania';
    this.mapper['Thai'] = 'Thailand';
    this.mapper['Togolese'] = 'Togo';
    this.mapper['Trinidadian'] = 'Trinidad and Tobago';
    this.mapper['Tunisian'] = 'Tunisia';
    this.mapper['Turkish'] = 'Turkey';
    this.mapper['Turkoman'] = 'Turkmenistan';
    this.mapper['Tuvaluan'] = 'Tuvalu';
    this.mapper['Ugandan'] = 'Uganda';
    this.mapper['Ukrainian'] = 'Ukraine';
    this.mapper['Emirates'] = 'United Arab Emirates';
    this.mapper['British'] = 'United Kingdom';
    this.mapper['US citizen'] = 'United States';
    this.mapper['Uruguayan'] = 'Uruguay';
    this.mapper['Uzbek'] = 'Uzbekistan';
    this.mapper['Vanuatuan'] = 'Vanuatu';
    this.mapper['Venezuelan'] = 'Venezuela';
    this.mapper['Vietnamese'] = 'Vietnam';
    this.mapper['Welsh'] = 'wales';
    this.mapper['Western Samoan'] = 'Samoa';
    this.mapper['Yemeni'] = 'Yemen';
    this.mapper['Yugoslav'] = 'Yugoslavia';
    this.mapper['Zaïrean'] = 'Zaire';
    this.mapper['Zambian'] = 'Zambia';
    this.mapper['Zimbabwean'] = 'Zimbabwe';
    this.days = [{label: 'unspecified', value: 'null'}];
    for (let i = 1; i <= 31; i++)
      this.days.push({label: i.toString(), value: i});
    this.months = [
      {label: 'unspecified', value: 'null'},
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

    this.years = [{label: 'unspecified', value: 'null'}];
    let d = new Date();
    let currentYear = d.getFullYear();
    for (let i = currentYear; i >= 1900; i--)
      this.years.push({label: i.toString(), value: i});

    this.personalInfoForm = this.formBuilder.group({
      id: null,
      titlebefore: null,
      firstname: [null, Validators.required],
      middlename: null,
      lastname: [null, Validators.required],
      titleafter: null,
      prefvname: 'f',
      resumetitle: null,
      nationalities: this.formBuilder.array([this.formBuilder.group({id: null, nationality: null})]),
      gender: [null, Validators.required],
      maritalstatus: null,
      dateofbirth_day: [null, Validators.required],
      dateofbirth_month: [null, Validators.required],
      dateofbirth_year: [null, Validators.required],
      countryofbirth: {value: null, disabled: true},
      cityofbirth: {value: null, disabled: true},
      currentcountry: {value: null, disabled: true},
      currentcity: {value: null, disabled: true},
      postalcode: {value: null, disabled: true},
      streetaddress: {value: null, disabled: true},
      visastatus: null,
      picture: ''
    });

    this.getPersonalInfo();

    this.zoom1 = 4;
    this.latitude1 = 39.8282;
    this.longitude1 = -98.5795;

    this.zoom2 = 4;
    this.latitude2 = 39.8282;
    this.longitude2 = -98.5795;

    this.enableGoogleMapsSearch();

  }

  enableGoogleMapsSearch() {
    this.mapsAPILoader.load().then(() => {

      let autocomplete1 = new google.maps.places.Autocomplete(this.searchElementRef1.nativeElement);
      autocomplete1.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place1: google.maps.places.PlaceResult = autocomplete1.getPlace();

          let isCountrySet = false, isCitySet = false;
          for (let comp of place1.address_components) {
            if (comp.types.find(x => x == 'locality')) {
              this.personalInfoForm.controls['cityofbirth'].setValue(comp.long_name);
              isCitySet = true;
            }
            if (comp.types.find(x => x == 'administrative_area_level_2')) {
              this.personalInfoForm.controls['cityofbirth'].setValue(comp.long_name);
              isCitySet = true;
            }
            if (comp.types.find(x => x == 'administrative_area_level_1')) {
              this.personalInfoForm.controls['cityofbirth'].setValue(comp.long_name);
              isCitySet = true;
            }
            else if (comp.types.find(x => x == 'country')) {
              this.personalInfoForm.controls['countryofbirth'].setValue(comp.long_name);
              isCountrySet = true;
            }
          }
          // if(isCitySet)this.personalInfoForm.controls['cityofbirth'].enable();
          // if(isCountrySet)this.personalInfoForm.controls['countryofbirth'].enable();
          // if(isCountrySet && isCitySet)
          //   this.personalInfoForm.controls['postalcode'].enable();
          //verify result
          if (place1.geometry === undefined || place1.geometry === null) {
            return;
          }
          //
          // //set latitude, longitude and zoom
          this.latitude1 = place1.geometry.location.lat();
          this.longitude1 = place1.geometry.location.lng();
          this.zoom1 = 12;
        });
      });


      let autocomplete2 = new google.maps.places.Autocomplete(this.searchElementRef2.nativeElement);
      autocomplete2.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place2: google.maps.places.PlaceResult = autocomplete2.getPlace();

          for (let comp of place2.address_components) {
            if (comp.types.find(x => x == 'locality'))
              this.personalInfoForm.controls['currentcity'].setValue(comp.long_name);
            if (comp.types.find(x => x == 'administrative_area_level_2'))
              this.personalInfoForm.controls['currentcity'].setValue(comp.long_name);
            if (comp.types.find(x => x == 'administrative_area_level_1'))
              this.personalInfoForm.controls['currentcity'].setValue(comp.long_name);
            else if (comp.types.find(x => x == 'country'))
              this.personalInfoForm.controls['currentcountry'].setValue(comp.long_name);
            else if (comp.types.find(x => x == 'postal_code'))
              this.personalInfoForm.controls['postalcode'].setValue(comp.long_name);
            else if (comp.types.find(x => x == 'street_address'))
              this.personalInfoForm.controls['streetaddress'].setValue(comp.long_name);
          }
          this.personalInfoForm.controls['postalcode'].enable();
          this.personalInfoForm.controls['streetaddress'].enable();


          if (this.personalInfoForm.get('streetaddress').value == '' && place2.formatted_address)
            this.personalInfoForm.controls['streetaddress'].setValue(place2.formatted_address);
          if (place2.geometry === undefined || place2.geometry === null) {
            return;
          }

          this.latitude2 = place2.geometry.location.lat();
          this.longitude2 = place2.geometry.location.lng();
          this.saveLat2 = this.latitude2;
          this.saveLong2 = this.longitude2;
          this.zoom2 = 12;
        });
      });
    });
  }

  saveLat2 = 0;
  saveLong2 = 0;

  addNationality() {
    const mycontrol = <FormArray>this.personalInfoForm.controls['nationalities'];
    mycontrol.insert(0, this.formBuilder.group({id: null, nationality: null}));
  }

  removeNationality(i) {
    const mycontrol = <FormArray>this.personalInfoForm.controls['nationalities'];
    mycontrol.removeAt(i);
  }
}
