import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ShippingService } from 'src/app/services/shipping.service';
import { ShippingConstants } from 'src/app/models/shipping.model';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship-to-view',
  templateUrl: './ship-to-view.component.html',
  styleUrls: ['./ship-to-view.component.css'],
})
export class ShipToViewComponent implements OnInit {
  shippingAddress = this.fb.group({
    recipient: ['', Validators.required],
    streetAddress: ['', Validators.required],
    streetAddress2: [''],
    city: ['', Validators.required],
    province: [null, Validators.required],
    postalCode: ['', Validators.required],
    delivery: ['Standard'],
  });

  formSubmitted = false;

  CanadianProvincesAndTerritories =
    ShippingConstants.CanadianProvincesAndTerritories;
  USStatesAndTerritories = ShippingConstants.USStatesAndTerritories;
  deliveryMethods = ShippingConstants.DeliveryMethods;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private shipping: ShippingService,
    private title: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Ship To');
    if (this.shipping.shippingAddress) {
      this.shippingAddress.setValue(this.shipping.shippingAddress);
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.shippingAddress.valid) {
      this.shipping.shippingAddress = this.shippingAddress.value;
      console.log('Submit Clicked');
      console.log(this.shippingAddress.value);
      this.router.navigate(['/checkout']);
    }
  }

  invalidInput(input: string): boolean {
    if (this.formSubmitted) {
      console.log(this.formSubmitted);
      return this.shippingAddress.get(input)!.invalid;
    } else {
      return false;
    }
  }

  validInput(input: string): boolean {
    if (this.shippingAddress.touched || this.shippingAddress.dirty) {
      return this.shippingAddress.get(input)!.valid;
    } else {
      return false;
    }
  }

  goBack() {
    this.location.back();
  }
}
