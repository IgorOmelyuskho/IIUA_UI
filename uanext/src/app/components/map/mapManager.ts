import Stats from 'stats-js';
import { GeoObject } from 'src/app/models';
import { VendorProject } from 'src/app/models/vendorProject';
declare var THREE: any;
declare var maptalks: any;

export class MapManager {
  // constants region
  private readonly zoomWhenChangeVisible = 16;
  private readonly initZoom = 15;
  private readonly updatedInterval = 3500;
  private readonly drawInterval = 50;

  // callbacks
  private on_click_object: Function = null;
  private on_hover_object: Function = null;
  private on_map_init: Function = null;

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

  // html elements id
  private mapWrapperId: string;
  private mapId: string;
  private labelRendererId: string;

  public constructor(cb: Function, htmlId: { mapWrapperId: string, mapId: string, labelRendererId: string }) {
    this.mapWrapperId = htmlId.mapWrapperId;
    this.mapId = htmlId.mapId;
    this.labelRendererId = htmlId.labelRendererId;
    this.mapInit(cb);
  }

  mapSetProject(project: VendorProject) {
    // project.coords = {};
    // project.coords.x = Math.random() * 30;
    // project.coords.y = Math.random() * 30;
    // this.map.setCenter(new maptalks.Coordinate(project.coords.x, project.coords.y));
    // set selected project ??
  }

  mapDestroy() {
    clearInterval(this.timerForDraw);
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.windowOnResize);

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

    this.on_click_object = null;
    this.on_hover_object = null;
    this.on_map_init = null;
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

  // set callbacks
  //#region
  setObjectClickCallback(cb: Function) {
    this.on_click_object = cb;
  }

  setObjectHoverCallback(cb: Function) {
    this.on_hover_object = cb;
  }
  //#endregion


  // add / replace / delete / change GeoObjects or polygons with map
  //#region
  mapReplaceObjects(objects: GeoObject[]) {
    clearInterval(this.timerForDraw);
    for (let i = 0; i < this.objectsArr.length; i++) {
      this.remove3DObjectFromScene(this.objectsArr[i].pointForMove);
      this.objectsArr[i].objectDivLabel.style.display = 'none';
      this.objectsArr[i].objectDivLabel.parentNode.removeChild(this.objectsArr[i].objectDivLabel); // not work
      this.remove3DObjectFromScene(this.objectsArr[i].object3D);
    }
    // while (scene.children.length > 0) {
    //   scene.remove(scene.children[0]);
    // }
    // scene.remove.apply(scene, scene.children);
    // scene.add(new THREE.AmbientLight(0xffffff, 1));
    this.clusterLayer.clear();
    this.objectsArr = [];
    this.customRedraw();
    this.mapAddNewObjects(objects);
    this.timerForDraw = setInterval(() => {
      this.updateCoordsForRedraw();
    }, this.drawInterval);
  }

