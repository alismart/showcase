/**
 * Created by ASUS on 6/13/2017.
 */
export class ContactInfo {
  constructor(public resume_id: number,
              public phone_numbers: PhoneNumber[],
              public emails: Email[],
              public websites: Website[],
              public networks: Network[],
              public messengers: Messenger[]) {
  }
}
export class PhoneNumber {
  phonetype: string;
  intcode: string;
  number: string;
  mainphone: boolean;
}
export class Email {
  emailtype: string;
  emailaddress: string;
  mainemail: boolean;
}
export class Website {
  websiteaddress: string;
}
export class Network {
  networktype: string;
  networkaddress: string;
}
export class Messenger {
  messengerprovider: string;
  messengeraccount: string;
}
