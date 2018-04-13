import {Component, OnInit} from '@angular/core';
// import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
@Component({
  selector: 'cv-outline',
  templateUrl: './cvoutline.component.html',

})
export class CVOutline implements OnInit {
  sectionTitle: string;
  resumeId = null;

  constructor(/*private translate: TranslateService,*/ private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.resumeId = params.resumeId;
      console.log('resumeId: ' + this.resumeId)
    });

    // translate.addLangs(["en", "fr", "ar"]);
    // translate.setDefaultLang('en');
    //
    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');
    //
    // let rtlLangs = ['ar','morelangs'];


  }

  currentRoute = 'haha.com';

  ngOnInit() {


    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe(() => {
        this.currentRoute = this.router.routerState.snapshot.url;
        var root = this.router.routerState.snapshot.root;
        if (root.children[0].data && root.children[0].data["title"]) {
          this.sectionTitle = root.children[0].data["title"];
        }

      });
  }

  selectSection(section) {

  }
}
