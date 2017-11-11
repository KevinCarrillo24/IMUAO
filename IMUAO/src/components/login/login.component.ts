import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,
    AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthProvider } from "../../services/firebase.service";
import firebase from 'firebase';

import { EmailValidator } from '../../validators/email';

import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';

import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { Signup } from '../signup/signup.component';


@Component({
    selector: 'component-login',
    templateUrl: 'login.component.html',
})
export class Login {
    public loginForm;
    loading: any;
    public type= "password";
    public showpass = false;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController,
        public authData: AuthProvider, public nav: NavController) {

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
                this.loading.dismiss().then(() => {
                    this.nav.setRoot(HomePage);
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
    }

    goToResetPassword(): void {
        this.nav.push(ResetPasswordPage);
    }

    showPassword(): any {
        this.type = this.type === 'password' ?  'text' : 'password';
        this.showpass = !this.showpass;
    }

}
