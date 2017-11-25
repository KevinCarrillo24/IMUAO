import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from "../../services/firebase.service";
import firebase from 'firebase';

import { Student } from '../../models/student';
import { Project } from '../../models/project';
import { LoginPage } from '../../pages/login/login';


@Component({
  selector: 'user-profile',
  templateUrl: 'userprofile.component.html'
})
export class UserProfile {
private Datastudentform: FormGroup;
public validation_messages: any;
public projects: Array<Project>;
public studentInfo: Student;
public studentphoto: string;
public editAble: boolean;


  ngOnInit() {
    this.studentphoto = "http://imagenesdedibujosanimados.com/wp-content/uploads/2013/01/dragon-dragon-ball.gif";
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

  constructor(private formBuilder: FormBuilder, public _firebaseService: FirebaseProvider, public nav: NavController) {

    this.Datastudentform = this.formBuilder.group({
      studentemail: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      studentphonenumber: ['', Validators.compose([Validators.pattern('^(0|[1-9][0-9]*)$'),Validators.minLength(10), Validators.maxLength(10), Validators.required])],
    });
  }

  editInfo(){
    this.editAble = !this.editAble;
  }

  getProjects(){
    var uiduser = this._firebaseService.getCurrentuserid();

    this._firebaseService.getPersonalProjects(uiduser).on('value', personSnapshot => {
      var data = personSnapshot.val();
      var projectsresult: Project[] = new Array<Project>();
      for (var object in data) {
        if (data.hasOwnProperty(object)) {
          var element = data[object];
          var tempProject = new Project(element.projectimage,element.projectname,element.projectown,element.projectdescription,element.projecttags);
          projectsresult.push(tempProject);
        }
      }
      this.projects = projectsresult;
    });
    console.log("Proyectos", this.projects);
  }

  updatestudentdata(){

    var uiduser = this._firebaseService.getCurrentuserid();

    var updateData: any = this.Datastudentform.value;

    this._firebaseService.updateStudent(uiduser, updateData);
    // console.log(this.studentInfo);

}
  }
