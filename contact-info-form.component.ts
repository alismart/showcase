import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from "@angular/forms";

import {CVService} from "../services/cvservice.service";
import {Observable} from "rxjs";
// import formatErrorMsg = jasmine.formatErrorMsg;
@Component({
  moduleId: module.id,
  selector: 'contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styles: [`
    .has-feedback .form-control {
      padding-right: 0;
    }

    hr {
      visibility: hidden;
    }

    @media screen and (max-width: 1260px) and (min-width: 767px) {
      .form-horizontal .control-label {
        font-size: 14px;
      }

      .btn-primary {
        padding: 3px 6px;
      }
    }

    @media screen and (max-width: 767px) {
      .rounded-corner-button {
        width: 50px;
      }

      hr {
        visibility: visible;
      }
    }
  `]
})
export class ContactInfoFormComponent implements OnInit {

  editable: boolean = true;

  id: any;
  phoneTypes = [
    {label: 'Main Mobile', value: 'Main Mobile'},
    {label: 'Personal Mobile', value: 'Personal Mobile'},
    {label: 'Work Mobile', value: 'Work Mobile'},
    {label: 'Work', value: 'Work'},
    {label: 'Home', value: 'Home'},
  ];
  emailTypes = [
    {label: 'Main', value: 'main'},
    {label: 'Personal', value: 'personal'},
    {label: 'Work', value: 'work'}
  ];

  networkTypes = [
    {label: 'Facebook', value: 'facebook'},
    {label: 'Twitter', value: 'twitter'},
    {label: 'Youtube', value: 'youtube'},
    {label: 'Instagram', value: 'instagram'},
    {label: 'LinkedIn', value: 'linkedin'},
    {label: 'Tumblr', value: 'tumblr'},
    {label: 'Behance', value: 'behance'},
    {label: 'Blogger', value: 'blogger'},
    {label: 'Delicious', value: 'delicious'},
    // {label: 'Deviantart', value: 'deviantart'},
    {label: 'Diigo', value: 'diigo'},
    {label: 'Evernote', value: 'evernote'},
    {label: 'Flickr', value: 'flickr'},
    {label: 'Instapaper', value: 'instapaper'},
    // {label: 'LiveJournal', value: 'liveJournal'},
    {label: 'Medium', value: 'medium'},
    {label: 'Reddit', value: 'reddit'},
    {label: 'Scoop-it', value: 'scoop-it'},
    {label: 'Stumbleupon', value: 'stumbleupon'},
    {label: 'Plurk', value: 'plurk'},
    {label: 'vBulletin', value: 'vbulletin'},
    {label: 'vKontakte', value: 'vkontakte'},
    {label: 'WordPress', value: 'wordPress'},
  ];

  messengerProviders = [
    {label: 'Telegram', value: 'telegram'},
    {label: 'Skype', value: 'skype'},
    {label: 'WhatsApp', value: 'whatsApp'},
    {label: 'Google Hangout', value: 'google hangout'},
    {label: 'ICQ', value: 'ICQ'},
    {label: 'AIM', value: 'AIM'},
    {label: 'Viber', value: 'viber'},
    {label: 'Line', value: 'line'},
    {label: 'Imo', value: 'Imo'}
  ];
  genders = ['male', 'female'];
  maritals = [
    {label: 'Single', value: 'single'},
    {label: 'Married', value: 'married'},
    {label: 'Widow/Widower', value: 'widow/widower'},
    {label: 'Separated', value: 'separated'},
    {label: 'Divorced', value: 'divorced'}
  ];
  nats = [
    {label: 'Syrian', value: 'Syrian'},
    {label: 'Lebanese', value: 'Lebanese'},
    {label: 'Jordanian', value: 'Jordanian'}
  ];
  visastats = [
    {label: 'Citizen', value: 'citizen'},
    {label: 'No Visa', value: 'novisa'},
    {label: 'Residency Visa (Non-Transferable)', value: 'residency'}
  ];
  intCodes = [
    {label: '+963', value: '+963'},
    {label: '+961', value: '+961'},
    {label: '+93', value: '+93'},
    {label: '+355', value: '+355'},
    {label: '+376', value: '+376'},
    {label: '+244', value: '+244'},
    {label: '+54', value: '+54'},
    {label: '+374', value: '+374'},
    {label: '+61', value: '+61'},
    {label: '+43', value: '+43'},
    {label: '+994', value: '+994'},
    {label: '+1-242', value: '+1-242'},
    {label: '+973', value: '+973'},
    {label: '+880', value: '+880'},
    {label: '+1-246', value: '+1-246'},
    {label: '+375', value: '+375'},
    // {label:'+32',value: '+32'},
    {label: '+501', value: '+501'},
    {label: '+229', value: '+229'},
    {label: '+975', value: '+975'},
    {label: '+591', value: '+591'},
    {label: '+387', value: '+387'},
    {label: '+267', value: '+267'},
    {label: '+55', value: '+55'},
    // {label:'+246',value: '+246'},
    {label: '+673', value: '+673'},
    {label: '+359', value: '+359'},
    {label: '+226', value: '+226'},
    {label: '+95', value: '+95'},
    {label: '+257', value: '+257'},
    {label: '+855', value: '+855'},
    {label: '+237', value: '+237'},
    {label: '+1', value: '+1'},
    {label: '+238', value: '+238'},
    {label: '+235', value: '+235'},
    {label: '+56', value: '+56'},
    {label: '+86', value: '+86'},
    {label: '+57', value: '+57'},
    {label: '+242', value: '+242'},
    {label: '+506', value: '+506'},
    {label: '+385', value: '+385'},
    {label: '+53', value: '+53'},
    {label: '+357', value: '+357'},
    {label: '+420', value: '+420'},
    {label: '+45', value: '+45'},
    {label: '+253', value: '+253'},
    {label: '+1-767', value: '+1-767'},
    {label: '+1-809, 1-829, 1-849', value: '+1-809, 1-829, 1-849'},
    {label: '+593', value: '+593'},
    {label: '+20', value: '+20'},
    {label: '+503', value: '+503'},
    {label: '+44', value: '+44'},
    {label: '+291', value: '+291'},
    {label: '+372', value: '+372'},
    {label: '+251', value: '+251'},
    {label: '+679', value: '+679'},
    {label: '+358', value: '+358'},
    {label: '+33', value: '+33'},
    {label: '+241', value: '+241'},
    {label: '+220', value: '+220'},
    {label: '+995', value: '+995'},
    {label: '+49', value: '+49'},
    {label: '+233', value: '+233'},
    {label: '+30', value: '+30'},
    {label: '1-473', value: '1-473'},
    {label: '+502', value: '+502'},
    {label: '+224', value: '+224'},
    {label: '+592', value: '+592'},
    {label: '+509', value: '+509'},
    {label: '+31', value: '+31'},
    {label: '+504', value: '+504'},
    {label: '+36', value: '+36'},
    {label: '+354', value: '+354'},
    {label: '+91', value: '+91'},
    {label: '+62', value: '+62'},
    {label: '+98', value: '+98'},
    {label: '+964', value: '+964'},
    {label: '+353', value: '+353'},
    {label: '+39', value: '+39'},
    {label: '+1-876', value: '+1-876'},
    {label: '+81', value: '+81'},
    {label: '+962', value: '+962'},
    {label: '+7', value: '+7'},
    {label: '+254', value: '+254'},
    {label: '+965', value: '+965'},
    {label: '+856', value: '+856'},
    {label: '+371', value: '+371'},
    {label: '+961', value: '+961'},
    {label: '+231', value: '+231'},
    {label: '+218', value: '+218'},
    {label: '+423', value: '+423'},
    {label: '+370', value: '+370'},
    {label: '+352', value: '+352'},
    {label: '+389', value: '+389'},
    {label: '+261 ', value: '+261'},
    {label: '+265', value: '+265'},
    {label: '+60', value: '+60'},
    {label: '+960', value: '+960'},
    {label: '+223', value: '+223'},
    {label: '+356', value: '+356'},
    {label: '+222', value: '+222'},
    {label: '+230', value: '+230'},
    {label: '+52', value: '+52'},
    {label: '+373', value: '+373'},
    {label: '+377', value: '+377'},
    {label: '+967', value: '+967'},
    {label: '+382', value: '+382'},
    {label: '+212', value: '+212'},
    {label: '+258', value: '+258'},
    {label: '+264', value: '+264'},
    {label: '+977', value: '+977'},
    {label: '+31', value: '+31'},
    {label: '+64', value: '+64'},
    {label: '+505', value: '+505'},
    {label: '+227', value: '+227'},
    {label: '+234', value: '+234'},
    {label: '+850', value: '+850'},
    {label: '+47', value: '+47'},
    {label: '+968', value: '+968'},
    {label: '+970', value: '+970'},
    {label: '+507', value: '+507'},
    {label: '+675', value: '+675'},
    {label: '+51', value: '+51'},
    {label: '+63', value: '+63'},
    {label: '+48', value: '+48'},
    {label: '+351', value: '+351'},
    {label: '+974', value: '+974'},
    {label: '+40', value: '+40'},
    {label: '+7', value: '+7'},
    {label: '+250', value: '+250'},
    {label: '+966', value: '+966'},
    {label: '+44', value: '+44'},
    {label: '+221', value: '+221'},
    {label: '+381', value: '+381'},
    {label: '+248', value: '+248'},
    {label: '+232', value: '+232'},
    {label: '+65', value: '+65'},
    {label: '+421', value: '+421'},
    {label: '+386', value: '+386'},
    {label: '+677', value: '+677'},
    {label: '+252', value: '+252'},
    {label: '+27', value: '+27'},
    {label: '+82', value: '+82'},
    {label: '+34', value: '+34'},
    {label: '+94', value: '+94'},
    {label: '+249', value: '+249'},
    {label: '+597', value: '+597'},
    {label: '+268', value: '+268'},
    {label: '+46', value: '+46'},
    {label: '+41', value: '+41'},
    {label: '+886', value: '+886'},
    {label: '+992', value: '+992'},
    {label: '+225', value: '+225'},
    {label: '+66', value: '+66'},
    {label: '+228', value: '+228'},
    {label: '+1', value: '+1'},
    {label: '+216', value: '+216'},
    {label: '+90', value: '+90'},
    {label: '+993', value: '+993'},
    {label: '+688', value: '+688'},
    {label: '+256', value: '+256'},
    {label: '+380', value: '+380'},
    {label: '+971', value: '+971'},
    {label: '+44', value: '+44'},
    {label: '+1', value: '+1'},
    {label: '+598', value: '+598'},
    {label: '+998', value: '+998'},
    {label: '+678', value: '+678'},
    {label: '+58', value: '+58'},
    {label: '+84', value: '+84'},
    {label: '+681', value: '+681'},
    {label: '+685', value: '+685'},
    {label: '+967', value: '+967'},
    {label: '+38', value: '+38'},
    {label: '+243', value: '+243'},
    {label: '+260', value: '+260'},
    {label: '+263', value: '+263'},
  ];


  formErrors = {
    'phone_numbers': '',
    'emails': '',
    'websites': '',
    'networks': '',
    'messengers': ''
  };
  validatedElement = {
    'phone_numbers': 'number',
    'emails': 'email_address',
    'websites': 'website_address',
    'networks': 'network_address',
    'messengers': 'messenger_account'
  };
  validationMessages = {
    'phone_numbers': {
      'required': 'Phone number is required.',
      'minlength': 'Phone number is too short, the minimum length is 6 digits.',
      'maxlength': 'Phone number is too large, the maximum length is 16 digits.',
      'pattern': 'This entry can only contain numbers.'
    },
    'emails': {},
    'websites': {},
    'networks': {},
    'messengers': {}
  };
  contactInfo: any;

  contactInfoForm: FormGroup;

  resumeId = null;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private cvService: CVService,
              private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId: ' + this.resumeId)
    });

  }

  codeMapper = [];

  fillMapper() {
    this.codeMapper['+963'] = 'syria';
    this.codeMapper['+961'] = 'lebanon';
    this.codeMapper['+93'] = 'Afghanistan';
    this.codeMapper['+355'] = 'Albania';
    this.codeMapper['+376'] = 'Andorra';
    this.codeMapper['+244'] = 'Anguilla';
    this.codeMapper['+54'] = 'Argentina';
    this.codeMapper['+374'] = 'Armenia';
    this.codeMapper['+61'] = 'Australia';
    this.codeMapper['+43'] = 'Austria';
    this.codeMapper['+994'] = 'Azerbaijan';
    this.codeMapper['+1-242'] = 'Bahamas';
    this.codeMapper['+973'] = 'Bahrain';
    this.codeMapper['+880'] = 'Bangladesh';
    this.codeMapper['+1-246'] = 'Barbados';
    this.codeMapper['+375'] = 'Belarus';
    // this.codeMapper['+32']='Belgium';
    this.codeMapper['+501'] = 'Belize';
    this.codeMapper['+229'] = 'Benin';
    this.codeMapper['+975'] = 'Bhutan';
    this.codeMapper['+591'] = 'Bolivia';
    this.codeMapper['+387'] = 'Bosnia and Herzegovina';
    this.codeMapper['+267'] = 'Botswana';
    this.codeMapper['+55'] = 'Brazil';
    // this.codeMapper['+246']='Britain';
    this.codeMapper['+673'] = 'Brunei';
    this.codeMapper['+359'] = 'Bulgaria';
    this.codeMapper['+226'] = 'Burkina Faso';
    this.codeMapper['+95'] = 'Burma';
    this.codeMapper['+257'] = 'Burundi';
    this.codeMapper['+855'] = 'Cambodia';
    this.codeMapper['+237'] = 'Cameroon';
    this.codeMapper['+1'] = 'Canada';
    this.codeMapper['+238'] = 'Cape Verde';
    this.codeMapper['+235'] = 'Chad';
    this.codeMapper['+56'] = 'Chile';
    this.codeMapper['+86'] = 'China';
    this.codeMapper['+57'] = 'Colombia';
    this.codeMapper['+242'] = 'Congo';
    this.codeMapper['+506'] = 'Costa Rica';
    this.codeMapper['+385'] = 'Croatia(Hrvatska)';
    this.codeMapper['+53'] = 'Cuba';
    this.codeMapper['+357'] = 'Cyprus';
    this.codeMapper['+420'] = 'Czech Republic';
    this.codeMapper['+45'] = 'Denmark';
    this.codeMapper['+253'] = 'Djibouti';
    this.codeMapper['+1-767'] = 'Dominica';
    this.codeMapper['+1-809, 1-829, 1-849'] = 'Dominican Republic';
    this.codeMapper['+593'] = 'Ecuador';
    this.codeMapper['+20'] = 'Egypt';
    this.codeMapper['+503'] = 'El Salvador';
    this.codeMapper['+44'] = 'England';
    this.codeMapper['+291'] = 'Eritrea';
    this.codeMapper['+372'] = 'Estonia';
    this.codeMapper['+251'] = 'Ethiopia';
    this.codeMapper['+679'] = 'Fiji';
    this.codeMapper['+358'] = 'Finland';
    this.codeMapper['+33'] = 'France';
    this.codeMapper['+241'] = 'Gabon';
    this.codeMapper['+220'] = 'Gambia';
    this.codeMapper['+995'] = 'Georgia';
    this.codeMapper['+49'] = 'Germany';
    this.codeMapper['+233'] = 'Ghana';
    this.codeMapper['+30'] = 'Greece';
    this.codeMapper['1-473'] = 'Grenada';
    this.codeMapper['+502'] = 'Guatemala';
    this.codeMapper['+224'] = 'Guinea';
    this.codeMapper['+592'] = 'Guyana';
    this.codeMapper['+509'] = 'Haiti';
    this.codeMapper['+31'] = 'holland';
    this.codeMapper['+504'] = 'Honduras';
    this.codeMapper['+36'] = 'Hungary';
    this.codeMapper['+354'] = 'Iceland';
    this.codeMapper['+91'] = 'India';
    this.codeMapper['+62'] = 'Indonesia';
    this.codeMapper['+98'] = 'Iran';
    this.codeMapper['+964'] = 'Iraq';
    this.codeMapper['+353'] = 'Ireland';
    this.codeMapper['+39'] = 'Italy';
    this.codeMapper['+1-876'] = 'Jamaica';
    this.codeMapper['+81'] = 'Japan';
    this.codeMapper['+962'] = 'jordan';
    this.codeMapper['+7'] = 'Kazakhstan';
    this.codeMapper['+254'] = 'Kenya';
    this.codeMapper['+965'] = 'Kuwait';
    this.codeMapper['+856'] = 'Laos';
    this.codeMapper['+371'] = 'Latvia';
    this.codeMapper['+961'] = 'Lebanon';
    this.codeMapper['+231'] = 'Liberia';
    this.codeMapper['+218'] = 'Libya';
    this.codeMapper['+423'] = 'Liechtenstein';
    this.codeMapper['+370'] = 'Lithuania';
    this.codeMapper['+352'] = 'Luxembourg';
    this.codeMapper['+389'] = 'Macedonia';
    this.codeMapper['+261'] = 'Madagascar';
    this.codeMapper['+265'] = 'Malawi';
    this.codeMapper['+60'] = 'Malaysia';
    this.codeMapper['+960'] = 'Maldives';
    this.codeMapper['+223'] = 'Mali';
    this.codeMapper['+356'] = 'Malta';
    this.codeMapper['+222'] = 'Mauritania';
    this.codeMapper['+230'] = 'Mauritius';
    this.codeMapper['+52'] = 'Mexico';
    this.codeMapper['+373'] = 'Moldova';
    this.codeMapper['+377'] = 'Monaco';
    this.codeMapper['+967'] = 'Mongolia';
    this.codeMapper['+382'] = 'Montenegro';
    this.codeMapper['+212'] = 'Morocco';
    this.codeMapper['+258'] = 'Mozambique';
    this.codeMapper['+264'] = 'Namibia';
    this.codeMapper['+977'] = 'Nepal';
    this.codeMapper['+31'] = 'Netherlands';
    this.codeMapper['+64'] = 'New Zealand';
    this.codeMapper['+505'] = 'Nicaragua';
    this.codeMapper['+227'] = 'Niger';
    this.codeMapper['+234'] = 'Nigeria';
    this.codeMapper['+850'] = 'North Korea';
    this.codeMapper['+47'] = 'Norway';
    this.codeMapper['+968'] = 'Oman';
    this.codeMapper['+970'] = 'Pakistan';
    this.codeMapper['+507'] = 'Panama';
    this.codeMapper['+675'] = 'Papua New Guinea';
    this.codeMapper['Paraguayan'] = 'Paraguay';
    this.codeMapper['+51'] = 'Peru';
    this.codeMapper['+63'] = 'Philippine';
    this.codeMapper['+48'] = 'Poland';
    this.codeMapper['+351'] = 'Portugal';
    this.codeMapper['+974'] = 'Qatar';
    this.codeMapper['+40'] = 'Romania';
    this.codeMapper['+7'] = 'Russia';
    this.codeMapper['+250'] = 'Rwanda';
    this.codeMapper['+966'] = 'Saudi Arabia';
    this.codeMapper['+44'] = 'scotland';
    this.codeMapper['+221'] = 'Senegal';
    this.codeMapper['+381'] = 'Serbia';
    this.codeMapper['+248'] = 'Seychelles';
    this.codeMapper['+232'] = 'Sierra Leone';
    this.codeMapper['+65'] = 'Singapore';
    this.codeMapper['+421'] = 'Slovakia';
    this.codeMapper['+386'] = 'Slovenia';
    this.codeMapper['+677'] = 'Solomon Islands';
    this.codeMapper['+252'] = 'Somalia';
    this.codeMapper['+27'] = 'South Africa';
    this.codeMapper['+82'] = 'South Korea';
    this.codeMapper['+34'] = 'Spain';
    this.codeMapper['+94'] = 'Sri Lanka';
    this.codeMapper['+249'] = 'Sudan';
    this.codeMapper['+597'] = 'Suriname';
    this.codeMapper['+268'] = 'Swaziland';
    this.codeMapper['+46'] = 'Sweden';
    this.codeMapper['+41'] = 'Switzerland';
    this.codeMapper['+886'] = 'Taiwan';
    this.codeMapper['+992'] = 'Tajikistan';
    this.codeMapper['+225'] = 'Tanzania';
    this.codeMapper['+66'] = 'Thailand';
    this.codeMapper['+228'] = 'Togo';
    this.codeMapper['+1'] = 'Trinidad and Tobago';
    this.codeMapper['+216'] = 'Tunisia';
    this.codeMapper['+90'] = 'Turkey';
    this.codeMapper['+993'] = 'Turkmenistan';
    this.codeMapper['+688'] = 'Tuvalu';
    this.codeMapper['+256'] = 'Uganda';
    this.codeMapper['+380'] = 'Ukraine';
    this.codeMapper['+971'] = 'United Arab Emirates';
    this.codeMapper['+44'] = 'United Kingdom';
    this.codeMapper['+1'] = 'United States';
    this.codeMapper['+598'] = 'Uruguay';
    this.codeMapper['+998'] = 'Uzbekistan';
    this.codeMapper['+678'] = 'Vanuatu';
    this.codeMapper['+58'] = 'Venezuela';
    this.codeMapper['+84'] = 'Vietnam';
    this.codeMapper['+681'] = 'wales';
    this.codeMapper['+685'] = 'Samoa';
    this.codeMapper['+967'] = 'Yemen';
    this.codeMapper['+38'] = 'Yugoslavia';
    this.codeMapper['+243'] = 'Zaire';
    this.codeMapper['+260'] = 'Zambia';
    this.codeMapper['+263'] = 'Zimbabwe';
  }


  initPhoneNumber(isMain?: boolean) {
    return this.formBuilder.group({
      id: null,
      phone_type: 'Main Mobile',
      int_code: '+963',
      number: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
    });
  }

  initEmail(isMain?: boolean) {
    return this.formBuilder.group({
      id: null,
      email_type: 'main',
      email_address: null,
    });
  }

  initWebsite() {
    return this.formBuilder.group({
      id: null,
      website_address: null
    });
  }

  initNetwork() {
    return this.formBuilder.group({
      id: null,
      network_type: 'facebook',
      network_address: null
    });
  }

  initMessenger() {
    return this.formBuilder.group({
      id: null,
      messenger_provider: 'whatsapp',
      messenger_account: null
    });
  }

  ngOnInit() {
    this.contactInfoForm = this.formBuilder.group({
      phone_numbers: this.formBuilder.array([this.initPhoneNumber()]),
      emails: this.formBuilder.array([this.initEmail()]),
      websites: this.formBuilder.array([this.initWebsite()]),
      networks: this.formBuilder.array([this.initNetwork()]),
      messengers: this.formBuilder.array([this.initMessenger()]),
    });
    this.getContactInfo();
    this.fillMapper();

  }

  onValueChanged(data?: any) {

    if (!this.contactInfoForm) return;
    const form = this.contactInfoForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const controlArray = form.get(field) as FormArray;
      for (let i = 0; i < controlArray.length; i++) {
        const control = controlArray.at(i).get(this.validatedElement[field]);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          this.myerrors = control.errors;
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }

  myerrors: any = null;

  addPhoneNumber() {
    const mycontrol = <FormArray>this.contactInfoForm.controls['phone_numbers'];
    mycontrol.insert(0, this.initPhoneNumber());
  }

  removePhoneNumber(i) {
    const mycontrol = <FormArray>this.contactInfoForm.controls['phone_numbers'];
    mycontrol.removeAt(i);
  }

  addEmail() {
    const mycontrol = <FormArray>this.contactInfoForm.controls['emails'];
    mycontrol.insert(0, this.initEmail());
  }

  removeEmail(i) {
    const mycontrol = <FormArray>this.contactInfoForm.controls['emails'];
    mycontrol.removeAt(i);
  }

  addWebsite() {
    const mycontrol = <FormArray>this.contactInfoForm.controls['websites'];
    mycontrol.insert(0, this.initWebsite());
  }

  removeWebsite(i) {
    const mycontrol = <FormArray>this.contactInfoForm.controls['websites'];
    mycontrol.removeAt(i);
  }

  addNetwork() {
    const mycontrol = <FormArray>this.contactInfoForm.controls['networks'];
    mycontrol.insert(0, this.initNetwork());
  }

  removeNetwork(i) {
    const mycontrol = <FormArray>this.contactInfoForm.controls['networks'];
    mycontrol.removeAt(i);
  }

  addMessenger() {
    const mycontrol = <FormArray>this.contactInfoForm.controls['messengers'];
    mycontrol.insert(0, this.initMessenger());
  }

  removeMessenger(i) {
    const mycontrol = <FormArray>this.contactInfoForm.controls['messengers'];
    mycontrol.removeAt(i);
  }

  prepareSaveContactInfo() {
    const formModel = this.contactInfoForm.value;
    let phoneNumbersDeepCopy = formModel.phone_numbers.map
    ((phoneNumber) => Object.assign({}, phoneNumber));
    phoneNumbersDeepCopy = phoneNumbersDeepCopy.filter((x) => {
      return x.int_code && x.number && x.phone_type;
    });
    let emailsDeepCopy = formModel.emails.map(
      (email) => Object.assign({}, email)
    );
    emailsDeepCopy = emailsDeepCopy.filter((x) => {
      return x.email_address && x.email_type;
    });
    let websitesDeepCopy = formModel.websites.map(
      (website) => Object.assign({}, website)
    );
    websitesDeepCopy = websitesDeepCopy.filter((x) => {
      return x.website_address && true;
    });
    let networksDeepCopy = formModel.networks.map(
      (network) => Object.assign({}, network)
    );
    networksDeepCopy = networksDeepCopy.filter((x) => {
      return x.network_address && x.network_type
    });
    let messengersDeepCopy = formModel.messengers.map(
      (messenger) => Object.assign({}, messenger)
    );
    messengersDeepCopy = messengersDeepCopy.filter((x) => {
      return x.messenger_account && x.messenger_provider
    });
    const saveContactInfo = {
      phone_numbers: phoneNumbersDeepCopy,
      emails: emailsDeepCopy,
      websites: websitesDeepCopy,
      networks: networksDeepCopy,
      messengers: messengersDeepCopy
    };
    return saveContactInfo;
  }

  save() {
    console.log(JSON.stringify(this.prepareSaveContactInfo()));
    this.cvService.createContactInfo(this.prepareSaveContactInfo(), this.resumeId).subscribe(
      data => {
        console.log(data);
        this.contactInfo = data;

        this.editable = false;

        return true;
      },
      error => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  cInfo: any = null;

  getContactInfo() {
    this.cvService.getContactInfo(this.resumeId).subscribe(
      data => {
        this.cInfo = data;
        console.log(this.cInfo);
        if (this.cInfo['phone_numbers'].length || this.cInfo['emails'].length)
          this.fillContactInfo();
      },
      error => {
        console.log(error);
      }
    );
  }

  fillContactInfo() {
    console.log("Yeah! I am here, fillContactInfo()");
    const phones = <FormArray>this.contactInfoForm.controls['phone_numbers'];
    if (this.cInfo['phone_numbers'].length) {
      console.log("phone numbers length = " + phones.length);
      while (phones.length) phones.removeAt(0);
      console.log("phone numbers length* = " + phones.length);
    }
    this.cInfo['phone_numbers'].forEach(
      (element) => {
        phones.push(this.formBuilder.group({
          id: element.id,
          phone_type: element.phone_type,
          int_code: element.int_code,
          number: element.number
        }));
      }
    );

    const emails = <FormArray>this.contactInfoForm.controls['emails'];
    if (this.cInfo['emails'].length) {
      console.log("emails length = " + emails.length);
      while (emails.length) emails.removeAt(0);
      console.log("emails length* = " + emails.length);

    }
    this.cInfo['emails'].forEach(
      (element) => {
        emails.push(this.formBuilder.group({
          id: element.id,
          email_type: element.email_type,
          email_address: element.email_address
        }));
      }
    );

    const websites = <FormArray>this.contactInfoForm.controls['websites'];
    if (this.cInfo['websites'].length) {
      console.log("websites length = " + websites.length);
      while (websites.length) websites.removeAt(0);
      console.log("websites* length = " + websites.length);
    }
    this.cInfo['websites'].forEach(
      (element) => {
        websites.push(this.formBuilder.group({
          id: element.id,
          website_address: element.website_address
        }));
      }
    );

    const networks = <FormArray>this.contactInfoForm.controls['networks'];
    if (this.cInfo['networks'].length) {
      console.log("networks length = " + networks.length);
      while (networks.length) networks.removeAt(0);
      console.log("networks length* = " + networks.length);
    }
    this.cInfo['networks'].forEach(
      (element) => {
        networks.push(this.formBuilder.group({
          id: element.id,
          network_type: element.network_type,
          network_address: element.network_address
        }));
      }
    );

    const messengers = <FormArray>this.contactInfoForm.controls['messengers'];
    if (this.cInfo['messengers'].length) {
      console.log("messengers length = " + messengers.length);
      while (messengers.length) messengers.removeAt(0);
      console.log("messengers* length = " + messengers.length);
    }
    this.cInfo['messengers'].forEach(
      (element) => {
        messengers.push(this.formBuilder.group({
          id: element.id,
          messenger_provider: element.messenger_provider,
          messenger_account: element.messenger_account
        }));
      }
    );

  }

  edit() {
    this.editable = true;
  }
}
