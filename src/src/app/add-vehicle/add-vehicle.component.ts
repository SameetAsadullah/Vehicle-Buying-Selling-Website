import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  vehicleInstance: any = null;

  constructor(public fb: FormBuilder, private apiService: ApiService, private router: Router,
    private ngZone: NgZone,) {
    this.mainForm();
  }

  mainForm() {
    this.vehicleForm = this.fb.group({
      image: [''],
      title: [''],
      location: [''],
      make: [''],
      type: [''],
      price: [''],
      date: [''],
      rating: [''],
      model: [''],
      year: [''],
      transmission: [''],
      mileage: [''],
      color: [''],
      registeredIn: [''],
      assembly: [''],
      engineCapacity: [''],
      lastUpdated: [''],
      featuresList: [''],
      exteriorCondition: [''],
      interiorCondition: [''],
      engineCondition: [''],
      transmissionCondition: [''],
      suspensionCondition: [''],
      steeringCondition: [''],
      sellerContactNo: [''],
      sellerEmail: [''],
      sellerLocation: [''],
      sellerContactHours: [''],
      sellerComments: ['']
    });
  }

  ngOnInit(): void {
  }

  // Getter to access form control
  get myForm() {
    return this.vehicleForm.controls;
  }

  onSubmit() {
    if (!this.vehicleForm.valid) {
      return false;
    } else {
      let inputElement = (<HTMLInputElement>document.getElementById('uploadImage')).files;
      if (inputElement != null) {
        if (inputElement[0] != undefined && this.myForm['title'].value != "" && this.myForm['location'].value != "" && 
            this.myForm['price'].value != "" && this.myForm['year'].value != "") {
          this.vehicleForm.controls['image'].setValue('./assets/' + inputElement[0].name);
          return this.apiService.createVehicle(this.vehicleForm.value).subscribe({
            complete: () => {
              console.log('Employee successfully created!'),
                this.ngZone.run(() => this.router.navigateByUrl('/home'));
            },
            error: (e) => {
              console.log(e);
            },
          });
        }
        else {
          alert("Kindly Fill all Required Fields")
        }
      }
      return false;
    }
  }
}