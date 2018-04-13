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
  selector: 'cv-preview',
  templateUrl: './cvpreview.component.html'
})
export class CVPreviewComponent implements OnInit {

  resume = null;
  drivingCats = [];
  resumeId = null;
  display = false;
  displayError = false;


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


  constructor(private cvService: CVService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.resumeId = params.id;
      console.log(this.resumeId);
    });
  }

  ngOnInit() {
    this.cvService.getResume(this.resumeId).subscribe(
      data => {
        this.resume = data;
        console.log(JSON.stringify(data));
        if (data['driving_license']) this.drivingCats = data['driving_license'].category.split(',');
        console.log(this.drivingCats[0]);
      }
    );

    this.fillMapper();
  }

  fillMapper() {
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
  }

  createCV() {
    this.cvService.createResume().subscribe(
      data => {
        console.log(data);
        this.display = true;
      },
      error => {
        console.log(error);
        this.displayError = true;
        return Observable.throw(error);
      });
  }

}
