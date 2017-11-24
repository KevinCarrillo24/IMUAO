import { ProfilePage } from '../../pages/profile/profile';
import { HomePage } from '../../pages/home/home';
import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { NavController,NavParams } from 'ionic-angular';

@Component({
    selector: 'bottom-nav',
    templateUrl: 'bottom-nav.component.html'
})
export class BottomNav {
    
    tab1Root = HomePage;
    tab2Root = ProfilePage;

    constructor(public nav: NavController) {
        
    }    

    ngOnInit(){

    }    

}
