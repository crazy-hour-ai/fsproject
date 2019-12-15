import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantdetailsComponent } from './restaurantdetails.component';

describe('RestaurantdetailsComponent', () => {
  let component: RestaurantdetailsComponent;
  let fixture: ComponentFixture<RestaurantdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
