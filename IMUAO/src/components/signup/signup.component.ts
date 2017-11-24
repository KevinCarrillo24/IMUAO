
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,
AlertController } from 'ionic-angular';
import { FormBuilder, Validator, Validators } from '@angular/forms';

import { FirebaseProvider } from '../../services/firebase.service';

import { EmailValidator } from '../../validators/email';

import { LoginPage } from '../../pages/login/login';
import { Student } from '../../models/student';
import {HomePage} from '../../pages/home/home';


//@IonicPage()
@Component({
  selector: 'component-signup',
  templateUrl: 'signup.component.html',
})
export class Signup {

    public signupForm;
    loading: any;
    public studentemail:string;
    public studentphoto:string;
    public studentskills: string;
    public type= "password";
    public showpass = false;


    constructor(public nav: NavController, public authData: FirebaseProvider,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        this.signupForm = formBuilder.group({
            name: ['', Validators.compose(
                [Validators.minLength(1), 
                Validators.maxLength(30), 
                Validators.required])],
            lastname: ['', Validators.compose(
                [Validators.minLength(1), 
                Validators.maxLength(30), 
                Validators.required])],
            code: ['', Validators.compose(
                [Validators.minLength(7), 
                Validators.maxLength(7), 
                Validators.required])],
            cellphone: ['', Validators.compose(
                [Validators.minLength(10), 
                Validators.maxLength(10), 
                Validators.required])],
            email: ['', Validators.compose(
                [Validators.required, 
                EmailValidator.isValid])],
            password: ['', Validators.compose(
                [Validators.minLength(6), 
                Validators.required])]
            //personalEmail: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
        })
        this.studentphoto= "";
        this.studentskills="";
    }

    /**
     * Si el formulario el valido llamará al servicio de AuthData para registrar el usuario mostrando
     * un componente de "cargando" mientras el usuario espera.
     * 
     * Si el formulario es invalido...
     */
    signupUser() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        } else {
            this.authData.signupStudent(this.signupForm.value.email, this.signupForm.value.password, new Student(this.signupForm.value.code,
                this.signupForm.value.email,
                this.studentphoto,
                this.signupForm.value.name,
                this.signupForm.value.lastname,
                this.signupForm.value.cellphone,
                this.studentskills))
                .then(() => {
                    this.loading.dismiss().then(() => {
                        this.nav.setRoot(HomePage);
                        //this.nav.push(LoginPage);
                        console.log("El usuario se ha registrado exitosamente y puede ingresar a Home");
                    });
                }, (error) => {
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
    showPassword(): any {
        this.type = this.type === 'password' ?  'text' : 'password';
        this.showpass = !this.showpass;
    }

    goToLogin(): void {
        this.nav.push(LoginPage);
    }

}