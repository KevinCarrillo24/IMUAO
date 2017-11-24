import { BottomNav } from '../components/bottom-nav/bottom-nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilePage } from '../pages/profile/profile';
import { AddProject } from '../pages/add-project/add-project';

//Import Components
import { UserProfile } from '../components/userprofile/userprofile.component';
import { Login } from '../components/login/login.component';
import { Signup } from '../components/signup/signup.component';
import { ResetPassword } from '../components/reset-password/reset-password.component';
import { CardProject } from '../components/card-project/cardproject.component';

//Import services
import { FirebaseProvider } from "../services/firebase.service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    UserProfile,
    LoginPage,
    SignupPage,
    Signup,
    Login,
    ResetPasswordPage,
    ResetPassword,
    CardProject,
    AddProject,
    BottomNav
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ResetPasswordPage,
    AddProject
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
