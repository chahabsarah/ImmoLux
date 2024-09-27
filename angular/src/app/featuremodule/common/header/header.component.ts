import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SidebarService } from 'src/app/service/sidebar.service';
import { CommonService } from 'src/app/service/common.service';
import { ERole } from 'src/app/models/ERole';
import { LocalService } from 'src/app/services/local.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  base: string = '';
  page: string = '';
  last: string = '';
  public userRole: ERole = ERole.AGENCE; // Default value
  userNewRole: string = 'ABONNE';
  routes = {
    home: '/listings/listing-grid',
    addAnnounce: '/auth/addLocal',
    myAnnounces: '/listings/my-posts',
    dashboard: '/listings/dashboard',
    users: '/listings/users',



  };

  public nav : boolean = false;
  header: Array<any> = [];
  sidebar: Array<any> = [];


constructor(private http: HttpClient,private localService: LocalService,private data : DataService,private router: Router, private common: CommonService,

  private sidebarService: SidebarService){
  this.header = this.data.header;
  this.router.events.subscribe((event: any) => {
    if (event instanceof NavigationStart) {
      this.getroutes(event);
    }
  });
  this.getroutes(this.router);
}
ngOnInit(): void {
  const token = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId'));

  if (token && userId) {
    this.localService.getUserInfo(userId, token).subscribe(
      (userInfo: any) => {
        if (userInfo && userInfo.role) {
          this.userRole = userInfo.role.name;
        } else {
          this.userRole = ERole.NONE; // or ERole.NONE if you defined a default role
        }
      },
      (error) => {
        console.error('Error fetching user info', error);
        this.userRole = ERole.NONE;      }
    );
  } else {
    this.userRole = ERole.NONE;  }
}

becomeAgence() {
  const userId = Number(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  const url = `http://localhost:9095/auth/becomeAgence?userId=${userId}`;
  const headers = {
    Authorization: `Bearer ${token}`
  };

  this.http.post(url, {}, { headers }).subscribe(
    (response: any) => {
      alert('You are now an Agence!');

      setTimeout(() => {
        window.location.reload();
      }, 40);
    },
    (error: any) => {
      alert('Failed to change role. Please try again.');
    }
  );
}

private getroutes(route: any): void {
  let splitVal = route.url.split('/');
  this.base = splitVal[1];
  this.page = splitVal[2];
  this.last = splitVal[3];



  if (
    this.base == 'userpages'
   )
   {
    this.nav = false;
   }
  else {
    this.nav = true;
  }

}
public toggleSidebar(): void {
  this.sidebarService.openSidebar();
}
public hideSidebar(): void {
  this.sidebarService.closeSidebar();
}



logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');

  this.router.navigate(['/auth/login']).then(() => {
    window.location.reload();
  });
}

}
