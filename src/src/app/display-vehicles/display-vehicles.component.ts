import { Component, OnInit } from '@angular/core'
import { elementAt, filter } from 'rxjs'
import * as global from 'src/model/vehicle'
import { ApiService } from 'src/service/api.service'

@Component({
  selector: 'app-display-vehicles',
  templateUrl: './display-vehicles.component.html',
  styleUrls: ['./display-vehicles.component.css'],
})
export class DisplayVehiclesComponent implements OnInit {
  allVehicles: any = []
  vehicles: any = []
  filteredVehicles: any = []
  city: string = 'Islamabad'
  make: string = 'Audi'

  constructor(private apiService: ApiService) {
    this.apiService.getVehicles().subscribe((data) => {
      this.allVehicles = data;
      this.vehicles = data;
    });
  }

  ngOnInit(): void {}

  cityChangeHandler(event: any) {
    this.city = event.target.value
  }

  makeChangeHandler(event: any) {
    this.make = event.target.value
  }

  search() {
    this.filteredVehicles = [];
    this.vehicles = Object.create(this.allVehicles);

    var minimumPrice = (<HTMLInputElement>(
      document.getElementById('minimumPrice')
    )).value
    var maximumPrice = (<HTMLInputElement>(
      document.getElementById('maximumPrice')
    )).value
    var year = (<HTMLInputElement>document.getElementById('year')).value
    var mileage = (<HTMLInputElement>document.getElementById('mileage')).value
    var color = (<HTMLInputElement>document.getElementById('color')).value
    var engineCapacity = (<HTMLInputElement>(
      document.getElementById('engineCapacity')
    )).value
    var vehicleType = (<HTMLInputElement>document.getElementById('vehicleType'))
      .value
    var rating = (<HTMLInputElement>document.getElementById('rating')).value

    for (var i = 0; i < this.vehicles.length; ++i) {
      if (this.vehicles[i].location?.toLowerCase() != this.city.toLowerCase()) {
        this.filteredVehicles.push(this.vehicles[i])
      }
    }

    for (var i = 0; i < this.vehicles.length; ++i) {
      if (
        this.vehicles[i].make?.toLowerCase() != this.make.toLowerCase() &&
        !this.filteredVehicles.find((element: any) => element == this.vehicles[i])
      ) {
        this.filteredVehicles.push(this.vehicles[i])
      }
    }

    if (minimumPrice != '' && maximumPrice != '') {
      for (var i = 0; i < this.vehicles.length; ++i) {
        var price = this.vehicles[i].price
        if (price != null) {
          if (
            (price < minimumPrice || price > maximumPrice) &&
            !this.filteredVehicles.find(
              (element: any) => element == this.vehicles[i],
            )
          ) {
            this.filteredVehicles.push(this.vehicles[i])
          }
        }
      }
    } else if (minimumPrice != '') {
      for (var i = 0; i < this.vehicles.length; ++i) {
        var price = this.vehicles[i].price
        if (price != null) {
          if (
            price < minimumPrice &&
            !this.filteredVehicles.find(
              (element: any) => element == this.vehicles[i],
            )
          ) {
            this.filteredVehicles.push(this.vehicles[i])
          }
        }
      }
    } else if (maximumPrice != '') {
      for (var i = 0; i < this.vehicles.length; ++i) {
        var price = this.vehicles[i].price
        if (price != null) {
          if (
            price > maximumPrice &&
            !this.filteredVehicles.find(
              (element: any) => element == this.vehicles[i],
            )
          ) {
            this.filteredVehicles.push(this.vehicles[i])
          }
        }
      }
    }

    if (year != "") {
      for (var i = 0; i < this.vehicles.length; ++i) {
        if (
          this.vehicles[i].year != year &&
          !this.filteredVehicles.find((element: any) => element == this.vehicles[i])
        ) {
          this.filteredVehicles.push(this.vehicles[i])
        }
      }
    }
    
    if (mileage != "") {
      for (var i = 0; i < this.vehicles.length; ++i) {
        if (
          this.vehicles[i].mileage != mileage &&
          !this.filteredVehicles.find((element: any) => element == this.vehicles[i])
        ) {
          this.filteredVehicles.push(this.vehicles[i])
        }
      }
    }

    if (color != "") {
      for (var i = 0; i < this.vehicles.length; ++i) {
        if (
          this.vehicles[i].color?.toLowerCase() != color.toLowerCase() &&
          !this.filteredVehicles.find((element: any) => element == this.vehicles[i])
        ) {
          this.filteredVehicles.push(this.vehicles[i])
        }
      }
    }
    
    if (engineCapacity != "") {
      for (var i = 0; i < this.vehicles.length; ++i) {
        if (
          this.vehicles[i].engineCapacity != engineCapacity &&
          !this.filteredVehicles.find((element: any) => element == this.vehicles[i])
        ) {
          this.filteredVehicles.push(this.vehicles[i])
        }
      }
    }

    if (vehicleType != "") {
      for (var i = 0; i < this.vehicles.length; ++i) {
        if (
          this.vehicles[i].type?.toLowerCase() != vehicleType.toLowerCase() &&
          !this.filteredVehicles.find((element: any) => element == this.vehicles[i])
        ) {
          this.filteredVehicles.push(this.vehicles[i])
        }
      }  
    }
    
    if (rating != "") {
      for (var i = 0; i < this.vehicles.length; ++i) {
        if (
          this.vehicles[i].rating != rating &&
          !this.filteredVehicles.find((element: any) => element == this.vehicles[i])
        ) {
          this.filteredVehicles.push(this.vehicles[i])
        }
      }
    }

    for (var i = 0; i < this.filteredVehicles.length; ++i) {
      for (var j = 0; j < this.vehicles.length; ++j) {
        if (this.filteredVehicles[i]._id == this.vehicles[j]._id) {
          this.vehicles.splice(j, 1);
        }
      }
    }
  }

  resetSearch() {
    window.location.reload();
  }

  deleteVehicle(vehicle :any, index :any) {
    if(window.confirm('Are you sure you want to delete this vehicle?')) {
        this.apiService.deleteVehicle(vehicle._id).subscribe((data) => {
          this.vehicles.splice(index, 1);
        })
    }
  }
}
