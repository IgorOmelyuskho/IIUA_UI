declare var THREE: any;
declare var maptalks: any;
import Stats from 'stats-js';
import { GeoObject } from 'src/app/models';

const zoomWhenChangeVisible = 16;
const initZoom = 15;
const updatedInterval = 3500;
const drawInterval = 50;

// callbacks
let on_click_object: Function = null;
let on_hover_object: Function = null;
let on_map_init: Function = null;

let infoWindow = {};
let canvasElem: HTMLElement = null;
let stats: Stats = null;
let scene = null;
let raycaster = null;
let mouse = null;
let selectedObject: GeoObject = null;
let map = null;
let objectsArr: GeoObject[] = [];
let timer1 = null;
let timer2 = null;
let animationFrame = null;
let mapElement: HTMLElement = null;
let mapWrapperElement: HTMLElement | any = null;
let threeLayer = null;
let clusterLayer = null;
let polygonLayer = null;
let labelRenderer = null;
let camera = null;

export function mapInit(cb: Function) {
  createMap();
  createPolygonLayer();
  createClusterLayer();
  initInfoWindow();

  mapElement = document.getElementById('map-4');
  mapWrapperElement = document.getElementsByClassName('map-wrapper-4-unique-3585349')[0];
  canvasElem = mapElement.querySelector('canvas');

  stats = new Stats();
  mapElement.appendChild(stats.dom);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  createLabelRenderer();
  animation();

  window.addEventListener('resize', windowOnResize);

  on_map_init = cb;
  createThreeLayer(); // async

  timer1 = setInterval(() => {
    updateCoordsFromServer();
  }, updatedInterval);

  timer2 = setInterval(() => {
    updateCoordsForRedraw();
  }, drawInterval);
}

export function mapSetProject(project) {
  project.coords = {};
  project.coords.x = Math.random() * 30;
  project.coords.y = Math.random() * 30;
  map.setCenter(new maptalks.Coordinate(project.coords.x, project.coords.y));
  // set selected project ??
}

export function mapDestroy() {
  clearInterval(timer1);
  clearInterval(timer2);
  cancelAnimationFrame(animationFrame);
  window.removeEventListener('resize', windowOnResize);

  infoWindow = {};
  canvasElem = null;
  stats = null;
  scene = null;
  threeLayer = null;
  raycaster = null;
  mouse = null;
  selectedObject = null;
  map = null;
  objectsArr = [];
  timer1 = null;
  timer2 = null;
  animationFrame = null;
  mapElement = null;
  mapWrapperElement = null;
  clusterLayer = null;
  polygonLayer = null;
  camera = null;

  on_click_object = null;
  on_hover_object = null;
  on_map_init = null;
}

export function mapSetFullScreen() { // todo navbar height
  const e = document.documentElement;
  const g = document.body;
  const x = window.innerWidth || e.clientWidth || g.clientWidth;
  const y = window.innerHeight || e.clientHeight || g.clientHeight;
  mapWrapperElement.style.width = x + 'px';
  mapWrapperElement.style.height = y + 'px';
  mapElement.style.width = x + 'px';
  mapElement.style.height = y + 'px';
  labelRenderer.setSize(mapElement.clientWidth, mapElement.clientHeight);
}

function createLabelRenderer() {
  labelRenderer = new THREE.CSS2DRenderer();
  labelRenderer.setSize(mapElement.clientWidth, mapElement.clientHeight);
  labelRenderer.domElement.id = 'label-renderer-4';
  mapElement.appendChild(labelRenderer.domElement);
}

function windowOnResize(event) {
  const x = mapWrapperElement.clientWidth; // offsetWidth
  const y = mapWrapperElement.clientHeight; // offsetHeight
  // mapElement width and height 100% in styles.scss
  labelRenderer.setSize(x, y);
}

function initInfoWindow() {
  infoWindow['infoElem'] = document.getElementById('info-4');
  infoWindow['coordX'] = infoWindow['infoElem'].querySelector('.coords-x');
  infoWindow['coordY'] = infoWindow['infoElem'].querySelector('.coords-y');
  infoWindow['name'] = infoWindow['infoElem'].querySelector('.name');
}

