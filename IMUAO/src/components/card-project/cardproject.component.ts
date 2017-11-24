import { Component } from '@angular/core';
import { FirebaseProvider } from "../../services/firebase.service";
import firebase from 'firebase';
import { Project } from '../../models/project';

@Component({
    selector: 'card-project',
    templateUrl: 'cardproject.component.html'
})

export class CardProject{
    public arrayProjects:Array<Project>;
    
    constructor(public _firebaseService:FirebaseProvider){
        this.arrayProjects = _firebaseService.getAllProjects();
    }
    

}