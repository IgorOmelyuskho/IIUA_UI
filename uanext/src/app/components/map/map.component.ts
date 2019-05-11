import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
// import { Map } from './map4';
import {
  mapInit,
  mapDestroy,
  mapSetProject,
  mapAddNewPolygons,
  mapSetFullScreen,
  mapReplacePolygons,
  mapAddNewObjects,
  mapReplaceObjects,
  setObjectClickCallback,
  setObjectHoverCallback,
  setMapClickCallback
} from './map4-no-class';

const polygon1 = [
  [13.417223404477, 52.5283447684827],
  [13.41620416505134, 52.52709807661344],
  [13.417598913739084, 52.526699911021495],
  [13.418757628033518, 52.527861761172375],
  [13.42018456322944, 52.527463602503616],
  [13.421311091015696, 52.528605851303695]
];
const polygon2 = [
  [13.41561, 52.539611],
  [13.41861, 52.539611],
  [13.41861, 52.542611],
  [13.41561, 52.542611]
];

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

const object1 = {
  id: 'some obj ID',
  coords: { x: 0, y: 0 },
  name: responseProject.legalEntityName,
  pathToFolder: '../../../assets/objects/sharedFolder/',
  modelMtl: 'Tractor.mtl', // ../../../assets/objects/tractorObj/Tractor.mtl or Tractor.mtl
  modelObj: 'Tractor.obj', // ../../../assets/objects/tractorObj/Tractor.obj or Tractor.obj
  project: responseProject
};

const object2 = {
  id: 'some obj ID 32432',
  coords: { x: 0, y: 0 },
  name: responseProject2.legalEntityName,
  pathToFolder: '../../../assets/objects/sharedFolder/',
  modelMtl: 'male02_dds.mtl',
  modelObj: 'male02.obj',
  project: responseProject2
};

const object3 = {
  id: 'some obj ID 324f32',
  coords: { x: 0, y: 0 },
  name: responseProject2.legalEntityName,
  pathToFolder: '../../../assets/objects/sharedFolder/',
  modelMtl: 'female02.mtl',
  modelObj: 'female02.obj',
  project: responseProject2
};

const object4 = {
  id: 'some obj ID 324fdsf3gfd2',
  coords: { x: 0, y: 0 },
  name: responseProject.legalEntityName,
  pathToFolder: '../../../assets/objects/sharedFolder/',
  modelMtl: 'WaltHead.mtl',
  modelObj: 'WaltHead.obj',
  project: responseProject
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() objectClick = new EventEmitter<any>();
  @Output() objectHover = new EventEmitter<any>();
  @Output() mapClick = new EventEmitter<any>();

  @Input()
  set changeSelectedProject(project: any) {
    if (project != null) {
      mapSetProject(project);
    }
  }

  timeOut1: any;
  timeOut2: any;
  timeOut3: any;
  timeOut4: any;
  timeOut5: any;

  // map: Map = null;

  clickObjectCallback: Function = (object: any) => {
    this.objectClick.emit(object);
  }

  hoverObjectCallback: Function = (object: any) => {
    this.objectHover.emit(object);
  }

  mapClickCallback: Function = (event) => {
    this.mapClick.emit(event);
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.map = new Map();
    mapInit();
    setObjectClickCallback(this.clickObjectCallback);
    setObjectHoverCallback(this.hoverObjectCallback);
    setMapClickCallback(this.mapClickCallback);

    this.timeOut1 = setTimeout(() => {
      mapAddNewPolygons([polygon1]);
    }, 10);

    this.timeOut2 = setTimeout(() => {
      mapReplacePolygons([polygon1, polygon2]);
    }, 20);

    this.timeOut3 = setTimeout(() => {
      mapAddNewObjects([object1, object2, object3, object4]);
    }, 30);

    // this.timeOut4 = setTimeout(() => {
    //   mapReplaceObjects([object1, object2]);
    // }, 8000);

    // this.timeOut5 = setTimeout(() => {
    //   mapSetFullScreen();
    // }, 5000);
  }

  ngOnDestroy() {
    // if use http - clear http request
    clearTimeout(this.timeOut1);
    clearTimeout(this.timeOut2);
    clearTimeout(this.timeOut3);
    clearTimeout(this.timeOut4);
    clearTimeout(this.timeOut5);

    // this.map.mapDestroy();
    mapDestroy();
  }

}