function updateCoordsFromServer() {
  const res = [];
  for (let i = 0; i < objectsArr.length; i++) {
    const newObj = {
      geoObjectId: objectsArr[i].geoObjectId,
      coords: {
        x: objectsArr[i].coords.x + Math.random() * 0.001 - Math.random() * 0.001,
        y: objectsArr[i].coords.y + Math.random() * 0.001 - Math.random() * 0.001,
      },
    };
    res.push(newObj);
  }

  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < objectsArr.length; j++) {
      if (res[i].geoObjectId === objectsArr[j].geoObjectId) {
        objectsArr[j].prevCoords.x = objectsArr[j].coords.x;
        objectsArr[j].prevCoords.y = objectsArr[j].coords.y;
        objectsArr[j].speedX = (res[i].coords.x - objectsArr[j].prevCoords.x) * drawInterval / updatedInterval;
        objectsArr[j].speedY = (res[i].coords.y - objectsArr[j].prevCoords.y) * drawInterval / updatedInterval;

        const v = threeLayer.coordinateToVector3(new THREE.Vector3(res[i].coords.x, res[i].coords.y, 0.1));
        objectsArr[j].pointForMove.position.x = v.x;
        objectsArr[j].pointForMove.position.y = v.y;
        // objectsArr[j].cube.position.z = v.z;
      }
    }
  }
}

function animation() {
  animationFrame = requestAnimationFrame(animation);
  stats.update();
  if (labelRenderer != null && scene != null && camera != null) {
    labelRenderer.render(scene, camera);
  }
}

function remove3DObjectFromScene(object: any) { // any - not geoObject !
  if (object.geometry) {
    object.geometry.dispose();
  }
  if (object.material) {
    object.material.dispose();
  }
  if (object.texture) {
    object.texture.dispose();
  }
  scene.remove(object);
}

export function mapReplaceObjects(objects: GeoObject[]) {
  clearInterval(timer1);
  clearInterval(timer2);
  for (let i = 0; i < objectsArr.length; i++) {
    remove3DObjectFromScene(objectsArr[i].pointForMove);
    objectsArr[i].objectDivLabel.style.display = 'none';
    objectsArr[i].objectDivLabel.parentNode.removeChild(objectsArr[i].objectDivLabel); // not work
    remove3DObjectFromScene(objectsArr[i].object3D);
  }
  // while (scene.children.length > 0) {
  //   scene.remove(scene.children[0]);
  // }
  // scene.remove.apply(scene, scene.children);
  // scene.add(new THREE.AmbientLight(0xffffff, 1));
  clusterLayer.clear();
  objectsArr = [];
  customRedraw();
  mapAddNewObjects(objects);
  timer1 = setInterval(() => {
    updateCoordsFromServer();
  }, updatedInterval);
  timer2 = setInterval(() => {
    updateCoordsForRedraw();
  }, drawInterval);
}

export function mapAddNewObjects(objects: GeoObject[]) {
  for (let i = 0; i < objects.length; i++) {
    const newObj: GeoObject = objects[i];
    newObj.marker = null,
    newObj.object3D = null,
    newObj.mouseUnder = false,
    newObj.speedX = 0,
    newObj.speedY = 0,
    newObj.rotationZ = 0,
    newObj.coords = map.getCenter().add(Math.random() * 0.008, Math.random() * 0.009), // todo remove
    newObj.prevCoords = {};
    newObj.prevCoords.x = newObj.coords.x;
    newObj.prevCoords.y = newObj.coords.y;

    createMarker(newObj);
    loadObject3D(newObj); // async
    objectsArr.push(newObj);
  }
}

// callbacks
export function setObjectClickCallback(cb: Function) {
  on_click_object = cb;
}

export function setObjectHoverCallback(cb: Function) {
  on_hover_object = cb;
}

function createMap() {
  map = new maptalks.Map('map-4', { // DIV id
    center: [13.41261, 52.529611],
    // center: [0, 0],
    zoom: initZoom,
    // pitch: 60,
    // bearing: 30,
    pitch: 0,
    bearing: 0,
    centerCross: true,
    scaleControl: {
      'position': 'bottom-left',
      'maxWidth': 100,
      'metric': true,
      'imperial': true
    },
    // overviewControl: true, // add overview control
    baseLayer: new maptalks.TileLayer('tile', {
      'urlTemplate': 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'subdomains': ['a', 'b', 'c'],
    })
  });

  map.on('mousemove', function (event) {
    mouse.x = (event.containerPoint.x / event.target.width) * 2 - 1;
    mouse.y = -(event.containerPoint.y / event.target.height) * 2 + 1;
    selectObjects();
  });

  map.on('zooming', function (event) {
    // const scale = calcInterpolationScale(map.getZoom());
    for (let i = 0; i < objectsArr.length; i++) {
      if (objectsArr[i].object3D == null || objectsArr[i].marker == null) {
        continue; // objectsArr[i].marker uses in changeVisible
      }
      changeVisible(objectsArr[i], event.to);
      // objectsArr[i].model.scale.set(scale, scale, scale);
    }
  });


  map.on('click', function (event) {
    for (let i = 0; i < objectsArr.length; i++) {
      if (objectsArr[i].mouseUnder === true) {
        if (selectedObject != null) {
          selectedObject.objectDivLabel.className = 'obj-label';
          setMarkerSymbolDefault(selectedObject.marker);
        }
        selectedObject = objectsArr[i];
        selectedObject.objectDivLabel.className = 'obj-label-selected';
        setMarkerSymbolSelected(selectedObject.marker);
        if (on_click_object != null) {
          on_click_object(selectedObject);
        }
        showInformation(selectedObject);
      }
    }
  });
}

