import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProdOfferComponent } from './update-prod-offer.component';

describe('UpdateProdOfferComponent', () => {
  let component: UpdateProdOfferComponent;
  let fixture: ComponentFixture<UpdateProdOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProdOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProdOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
