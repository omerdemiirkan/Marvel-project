import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdOfferComponent } from './add-prod-offer.component';

describe('AddProdOfferComponent', () => {
  let component: AddProdOfferComponent;
  let fixture: ComponentFixture<AddProdOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProdOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProdOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
