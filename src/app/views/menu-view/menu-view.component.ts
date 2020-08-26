import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {
  fullName: string;
  clusterActive = true;
  projectActive = false;
  constructor() { }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName');
    this.fullName = this.fullName.charAt(0).toUpperCase() + this.fullName.slice(1)
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('user_id');
  }

  isClusterActive() {
    this.clusterActive = true;
    this.projectActive = false;
  }

  isProjectActive() {
    this.clusterActive = false;
    this.projectActive = true;
  }

}
