import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingGridComponent } from './annonces.component';

describe('ListingGridComponent', () => {
  let component: ListingGridComponent;
  let fixture: ComponentFixture<ListingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