  mapAddNewObjects(objects: GeoObject[]) {
    for (let i = 0; i < objects.length; i++) {
      const newObj: GeoObject = objects[i];
      newObj.marker = null;
      newObj.object3D = null;
      newObj.mouseUnder = false;
      newObj.speedX = 0;
      newObj.speedY = 0;
      newObj.rotationZ = 0;
      // newObj.coords = map.getCenter().add(Math.random() * 0.008, Math.random() * 0.009); // todo remove
      newObj.prevCoords = {};
      newObj.prevCoords.x = newObj.coords.x;
      newObj.prevCoords.y = newObj.coords.y;

      this.createMarker(newObj);
      this.loadObject3D(newObj); // async
      this.objectsArr.push(newObj);
    }
    console.log(this.objectsArr);
    window['OBJECTS_ARR'] = this.objectsArr;
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
  //#endregion


  // private methods
  // init map
  //#region
  private mapInit(cb: Function) {
    this.createMap();
    this.createPolygonLayer();
    this.createClusterLayer();

    this.mapElement = document.getElementById(this.mapId);
    this.mapWrapperElement = document.getElementById(this.mapWrapperId);
    this.canvasElem = this.mapElement.querySelector('canvas');

    this.stats = new Stats();
    this.mapElement.appendChild(this.stats.dom);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.createLabelRenderer();
    this.animation();

    window.addEventListener('resize', this.windowOnResize);

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

  private windowOnResize(event) {
    const x = this.mapWrapperElement.clientWidth; // offsetWidth
    const y = this.mapWrapperElement.clientHeight; // offsetHeight
    // mapElement width and height 100% in styles.scss
    this.labelRenderer.setSize(x, y);
  }

  private animation = () => {
    this.animationFrame = requestAnimationFrame(this.animation);
    this.stats.update();
    if (this.labelRenderer != null && this.scene != null && this.camera != null) {
      this.labelRenderer.render(this.scene, this.camera);
    }
  }

  private createMap() {
    this.map = new maptalks.Map('map-html-element-id-495367235', { // DIV id
      center: [13.41261, 52.529611],
      zoom: this.initZoom,
      // pitch: 60,
      // bearing: 30,
      pitch: 0,
      bearing: 0,
      centerCross: true,
      // scaleControl: {
      //   'position': 'bottom-left',
      //   'maxWidth': 100,
      //   'metric': true,
      //   'imperial': true
      // },
      baseLayer: new maptalks.TileLayer('tile', {
        'urlTemplate': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'subdomains': ['a', 'b', 'c'],
      })
    });

    this.mapEventHandlers();
  }

  private mapEventHandlers() {
    this.map.on('mousemove', (event) => {
      this.mouse.x = (event.containerPoint.x / event.target.width) * 2 - 1;
      this.mouse.y = -(event.containerPoint.y / event.target.height) * 2 + 1;
      this.selectObjects();
    });

    this.map.on('zooming', (event) => {
      // const scale = calcInterpolationScale(map.getZoom());
      for (let i = 0; i < this.objectsArr.length; i++) {
        if (this.objectsArr[i].object3D == null || this.objectsArr[i].marker == null) {
          continue; // objectsArr[i].marker uses in changeVisible
        }
        this.changeVisible(this.objectsArr[i], event.to);
        // objectsArr[i].model.scale.set(scale, scale, scale);
      }
    });

    this.map.on('click', (event) => {
      for (let i = 0; i < this.objectsArr.length; i++) {
        if (this.objectsArr[i].mouseUnder === true) {
          if (this.selectedObject != null) {
            this.selectedObject.objectDivLabel.className = 'obj-label';
            this.setMarkerSymbolDefault(this.selectedObject.marker);
          }
          this.selectedObject = this.objectsArr[i];
          this.selectedObject.objectDivLabel.className = 'obj-label-selected';
          this.setMarkerSymbolSelected(this.selectedObject.marker);
          if (this.on_click_object != null) {
            this.on_click_object(this.selectedObject);
          }
        }
      }
    });
  }

  private createClusterLayer() {
    this.clusterLayer = new maptalks.ClusterLayer('cluster', {
      'noClusterWithOneMarker': true,
      'animation': false,
      'maxClusterRadius': 50,
      'maxClusterZoom': this.zoomWhenChangeVisible, // -2
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
      'drawClusterText': true,
      'geometryEvents': true,
      'single': true
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
      this.scene.add(new THREE.AmbientLight(0xffffff, 1));
      if (this.on_map_init != null) {
        this.on_map_init();
      }
    };
    this.threeLayer.addTo(this.map);
  }
  //#endregion

  // init / remove 3D Object
  //#region


  // init / remove 3D Object
  //#region
  private remove3DObjectFromScene(object: any) { // any - not geoObject !
    if (object.geometry) {
      object.geometry.dispose();
    }
    if (object.material) {
      object.material.dispose();
    }
    if (object.texture) {
      object.texture.dispose();
    }
    this.scene.remove(object);
  }

  private init3dObject(geoObject: GeoObject, object3D: any) {
    const childScale = 0.004;
    object3D.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.scale.set(childScale, childScale, childScale);
        child.rotation.set(Math.PI * 1 / 2, -Math.PI * 1 / 2, 0);
        if (Array.isArray(child.material)) {
          return;
        }
        child.material.initColor = child.material.color.getHex();
      }
    });

    geoObject.object3D = object3D;
    const v = this.threeLayer.coordinateToVector3(new maptalks.Coordinate(geoObject.coords.x, geoObject.coords.y));
    object3D.position.x = v.x;
    object3D.position.y = v.y;
    object3D.position.z = v.z;

    geoObject.box3 = new THREE.Box3().setFromObject(object3D);
    const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    geoObject.pointForMove = new THREE.Mesh(cubeGeometry, cubeMaterial);
    geoObject.pointForMove.position.x = geoObject.object3D.position.x;
    geoObject.pointForMove.position.y = geoObject.object3D.position.y;
    geoObject.pointForMove.position.z = geoObject.object3D.position.z;
    this.scene.add(geoObject.pointForMove);

    const objectDivLabel = document.createElement('div');
    objectDivLabel.className = 'obj-label';
    objectDivLabel.textContent = geoObject.projectName;
    objectDivLabel.style.marginTop = '-1em';
    const objLabel = new THREE.CSS2DObject(objectDivLabel);
    geoObject.objectDivLabel = objectDivLabel;
    objLabel.position.x = 0;
    objLabel.position.y = 0;
    objLabel.position.z = geoObject.box3.getSize().z * 1.1;
    geoObject.object3D.add(objLabel);

    this.changeVisible(geoObject, this.map.getZoom());
    this.scene.add(object3D);
    this.threeLayer.renderScene();
  }

