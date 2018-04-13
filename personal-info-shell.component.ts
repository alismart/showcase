import {Component} from "@angular/core";
/**
 * Created by ASUS on 4/21/2017.
 */
@Component({
  selector: 'personal-info-shell',
  template: `
    <personal-info-form></personal-info-form>
    <div>Hello World!</div>
  `
})
export class PersonalInfoShellComponent {
  viewstate: string = 'edit';
}
