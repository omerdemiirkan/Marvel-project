import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Offer} from "../models/offer";
import {OfferItem} from "../models/offerItem";
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DashboardService} from "../services/dashboard/dashboard.service";
import {Store} from "@ngxs/store";
import {AuthState} from "../../auth/storage/state";
import {SelectedUpdateOfferList} from "../../auth/storage/action";

@Component({
  selector: 'omer-update-prod-offer',
  templateUrl: './update-prod-offer.component.html',
  styleUrls: ['./update-prod-offer.component.css']
})
export class UpdateProdOfferComponent implements OnInit {

  AddOfferForm!: FormGroup;
  offer!: Offer;
  selectedOffer!: OfferItem;

  offerList!:Offer

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,

    private dashboardService: DashboardService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getSelectedOfferList();
    this.getOfferList()
    this.createOfferForm();
    this.createAddOfferForm()
  }

  createOfferForm() {
    this.AddOfferForm = this.formBuilder.group({
      name: [this.selectedOffer?.offer?.name || '', Validators.required],
      status: [this.selectedOffer?.offer?.status || '', Validators.required],
      description: [
        this.selectedOffer?.offer?.description || '',
        Validators.required,
      ],
      prodOfferType: [
        this.selectedOffer?.offer?.prodOfferType || '',
        Validators.required,
      ],
      amount: [this.selectedOffer?.offer?.amount || '', Validators.required],
      prodOfferId: [
        this.selectedOffer?.offer?.prodOfferId || '',
        Validators.required,
      ],
    });
  }
  createAddOfferForm() {
    this.AddOfferForm = this.formBuilder.group({
      name: [this.offerList?.name || '', Validators.required],
      status: [this.offerList?.status || '', Validators.required],
      description: [
        this.offerList?.description || '',
        Validators.required,
      ],
      prodOfferType: [
        this.offerList?.prodOfferType || '',
        Validators.required,
      ],
      amount: [this.offerList?.amount || '', Validators.required],
      prodOfferId: [
        this.offerList?.prodOfferId || '',
        Validators.required,
      ],
    });
  }



  getSelectedOfferList() {
    const offerId = localStorage.getItem('offerId');

    this.store.select(AuthState.getSelectedOfferList).subscribe((data) => {
      console.log(data.selectedOfferList, ' sgsggwwe');
      const newData = data?.selectedOfferList?.find((m) => {
        return m.id == Number(offerId);
      }) as OfferItem;

      this.selectedOffer = newData;
      console.log(this.selectedOffer,"seç.ili offer")
    });
  }
  getOfferList() {
    const offerId = localStorage.getItem('id');

    this.store.select(AuthState.getOfferList).subscribe((data) => {

      const newData = data?.offerList?.find((m) => {
        return m.id == Number(offerId);
      }) as Offer

      this.offerList = newData;
      console.log(this.offerList)
    });
  }


  update() {

    const  newOffer:Offer={
      ...this.AddOfferForm.value,name:this.offerList.name,prodOfferId:this.offerList.prodOfferId,amount:this.offerList.amount,
      status:this.offerList.status, id:this.offerList.id, prodOfferType:this.offerList.prodOfferType,description:this.offerList.description,
      prodOfferChars:this.offerList.prodOfferChars
    }
    console.log(newOffer)
    this.dashboardService.updateOffer(newOffer).subscribe(data=>{

      console.log(data)
    })

    this.store.dispatch(new SelectedUpdateOfferList(newOffer))


  }

  addOffer() {
    this.offer = Object.assign(
      {
        ...this.offer,
        id: Math.floor(Math.random() * 1000),
        prodOfferId: Math.floor(Math.random() * 1000),
      },
      this.AddOfferForm.value
    );
    console.log(this.offer);
    this.messageService.add({
      key: 'myKey1',
      severity: 'warn',
      summary: 'Danger',
      detail: 'Your password does not match',
    });

    this.dashboardService.addOffer(this.offer).subscribe((data) => {
      this.messageService.add({
        key: 'myKey1',
        severity: 'success',
        summary: 'Success',
        detail: 'ADD OFFER Successful',
      });
      this.router.navigateByUrl('/admin');
    });
  }
}
