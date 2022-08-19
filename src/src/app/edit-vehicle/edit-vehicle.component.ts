import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  vehicleInstance!: any;

  constructor(public fb: FormBuilder, private _ActivatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router) {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.apiService.getVehicle(params.get('id')).subscribe((data) => {
        this.vehicleInstance = data;
        this.makeForm();
      });
    })
   }

   makeForm() {
    this.vehicleForm = this.fb.group({
      image: this.vehicleInstance.image,
      title: this.vehicleInstance.title,
      location: this.vehicleInstance.location,
      make: this.vehicleInstance.make,
      type: this.vehicleInstance.type,
      price: this.vehicleInstance.price,
      date: this.vehicleInstance.date,
      rating: this.vehicleInstance.rating,
      model: this.vehicleInstance.model,
      year: this.vehicleInstance.year,
      transmission: this.vehicleInstance.transmission,
      mileage: this.vehicleInstance.mileage,
      color: this.vehicleInstance.color,
      registeredIn: this.vehicleInstance.registeredIn,
      assembly: this.vehicleInstance.assembly,
      engineCapacity: this.vehicleInstance.engineCapacity,
      lastUpdated: this.vehicleInstance.lastUpdated,
      featuresList: this.vehicleInstance.featuresList,
      exteriorCondition: this.vehicleInstance.exteriorCondition,
      interiorCondition: this.vehicleInstance.interiorCondition,
      engineCondition: this.vehicleInstance.engineCondition,
      transmissionCondition: this.vehicleInstance.transmissionCondition,
      suspensionCondition: this.vehicleInstance.suspensionCondition,
      steeringCondition: this.vehicleInstance.steeringCondition,
      sellerContactNo: this.vehicleInstance.sellerContactNo,
      sellerEmail: this.vehicleInstance.sellerEmail,
      sellerLocation: this.vehicleInstance.sellerLocation,
      sellerContactHours: this.vehicleInstance.sellerContactHours,
      sellerComments: this.vehicleInstance.sellerComments
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
        if (inputElement[0] != undefined) {
          this.vehicleForm.controls['image'].setValue('./assets/' + inputElement[0].name);
        }
        else {
          this.vehicleForm.controls['image'].setValue(this.vehicleInstance.image);
        }
        
        if (this.myForm['title'].value != "" && this.myForm['location'].value != "" && 
            this.myForm['price'].value != null && this.myForm['year'].value != null) {
              let id = this._ActivatedRoute.snapshot.paramMap.get('id');
              this.apiService.updateVehicle(id, this.vehicleForm.value).subscribe({
                complete: () => {
                  this.router.navigateByUrl('/employees-list');
                  console.log('Content updated successfully!');
                },
                error: (e) => {
                  console.log(e);
                },
              });
              return true;
        }
        else {
          alert("Kindly Fill all Required Fields")
        }
      }
      return false;
    }
  }
}