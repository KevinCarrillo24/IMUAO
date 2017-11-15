import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from "../../services/firebase.service";
import firebase from 'firebase';

import { Student } from '../../models/student';
import { LoginPage } from '../../pages/login/login';


@Component({
  selector: 'user-profile',
  templateUrl: 'userprofile.component.html'
})
export class UserProfile {
private Datastudentform: FormGroup;
public validation_messages: any;
public studentphoto: string;
public studentfullname: string;
public studentcode: number;
public studentphone: number;
public studentmail: string;
public editAble: boolean;


  ngOnInit() {
    this.studentphoto = "http://imagenesdedibujosanimados.com/wp-content/uploads/2013/01/dragon-dragon-ball.gif";
    this.studentfullname = "Luis Fernando Jojoa";
    this.studentcode = 2131248;
    this.studentphone = 3178387757;
    this.studentmail = "luis.jojoa.q@gmail.com";
    this.editAble = true;

    this.validation_messages = {
      'studentemail': [
        { type: 'required', message: 'Correo electrónico requerido.' },
        { type: 'pattern', message: 'El formato es incorrecto.' }
      ],
      'studentphonenumber': [
        { type: 'required', message: 'Número telefónico requerido.' },
        { type: 'minlength', message: 'la longitud debe ser de 10 digitos exactamente.' },
        { type: 'maxlength', message: 'la longitud debe ser de 10 digitos exactamente.' },
        { type: 'pattern', message: 'Solo se pueden digitar números.' }
      ]
      //more messages
    }
  }

  constructor(private formBuilder: FormBuilder, public _firebaseService: FirebaseProvider, public navCtrl: NavController) {

    this.Datastudentform = this.formBuilder.group({
      studentemail: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      studentphonenumber: ['', Validators.compose([Validators.pattern('^(0|[1-9][0-9]*)$'),Validators.minLength(10), Validators.maxLength(10), Validators.required])],
    });


  }

  editInfo(){
    this.editAble = !this.editAble;
  }

  updatestudentdata(){

    var studentData: Student = new Student(
      2131248,
      "luis.jojoa.q@gmail.com",
      "photo",
      "Luis",
      "Jojoa",
      3178387757,
      "web developer, programming"
    );

    var uiduser = this._firebaseService.getCurrentuserid();
    var updateData: any = this.Datastudentform.value;
    var result = this._firebaseService.updateStudent(uiduser,studentData);


}
logOut() {
  this._firebaseService.logoutStudent().then(() => {
      this.navCtrl.setRoot(LoginPage);
  });
}

  }
