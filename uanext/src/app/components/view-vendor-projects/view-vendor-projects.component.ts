import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { Router } from '@angular/router';
import { FilteredProjects, FilterFields } from 'src/app/models';
import { init, destroy, setProject } from './map2.js';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import FormHelper from '../../services/helperServices/formHelper';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service.js';
import { fromEvent } from 'rxjs';
import { tap, map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const response = {
  'isSuccess': true,
  'data': {
    'pages': 1,
    'projectsCount': 1,
    'projectsList': [
      {
        'id': 0,
        'raiting': 9.3,
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
      },
      {
        'id': 1,
        'raiting': 9.3,
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
      },
      {
        'id': 0,
        'raiting': 9.3,
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
            'data': 'string111111 string string string v stringstringv  stringstringstring stringstring stringstringstring stringstring'
          },
          {
            'id': 2,
            'stepNumber': 1,
            'data': 'string 11111'
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
      },
      {
        'id': 0,
        'raiting': 9.3,
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
            'data': 'string'
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
      },
      {
        'id': 1,
        'raiting': 9.3,
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
      },
      {
        'id': 0,
        'raiting': 9.3,
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
            'data': 'string'
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
      },
      {
        'id': 1,
        'raiting': 9.3,
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
      },
      {
        'id': 0,
        'raiting': 9.3,
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
            'data': 'string'
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
      },
      {
        'id': 1,
        'raiting': 9.3,
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
      },
    ]
  },
  'error': {
    'code': 0,
    'errorMessage': [
      'string'
    ]
  }
};

@Component({
  selector: 'app-view-vendor-projects',
  templateUrl: './view-vendor-projects.component.html',
  styleUrls: ['./view-vendor-projects.component.scss']
})
export class ViewVendorProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;

  FormHelper = FormHelper;

  projects: ViewVendorProject[] = [];
  selectedProject: ViewVendorProject;
  showProgress = false;
  searchWord: string;

  pageSize = 5;
  pagesCount = 0;
  projectsCount = 0;
  pageNumber = 1;

  selectedMenuItem: string;

  prevSearch: string; // filter/keyWord

  _filterItemForRemove: any;
  get filterItemForRemove(): any {
    return this._filterItemForRemove;
  }
  set filterItemForRemove(value: any) {
    this._filterItemForRemove = value;
    console.log(this._filterItemForRemove);
  }

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  filter: FilterFields;

  constructor(private router: Router, private viewProjectsService: ViewProjectsService) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsMoveSize: 4
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => { // mat-progress-bar
      this.searchProjectsByFilter(this.filter);
    }, 0);

    // if (this.projects != null) {
    // init();
    // }

    fromEvent<any>(this.searchByKeyWordInput.nativeElement, 'input')
      .pipe(
        map(e => e.target.value),
        debounceTime(700),
        filter(e => e.length >= 3),
        distinctUntilChanged((a, b) => a === b),
      )
      .subscribe(res => {
        this.resetBeforeNewSearch();
        this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
      });
  }

  onFilterItemRemove(filterItemForRemove) {
    console.log('CLEAR ALL iN VIEW_VENROR');
    // this.filterItemForRemove = filterItemForRemove;
    this.filterItemForRemove = JSON.parse(JSON.stringify(filterItemForRemove));
  }

  filterOnChange(filterParam: FilterFields) {
    this.filter = filterParam;
    console.log(this.filter);
  }

  setGalleryImages(images) {
    const imagesArr = [];
    for (let i = 0; i < images.length; i++) {
      const item = { small: images[i].url, medium: images[i].url, big: images[i].url };
      imagesArr.push(item);
    }

    this.galleryImages = imagesArr;
  }

  goToProject(project: ViewVendorProject) {
    // this.viewProjectsService.projectForView = project;
    this.router.navigate(['home', 'investor', 'project', project.id]);
  }

  selectProject(project: ViewVendorProject) {
    this.selectedProject = project;
    this.selectedMenuItem = 'shared';
    this.setGalleryImages(this.selectedProject.images);
    this.setMapCoordinateByProject(project);
  }

  setMapCoordinateByProject(project: ViewVendorProject) {
    // todo
    project['projectCoords'] = {
      x: 13.41561 + Math.random() * 0.1,
      y: 52.539611 + Math.random() * 0.1,
    };

    setProject(project); // map2.js
  }

  searchByKeywordBtn(event) {
    this.resetBeforeNewSearch();
    this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
  }

  searchByKeywordKeyDown(e) {
    if (e.code === 'Enter') {
      this.resetBeforeNewSearch();
      this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
    }
  }

  searchProjectsByKeyword(keyword: string, pageSize: number, pageNumber: number) {
    console.log('searchProjectsByKeyword = ', keyword);
    this.prevSearch = 'keyWord';
    this.showProgressBar(true);
    // this.viewProjectsService.searchByKeyword(keyword, pageSize, pageNumber)
    //   .subscribe(
    //     (filteringProjects: FilteredProjects) => {
    //       this.pagesCount = filteringProjects.pages;
    //       this.projectsCount = filteringProjects.projectsCount;
    //       this.addNewProjects(filteringProjects.projectsList);
    //       this.showProgressBar(false);
    //     },
    //     err => {
    //       console.warn(err);
    //       this.showProgressBar(false);
    //     }
    //   );
    this.addNewProjects(response.data.projectsList);
    this.showProgressBar(false);
  }

  searchByFilter() {
    this.resetBeforeNewSearch();
    this.searchByKeywordBtn(this.filter); // todo this.filter
  }

  searchProjectsByFilter(filterParam: any) {
    this.prevSearch = 'filter';
    this.showProgressBar(true);
    // this.viewProjectsService.searchByFilter(filter).subscribe(
    //   (filteringProjects: FilteredProjects) => {
    //     console.log(filteringProjects);
    //     this.pagesCount = filteringProjects.pages;
    //     this.projectsCount = filteringProjects.projectsCount;
    //     this.addNewProjects(filteringProjects.projectsList);
    //     this.showProgressBar(false);
    //   },
    //   err => {
    //     console.warn(err);
    //     this.showProgressBar(false);
    //   }
    // );
    this.addNewProjects(response.data.projectsList);
    this.showProgressBar(false);
  }

  showProgressBar(show: boolean) {
    if (show === true) {
      this.showProgress = true;
    } else {
      this.showProgress = false;
    }
  }

  addNewProjects(newProjects: any[]) {
    for (let i = 0; i < newProjects.length; i++) {
      this.projects.push(newProjects[i]);
    }
  }

  resetBeforeNewSearch() {
    this.projects = [];
    this.pageNumber = 1;
    this.filter.page = 1;
  }

  onScroll() {
    console.log('scrolled!!');
    this.pageNumber += 1;

    if (this.prevSearch === 'filter') {
      this.filter.page = this.pageNumber;
      this.filter.pageSize = this.pageSize;
      this.searchProjectsByFilter(this.filter);
    }
    if (this.prevSearch === 'keyWord') {
      this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
    }
  }

  onScrollUp() {
    console.log('scroll UP');
    // this.pageNumber -= 1;
  }

  ngOnDestroy() {
    destroy();
  }

}
