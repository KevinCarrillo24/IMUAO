import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { NavController,NavParams } from 'ionic-angular';
import { Project } from '../../models/project';

@Component({
    selector: 'add-project',
    templateUrl: 'add-project.html'
})
export class AddProject {

    constructor(public nav: NavController) {
        
    }    

    ngOnInit(){

    }    

}
