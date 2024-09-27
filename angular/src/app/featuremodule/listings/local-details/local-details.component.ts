import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { Local } from 'src/app/models/Local';

@Component({
  selector: 'app-local-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.scss']
})
export class LocalDetailsComponent implements OnInit {
  public local: Local | undefined;
  public locals: Local[] = [];

  constructor(
    private route: ActivatedRoute,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    const localID = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('token');


    if (localID && token) {
      this.localService.getLocalById(localID, token).subscribe(
        (data: Local) => {
          this.local = data;
          this.initializeCarousels();

        },
        (error) => {
          console.error('Error fetching local details', error);
        }
      );
    }
  }
  initializeCarousels() {
    this.locals.forEach(local => {
      const carouselElement = document.querySelector(`#carouselExampleControls${local.localID}`);
      if (carouselElement) {
        new (window as any).bootstrap.Carousel(carouselElement, {
          interval:10,
          ride: 'carousel'
        });
      }
    });
  }
}