  private loadObject3D(obj: GeoObject) {
    THREE.ZipLoadingManager
      .uncompress(obj.pathToZip, ['.mtl', '.obj', '.jpg', '.png'])
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
        const mtlLoader = new THREE.MTLLoader(zip.manager);
        const objLoader = new THREE.OBJLoader(zip.manager);
        mtlLoader.setPath(pathToFolder);
        mtlLoader.load(mtlFileName, (materials) => {
          materials.preload();
          objLoader.setMaterials(materials);
          objLoader.setPath(pathToFolder);
          objLoader.load(objFileName, (object3D) => {
            this.init3dObject(obj, object3D);
          });
        });
      });
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

  private createMarker(obj: GeoObject) {
    const coords = new maptalks.Coordinate(obj.coords.x, obj.coords.y);
    const marker = new maptalks.Marker(coords, {
      visible: true,
      cursor: 'pointer',
      symbol: [{
        'markerFile': '../../../assets/img/marker.svg',
        'markerWidth': 28,
        'markerHeight': 40,
      },
      {
        'textFaceName': 'sans-serif',
        'textName': obj.projectName,
        'textSize': 16,
        'textDy': 10,
        'textFill': 'black',
        'textHaloColor': '#fff',
        'textHaloRadius': 2,
      }]
    });

    obj.marker = marker;
    obj.marker.parent = obj;
    this.clusterLayer.addGeometry(marker);
    this.changeVisible(obj, this.map.getZoom());
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
      if (e.target.parent === this.selectedObject) {
        return;
      }
      this.setMarkerSymbolDefault(e.target);
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

    if (this.map.getZoom() < this.zoomWhenChangeVisible + 0.2 || this.map.getZoom() < this.zoomWhenChangeVisible - 0.2) {
      this.customRedraw(); // todo remove
      return;
    }

    this.customRedraw();
  }

  private updateCoordsForDraw(obj: GeoObject) {
    if (obj == null || obj.object3D == null || obj.marker == null) {
      return;
    }
    obj.coords.x += obj.speedX; // geographical coordinates
    obj.coords.y += obj.speedY; // geographical coordinates
    obj.marker.setCoordinates(new maptalks.Coordinate(obj.coords));

    const prevX = obj.object3D.position.x;
    const prevY = obj.object3D.position.y;
    const v = this.threeLayer.coordinateToVector3(obj.coords);
    obj.object3D.position.x = v.x;
    obj.object3D.position.y = v.y;
    obj.object3D.position.z = v.z;
    obj.object3D.rotation.z = Math.atan2(prevY - obj.object3D.position.y, prevX - obj.object3D.position.x);
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

  private selectObject(obj: GeoObject) {
    if (obj.object3D == null || obj.object3D.visible === false) {
      obj.mouseUnder = false;
      return false;
    }

    const objects = [];

    obj.object3D.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        objects.push(child);
      }
    });

    this.raycaster.setFromCamera(this.mouse, this.threeLayer.getCamera());
    const intersects = this.raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      return this.intersections(obj);
    }

    if (intersects.length === 0) {
      return this.noIntersections(obj);
    }
  }

  private intersections(obj: GeoObject): true {
    const prevMouseUnderObject_2 = obj.mouseUnder;
    obj.mouseUnder = true;

    // on hover event
    if (prevMouseUnderObject_2 !== obj.mouseUnder) {
      if (this.on_hover_object != null) {
        this.on_hover_object(obj);
      }
    }

    // set selected color
    obj.object3D.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }
      if (Array.isArray(child.material) === true) {
        return;
      } else {
        const initColor = child.material.initColor;
        child.material.color.setHex(initColor - 100);
      }
    });

    this.customRedraw();
    return true;
  }

  private noIntersections(obj: GeoObject): false {
    const prevMouseUnderObject = obj.mouseUnder;
    obj.mouseUnder = false;

    // set default color
    obj.object3D.traverse((child) => {
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
    if (prevMouseUnderObject !== obj.mouseUnder) {
      this.customRedraw();
    }

    return false;
  }
  //#endregion


  private setCanvasCursor(cursor) {
    this.canvasElem.style.cursor = cursor;
  }

  private changeVisible(obj: GeoObject, zoom: number) {
    if (zoom < this.zoomWhenChangeVisible + 0.2 || zoom < this.zoomWhenChangeVisible - 0.2) {
      if (obj.object3D) {
        obj.object3D.visible = false;
        obj.objectDivLabel.style.display = 'none';
      }
      if (obj.marker) {
        obj.marker.options.visible = true;
      }
    } else {
      if (obj.object3D) {
        obj.object3D.visible = true;
        obj.objectDivLabel.style.display = '';
      }
      if (obj.marker) {
        obj.marker.options.visible = false;
      }
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

}














