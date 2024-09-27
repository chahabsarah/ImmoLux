import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocalComponent } from './update-local.component';

describe('UpdateLocalComponent', () => {
  let component: UpdateLocalComponent;
  let fixture: ComponentFixture<UpdateLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