function setMarkerSymbolDefault(marker) {
  marker.updateSymbol({
    'markerWidth': 28,
    'markerHeight': 40,
    'textSize': 16,
    'textFill': 'black',
    'zIndex': 1
  });
  marker.setZIndex(1);
}

function setMarkerSymbolSelected(marker) {
  marker.updateSymbol({
    'markerWidth': 28 + 5,
    'markerHeight': 40 + 5,
    'textSize': 18,
    'textFill': 'green',
  });
  marker.setZIndex(1000);
}

function createMarker(obj: GeoObject) {
  const coords = new maptalks.Coordinate(obj.coords.x, obj.coords.y);
  const marker = new maptalks.Marker(coords, {
    visible: true,
    cursor: 'pointer',
    symbol: [{
      'markerFile': '../../assets/img/marker.svg',
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
  clusterLayer.addGeometry(marker);
  changeVisible(obj, map.getZoom());

  marker.on('click', function (e) {
    if (selectedObject != null) {
      selectedObject.objectDivLabel.className = 'obj-label';
      setMarkerSymbolDefault(selectedObject.marker);
    }
    selectedObject = e.target.parent;
    selectedObject.objectDivLabel.className = 'obj-label-selected';
    setMarkerSymbolSelected(selectedObject.marker);
    if (on_click_object != null) {
      on_click_object(selectedObject);
    }
    showInformation(selectedObject);
  });

  marker.on('mouseenter', function (e) {
    setMarkerSymbolSelected(e.target); // e.target === marker
    if (on_hover_object != null) {
      on_hover_object(e.target.parent);
    }
  });

  marker.on('mouseout', function (e) {
    if (e.target.parent === selectedObject) {
      return;
    }
    setMarkerSymbolDefault(e.target);
  });
}

export function mapAddNewPolygons(polygons: any[]) {
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

    polygon.on('click', function (e) {
      document.getElementById('area-info-4').innerHTML = e.target.options.customName;
      document.getElementById('area-info-4').style.display = 'block';
    });

    polygon.on('mouseenter', function (e) {
      e.target.setSymbol(hoverSymbol);
    });

    polygon.on('mouseout', function (e) {
      e.target.setSymbol(initialSymbol);
    });

    polygonLayer.addGeometry(polygon);
  }

}

export function mapReplacePolygons(polygons: any[]) {
  polygonLayer.clear();
  mapAddNewPolygons(polygons);
}

function createClusterLayer() {
  clusterLayer = new maptalks.ClusterLayer('cluster', {
    'noClusterWithOneMarker': true,
    'animation': false,
    'maxClusterRadius': 50,
    'maxClusterZoom': zoomWhenChangeVisible, // -2
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

  map.addLayer(clusterLayer);
}

function init3dObject(geoObject: GeoObject, object3D: any) {
  const childScale = 0.004;
  object3D.traverse(function (child) {
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
  const v = threeLayer.coordinateToVector3(new maptalks.Coordinate(geoObject.coords.x, geoObject.coords.y));
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
  scene.add(geoObject.pointForMove);

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

  changeVisible(geoObject, map.getZoom());
  scene.add(object3D);
  threeLayer.renderScene();
}

function loadObject3D(obj: GeoObject) {
  THREE.ZipLoadingManager
    .uncompress(obj.pathToZip, ['.mtl', '.obj', '.jpg', '.png'])
    .then(function (zip) {
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
      mtlLoader.load(mtlFileName, function (materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.setPath(pathToFolder);
        objLoader.load(objFileName, function (object3D) {
          init3dObject(obj, object3D);
        });
      });
    });
}

function createPolygonLayer() {
  polygonLayer = new maptalks.VectorLayer('polygonLayer');
  polygonLayer.addTo(map);
}

function createThreeLayer() {
  THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
  threeLayer = new maptalks.ThreeLayer('threeLayer');
  threeLayer.prepareToDraw = function (gl, localScene, localCamera) {
    scene = localScene;
    camera = localCamera;
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    if (on_map_init != null) {
      on_map_init();
    }
  };
  threeLayer.addTo(map);
}

function customRedraw() {
  map.setCenter(new maptalks.Coordinate(map.getCenter()));
}

function updateCoordsForRedraw() {
  for (let i = 0; i < objectsArr.length; i++) {
    updateCoordsForDraw(objectsArr[i]);
  }

  showInformation(selectedObject);

  if (map.getZoom() < zoomWhenChangeVisible + 0.2 || map.getZoom() < zoomWhenChangeVisible - 0.2) {
    customRedraw(); // todo remove
    return;
  }

  customRedraw();
}

function updateCoordsForDraw(obj: GeoObject) {
  if (obj == null || obj.object3D == null || obj.marker == null) {
    return;
  }
  obj.coords.x += obj.speedX; // geographical coordinates
  obj.coords.y += obj.speedY; // geographical coordinates
  obj.marker.setCoordinates(new maptalks.Coordinate(obj.coords));

  const prevX = obj.object3D.position.x;
  const prevY = obj.object3D.position.y;
  const v = threeLayer.coordinateToVector3(obj.coords);
  obj.object3D.position.x = v.x;
  obj.object3D.position.y = v.y;
  obj.object3D.position.z = v.z;
  obj.object3D.rotation.z = Math.atan2(prevY - obj.object3D.position.y, prevX - obj.object3D.position.x);

  // obj.cube.position.x = v.x;
  // obj.cube.position.y = v.y;
  // obj.cube.position.z = v.z;
}

function selectObjects() {
  setCanvasCursor('inherit');

  for (let i = 0; i < objectsArr.length; i++) {
    if (selectObject(objectsArr[i]) === true) {
      setCanvasCursor('pointer');
      return;
    }
  }
}

function selectObject(obj: GeoObject) {
  if (obj.object3D == null || obj.object3D.visible === false) {
    obj.mouseUnder = false;
    return false;
  }

  const objects = [];

  obj.object3D.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      objects.push(child);
    }
  });

  raycaster.setFromCamera(mouse, threeLayer.getCamera());
  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    const prevMouseUnderObject_2 = obj.mouseUnder;
    obj.mouseUnder = true;

    // on hover event
    if (prevMouseUnderObject_2 !== obj.mouseUnder) {
      if (on_hover_object != null) {
        on_hover_object(obj);
      }
    }

    // set selected color
    obj.object3D.traverse(function (child) {
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

    customRedraw();
    return true;
  }

  if (intersects.length === 0) {
    const prevMouseUnderObject = obj.mouseUnder;
    obj.mouseUnder = false;

    // set default color
    obj.object3D.traverse(function (child) {
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
      customRedraw();
    }

    return false;
  }

}

function setCanvasCursor(cursor) {
  canvasElem.style.cursor = cursor;
}

function changeVisible(obj: GeoObject, zoom: number) {
  if (zoom < zoomWhenChangeVisible + 0.2 || zoom < zoomWhenChangeVisible - 0.2) {
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

function showInformation(obj: GeoObject) {
  if (obj == null) {
    return;
  }

  infoWindow['infoElem'].style.display = 'block';
  infoWindow['coordX'].innerHTML = 'X = ' + obj.coords.x.toFixed(8);
  infoWindow['coordY'].innerHTML = 'Y = ' + obj.coords.y.toFixed(8);
  infoWindow['name'].innerHTML = obj.projectName;
}

function deltaToScale(delta: number) {
  let res = 1;
  for (let i = 1; i < delta; i++) {
    res = 2 * res;
  }
  return res;
}

function linearInterpolation(y0: number, y1: number, x0: number, x1: number, x: number) {
  if (Math.abs(x1 - x0) < 0.000000000001) {
    return y0;
  }

  return y0 + ((y1 - y0) / (x1 - x0)) * (x - x0);
}

function calcScale(mapZoom: number) {
  let delta = 0;
  if (mapZoom === initZoom) {
    return 1;
  } else if (mapZoom > initZoom) {
    delta = mapZoom - initZoom + 1;
    return 1 / deltaToScale(delta);
  } else {
    delta = initZoom - mapZoom + 1;
    return deltaToScale(delta);
  }
}

function calcInterpolationScale(mapZoom: number) {
  const x0 = Math.floor(mapZoom);
  const x1 = Math.ceil(mapZoom);
  const y0 = calcScale(x0);
  const y1 = calcScale(x1);
  return linearInterpolation(y0, y1, x0, x1, mapZoom);
}
