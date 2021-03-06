import { VendorProject } from 'src/app/models/vendorProject';
import { GeoObject, FilteredProjects } from 'src/app/models';

export const polygon1 = [
  [13.417223404477, 52.5283447684827],
  [13.41620416505134, 52.52709807661344],
  [13.417598913739084, 52.526699911021495],
  [13.418757628033518, 52.527861761172375],
  [13.42018456322944, 52.527463602503616],
  [13.421311091015696, 52.528605851303695]
];
export const polygon2 = [
  [13.41561, 52.539611],
  [13.41861, 52.539611],
  [13.41861, 52.542611],
  [13.41561, 52.542611]
];

export const responseProject: VendorProject = {
  'id': '0',
  'rating': '9.3',
  'userId': 0,
  'name': 'project name',
  'legalEntityName': 'company name',
  // 'goal': 'goal',
  'region': 'region',
  'address': 'address',
  // 'sphereActivities': [{ id: 1, name: 'field of activity' }, { id: 2, name: 'field of activity' }],
  // 'companyAge': 1,
  // 'employeesNumberMin': 6,
  // 'employeesNumberMax': 10,
  // 'employeesToHire': 0,
  // 'grossIncome': '0',
  // 'averageCheck': 1110,
  // 'mounthlyClients': 110,
  // 'averagePrice': 1110,
  'description': 'investmentDescription description description v description description description description',
  // 'moneyRequired': 0,
  // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
  // 'steps': [
  //   {
  //     'id': 0,
  //     'stepNumber': 0,
  //     'data': 'string string string string string string string string string string string string string string string string string'
  //   },
  //   {
  //     'id': 2,
  //     'stepNumber': 1,
  //     'data': 'string'
  //   },
  //   {
  //     'id': 3,
  //     'stepNumber': 2,
  //     'data': 'string'
  //   },
  //   {
  //     'id': 3,
  //     'stepNumber': 2,
  //     'data': 'string'
  //   }
  // ],
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
    'originalName': 'original_name',
    'accessFile': 0
  },
  'images': [
    {
      'id': 0,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'originalName': 'original_name',
      'accessFile': 0
    },
    {
      'id': 1,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'originalName': 'original_name',
      'accessFile': 0
    },
    {
      'id': 2,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'originalName': 'original_name',
      'accessFile': 0
    },
    {
      'id': 3,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'originalName': 'original_name',
      'accessFile': 0
    },
    {
      'id': 4,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'originalName': 'original_name',
      'accessFile': 0
    },
    {
      'id': 5,
      'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
        'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      'originalName': 'original_name',
      'accessFile': 0
    }
  ],
  // 'files': [
  //   {
  //     'id': 0,
  //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
  //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
  //     'originalName': 'original_name',
  //     'accessFile': 0
  //   }
  // ]
};

export const responseProject2: VendorProject = {
  'id': '1',
  'rating': '9.3',
  'userId': 0,
  'name': 'project name 2',
  'legalEntityName': 'company name',
  // 'goal': 'goal',
  'region': 'region',
  'address': 'address',
  // 'sphereActivities': [{ id: 1, name: 'field of activity' }, { id: 2, name: 'field of activity' }],
  // 'companyAge': 1,
  // 'employeesNumberMin': 6,
  // 'employeesNumberMax': 10,
  // 'employeesToHire': 0,
  // 'grossIncome': '0',
  // 'averageCheck': 1110,
  // 'mounthlyClients': 110,
  // 'averagePrice': 1110,
  'description': 'investmentDescription description description v description description description description',
  // 'moneyRequired': 0,
  // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
  // 'steps': [
  //   {
  //     'id': 0,
  //     'stepNumber': 0,
  //     'data': 'some long step name'
  //   },
  //   {
  //     'id': 2,
  //     'stepNumber': 1,
  //     'data': 'some long step name'
  //   },
  //   {
  //     'id': 3,
  //     'stepNumber': 2,
  //     'data': 'some very long step name some step name some step name some step name'
  //   },
  //   {
  //     'id': 4,
  //     'stepNumber': 3,
  //     'data': 'some step name'
  //   },
  //   {
  //     'id': 5,
  //     'stepNumber': 4,
  //     'data': 'some step name'
  //   },
  //   {
  //     'id': 6,
  //     'stepNumber': 4,
  //     'data': 'some step name'
  //   },
  //   {
  //     'id': 7,
  //     'stepNumber': 4,
  //     'data': 'some step name'
  //   },
  //   {
  //     'id': 8,
  //     'stepNumber': 4,
  //     'data': 'some step name'
  //   },
  //   {
  //     'id': 9,
  //     'stepNumber': 4,
  //     'data': 'some step name some step name some step name'
  //   },
  //   {
  //     'id': 10,
  //     'stepNumber': 4,
  //     'data': 'some step name some step name some step name'
  //   }
  // ],
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
    'originalName': 'original_name',
    'accessFile': 0
  },
  'images': [
    {
      'id': 0,
      'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
      'originalName': 'original_name',
      'accessFile': 0
    }
  ],
  // 'files': [
  //   {
  //     'id': 0,
  //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
  //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
  //     'originalName': 'original_name',
  //     'accessFile': 0
  //   }
  // ]
};

