import Stats from 'stats-js';
import { GeoObject } from 'src/app/models';
import { VendorProject } from 'src/app/models/vendorProject';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { Object3DDto } from 'src/app/models/object3DDto';
import { MapService } from 'src/app/services/http/map.service';
import { HistoryPositionDto } from 'src/app/models/historyPositionDto';
declare var THREE: any;
declare var maptalks: any;

export enum MapZoomEnum {
  BIG = 'BIG', // > bigZoom
  AVG = 'AVG', // avgZoom - bigZoom
  SMALL = 'SMALL', // < avgZoom
}

export enum ModelQuality {
  LOW = 'LOW',
  HIGH = 'HIGH',
}

export class MapManager {
  // constants region
  private readonly bigZoom = 16;
  private readonly deltaZoom = 0.2;
  private readonly avgZoom = 12;
  private readonly initZoom = 18;
  private readonly updatedInterval = 3500;
  private readonly drawInterval = 50;

  // callbacks
  private on_click_object: Function = null;
  private on_hover_object: Function = null;
  private on_map_init: Function = null;
  private on_map_change_extent: Function = null;

  // fields
  private canvasElem: HTMLElement = null;
  private stats: Stats = null;
  private scene = null;
  private raycaster = null;
  private mouse = null;
  private selectedObject: GeoObject = null;
  private map = null;
  private objectsArr: GeoObject[] = [];
  private timerForDraw = null;
  private animationFrame = null;
  private mapElement: HTMLElement = null;
  private mapWrapperElement: HTMLElement | any = null;
  private threeLayer = null;
  private clusterLayer = null;
  private polygonLayer = null;
  private labelRenderer = null;
  private camera = null;
  private prevClusterGeoObjectId: string = null;
  private mapZoomEnum: MapZoomEnum;
  private mapService: MapService;
  private selectedForEditObject: GeoObject = null;
  private rotateLeftInterval: any;
  private rotateRightInterval: any;
  private mouseBtnClicked = false;
  private enabledObjectDrag = false;

  // html elements id
  private mapWrapperId: string;
  private mapId: string;
  private labelRendererId: string;

  // key
  private xKeyPressed = false;

  public constructor(cb: Function, htmlId: { mapWrapperId: string, mapId: string, labelRendererId: string }, mapService: MapService) {
    this.mapWrapperId = htmlId.mapWrapperId;
    this.mapId = htmlId.mapId;
    this.labelRendererId = htmlId.labelRendererId;
    this.mapService = mapService;
    this.mapInit(cb);
  }

  mapSetCenterByProject(project: VendorProject) {
    // project.coords = {};
    // project.coords.x = Math.random() * 30;
    // project.coords.y = Math.random() * 30;
    // this.map.setCenter(new maptalks.Coordinate(project.coords.x, project.coords.y));
    // set selected project ??
  }

  mapDestroy() {
    clearInterval(this.timerForDraw);
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.windowResize);

    this.canvasElem = null;
    this.stats = null;
    this.scene = null;
    this.threeLayer = null;
    this.raycaster = null;
    this.mouse = null;
    this.selectedObject = null;
    this.map = null;
    this.objectsArr = [];
    this.timerForDraw = null;
    this.animationFrame = null;
    this.mapElement = null;
    this.mapWrapperElement = null;
    this.clusterLayer = null;
    this.polygonLayer = null;
    this.camera = null;
    this.prevClusterGeoObjectId = null;
    this.mapService = null;
    this.selectedForEditObject = null;
    this.rotateLeftInterval = null;
    this.rotateRightInterval = null;

