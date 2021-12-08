import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    constructor()  {}
    public router: Router;

    ngOnInit() {
        this.showMenu = '';
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

}
