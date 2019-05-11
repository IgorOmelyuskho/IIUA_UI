import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
// import { mapInit, mapDestroy, mapSetProject } from './map3-no-class';
// import { Map } from './map3';
import { VendorProject } from 'src/app/models/vendorProject.js';
import { FilterFields, UserRole } from 'src/app/models/index.js';
import { StateService } from 'src/app/services/state/state.service';

const responseProject = {
  'id': 0,
  'rating': 9.3,
  'userId': 0,
  'name': 'SLON&Co',
  'legalEntityName': 'legalEntityName',
  'goal': 'goal',
  'region': 'region',
  'address': 'address',
  'fieldOfActivity': 'fieldOfActivity',
  'companyAge': 1,
  'employeesNumber': 1,
  'employeesToHire': 0,
  'grossIncome': 0,
  'averageCheck': 1110,
  'mounthlyClients': 110,
  'averagePrice': 1110,
  'description': 'investmentDescription description description v description description description description',
  'moneyRequired': 0,
  'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
  'steps': [
    {
      'id': 0,
      'stepNumber': 0,
      'data': 'string string string string string string string string string string string string string string string string string'
    },
    {
      'id': 2,
      'stepNumber': 1,
      'data': 'string'
    },
    {
      'id': 3,
      'stepNumber': 2,
      'data': 'string'
    },
    {
      'id': 3,
      'stepNumber': 2,
      'data': 'string'
    }
  ],
  'videos': [
    {
      'id': 0,
      'url': 'video_urlstring',
      'projectId': 0
    }
  ],
  'avatara': {
    'id': 0,
    'url': 'https://3dexport.com/items/2004/10/21/469/139030/massey_ferguson_5600' +
      '_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
    'name': 'string',
    'accessFile': 0
  },
  'images': [
    {
      'id': 0,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    },
    {
      'id': 1,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    },
    {
      'id': 2,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    },
    {
      'id': 3,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    },
    {
      'id': 4,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    },
    {
      'id': 5,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    }
  ],
  'files': [
    {
      'id': 0,
      'url': 'https://3dexport.com/items/2004/10/21/469/1' +
        '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    }
  ]
};

const responseProject2 = {
  'id': 1,
  'rating': 9.3,
  'userId': 0,
  'name': 'SLON&Co',
  'legalEntityName': 'legalEntityName',
  'goal': 'goal',
  'region': 'region',
  'address': 'address',
  'fieldOfActivity': 'fieldOfActivity',
  'companyAge': 1,
  'employeesNumber': 1,
  'employeesToHire': 0,
  'grossIncome': 0,
  'averageCheck': 1110,
  'mounthlyClients': 110,
  'averagePrice': 1110,
  'description': 'investmentDescription description description v description description description description',
  'moneyRequired': 0,
  'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
  'steps': [
    {
      'id': 0,
      'stepNumber': 0,
      'data': 'some long step name'
    },
    {
      'id': 2,
      'stepNumber': 1,
      'data': 'some long step name'
    },
    {
      'id': 3,
      'stepNumber': 2,
      'data': 'some very long step name qqqqqqqqqqqqqqqqqq'
    },
    {
      'id': 4,
      'stepNumber': 3,
      'data': 'some step name'
    },
    {
      'id': 5,
      'stepNumber': 4,
      'data': 'some step name'
    }
  ],
  'videos': [
    {
      'id': 0,
      'url': 'video_urlstring',
      'projectId': 0
    },
    {
      'id': 0,
      'url': 'video_urlstring2',
      'projectId': 0
    },
    {
      'id': 0,
      'url': 'video_urlstring3',
      'projectId': 0
    }
  ],
  'avatara': {
    'id': 0,
    'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
    'name': 'string',
    'accessFile': 0
  },
  'images': [
    {
      'id': 0,
      'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
      'name': 'string',
      'accessFile': 0
    }
  ],
  'files': [
    {
      'id': 0,
      'url': 'https://3dexport.com/items/2004/10/21/469/1' +
        '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'name': 'string',
      'accessFile': 0
    }
  ]
};

@Component({
  selector: 'app-main-screen-investor',
  templateUrl: './main-screen-investor.component.html',
  styleUrls: ['./main-screen-investor.component.scss']
})
export class MainScreenInvestorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('previewCardWrapper') previewCardWrapper: ElementRef;

  selectedProject: any = responseProject; // ViewVendorProject
  selectedProjectId: any = responseProject.id; // todo use when page reload

  filter: FilterFields;
  filterIsExpanded = false; // false - свернут

  UserRole = UserRole;
  role: UserRole;

  showPreviewCard = false;
  previewCardX = 0;
  previewCardY = 0;
  hoveredProjectUploaded = false;
  hoveredProject: any;

  @ViewChild('stepsElement') stepsElement: ElementRef;

  windowMouseMoveHandler = (e) => {
    this.previewCardX = e.pageX;
    this.previewCardY = e.pageY;
  }

  windowClickHandler = (e) => {
    console.log('CLICK');
    this.showPreviewCard = false;
  }

  constructor(private stateService: StateService, private renderer: Renderer2) { }

  ngOnInit() {
    new Image().src = '../../../assets/img/message-hover.png';
    new Image().src = '../../../assets/img/bell-hover.png';
    new Image().src = '../../../assets/img/approve-hover.png';

    this.role = this.stateService.role();
  }

  ngAfterViewInit() {
    window.addEventListener('mousemove', this.windowMouseMoveHandler);
    window.addEventListener('mousedown', this.windowClickHandler);
  }

  filterOnChange(filterParam: FilterFields) {
    this.filter = filterParam;
    console.log(this.filter);
  }

  onMapObjectClick(mapObject: any) {
    this.selectedProject = { ...mapObject.project };
    this.selectedProjectId = mapObject.project.id;
  }

  onMapObjectHover(mapObject: any) {
    this.hoveredProject = mapObject.project;
    this.showPreviewCard = true;
    this.previewCardWrapper.nativeElement.style.left = this.previewCardX + 'px';
    this.previewCardWrapper.nativeElement.style.top = this.previewCardY + 'px';
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.windowMouseMoveHandler);
    window.removeEventListener('mousedown', this.windowClickHandler);
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }
}