    this.on_click_object = null;
    this.on_hover_object = null;
    this.on_map_init = null;
    this.on_map_change_extent = null;
  }

  mapSetFullScreen() { // todo navbar height
    const e = document.documentElement;
    const g = document.body;
    const x = window.innerWidth || e.clientWidth || g.clientWidth;
    const y = window.innerHeight || e.clientHeight || g.clientHeight;
    this.mapWrapperElement.style.width = x + 'px';
    this.mapWrapperElement.style.height = y + 'px';
    this.mapElement.style.width = x + 'px';
    this.mapElement.style.height = y + 'px';
    this.labelRenderer.setSize(this.mapElement.clientWidth, this.mapElement.clientHeight);
  }

  signalRMessage: Function = (message: { object3DId: string, positionX: number, positionY: number }) => {
    for (let i = 0; i < this.objectsArr.length; i++) {
      if (message.object3DId === this.objectsArr[i].geoObjectId) {
        this.objectsArr[i].prevCoords.x = this.objectsArr[i].coords.x;
        this.objectsArr[i].prevCoords.y = this.objectsArr[i].coords.y;
        this.objectsArr[i].speedX = (message.positionX - this.objectsArr[i].prevCoords.x) * this.drawInterval / this.updatedInterval;
        this.objectsArr[i].speedY = (message.positionY - this.objectsArr[i].prevCoords.y) * this.drawInterval / this.updatedInterval;

        if (this.objectsArr[i].pointForMove) {
          const v = this.threeLayer.coordinateToVector3(new THREE.Vector3(message.positionX, message.positionY, 0.1));
          this.objectsArr[i].pointForMove.position.x = v.x;
          this.objectsArr[i].pointForMove.position.y = v.y;
        }

        return;
      }
    }
  }

  drop3DObject(object3DDto: Object3DDto, object3DId: string, project: VendorProject) {
    const geoObject: GeoObject = this.object3DDtoToGeoObject(object3DDto, object3DId, project);
    this.postHistoryData(geoObject);
    this.mapAddNewObjects([geoObject]);
  }

  private object3DDtoToGeoObject(object3DDto: Object3DDto, object3DId: string, project: VendorProject): GeoObject {
    const geoObject: GeoObject = {
      geoObjectId: object3DId,
      project: project,
      coords: this.map.getCenter(),
      pathToZip: object3DDto.path,
      pathToZipLP: object3DDto.path,
      canMove: false,
      currentUser: true,
      projectName: project.name,
      rotationZ: 0
    };
    return geoObject;
  }

  private postHistoryData(geoObject: GeoObject) {
    // const historyPositionDto: HistoryPositionDto = {
    //   object3DId: geoObject.geoObjectId,
    //   positionX: geoObject.coords.x,
    //   positionY: geoObject.coords.y,
    //   // scale: geoObject.scale.toString()
    //   // rotate: geoObject.rotationZ.toString(),
    // };
    // this.mapService.postHistoryData(historyPositionDto).subscribe();
  }

  // set callbacks
  //#region
  setObjectClickCallback(cb: Function) {
    this.on_click_object = cb;
  }

  setObjectHoverCallback(cb: Function) {
    this.on_hover_object = cb;
  }

  setChangeExtentCallback(cb: Function) {
    this.on_map_change_extent = cb;
  }
  //#endregion


  // add / replace / delete / change GeoObjects or polygons with map, getExtent
  //#region
  mapReplaceObjects(replacementObjectsArr: GeoObject[]) {
    clearInterval(this.timerForDraw);

    const diff = (x1: string[], x2: string[]) => {
      return x1.filter(x => !x2.includes(x));
    };

    // преобразуем массив GeoObject[] в массив geoObjectId
    const objectsArrId: string[] = this.objectsArr.map((item: GeoObject) => {
      return item.geoObjectId;
    });

    // преобразуем массив GeoObject[] в массив geoObjectId
    const replacementObjectsArrId: string[] = replacementObjectsArr.map((item: GeoObject) => {
      return item.geoObjectId;
    });

    const addArrId: string[] = diff(replacementObjectsArrId, objectsArrId); // массив geoObjectId которые нужно добавить
    const leaveArrId: string[] = diff(replacementObjectsArrId, addArrId); // массив geoObjectId которые остаются
    const removeArrId: string[] = diff(objectsArrId, replacementObjectsArrId); // массив geoObjectId которые нужно удалить

    // const removeArrForPush: GeoObject[] = []; // массив geoObjectId которые нужно удалить
    for (let i = 0; i < removeArrId.length; i++) {
      for (let j = 0; j < this.objectsArr.length; j++) {
        if (removeArrId[i] === this.objectsArr[j].geoObjectId) {
          // removeArrForPush.push(this.objectsArr[j]);
          this.remove3DObjectFromScene(this.objectsArr[j]);
        }
      }
    }

    const leaveArrForPush: GeoObject[] = [];  // массив geoObjectId которые остаются
    for (let i = 0; i < leaveArrId.length; i++) {
      for (let j = 0; j < this.objectsArr.length; j++) {
        if (leaveArrId[i] === this.objectsArr[j].geoObjectId) {
          leaveArrForPush.push(this.objectsArr[j]);
        }
      }
    }
    this.objectsArr = leaveArrForPush; // addArrForPush добавятся в this.objectsArr в методе this.mapAddNewObjects(addArrForPush);

    const addArrForPush: GeoObject[] = []; // массив geoObjectId которые нужно добавить
    for (let i = 0; i < addArrId.length; i++) {
      for (let j = 0; j < replacementObjectsArr.length; j++) {
        if (addArrId[i] === replacementObjectsArr[j].geoObjectId) {
          addArrForPush.push(replacementObjectsArr[j]);
        }
      }
    }
    this.mapAddNewObjects(addArrForPush);

    this.clusterLayer.clear();
    // тут this.objectsArr включает в себя и leaveArrForPush и addArrForPush,
    // которые были добавлены в методе в методе this.mapAddNewObjects(addArrForPush);
    for (let i = 0; i < this.objectsArr.length; i++) {
      this.clusterLayer.addGeometry(this.objectsArr[i].marker);
    }

    this.timerForDraw = setInterval(() => {
      this.updateCoordsForRedraw();
    }, this.drawInterval);
  }

  mapAddNewObjects(objects: GeoObject[]) {
    for (let i = 0; i < objects.length; i++) {
      const newObj: GeoObject = objects[i];
      newObj.marker = null;
      newObj.object3DLP = null;
      newObj.object3DLPStartLoaded = false;
      newObj.object3DHP = null;
      newObj.object3DHPStartLoaded = false;
      newObj.mouseUnder = false;
      newObj.speedX = 0;
      newObj.speedY = 0;
      newObj.prevCoords = {};
      newObj.prevCoords.x = newObj.coords.x;
      newObj.prevCoords.y = newObj.coords.y;
      newObj.enabledEditMode = false;

      if (newObj.scale == null) {
        newObj.scale = 1;
      }

      this.createMarker(newObj);
      const modelQuality: ModelQuality = this.modelQualityDependenceMapZoomEnum(this.mapZoomEnum);

      this.loadObject3D(modelQuality, newObj);
      this.objectsArr.push(newObj);
    }
  }

  mapAddNewPolygons(polygons: any[]) {
    const initialSymbol = {
      'lineColor': '#334a5e',
      'lineWidth': 1,
      'polygonFill': 'rgb(135,196,240)',
      'polygonOpacity': 0.2
    };

    const hoverSymbol = {
      'lineColor': '#334a5e',
      'lineWidth': 1,
      'polygonFill': 'rgb(135,196,240)',
      'polygonOpacity': 0.5
    };

    for (let i = 0; i < polygons.length; i++) {
      const polygon = new maptalks.Polygon(polygons[i], {
        visible: true,
        customName: 'polygon' + i,
        cursor: 'pointer',
        symbol: initialSymbol
      });

      polygon.on('click', (e) => {
        // emit event or do something
      });

      polygon.on('mouseenter', (e) => {
        e.target.setSymbol(hoverSymbol);
      });

      polygon.on('mouseout', (e) => {
        e.target.setSymbol(initialSymbol);
      });

      this.polygonLayer.addGeometry(polygon);
    }
  }

  mapReplacePolygons(polygons: any[]) {
    this.polygonLayer.clear();
    this.mapAddNewPolygons(polygons);
  }

  getExtent(): any {
    const extent = this.map.getExtent();
    const res = {
      lowerBoundX: extent.xmin,
      lowerBoundY: extent.ymin,
      upperBoundX: extent.xmax,
      upperBoundY: extent.ymax,
    };
    return res;
  }
  //#endregion


  // private methods
  //#region
  private mapInit(cb: Function) {
    this.createMap();
    this.createPolygonLayer();
    this.createClusterLayer();

    this.mapElement = document.getElementById(this.mapId);
    this.mapWrapperElement = document.getElementById(this.mapWrapperId);
    this.canvasElem = this.mapElement.querySelector('canvas');

    // this.stats = new Stats();
    // this.stats.dom.style.left = '80px';
    // this.mapElement.appendChild(this.stats.dom);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.createLabelRenderer();
    this.animation();

    window.addEventListener('resize', this.windowResize);

    this.on_map_init = cb;
    this.createThreeLayer(); // async

    this.timerForDraw = setInterval(() => {
      this.updateCoordsForRedraw();
    }, this.drawInterval);
  }

  private createLabelRenderer() {
    this.labelRenderer = new THREE.CSS2DRenderer();
    this.labelRenderer.setSize(this.mapElement.clientWidth, this.mapElement.clientHeight);
    this.labelRenderer.domElement.id = this.labelRendererId;
    this.mapElement.appendChild(this.labelRenderer.domElement);
  }

  private windowResize = (event) => {
    const x = this.mapWrapperElement.clientWidth; // offsetWidth
    const y = this.mapWrapperElement.clientHeight; // offsetHeight
    // mapElement width and height 100% in styles.scss
    this.labelRenderer.setSize(x, y);
  }

  private animation = () => {
    this.animationFrame = requestAnimationFrame(this.animation);
    // this.stats.update();
    if (this.labelRenderer != null && this.scene != null && this.camera != null) {
      this.labelRenderer.render(this.scene, this.camera);
    }
  }

  private createMap() {
    this.map = new maptalks.Map(this.mapId, { // DIV id
      center: [35.028, 48.474],
      zoom: this.initZoom,
      minZoom: 3,
      // pitch: 60,
      // bearing: 30,
      pitch: 0,
      bearing: 0,
      // centerCross: true,
      baseLayer: new maptalks.TileLayer('tile', {
        'urlTemplate': 'http://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!' +
          '3m9!2sen-US!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0&token=32965',
        'attribution': '&copy; <a href="http://ditu.google.cn/">Google</a>'
      })
    });

    this.mapZoomEnum = this.detectMapZoom(this.map.getZoom());
    this.mapEventHandlers();
  }

  private mapEventHandlers() {
    this.map.on('mousemove', (event) => {
      this.dragSelectedObject(event.coordinate.x, event.coordinate.y);
      this.mouse.x = (event.containerPoint.x / event.target.width) * 2 - 1;
      this.mouse.y = -(event.containerPoint.y / event.target.height) * 2 + 1;
      this.selectObjects();

      const identify = this.clusterLayer.identify(event.coordinate);
      if (identify == null || identify.children == null) {
        this.prevClusterGeoObjectId = null;
        return;
      }
      if (identify.children.length === 1) { // if number 1 on cluster
        if (this.map.getZoom() < this.avgZoom + this.deltaZoom) {
          this.setCanvasCursor('pointer');
        } else {
          this.setCanvasCursor('inherit');
        }
        const geoObject: GeoObject = identify.children[0].parent;
        if (geoObject.geoObjectId !== this.prevClusterGeoObjectId) { // so that there are not many events
          if (this.on_hover_object != null) {
            this.on_hover_object(geoObject);
          }
        }
        this.prevClusterGeoObjectId = geoObject.geoObjectId;
      } else { // if number 2 or more on cluster
        this.setCanvasCursor('default');
      }
    });

    this.map.on('zooming', (event) => {
      this.mapZoomEnum = this.detectMapZoom(event.to);
      for (let i = 0; i < this.objectsArr.length; i++) {
        const whatModelNeedLoad: ModelQuality = this.detectWhenNeedLoadObject3D(this.mapZoomEnum, this.objectsArr[i]);

        if (whatModelNeedLoad === ModelQuality.HIGH) {
          this.loadObject3D(whatModelNeedLoad, this.objectsArr[i]);
        }
        if (whatModelNeedLoad === ModelQuality.LOW) {
          this.loadObject3D(whatModelNeedLoad, this.objectsArr[i]);
        }

        this.changeVisibleAndScale(this.objectsArr[i]);
      }
    });

    this.map.on('click', (event) => {
    });

    this.map.on('mousedown', (event) => {
      const identify = this.clusterLayer.identify(event.coordinate);
      if (identify && identify.children && identify.children.length === 1) {
        const geoObject: GeoObject = identify.children[0].parent;
        if (this.on_click_object != null) {
          this.on_click_object(geoObject);
        }
      }

      for (let i = 0; i < this.objectsArr.length; i++) {
        if (this.objectsArr[i].mouseUnder === true) {
          if (this.selectedObject != null) {
            if (this.selectedObject.objectDivLabel) {
              this.selectedObject.objectDivLabel.className = 'obj-label';
            }
            this.setMarkerSymbolDefault(this.selectedObject.marker);
          }
          this.selectedObject = this.objectsArr[i];
          if (this.selectedObject.objectDivLabel) {
            this.selectedObject.objectDivLabel.className = 'obj-label-selected';
          }
          this.setMarkerSymbolSelected(this.selectedObject.marker);
          if (this.on_click_object != null) {
            this.on_click_object(this.selectedObject);
          }
        }
      }
      this.mouseBtnClicked = true;
      this.enableObjectDrag();
    });

    this.map.on('mouseup', (event) => {
      this.mouseBtnClicked = false;
      this.disableObjectDrag();
    });

    this.map.on('animateend', (event) => {
      if (this.on_map_change_extent != null) {
        const extent = this.getExtent();
        this.on_map_change_extent(extent);
      }
    });

    this.map.on('moving', (event) => {
      if (this.on_map_change_extent != null) {
        const extent = this.getExtent();
        this.on_map_change_extent(extent);
      }
    });

    this.map.on('dragrotateend', (event) => {
      if (this.on_map_change_extent != null) {
        const extent = this.getExtent();
        this.on_map_change_extent(extent);
      }
    });
  }

  private detectWhenNeedLoadObject3D(mapZoomEnum: MapZoomEnum, geoObject: GeoObject): ModelQuality {
    if (mapZoomEnum === MapZoomEnum.SMALL && geoObject.object3DLP == null && geoObject.object3DLPStartLoaded === false) {
      return ModelQuality.LOW;
    }
    if (mapZoomEnum === MapZoomEnum.AVG && geoObject.object3DLP == null && geoObject.object3DLPStartLoaded === false) {
      return ModelQuality.LOW;
    }
    if (mapZoomEnum === MapZoomEnum.BIG && geoObject.object3DHP == null && geoObject.object3DHPStartLoaded === false) {
      return ModelQuality.HIGH;
    }
    return null;
  }

  private createClusterLayer() {
    this.clusterLayer = new maptalks.ClusterLayer('cluster', {
      'noClusterWithOneMarker': false,
      'single': false, // not work ?
      'drawClusterText': true,
      'geometryEvents': true,
      'animation': false,
      'maxClusterRadius': 50,
      'maxClusterZoom': this.avgZoom,
      // "count" is an internal variable: marker count in the cluster.
      'symbol': {
        'markerType': 'ellipse',
        'markerFill': {
          property: 'count',
          type: 'interval',
          stops: [
            [0, 'rgb(135, 196, 240)'],
            [9, '#1bbc9b'],
            [99, 'rgb(216, 115, 149)']
          ]
        },
        'markerFillOpacity': 0.7,
        'markerLineOpacity': 1,
        'markerLineWidth': 3,
        'markerLineColor': '#fff',
        'markerWidth': {
          property: 'count',
          type: 'interval',
          stops: [
            [0, 40],
            [9, 60],
            [99, 80]
          ]
        },
        'markerHeight': {
          property: 'count',
          type: 'interval',
          stops: [
            [0, 40],
            [9, 60],
            [99, 80]
          ]
        }
      },
    });

    this.map.addLayer(this.clusterLayer);
  }

  private createPolygonLayer() {
    this.polygonLayer = new maptalks.VectorLayer('polygonLayer');
    this.polygonLayer.addTo(this.map);
  }

  private createThreeLayer() {
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    this.threeLayer = new maptalks.ThreeLayer('threeLayer');
    this.threeLayer.prepareToDraw = (gl, localScene, localCamera) => {
      this.scene = localScene;
      this.camera = localCamera;
      this.scene.add(new THREE.AmbientLight(0xffffff, 1.5));
      this.labelRenderer.setSize(this.mapElement.clientWidth, this.mapElement.clientHeight);
      if (this.on_map_init != null) {
        this.on_map_init();
      }
    };
    this.threeLayer.addTo(this.map);
  }
  //#endregion

  // init / remove 3D Object
  //#region
  private remove3DObjectFromScene(geoObject: GeoObject) { // any - not geoObject !
    if (geoObject == null) {
      return; // null when object model did not have time to boot
    }

    if (geoObject.pointForMove != null) {
      if (geoObject.pointForMove.geometry) {
        geoObject.pointForMove.geometry.dispose();
      }
      if (geoObject.pointForMove.material) {
        geoObject.pointForMove.material.dispose();
      }
      if (geoObject.pointForMove.texture) {
        geoObject.pointForMove.texture.dispose();
      }
      this.scene.remove(geoObject.pointForMove);
    }

    if (geoObject.boxHelper != null) {
      this.scene.remove(geoObject.boxHelper);
    }

    if (geoObject.objectDivLabel != null) {
      geoObject.objectDivLabel.removeEventListener('mouseenter', this.labelMouseEnterHandler);
      geoObject.objectDivLabel.removeEventListener('mouseleave', this.labelMouseLeaveHandler);
      geoObject.objectDivLabel.removeEventListener('click', this.labelMouseClickHandler);
      geoObject.objectDivLabel.parentNode.removeChild(geoObject.objectDivLabel);
    }

    if (geoObject.editBtnLabel != null) {
      geoObject.editBtnLabel.removeEventListener('click', this.editBtnLabelClickHandler);
      geoObject.editBtnLabel.parentNode.removeChild(geoObject.editBtnLabel);
    }

    if (geoObject.editPanelLabel != null) {
      geoObject.editPanelLabel.parentNode.removeChild(geoObject.editPanelLabel);
    }

    if (geoObject.object3DLP != null) {
      if (geoObject.object3DLP.geometry) {
        geoObject.object3DLP.geometry.dispose();
      }
      if (geoObject.object3DLP.material) {
        geoObject.object3DLP.material.dispose();
      }
      if (geoObject.object3DLP.texture) {
        geoObject.object3DLP.texture.dispose();
      }
      this.scene.remove(geoObject.object3DLP);
    }

    if (geoObject.object3DHP != null) {
      if (geoObject.object3DHP.geometry) {
        geoObject.object3DHP.geometry.dispose();
      }
      if (geoObject.object3DHP.material) {
        geoObject.object3DHP.material.dispose();
      }
      if (geoObject.object3DHP.texture) {
        geoObject.object3DHP.texture.dispose();
      }
      this.scene.remove(geoObject.object3DHP);
    }
  }

  private init3dObject(geoObject: GeoObject, object3D: any, modelQuality: ModelQuality) { // modelQuality - low / high
    const childScale = 0.004;
    const resultScale = childScale * geoObject.scale;
    object3D.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.scale.set(resultScale, resultScale, resultScale);
        child.rotation.set(Math.PI * 1 / 2, -Math.PI * 1 / 2, 0);
        if (Array.isArray(child.material)) {
          return;
        }
        child.material.initColor = child.material.color.getHex();
      }
    });

    if (modelQuality === ModelQuality.LOW) {
      geoObject.object3DLP = object3D;
    }
    if (modelQuality === ModelQuality.HIGH) {
      geoObject.object3DHP = object3D;
    }

    const v = this.threeLayer.coordinateToVector3(new maptalks.Coordinate(geoObject.coords.x, geoObject.coords.y));
    object3D.position.x = v.x;
    object3D.position.y = v.y;
    object3D.position.z = v.z;

    geoObject.box3 = new THREE.Box3().setFromObject(object3D);

    // geoObject.boxHelper = new THREE.BoxHelper(object3D, 0xff0000); // todo remove
    // this.scene.add(geoObject.boxHelper);

    const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    if (geoObject.canMove === true && geoObject.pointForMove == null) {
      geoObject.pointForMove = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.scene.add(geoObject.pointForMove);
    }

    this.createObjectDivLabel(geoObject, modelQuality);
    this.createObjectEditLabel(geoObject, modelQuality);
    this.createObjectEditPanelLabel(geoObject, modelQuality);

    this.changeVisibleAndScale(geoObject);
    this.scene.add(object3D);
    this.threeLayer.renderScene();
  }

  private labelMouseLeaveHandler = (event) => {
    if (event.target['geoObject'] !== this.selectedObject) {
      event.target['geoObject'].objectDivLabel.className = 'obj-label';
    }
  }

  private loadObject3D(modelQuality: ModelQuality, geoObject: GeoObject) {
    let pathToZip: string;
    if (modelQuality === ModelQuality.LOW) {
      pathToZip = geoObject.pathToZipLP;
      geoObject.object3DLPStartLoaded = true;
    }
    if (modelQuality === ModelQuality.HIGH) {
      pathToZip = geoObject.pathToZip;
      geoObject.object3DHPStartLoaded = true;
    }

    THREE.ZipLoadingManager
      .uncompress(pathToZip, ['.mtl', '.obj', '.jpg', '.png'])
      .then((zip) => {
        const pathToFolder = zip.urls[0].substring(0, zip.urls[0].lastIndexOf('/') + 1);
        let mtlFileName = '';
        let objFileName = '';
        for (let i = 0; i < zip.urls.length; i++) {
          if (zip.urls[i].match('.mtl$')) {
            mtlFileName = zip.urls[i].replace(/^.*[\\\/]/, '');
          }
          if (zip.urls[i].match('.obj$')) {
            objFileName = zip.urls[i].replace(/^.*[\\\/]/, '');
          }
        }

        this.mtlLoad(
          (materials) => { this.mtlLoadOnLoad(materials, zip.manager, pathToFolder, objFileName, modelQuality, geoObject); },
          (err) => { console.error(err); },
          zip.manager,
          pathToFolder,
          mtlFileName,
        );
      });
  }

  private mtlLoad = (onLoadCb: Function, onErrorCb: Function, zipManager: any, pathToFolder: string, mtlFileName: string) => {
    const mtlLoader = new THREE.MTLLoader(zipManager);
    mtlLoader.setPath(pathToFolder);
    mtlLoader.load(mtlFileName, onLoadCb, null, onErrorCb);
  }

  private mtlLoadOnLoad = (materials, zipManager, pathToFolder, objFileName, modelQuality, geoObject) => {
    this.objLoad(
      (object3D) => { this.objLoadOnLoad(object3D, modelQuality, geoObject); },
      (err) => { console.error(err); },
      zipManager,
      materials,
      pathToFolder,
      objFileName,
    );
  }

  private objLoad = (onLoadCb: Function, onErrorCb: Function, zipManager: any, materials: any, pathToFolder: string, objFileName: string) => {
    materials.preload();
    const objLoader = new THREE.OBJLoader(zipManager);
    objLoader.setMaterials(materials);
    objLoader.setPath(pathToFolder);
    objLoader.load(objFileName, onLoadCb, null, onErrorCb);
  }

  private objLoadOnLoad = (object3D, modelQuality, geoObject) => {
    if (modelQuality === ModelQuality.LOW) {
      geoObject.object3DLPStartLoaded = false;
    }
    if (modelQuality === ModelQuality.HIGH) {
      geoObject.object3DHPStartLoaded = false;
    }
    this.init3dObject(geoObject, object3D, modelQuality);
  }
  //#endregion


  // labels
  //#region
  private createObjectDivLabel(geoObject: GeoObject, modelQuality: ModelQuality) {
    // if (modelQuality === ModelQuality.LOW) { // if need objectDivLabel for low quality model
    //   geoObject.object3DLP.add(objLabel);
    // }
    if (modelQuality === ModelQuality.HIGH) {
      const objectDivLabel = document.createElement('div');
      objectDivLabel['geoObject'] = geoObject;
      objectDivLabel.addEventListener('mouseenter', this.labelMouseEnterHandler);
      objectDivLabel.addEventListener('mouseleave', this.labelMouseLeaveHandler);
      objectDivLabel.addEventListener('click', this.labelMouseClickHandler);
      objectDivLabel.className = 'obj-label';
      objectDivLabel.textContent = geoObject.projectName;
      const objLabel = new THREE.CSS2DObject(objectDivLabel);
      geoObject.objectDivLabel = objectDivLabel;
      objLabel.position.x = 0;
      objLabel.position.y = 0;
      objLabel.position.z = geoObject.box3.getSize().z * 1.1;
      geoObject.object3DHP.add(objLabel);
    }
  }

  private createObjectEditLabel(geoObject: GeoObject, modelQuality: ModelQuality) {
    if (modelQuality === ModelQuality.HIGH) {
      const objectEditLabel = document.createElement('div');
      objectEditLabel['geoObject'] = geoObject;
      objectEditLabel.addEventListener('click', this.editBtnLabelClickHandler);
      objectEditLabel.className = 'obj-edit-label';
      const objLabel = new THREE.CSS2DObject(objectEditLabel);
      geoObject.editBtnLabel = objectEditLabel;
      objLabel.position.x = 0;
      objLabel.position.y = 0;
      objLabel.position.z = 0; // for edit panel
      geoObject.object3DHP.add(objLabel);
    }
  }

  private createObjectEditPanelLabel(geoObject: GeoObject, modelQuality: ModelQuality) {
    if (modelQuality === ModelQuality.HIGH) {
      const elemForClone = document.getElementById('edit-panel-label');
      const editPanelLabel: HTMLElement = <HTMLElement>elemForClone.cloneNode(true);
      editPanelLabel.removeAttribute('id');
      editPanelLabel['geoObject'] = geoObject;
      editPanelLabel.style.display = 'none';
      this.initNoUiSlider(editPanelLabel.querySelector('.scale-container .slider-range'));
      this.initRotateSection(editPanelLabel.querySelector('.rotate-container'));
      this.initCloseBtn(editPanelLabel.querySelector('.close'));
      const objLabel = new THREE.CSS2DObject(editPanelLabel);
      geoObject.editPanelLabel = editPanelLabel;
      objLabel.position.x = 0;
      objLabel.position.y = 0;
      objLabel.position.z = 0; // for edit panel
      geoObject.object3DHP.add(objLabel);
    }
  }

  private initNoUiSlider(rangeElement) {
    const noUiSlider = window['noUiSlider'];
    noUiSlider.create(rangeElement, {
      start: [1],
      connect: true,
      range: {
        'min': 0.1,
        'max': 5
      }
    });

    rangeElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      this.editChangeScale(value);
    });
  }

  private initRotateSection(rotateSection) {
    const rotateLeftElem = rotateSection.querySelector('.rotate-left');
    rotateLeftElem.addEventListener('mousedown', this.rotateLeft);
    rotateLeftElem.addEventListener('mouseup', this.stopRotateLeft);
    rotateLeftElem.addEventListener('mouseleave', this.stopRotateLeft);

    const rotateRightElem = rotateSection.querySelector('.rotate-right');
    rotateRightElem.addEventListener('mousedown', this.rotateRight);
    rotateRightElem.addEventListener('mouseup', this.stopRotateRight);
    rotateRightElem.addEventListener('mouseleave', this.stopRotateRight);
  }

  private initCloseBtn(closeElement) {
    closeElement.addEventListener('click', () => {
      this.selectedForEditObject.editPanelLabel.style.display = 'none';
      if (this.mapZoomEnum === MapZoomEnum.BIG) {
        this.selectedForEditObject.editBtnLabel.style.display = 'block';
      }
      this.selectedForEditObject.enabledEditMode = false;
      this.selectedForEditObject = null;
    });
  }

  private labelMouseEnterHandler = (event) => {
    event.target['geoObject'].objectDivLabel.className = 'obj-label-selected';
    if (this.on_hover_object != null) {
      this.on_hover_object(event.target['geoObject']);
    }
  }

  private labelMouseClickHandler = (event) => {
    if (this.selectedObject != null) {
      this.selectedObject.objectDivLabel.className = 'obj-label';
      this.setMarkerSymbolDefault(this.selectedObject.marker);
    }
    this.selectedObject = event.target['geoObject'];
    this.selectedObject.objectDivLabel.className = 'obj-label-selected';
    this.setMarkerSymbolSelected(this.selectedObject.marker);
    if (this.on_click_object != null) {
      this.on_click_object(this.selectedObject);
    }
  }

  private editBtnLabelClickHandler = (event) => {
    if (this.selectedForEditObject != null) {
      this.selectedForEditObject.editPanelLabel.style.display = 'none';
      this.selectedForEditObject.editBtnLabel.style.display = 'block';
    }
    const geoObject: GeoObject = event.target['geoObject'];
    this.selectedForEditObject = geoObject;
    this.selectedForEditObject.editBtnLabel.style.display = 'none';
    this.selectedForEditObject.editPanelLabel.style.display = 'block';
    this.selectedForEditObject.enabledEditMode = true;
  }
  //#endregion


  // marker
  //#region
  private setMarkerSymbolDefault(marker) {
    marker.updateSymbol({
      'markerWidth': 28,
      'markerHeight': 40,
      'textSize': 16,
      'textFill': 'black',
      'zIndex': 1
    });
    marker.setZIndex(1);
  }

  private setMarkerSymbolSelected(marker) {
    marker.updateSymbol({
      'markerWidth': 28 + 5,
      'markerHeight': 40 + 5,
      'textSize': 18,
      'textFill': 'green',
    });
    marker.setZIndex(1000);
  }

  private createMarker(geoObject: GeoObject) {
    const coords = new maptalks.Coordinate(geoObject.coords.x, geoObject.coords.y);
    const marker = new maptalks.Marker(coords, {
      visible: true,
      cursor: 'pointer',
      symbol: [{
        'markerFile': window.location.origin + '/assets/img/marker.svg',
        'markerWidth': 28,
        'markerHeight': 40,
      },
      {
        'textFaceName': 'sans-serif',
        'textName': geoObject.projectName,
        'textSize': 16,
        'textDy': 10,
        'textFill': 'black',
        'textHaloColor': '#fff',
        'textHaloRadius': 2,
      }]
    });

    geoObject.marker = marker;
    geoObject.marker.options.visible = false;
    geoObject.marker.parent = geoObject;
    this.clusterLayer.addGeometry(marker);
    this.markerEventHandlers(marker);
  }

  private markerEventHandlers(marker) {
    marker.on('click', (e) => {
      if (this.selectedObject != null) {
        this.selectedObject.objectDivLabel.className = 'obj-label';
        this.setMarkerSymbolDefault(this.selectedObject.marker);
      }
      this.selectedObject = e.target.parent;
      this.selectedObject.objectDivLabel.className = 'obj-label-selected';
      this.setMarkerSymbolSelected(this.selectedObject.marker);
      if (this.on_click_object != null) {
        this.on_click_object(this.selectedObject);
      }
    });

    marker.on('mouseenter', (e) => {
      this.setMarkerSymbolSelected(e.target); // e.target === marker
      if (this.on_hover_object != null) {
        this.on_hover_object(e.target.parent);
      }
    });

    marker.on('mouseout', (e) => {
      if (e.target.parent !== this.selectedObject) {
        this.setMarkerSymbolDefault(e.target);
      }
    });
  }
  //#endregion


  // draw depending coordinates
  //#region
  private customRedraw() {
    this.map.setCenter(new maptalks.Coordinate(this.map.getCenter()));
  }

  private updateCoordsForRedraw() {
    for (let i = 0; i < this.objectsArr.length; i++) {
      this.updateCoordsForDraw(this.objectsArr[i]);
    }

    this.customRedraw();
  }

  private updateCoordsForDraw(geoObj: GeoObject) {
    const modelQuality: ModelQuality = this.modelQualityDependenceMapZoomEnum(this.mapZoomEnum);
    let obj3D: any;
    if (modelQuality === ModelQuality.LOW) {
      obj3D = geoObj.object3DLP;
      if (obj3D == null) {
        obj3D = geoObj.object3DHP;
      }
    } else if (modelQuality === ModelQuality.HIGH) {
      obj3D = geoObj.object3DHP;
      if (obj3D == null) {
        obj3D = geoObj.object3DLP;
      }
    }

    if (obj3D == null) {
      obj3D = geoObj.object3DHP;
    }
    if (geoObj == null || obj3D == null || geoObj.marker == null) {
      return;
    }
    geoObj.coords.x += geoObj.speedX; // geographical coordinates
    geoObj.coords.y += geoObj.speedY; // geographical coordinates
    geoObj.marker.setCoordinates(new maptalks.Coordinate(geoObj.coords));

    const prevX = obj3D.position.x;
    const prevY = obj3D.position.y;
    const v = this.threeLayer.coordinateToVector3(geoObj.coords);
    obj3D.position.x = v.x;
    obj3D.position.y = v.y;
    obj3D.position.z = v.z;
    // obj3D.rotation.z = Math.atan2(prevY - obj3D.position.y, prevX - obj3D.position.x);
    if (geoObj.canMove === true) {
      obj3D.rotation.z = Math.atan2(prevY - obj3D.position.y, prevX - obj3D.position.x);
      // obj.boxHelper.update();
    } else {
      obj3D.rotation.z = geoObj.rotationZ || 0;
    }
  }
  //#endregion


  // detect when mouse under object
  //#region
  private selectObjects() {
    this.setCanvasCursor('inherit');

    for (let i = 0; i < this.objectsArr.length; i++) {
      if (this.selectObject(this.objectsArr[i]) === true) {
        this.setCanvasCursor('pointer');
        return;
      }
    }
  }

  private selectObject(geoObj: GeoObject) {
    const modelQuality: ModelQuality = this.modelQualityDependenceMapZoomEnum(this.mapZoomEnum);
    let obj3D: any;
    if (modelQuality === ModelQuality.LOW) {
      obj3D = geoObj.object3DLP;
      if (obj3D == null) {
        obj3D = geoObj.object3DHP;
      }
    } else if (modelQuality === ModelQuality.HIGH) {
      obj3D = geoObj.object3DHP;
      if (obj3D == null) {
        obj3D = geoObj.object3DLP;
      }
    }

    if (obj3D == null || obj3D.visible === false) {
      geoObj.mouseUnder = false;
      return false;
    }

    const objects = [];

    obj3D.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        objects.push(child);
      }
    });

    this.raycaster.setFromCamera(this.mouse, this.threeLayer.getCamera());
    const intersects = this.raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      return this.intersections(geoObj, obj3D);
    }

    if (intersects.length === 0) {
      return this.noIntersections(geoObj, obj3D);
    }
  }

  private intersections(geoObj: GeoObject, obj3D: any): true {
    const prevMouseUnderObject_2 = geoObj.mouseUnder;
    geoObj.mouseUnder = true;

    // on hover event
    if (prevMouseUnderObject_2 !== geoObj.mouseUnder) {
      if (geoObj.objectDivLabel) {
        geoObj.objectDivLabel.className = 'obj-label-selected';
      }
      if (this.on_hover_object != null) {
        this.on_hover_object(geoObj);
      }
    }

    // set selected color
    obj3D.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (Array.isArray(child.material) === true) {
        return;
      } else {
        const initColor = child.material.initColor;
        child.material.color.setHex(initColor + 150);
      }
    });

    this.customRedraw();
    return true;
  }

  private noIntersections(geoObj: GeoObject, obj3D: any): false {
    const prevMouseUnderObject = geoObj.mouseUnder;
    geoObj.mouseUnder = false;

    // set default color
    obj3D.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (Array.isArray(child.material) === true) {
        return;
      } else {
        const initColor = child.material.initColor;
        child.material.color.setHex(initColor);
      }
    });

    // event when mouse move and mouse leave 3d object
    if (prevMouseUnderObject !== geoObj.mouseUnder) {
      this.customRedraw();
      if (geoObj !== this.selectedObject) {
        if (geoObj.objectDivLabel) {
          geoObj.objectDivLabel.className = 'obj-label';
        }
      }
    }

    return false;
  }
  //#endregion


  private setCanvasCursor(cursor) {
    this.canvasElem.style.cursor = cursor;
  }

  private modelQualityDependenceMapZoomEnum(mapZoomEnum: MapZoomEnum): ModelQuality { // low / high
    if (this.mapZoomEnum === MapZoomEnum.SMALL || this.mapZoomEnum === MapZoomEnum.AVG) {
      return ModelQuality.LOW;
    }
    if (this.mapZoomEnum === MapZoomEnum.BIG) {
      return ModelQuality.HIGH;
    }
  }

  private changeVisibleAndScale(geoObj: GeoObject) {
    if (this.mapZoomEnum === MapZoomEnum.BIG) {
      this.whenBigZoom(geoObj);
    } else if (this.mapZoomEnum === MapZoomEnum.SMALL) {
      this.whenSmallZoom(geoObj);
    } else {
      this.whenAvgZoom(geoObj);
    }
  }

  private detectMapZoom(mapZoom: number): MapZoomEnum {
    if (mapZoom >= this.bigZoom + this.deltaZoom) {
      return MapZoomEnum.BIG;
    } else if (mapZoom < this.avgZoom + this.deltaZoom) {
      return MapZoomEnum.SMALL;
    } else {
      return MapZoomEnum.AVG;
    }
  }

  private whenBigZoom(geoObj: GeoObject) {
    if (geoObj.objectDivLabel) {
      geoObj.objectDivLabel.style.display = 'block';
      if (this.selectedForEditObject == null) {
        geoObj.editBtnLabel.style.display = 'block';
      }
    }
    if (geoObj.object3DHP) {
      geoObj.object3DHP.visible = true;
    }
    if (geoObj.object3DLP) {
      geoObj.object3DLP.visible = false;
    }
    if (geoObj.boxHelper) {
      geoObj.boxHelper.visible = true;
    }
  }

  private whenAvgZoom(geoObj: GeoObject) {
    if (geoObj.objectDivLabel) {
      geoObj.objectDivLabel.style.display = 'none';
      geoObj.editBtnLabel.style.display = 'none';
    }
    if (geoObj.object3DHP) {
      geoObj.object3DHP.visible = false;
    }
    if (geoObj.object3DLP) {
      geoObj.object3DLP.visible = true;
    }
    if (geoObj.boxHelper) {
      geoObj.boxHelper.visible = true;
    }
  }

  private whenSmallZoom(geoObj: GeoObject) {
    if (geoObj.objectDivLabel) {
      geoObj.objectDivLabel.style.display = 'none';
      geoObj.editBtnLabel.style.display = 'none';
    }
    if (geoObj.object3DHP) {
      geoObj.object3DHP.visible = false;
    }
    if (geoObj.object3DLP) {
      geoObj.object3DLP.visible = false;
    }
    if (geoObj.boxHelper) {
      geoObj.boxHelper.visible = false;
    }
  }

  // change object scale
  //#region
  private deltaToScale(delta: number) {
    let res = 1;
    for (let i = 1; i < delta; i++) {
      res = 2 * res;
    }
    return res;
  }

  private linearInterpolation(y0: number, y1: number, x0: number, x1: number, x: number) {
    if (Math.abs(x1 - x0) < 0.000000000001) {
      return y0;
    }

    return y0 + ((y1 - y0) / (x1 - x0)) * (x - x0);
  }

  private calcScale(mapZoom: number) {
    let delta = 0;
    if (mapZoom === this.initZoom) {
      return 1;
    } else if (mapZoom > this.initZoom) {
      delta = mapZoom - this.initZoom + 1;
      return 1 / this.deltaToScale(delta);
    } else {
      delta = this.initZoom - mapZoom + 1;
      return this.deltaToScale(delta);
    }
  }

  private calcInterpolationScale(mapZoom: number) {
    const x0 = Math.floor(mapZoom);
    const x1 = Math.ceil(mapZoom);
    const y0 = this.calcScale(x0);
    const y1 = this.calcScale(x1);
    return this.linearInterpolation(y0, y1, x0, x1, mapZoom);
  }
  //#endregion

  // edit mode
  //#region
  private editChangeScale(scale: number) {
    const geoObject: GeoObject = this.selectedForEditObject;
    if (geoObject == null) {
      return;
    }
    geoObject.scale = scale;
    if (geoObject.object3DLP) {
      geoObject.object3DLP.scale.set(scale, scale, scale);
    }
    if (geoObject.object3DHP) {
      geoObject.object3DHP.scale.set(scale, scale, scale);
    }
    this.postHistoryData(geoObject);
  }

  private rotateLeft = () => {
    if (this.selectedForEditObject == null) {
      return;
    }
    this.rotateLeftInterval = setInterval(() => {
      this.selectedForEditObject.rotationZ -= 0.01;
      this.postHistoryData(this.selectedForEditObject);
    }, this.drawInterval);
  }

  private stopRotateLeft = () => {
    if (this.rotateLeftInterval != null) {
      clearInterval(this.rotateLeftInterval);
    }
  }

  private rotateRight = () => {
    if (this.selectedForEditObject == null) {
      return;
    }
    this.rotateRightInterval = setInterval(() => {
      this.selectedForEditObject.rotationZ += 0.01;
      this.postHistoryData(this.selectedForEditObject);
    }, this.drawInterval);
  }

  private stopRotateRight = () => {
    if (this.rotateRightInterval != null) {
      clearInterval(this.rotateRightInterval);
    }
  }

  private enableObjectDrag() {
    if (this.selectedForEditObject != null && this.mouseBtnClicked === true && this.selectedForEditObject.mouseUnder === true) {
      this.map.config('draggable', false);
      this.selectedForEditObject.objectDivLabel.style.display = 'none';
      this.selectedForEditObject.editPanelLabel.style.display = 'none';
      this.enabledObjectDrag = true;
    }
  }

  private disableObjectDrag() {
    if (this.selectedForEditObject != null) {
      this.map.config('draggable', true);
      this.selectedForEditObject.objectDivLabel.style.display = 'block';
      this.selectedForEditObject.editPanelLabel.style.display = 'block';
      this.enabledObjectDrag = false;
    }
  }

  private dragSelectedObject(x: number, y: number) {
    if (this.selectedForEditObject != null && this.mouseBtnClicked === true && this.enabledObjectDrag === true) {
      this.selectedForEditObject.coords.x = x;
      this.selectedForEditObject.coords.y = y;
      this.postHistoryData(this.selectedForEditObject);
    }
  }
  //#endregion
}