export const female: GeoObject = {
  geoObjectId: '0', // only unique
  coords: { x: 35.028, y: 48.4747 },
  projectName: responseProject.name,
  path: '../../../assets/objects/female.zip',
  // pathLP: window.location.origin + '../../../assets/objects/low-poly-tractor.zip',
  project: responseProject
};

export const female2: GeoObject = {
  geoObjectId: '4',  // only unique
  coords: { x: 35.028, y: 48.4747 },
  projectName: responseProject2.name,
  path: '../../../assets/objects/female.zip',
  // pathLP: window.location.origin + '../../../assets/objects/low-poly-tractor.zip',
  project: responseProject2
};

export const male: GeoObject = {
  geoObjectId: '1',  // only unique
  coords: { x: 35.028, y: 48.4747 },
  projectName: responseProject2.name,
  path: '../../../assets/objects/male.zip',
  // pathLP: window.location.origin + '../../../assets/objects/low-poly-tractor.zip',
  project: responseProject2
};

export const tractor: GeoObject = {
  geoObjectId: '2',  // only unique
  coords: { x: 35.028, y: 48.4747 },
  projectName: responseProject2.name,
  path: '../../../assets/objects/tractor.zip',
  // pathLP: window.location.origin + '../../../assets/objects/low-poly-tractor.zip',
  project: responseProject2
};

export const walt: GeoObject = {
  geoObjectId: '3',  // only unique
  coords: { x: 35.028, y: 48.4747 },
  projectName: responseProject.name,
  path: '../../../assets/objects/walt.zip',
  // pathLP: window.location.origin + '../../../assets/objects/low-poly-tractor.zip',
  project: responseProject
};

