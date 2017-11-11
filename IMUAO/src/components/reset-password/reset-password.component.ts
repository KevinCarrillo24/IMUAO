import { IonicPage, NavParams, NavController,
    LoadingController,
    AlertController } from 'ionic-angular';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../services/firebase.service';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'component-reset-password',
  templateUrl: 'reset-password.component.html',
})
export class ResetPassword {
    public resetPasswordForm;


    constructor(public authData: AuthProvider, public formBuilder: FormBuilder,
        public nav: NavController, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        })
    }

    /**
     * Si el formulario es valido se llamará el servicio de AuthData para restablecer la contraseña
     * mostrando un componente de "cargando" mientras el usuario espera
     * 
     * Si el formulario es invalido...
     */
    resetPassword() {
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        } else {
            this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
                let alert = this.alertCtrl.create({
                    message: "Hemos enviado a tu correo un enlace para restablecer tu contraseña",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel',
                            handler: () => {
                                this.nav.pop();
                            }
                        }
                    ]
                });
                alert.present();

            }, (error) => {
                var errorMessage: string = error.message;
                let errorAlert = this.alertCtrl.create({
                    message: "No hemos podido encontrar tu cuenta con esa información",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                errorAlert.present();
            });
        }
    }
}
