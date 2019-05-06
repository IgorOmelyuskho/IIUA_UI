import { Component, OnInit, AfterViewInit } from '@angular/core';
import { mapInit, mapDestroy, mapSetProject } from './map3.js';
import { ViewVendorProject } from 'src/app/models/viewVendorProject.js';
import { FilterFields } from 'src/app/models/index.js';

const responseProject = {
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
};

const responseProject2 = {
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
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit, AfterViewInit {
  selectedProject: any = responseProject; // ViewVendorProject
  selectedProjectId: any = responseProject.id; // todo use when page reload

  filter: FilterFields;

  constructor() { }

  ngOnInit() {
    new Image().src = '../../../assets/img/message-hover.png';
    new Image().src = '../../../assets/img/bell-hover.png';
    new Image().src = '../../../assets/img/approve-hover.png';

    setTimeout(() => {
      this.selectedProject = responseProject2;
    }, 4000);
  }

  ngAfterViewInit() {
    // if (this.selectedProject != null) {
    //   mapInit(this.selectedProject);
    // }
    mapInit(); // todo init with selected project or set project after
  }

  filterOnChange(filterParam: FilterFields) {
    this.filter = filterParam;
    console.log(this.filter);
  }

}
