import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'src/app/models/Local';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-update-local',
  templateUrl: './update-local.component.html',
  styleUrls: ['./update-local.component.scss']
})
export class UpdateLocalComponent implements OnInit {

  local: Local = new Local();
  localId: number = 0;
  rentSellError: boolean = false;

  constructor(private localService: LocalService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.local.visitDate = new Date().toISOString().split('T')[0];

    this.localId = Number(this.route.snapshot.paramMap.get('id'));

    const token = this.getAuthToken();
    if (token) {
      this.localService.getLocalById(this.localId, token).subscribe(
        (response) => {
          this.local = response;
        },
        (error: any) => {
          console.error('Error fetching local details', error);
        }
      );
    }
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  validateRentSell(): boolean {
    if ((this.local.rent && this.local.sell) || (!this.local.rent && !this.local.sell)) {
      this.rentSellError = true;
      return false;
    } else {
      this.rentSellError = false;
      return true;
    }
  }

  updateLocal() {
    if (!this.validateRentSell()) {
      return;
    }




    this.localService.updateLocal(this.localId,this.local).subscribe(
      (response) => {
        console.log('Local updated successfully', response);
        this.router.navigate(['/listings/listing-grid']);


      },
      (error: any) => {
        console.error('Error updating local', error);
      }
    );
  }
}
