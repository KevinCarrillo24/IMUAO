import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,
    AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { FirebaseProvider } from "../../services/firebase.service";
import firebase from 'firebase';

import { EmailValidator } from '../../validators/email';

import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';

import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { Signup } from '../signup/signup.component';

import { Student } from '../../models/student';


@Component({
    selector: 'component-login',
    templateUrl: 'login.component.html',
})
export class Login {
    user: Student;
    public loginForm;
    loading: any;
    public type= "password";
    public showpass = false;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController,
        public authData: FirebaseProvider, public nav: NavController, public menu: MenuController) {

        this.menu.enable(false);

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

    }

    loginUser(): void {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            this.authData.loginStudent(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
                var uid: string = authData.uid;
                this.loading.dismiss().then(() => {
                    var studentInfo: Student;
                    this.authData.getStudentinfo(authData.uid).on('value', personSnapshot => {
                        var data = personSnapshot.val();
                        studentInfo = new Student(
                          data.studentcode,
                          data.studentemail,
                          data.studentphoto,
                          data.studentfullname,
                          data.studentfulllastname,
                          data.studentphonenumber,
                          data.studentskills,
                          data.studentoptionalemail
                        );
                    this.user = studentInfo;
                    this.nav.setRoot(HomePage,{student: this.user});
                });
            });
        }, error => {
            this.loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                    message: "El correo o la contraseña son incorrectos",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }

    goToSignup(): void {
        this.nav.push(SignupPage);
        //
    }

    goToResetPassword(): void {
        this.nav.push(ResetPasswordPage);
    }

    showPassword(): any {
        this.type = this.type === 'password' ?  'text' : 'password';
        this.showpass = !this.showpass;
    }
}