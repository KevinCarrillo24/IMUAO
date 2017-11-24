import {Injectable} from '@angular/core';
import { Student } from '../models/student';
import { Project } from '../models/project';
import firebase from 'firebase';

@Injectable()
export class FirebaseProvider {
  constructor() {
  }

  /**
   * Metodo para Registrar un Nuevo Estudiante a la Aplicación y Base de Datos
   *
   * @param email Correo Electronico de Registro de Estudiante
   * @param password Contraseña de Registro de Estudiante
   * @param student Datos Personales del Estudiante
   *
   */
  signupStudent(email: string, password: string, student: Student): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      firebase.database().ref('/Students/').child(newUser.uid + "/PersonalInfo").set({
        studentcode: student.studentcode,
        studentemail: student.studentemail,
        studentphoto: student.studentphoto,
        studentfullname: student.studentfullname,
        studentfulllastname: student.studentfulllastname,
        studentphonenumber: student.studentphonenumber,
        studentskills: student.studentskills,
        studentoptionalemail:student.studentoptionalemail
      });
    });
  }

  /**
   * Metodo para insertar nuevos Proyectos de Usuario en la Base de Datos
   *
   * @param uid Identificador de usuario necesario para la ruta de la base de datos
   * @param project Datos del proyecto que van a ser almacenados
   */
  insertProject(uid: string, project: Project){
    var route:string = '/Students/'+uid+'/Projects/';
    var key = firebase.database().ref(route).push().key;
    firebase.database().ref(route+key).set(project);
  }

  /**
   * Metodo para Obtener los Proyectos de Usuario por ID de la base de datos
   *
   * @param uid Identificador del usuario
   *
   * @returns Array de proyectos de un solo usuario
   */
  getPersonalProjects(uid: string){
    var datos: Project[] = new Array<Project>();
    return firebase.database().ref('Students/'+uid+'/Projects');
  }

  /**
   * Metodo que busca todos los Usuarios almacenados en la base de datos, y crea un Array de los Projectos existentes
   * de todos los usuarios
   *
   * @returns un Array de Projects
   */
  getAllProjects(): Project[]{
    var datos: Project[] = new Array<Project>();
    firebase.database().ref('Students/').on('value', personSnapshot => {
      var data = personSnapshot.val();
      // console.log(data);
      for (var object in data) {
        if (data.hasOwnProperty(object)) {
          var element = data[object];
          if(element.Projects!=null){
            // console.log(element.Projects);
            this.setProjectsArray(datos, element.Projects);
          }
        }
      }
      // console.log(datos);
    });
    return datos;
  }

  /**
   * ----------------------------------  METODO PRIVADO-----------------------------------------------
   * Metodo que almacena los proyectos en un array y devuelve el array
   *
   * @param datos El Array que poseé los projectos 'ya' almacenados
   * @param projects el objeto con los proximos proyectos para almacenar
   *
   * @returns El array que envia los proyectos almacenados
   */
  setProjectsArray(datos: Project[], projects: Object): Project[]{
    for (var object in projects) {
      if (projects.hasOwnProperty(object)) {
        var element = projects[object];
        datos.push(element as Project);
      }
    }
    // console.log(datos);
    return datos;
  }

  /**
   * Metodo para Actualizar los datos de usuario en la base de datos, requiere el UID del usuario en la base de datos y la informacion a
   * modificar
   *
   * @param uid Identificador del usuario
   * @param student Datos de usuario para actualizar
   */
  updateStudent(uid: string,student: Student) : Promise<any>{
   return firebase.database().ref("/Students/" + uid + "/PersonalInfo").update({
     studentcode: student.studentcode,
     studentemail: student.studentemail,
     studentphoto: student.studentphoto,
     studentfullname: student.studentfullname,
     studentfulllastname: student.studentfulllastname,
     studentphonenumber: student.studentphonenumber,
     studentskills: student.studentskills,
     studentoptionalemail: student.studentoptionalemail
  })
  }

  /**
   * Metodo para obtener los datos de usuario
   *
   * @param uid Identificador de usuario
   */
  getStudentinfo(uid: string) {
  return  firebase.database().ref("/Students/" + uid + "/PersonalInfo");
    //    var studentInfo: Student;

  //   .on('value', personSnapshot => {
  //   var data = personSnapshot.val();
  //   studentInfo = new Student(
  //     data.studentcode,
  //     data.studentemail,
  //     data.studentphoto,
  //     data.studentfullname,
  //     data.studentfulllastname,
  //     data.studentphonenumber,
  //     data.studentskills
  //   );
  // });
  // return studentInfo;
  }

  /**
   * Metodo para obtener el identificador del usuario logueado
   *
   * @returns el UID del usuario
   */
  getCurrentuserid(): string{
    return firebase.auth().currentUser.uid;
  }

  /**
   * Metodo para poder ingresar a la aplicacion y su contenido
   *
   * @param email Correo autorizado en Firebase
   * @param password Contraseña relacionada con el correo de usuario
   */
  loginStudent(email: string, password: string):Promise<any>{
    var studentInfo: Student;
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

  /**
   * Metodo para modificar contraseña de usuario en caso de olvido
   *
   * @param email Correo autorizado en Firebase
   */
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * Metodo para cerrar sesion de la aplicacion
   */
  logoutStudent(): Promise<void> {
    return firebase.auth().signOut();
  }
}
