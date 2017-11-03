import {Injectable} from '@angular/core';
import { Student } from '../models/student';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  constructor() {

  }

  loginStudent(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupStudent(email: string, password: string, student: Student): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      firebase
      .database()
      .ref('/Students/')
      .child(newUser.uid)
      .set({
        studentcode: student.studentcode,
        studentemail: student.studentemail,
        studentphoto: student.studentphoto,
        studentfullname: student.studentfullname,
        studentfulllastname: student.studentfulllastname,
        studentphonenumber: student.studentphonenumber,
        studentskills: student.studentskills});
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutStudent(): Promise<void> {
    return firebase.auth().signOut();
  }

  updateStudent(uid: string,student: Student) : Promise<any>{
   return firebase.database().ref("/Students/" + uid).update({
     studentcode: student.studentcode,
     studentemail: student.studentemail,
     studentphoto: student.studentphoto,
     studentfullname: student.studentfullname,
     studentfulllastname: student.studentfulllastname,
     studentphonenumber: student.studentphonenumber,
     studentskills: student.studentskills
  })
  }

  getCurrentuserid(): string{
    return firebase.auth().currentUser.uid;
  }
}
