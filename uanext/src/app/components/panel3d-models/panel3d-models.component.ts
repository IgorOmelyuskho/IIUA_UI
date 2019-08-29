import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/services/http/map.service';
import { Subscription } from 'rxjs';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { FileResponseDto } from 'src/app/models/fileResponseDto';

@Component({
  selector: 'app-panel3d-models',
  templateUrl: './panel3d-models.component.html',
  styleUrls: ['./panel3d-models.component.scss']
})
export class Panel3dModelsComponent implements OnInit, OnDestroy {
  object3DResponse: FileResponseDto[];
  selectedProjectSubscription: Subscription;
  project: VendorProject;
  self = 'Panel3dModelsComponent';

  constructor(private mapService: MapService, private stateService: StateService) { }

  ngOnInit() {
    this.selectedProjectSubscription = this.stateService.selectedVendorProject$.subscribe(
      (val: VendorProject) => {
        if (val !== null) {
          this.project = val;
        }
      }
    );

    this.mapService.getGeoModels(1, 100).subscribe(
      (object3DResponse: FileResponseDto[]) => {
        this.object3DResponse = object3DResponse;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.selectedProjectSubscription.unsubscribe();
  }

}
