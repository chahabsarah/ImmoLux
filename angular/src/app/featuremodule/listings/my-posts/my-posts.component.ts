import { Component, OnInit } from '@angular/core';
import { Local } from 'src/app/models/Local';
import { LocalService } from 'src/app/services/local.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ERole } from 'src/app/models/ERole';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  locals: Local[] = [];
  public routes = routes;
  public userRole: ERole = ERole.AGENCE;
  public filteredLocals: Local[] = [];



  constructor(private localService: LocalService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userId = Number(localStorage.getItem('userId'));

    if (token && userId) {
      // Fetch user info including roles
      this.localService.getUserInfo(userId, token).subscribe(
        (userInfo: any) => {
          if (userInfo && userInfo.role) {
            this.userRole = userInfo.role.name; // Directly assign role name from the user info
          } else {
            console.warn('User role is not defined or empty');
          }
        },
        (error) => {
          console.error('Error fetching user info', error);
        }
      );


    } else {
      console.warn('No token or userId found. Cannot fetch locals.');
    }
    this.getLocalsByUserId();
  }
  goToUpdate(localId: number) {
    this.router.navigate([`/listings/update/${localId}`]);
  }

  Details(localId: number) {
    this.router.navigate([`/listings/details/${localId}`]);
  }

  deleteLocal(localId: number) {
    const token = localStorage.getItem('token');

    if (token) {
      this.localService.deleteLocal(localId, token).subscribe(
        () => {
          this.locals = this.locals.filter(local => local.localID !== localId);
          this.filteredLocals = this.filteredLocals.filter(local => local.localID !== localId);
          console.log('Local deleted successfully');
        },
        (error) => {
          console.error('Error deleting local', error);
        }
      );
    }
  }

  getLocalsByUserId(): void {
    const token = String(localStorage.getItem('token'));
    const userId = Number(localStorage.getItem('userId'));
    this.localService.getLocalsByUserId(userId, token).subscribe({
      next: (data) => {
        this.locals = data;
      },
      error: (error) => {
        console.error('Error fetching locals:', error);
      }
    });
  }
  initializeCarousels() {
    this.locals.forEach(local => {
      const carouselElement = document.querySelector(`#carouselExampleControls${local.localID}`);
      if (carouselElement) {
        new (window as any).bootstrap.Carousel(carouselElement, {
          interval: 2000, // Adjust the interval as needed
          ride: 'carousel'
        });
      }
    });
  }
}
