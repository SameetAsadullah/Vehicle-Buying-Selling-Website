import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import * as global from '..//..//model/vehicle'
import { ApiService } from 'src/service/api.service'

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css'],
})
export class VehicleDetailComponent implements OnInit {
  vehicleInstance: any;
  vehicles: any = []

  constructor(private _ActivatedRoute: ActivatedRoute, private apiService: ApiService) {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.apiService.getVehicle(params.get('id')).subscribe((data) => {
        this.vehicleInstance = data;
      });
    })
  }

  ngOnInit(): void {}
}
