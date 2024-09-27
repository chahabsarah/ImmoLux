import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { Local } from 'src/app/models/Local';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';
import { ERole } from 'src/app/models/ERole';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnonceComponent implements OnInit {
  public routes = routes;
  public locals: Local[] = [];
  public likedLocals: Set<number> = new Set(); // IDs of liked locals
  public minRent: number = 80;
  public maxRent: number = 9000;
  public filteredLocals: Local[] = [];
  public local: any;
  public userRole: ERole = ERole.AGENCE; // Default value

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

      // Fetch all locals
      this.localService.getAllLocals(token).subscribe(
        (data: Local[]) => {
          this.locals = data;
          this.filteredLocals = this.locals;
          this.initializeCarousels();
          this.updateLocalLikesState(); // Update the likes state after loading data
        },
        (error) => {
          console.error('Error fetching locals', error);
        }
      );
    } else {
      console.warn('No token or userId found. Cannot fetch locals.');
    }
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

  filterByPriceRange() {
    this.filteredLocals = this.locals.filter(local => local.rent >= this.minRent && local.rent <= this.maxRent);
  }

  filterByHighestRent() {
    this.locals.sort((a, b) => b.rent - a.rent);
  }

  filterByLowestRent() {
    this.locals.sort((a, b) => a.rent - b.rent);
  }

  addLike(localId: number) {
    const token = localStorage.getItem('token');
    const userId = Number(localStorage.getItem('userId'));

    if (token && userId) {
      this.localService.addLike(localId, userId, token).subscribe(
        (message: string) => {
          console.log(message); // Display confirmation message
          this.likedLocals.add(localId); // Add localId to likedLocals set
          this.updateLocalLikes(localId, true);
        },
        (error) => {
          console.error('Error adding like', error);
        }
      );
    }
  }

  removeLike(localId: number) {
    const token = localStorage.getItem('token');
    const userId = Number(localStorage.getItem('userId'));

    if (token && userId) {
      this.localService.removeLike(localId, userId, token).subscribe(
        (message: string) => {
          console.log(message); // Display confirmation message
          this.likedLocals.delete(localId); // Remove localId from likedLocals set
          this.updateLocalLikes(localId, false);
        },
        (error) => {
          console.error('Error removing like', error);
        }
      );
    }
  }

  updateLocalLikes(localId: number, liked: boolean) {
    const local = this.locals.find(l => l.localID === localId);

    if (local) {
      local.isLikedByUser = liked;

      if (liked) {
        local.likes = (local.likes || 0) + 1; // Increment likes
      } else {
        local.likes = Math.max((local.likes || 0) - 1, 0); // Decrement likes
      }
    }
  }

  updateLocalLikesState() {
    const token = localStorage.getItem('token');
    const userId = Number(localStorage.getItem('userId'));

    if (token && userId) {
      this.localService.getLikedLocals(userId, token).subscribe(
        (likedLocals: number[]) => {
          this.likedLocals = new Set(likedLocals);
          this.locals.forEach(local => {
            this.updateLocalLikes(local.localID, this.likedLocals.has(local.localID));
          });
        },
        (error) => {
          console.error('Error fetching liked locals', error);
        }
      );
    }
  }

  initializeCarousels() {
    this.locals.forEach(local => {
      const carouselElement = document.querySelector(`#carouselExampleControls${local.localID}`);
      if (carouselElement) {
        new (window as any).bootstrap.Carousel(carouselElement, {
          interval: 2000,
          ride: 'carousel'
        });
      }
    });
  }
}
