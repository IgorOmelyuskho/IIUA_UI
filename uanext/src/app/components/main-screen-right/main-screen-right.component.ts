import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

const responseProjects = {
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
    ]
  },
  'error': {
    'code': 0,
    'errorMessage': [
      'string'
    ]
  }
};

const messages = [1, 2, 3];
@Component({
  selector: 'app-main-screen-right',
  templateUrl: './main-screen-right.component.html',
  styleUrls: ['./main-screen-right.component.scss']
})
export class MainScreenRightComponent implements OnInit {
  @ViewChild('mainScreenRight') rightBlock: ElementRef;

  projects_1: any[] = [...responseProjects.data.projectsList, ...responseProjects.data.projectsList, ...responseProjects.data.projectsList];
  messages: any[] = messages;
  projects_2: any[] = [responseProjects.data.projectsList[0], ...responseProjects.data.projectsList];
  projects_3: any[] = [responseProjects.data.projectsList[0], ...responseProjects.data.projectsList];

  messages_show = false;
  projects_2_show = false;
  projects_3_show = false;

  constructor() { }

  ngOnInit() {
    this.rightBlock.nativeElement.style.display = 'none';
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  hideRightBlock() {
    this.rightBlock.nativeElement.style.display = 'none';
    this.messages_show = false;
    this.projects_2_show = false;
    this.projects_3_show = false;
  }

  showMessages() {
    this.messages_show = !this.messages_show;
    this.rightBlock.nativeElement.style.display = '';
  }

  showProjects_2() {
    this.projects_2_show = !this.projects_2_show;
    this.rightBlock.nativeElement.style.display = '';
  }

  showProjects_3() {
    this.projects_3_show = !this.projects_3_show;
    this.rightBlock.nativeElement.style.display = '';
  }
}