export const responseProjects: FilteredProjects = {
  'pages': 1,
  'projectsCount': 1,
  'projectsList': [
    {
      'id': '0',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 3',
      'legalEntityName': 'company name',
      // 'goal': 'goalgoalgoalgoalgoalgoalgoal goalgoalgoalgoalgoal goalgoalgoalgoalgoalgoal goalgoalgoalgoalgoal goalgoalgoalgoalgoalgoalgoal goalgoalgoalgoalgoalgoal goalgoalgoalgoalgoalgoalgoal goalgoalgoalgoalgoalgoal goalgoalgoalgoal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [{ id: 1, name: 'field of activity' }, { id: 2, name: 'field of activity' }],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'string string string string string string string string string string string string string string string string string'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'string'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name some very long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name some very long step name some very long step name some very long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name some very long step name some very long step name some very long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name some very long step name some very long step name some very long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'string'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'string'
      //   }
      // ],
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
        'url': 'https://3dexport.com/items/2004/10/21/469/139030/massey_ferguson_5600' +
          '_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 1,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 2,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 3,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 4,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 5,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 6,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 7,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 8,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 9,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 10,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        }
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   },
      //   {
      //     'id': 1,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   },
      //   {
      //     'id': 2,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   },
      //   {
      //     'id': 3,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
    {
      'id': '1',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 4',
      'legalEntityName': 'company name',
      // 'goal': 'goal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [{ id: 1, name: 'field of activity' }],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name qqqqqqqqqqqqqqqqqq'
      //   },
      //   {
      //     'id': 4,
      //     'stepNumber': 3,
      //     'data': 'some step name'
      //   },
      //   {
      //     'id': 5,
      //     'stepNumber': 4,
      //     'data': 'some step name'
      //   },
      //   {
      //     'id': 5,
      //     'stepNumber': 4,
      //     'data': 'some step name'
      //   }
      // ],
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
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 1,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 2,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 3,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 4,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 4,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 6,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        }
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
    {
      'id': '2',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 5',
      'legalEntityName': 'company name',
      // 'goal': 'goal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [{ id: 1, name: 'field of activity' }],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'string111111 string string string v stringstringv  stringstringstring stringstring stringstringstring stringstring'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'string 11111'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'string'
      //   }
      // ],
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
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 1,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 2,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
        {
          'id': 3,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        },
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
    {
      'id': '3',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 6',
      'legalEntityName': 'company name',
      // 'goal': 'goal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [{ id: 1, name: 'field of activity' }],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'string'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'string'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'string'
      //   }
      // ],
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
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://3dexport.com/items/2004/10/21/469/139030/mass' +
            'ey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        }
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
    {
      'id': '4',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 7',
      'legalEntityName': 'company name',
      // 'goal': 'goal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [{ id: 1, name: 'field of activity' }],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name qqqqqqqqqqqqqqqqqq'
      //   },
      //   {
      //     'id': 4,
      //     'stepNumber': 3,
      //     'data': 'some step name'
      //   },
      //   {
      //     'id': 5,
      //     'stepNumber': 4,
      //     'data': 'some step name'
      //   }
      // ],
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
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        }
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
    {
      'id': '5',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 8',
      'legalEntityName': 'company name',
      // 'goal': 'goal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [
      //   { id: 1, name: 'field of activity' },
      //   { id: 2, name: 'field of activity' },
      //   { id: 3, name: 'field of activity' },
      //   { id: 4, name: 'field of activity' }
      // ],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name qqqqqqqqqqqqqqqqqq'
      //   },
      //   {
      //     'id': 4,
      //     'stepNumber': 3,
      //     'data': 'some step name'
      //   },
      //   {
      //     'id': 5,
      //     'stepNumber': 4,
      //     'data': 'some step name'
      //   }
      // ],
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
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        }
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
    {
      'id': '6',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 9',
      'legalEntityName': 'company name',
      // 'goal': 'goal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [
      //   { id: 1, name: 'field of activity' },
      //   { id: 2, name: 'field of activity' },
      //   { id: 3, name: 'field of activity' },
      //   { id: 4, name: 'field of activity' },
      //   { id: 5, name: 'field of activity' }
      // ],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name qqqqqqqqqqqqqqqqqq'
      //   },
      //   {
      //     'id': 4,
      //     'stepNumber': 3,
      //     'data': 'some step name'
      //   },
      //   {
      //     'id': 5,
      //     'stepNumber': 4,
      //     'data': 'some step name'
      //   }
      // ],
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
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        }
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
    {
      'id': '7',
      'rating': '9.3',
      'userId': 0,
      'name': 'project name 10',
      'legalEntityName': 'company name',
      // 'goal': 'goal',
      'region': 'region',
      'address': 'address',
      // 'sphereActivities': [
      //   { id: 1, name: 'field of activity' },
      //   { id: 2, name: 'field of activity' },
      //   { id: 3, name: 'field of activity' },
      //   { id: 4, name: 'field of activity' },
      //   { id: 5, name: 'field of activity' }
      // ],
      // 'companyAge': 1,
      // 'employeesNumberMin': 6,
      // 'employeesNumberMax': 10,
      // 'employeesToHire': 0,
      // 'grossIncome': '0',
      // 'averageCheck': 1110,
      // 'mounthlyClients': 110,
      // 'averagePrice': 1110,
      'description': 'investmentDescription description description v description description description description',
      // 'moneyRequired': 0,
      // 'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription',
      // 'steps': [
      //   {
      //     'id': 0,
      //     'stepNumber': 0,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 2,
      //     'stepNumber': 1,
      //     'data': 'some long step name'
      //   },
      //   {
      //     'id': 3,
      //     'stepNumber': 2,
      //     'data': 'some very long step name qqqqqqqqqqqqqqqqqq'
      //   },
      //   {
      //     'id': 4,
      //     'stepNumber': 3,
      //     'data': 'some step name'
      //   },
      //   {
      //     'id': 5,
      //     'stepNumber': 4,
      //     'data': 'some step name'
      //   }
      // ],
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
        'originalName': 'original_name',
        'accessFile': 0
      },
      'images': [
        {
          'id': 0,
          'url': 'https://i.ytimg.com/vi/DgpcC83LjhQ/maxresdefault.jpg',
          'originalName': 'original_name',
          'accessFile': 0
        }
      ],
      // 'files': [
      //   {
      //     'id': 0,
      //     'url': 'https://3dexport.com/items/2004/10/21/469/1' +
      //       '39030/massey_ferguson_5600_series_tracor_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1634842_o.jpg',
      //     'originalName': 'original_name',
      //     'accessFile': 0
      //   }
      // ]
    },
  ]
};



