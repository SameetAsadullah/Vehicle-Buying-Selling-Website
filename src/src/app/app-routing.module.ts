import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component'
import { AppComponent } from './app.component'
import { DisplayVehiclesComponent } from './display-vehicles/display-vehicles.component'
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component'
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DisplayVehiclesComponent },
  { path: 'display/:id', component: VehicleDetailComponent },
  { path: 'addVehicle', component: AddVehicleComponent },
  { path: 'editVehicle/:id', component: EditVehicleComponent },
  { path: '**', redirectTo: 'home' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
