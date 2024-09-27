import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Local } from 'src/app/models/Local';
import { LocalWithImagesRequest } from 'src/app/models/LocalWithImagesRequest';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-add-local',
  templateUrl: './add-local.component.html',
  styleUrls: ['./add-local.component.scss']
})
export class AddLocalComponent implements OnInit {

  local: Local = new Local();
  images: File[] = [];
  rentSellError: boolean = false;

  constructor(private localService: LocalService, private router: Router) {}

  ngOnInit(): void {
    this.local.visitDate = new Date().toISOString().split('T')[0];
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  onFileSelected(event: any) {
    this.images = event.target.files;
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

  addLocal() {
    if (!this.validateRentSell()) {
      return;
    }

    const token = this.getAuthToken();

    if (!token) {
      console.error('No token found');
      return;
    }

    const localRequest: LocalWithImagesRequest = {
      local: this.local,
      images: this.images
    };

    this.localService.addLocal(localRequest, token).subscribe(
      response => {
        console.log('Local added successfully', response);
        this.router.navigate(['/listings/listing-grid']);

      },
      error => {
        console.error('Error adding local', error);
      }
    );
  }
}
