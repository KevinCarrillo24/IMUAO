import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { NavController,NavParams } from 'ionic-angular';
import { Student } from '../../models/student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public navParams: NavParams, app: App, public menu: MenuController) {
      var a:Student = this.navParams.get('student');
      console.log("user", a);
      this.menu.enable(true);
  }
  ngOnInit(){

  }
}
