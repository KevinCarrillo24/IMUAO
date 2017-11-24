import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Student } from '../../models/student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public navParams: NavParams) {
      var a:Student = this.navParams.get('student');
      console.log("user", a);
  }
}
