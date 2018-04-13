/**
 * Created by ASUS on 6/13/2017.
 */
export class Education {
  constructor(public id: number,
              public college: string,
              public location: string,
              public degree_level: string,
              public major: string,
              public start_date: Date,
              public completion_date: Date,
              public grade: number,
              public full_grade: number,
              public certificate: string,
              public college_website: string,
              public description: string,
              public subject: string,
              public academic_researches: AcademicResearch[]) {
  }
}
export class AcademicResearch {
  id: string;
  project_title: string;
  project_description: string;
}
