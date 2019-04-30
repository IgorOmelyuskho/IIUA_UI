import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { Router } from '@angular/router';
import { FilteredProjects } from 'src/app/models';
import { PageEvent } from '@angular/material';
import { init, destroy, setProject } from './map2.js';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import FormHelper from '../../services/helperServices/formHelper';

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
  FormHelper = FormHelper;

  projects: ViewVendorProject[] = [];
  selectedProject: ViewVendorProject;
  showProgress = false;
  searchCompanyName: string;
  searchProjectName: string;

  pageSize = 5;
  pagesCount = 0;
  projectsCount = 0;
  pageNumber = 1;

  selectedMenuItem: string;

  prevSearch: string; // filter/projectName/companyName

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  filter: any = {
    page: this.pageNumber,
    pageSize: this.pageSize
  };

  constructor(private router: Router) { }

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
    // todo
    // this.filter.moneyRequiredFrom = this.budgetFromElement.value;
    // this.filter.moneyRequiredTo = this.budgetToElement.value;
    // this.filter.region = this.region;
    // this.filter.companyAgeFrom = this.ageFromElement.value;
    // this.filter.companyAgeTo = this.ageToElement.value;
    setTimeout(() => { // mat-progress-bar
      this.searchByFilter(this.filter);
    }, 0);

    // if (this.projects != null) {
    // init();
    // }
  }

  filterOnChange(filter) {
    console.log(filter); // todo
  }

  updateRateOnChange(updateRate) {
    console.log(updateRate); // todo
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
  }

  searchByCompanyInput(e) {
    if (e.code === 'Enter') {
      this.changeSearchType();
      this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
    }
  }

  searchByProjectInput(e) {
    if (e.code === 'Enter') {
      this.changeSearchType();
      this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
    }
  }

  searchByCompanyNameBtn() {
    this.changeSearchType();
    this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
  }

  searchByProjectNameBtn() {
    this.changeSearchType();
    this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
  }

  searchByCompanyName(name: string, pageSize: number, pageNumber: number) {
    this.prevSearch = 'companyName';
    this.showProgressBar(true);
    // this.viewProjectsService.searchByCompanyName(name, pageSize, pageNumber)
    //   .subscribe(
    //     (filteringProjects: FilteredProjects) => {
    //       this.pagesCount = filteringProjects.pages;
    //       this.projectsCount = filteringProjects.projectsCount;
    //       // this.projects = filteringProjects.projectsList; // use for pagination
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

  searchByProjectName(name: string, pageSize: number, pageNumber: number) {
    this.prevSearch = 'projectName';
    this.showProgressBar(true);
    // this.viewProjectsService.searchByProjectName(name, pageSize, pageNumber)
    //   .subscribe(
    //     (filteringProjects: FilteredProjects) => {
    //       this.pagesCount = filteringProjects.pages;
    //       this.projectsCount = filteringProjects.projectsCount;
    //       // this.projects = filteringProjects.projectsList; // use for pagination
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

  showProgressBar(show: boolean) {
    if (show === true) {
      this.showProgress = true;
    } else {
      this.showProgress = false;
    }
  }

  searchByFilterBtn() {
    // todo
    // this.filter.moneyRequiredFrom = this.budgetFromElement.value;
    // this.filter.moneyRequiredTo = this.budgetToElement.value;
    // this.filter.region = this.region;
    // this.filter.companyAgeFrom = this.ageFromElement.value;
    // this.filter.companyAgeTo = this.ageToElement.value;
    this.changeSearchType();
    this.searchByFilter(this.filter);
  }

  searchByFilter(filter: any) {
    this.prevSearch = 'filter';
    this.showProgressBar(true);
    // this.viewProjectsService.fetchProjects(filter).subscribe(
    //   (filteringProjects: FilteredProjects) => {
    //     console.log(filteringProjects);
    //     this.pagesCount = filteringProjects.pages;
    //     this.projectsCount = filteringProjects.projectsCount;
    //     // this.projects = filteringProjects.projectsList; // use for pagination
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

  addNewProjects(newProjects: any[]) {
    for (let i = 0; i < newProjects.length; i++) {
      this.projects.push(newProjects[i]);
    }
  }

  changeSearchType() {
    this.projects = [];
    this.pageNumber = 1;
    this.filter.page = 1;
  }

  pageEvent(e: PageEvent) {
    // this.pageSize = e.pageSize;
    // this.pageNumber = e.pageIndex + 1;

    // if (this.prevSearch === 'filter') {
    //   this.filter.page = this.pageNumber;
    //   this.filter.pageSize = this.pageSize;
    //   this.searchByFilter(this.filter);
    // }
    // if (this.prevSearch === 'companyName') {
    //   this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
    // }
    // if (this.prevSearch === 'projectName') {
    //   this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
    // }
  }

  onScroll2() {
    console.log('scrolled!!');
    this.pageNumber += 1;

    if (this.prevSearch === 'filter') {
      this.filter.page = this.pageNumber;
      this.filter.pageSize = this.pageSize;
      this.searchByFilter(this.filter);
    }
    if (this.prevSearch === 'companyName') {
      this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
    }
    if (this.prevSearch === 'projectName') {
      this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
    }
  }

  onScrollUp() {
    console.log('scroll UP');
    // this.pageNumber -= 1;
  }

  projectMouseEnter(project: ViewVendorProject) { // or request for data ?
    const rightProject: any = {};
    rightProject.id = project.id;
    rightProject.projectCoords = {
      x: 13.41561 + Math.random() * 0.1,
      y: 52.539611 + Math.random() * 0.1,
    };

    setProject(rightProject);
  }

  ngOnDestroy() {
    destroy();
  }

}
