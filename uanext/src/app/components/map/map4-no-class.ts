declare var THREE: any;
declare var maptalks: any;
import Stats from 'stats-js';

const zoomWhenChangeVisible = 16;
const initZoom = 15;
const updatedInterval = 15000;
const drawInterval = 50;

let infoWindow = {};
let canvasElem = null;
let stats = null;
let scene = null;
let threeLayer = null;
let raycaster = null;
let mouse = null;
let markerLayer = null;
let selectedObject = null;
let map = null;
let objectsArr = [];
let timer1 = null;
let timer2 = null;
let animationFrame = null;
let mapElement = null;
let mapWrapperElement = null;
let clusterLayer = null;
let polygonLayer = null;
let labelRenderer = null;
let camera = null;

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
const polygonArr = [polygon1, polygon2];

// init();
// export

export function mapInit() {
  console.log('MAP4 INIT');
  createMap();
  createThreeLayer();
  createPolygonLayer();
  // createMarkerLayer();
  createClusterLayer();
  initInfoWindow();

  mapElement = document.getElementById('map-4');
  mapWrapperElement = document.getElementsByClassName('map-wrapper-4')[0];
  canvasElem = mapElement.querySelector('canvas');

  stats = new Stats();
  mapElement.appendChild(stats.dom);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  createLabelRenderer();
  setMapFullScreen();
  animation();
  initFetchObjects();
  createPolygon(polygonArr);

  window.addEventListener('resize', windowOnResize);

  timer1 = setInterval(() => {
    updateCoordsFromServer();
  }, updatedInterval);

  timer2 = setInterval(() => {
    updateCoordsForRedraw();
  }, drawInterval);
}

export function mapSetProject(project) {
  console.log(project);
  map.setCenter(new maptalks.Coordinate(project.projectCoords.x, project.projectCoords.y));
}

export function mapDestroy() {
  console.log('MAP4 DESTROY');
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
  markerLayer = null;
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
}

function setMapFullScreen() { // todo navbar height
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
  console.log('windowOnResize4');
  const e = document.documentElement;
  const g = document.body;
  const x = window.innerWidth || e.clientWidth || g.clientWidth;
  const y = window.innerHeight || e.clientHeight || g.clientHeight;
  mapWrapperElement.style.width = x + 'px';
  mapWrapperElement.style.height = y + 'px';
  mapElement.style.height = y + 'px';
  labelRenderer.setSize(mapElement.clientWidth, mapElement.clientHeight);
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
      id: objectsArr[i].id,
      coords: {
        x: objectsArr[i].coords.x + Math.random() * 0.001 - Math.random() * 0.001,
        y: objectsArr[i].coords.y + Math.random() * 0.001 - Math.random() * 0.001,
        // x: objectsArr[i].coords.x - 0.01,
        // y: objectsArr[i].coords.y - 0.1,
      },
      name: objectsArr[i].name,
    };
    res.push(newObj);
  }

  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < objectsArr.length; j++) {
      if (res[i].id === objectsArr[j].id) {
        objectsArr[j].prevCoords.x = objectsArr[j].coords.x;
        objectsArr[j].prevCoords.y = objectsArr[j].coords.y;
        objectsArr[j].speedX = (res[i].coords.x - objectsArr[j].prevCoords.x) * drawInterval / updatedInterval;
        objectsArr[j].speedY = (res[i].coords.y - objectsArr[j].prevCoords.y) * drawInterval / updatedInterval;

        const v = threeLayer.coordinateToVector3(new THREE.Vector3(res[i].coords.x, res[i].coords.y, 0.1));
        objectsArr[j].cube.position.x = v.x;
        objectsArr[j].cube.position.y = v.y;
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

function initFetchObjects() {
  for (let i = 0; i < 2; i++) {
    const newObj = {
      id: 'id' + i,
      coords: map.getCenter().add(Math.random() * 0.003, Math.random() * 0.002),
      // coords: {
      //   x: 0,
      //   y: 0,
      // },
      speedX: 0,
      speedY: 0,
      rotationZ: 0,
      name: 'object ' + i,
      marker: null,
      model: null,
      mouseUnder: false,
      loaderPath: '../../../assets/objects/tractorObj/',
      // loaderPath: 'https://gitlab.com/omelyushko.igor/tractor/blob/master/43-tractor/Tractor.mtl',
      modelMtl: 'Tractor.mtl',
      modelObj: 'Tractor.obj',
    };

    newObj['prevCoords'] = {};
    newObj['prevCoords'].x = newObj.coords.x;
    newObj['prevCoords'].y = newObj.coords.y;
    objectsArr.push(newObj);
  }

  for (let i = 0; i < objectsArr.length; i++) {
    createMarker(objectsArr[i]);
  }

  for (let i = 0; i < objectsArr.length; i++) {
    // setTimeout(() => {
    //   loadObjectModel(objectsArr[i]);
    // }, i * 1500)
    loadObjectModel(objectsArr[i]);
  }
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
      'urlTemplate' : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'subdomains'  : ['a', 'b', 'c'],
    })
  });

  map.on('mousemove', function (event) {
    mouse.x = (event.containerPoint.x / event.target.width) * 2 - 1;
    mouse.y = -(event.containerPoint.y / event.target.height) * 2 + 1;
    selectObjects();
  });

  map.on('zooming', function (event) {
    const scale = calcInterpolationScale(map.getZoom());

    for (let i = 0; i < objectsArr.length; i++) {
      if (objectsArr[i].model == null || objectsArr[i].marker == null) {
        continue; // objectsArr[i].marker uses in changeVisible
      }
      changeVisible(objectsArr[i], event.to);
      // objectsArr[i].model.scale.set(scale, scale, scale);
    }
  });


  map.on('click', function (event) {
    for (let i = 0; i < objectsArr.length; i++) {
      if (objectsArr[i].mouseUnder === true) {
        selectedObject = objectsArr[i];
        selectedObject.objectDivLabel.className = 'obj-label-selected';
        showInformation(selectedObject);
      } else {
        objectsArr[i].objectDivLabel.className = 'obj-label';
      }
    }
  });
}

function createMarker(obj) {
  const coords = new maptalks.Coordinate(obj.coords.x, obj.coords.y);
  const marker = new maptalks.Marker(coords, {
    visible: true,
    cursor: 'pointer',
    symbol: [{
        'markerFile': '../../assets/img/marker.svg', // different in map.js
        'markerWidth': 28,
        'markerHeight': 40,
      },
      {
        'textFaceName': 'sans-serif',
        'textName': obj.name,
        'textSize': 16,
        'textDy': 10,
        'textFill': 'black',
        'textHaloColor': '#fff',
        'textHaloRadius': 2,
      }
    ]
  });

  obj.marker = marker;
  obj.marker.parent = obj;
  // markerLayer.addGeometry(obj.marker);
  clusterLayer.addGeometry(marker);
  changeVisible(obj, map.getZoom());

  marker.on('click', (e) => {
    selectedObject = e.target.parent;
    showInformation(selectedObject);
  });

  marker.on('mouseenter', function (e) {
    marker.updateSymbol({
      'markerWidth': 28 + 5,
      'markerHeight': 40 + 5,
      'textSize': 18,
      'textFill': 'green',
    });
    marker.setZIndex(1000);
  });

  marker.on('mouseout', function (e) {
    marker.updateSymbol({
      'markerWidth': 28,
      'markerHeight': 40,
      'textSize': 16,
      'textFill': 'black',
      'zIndex': 1
    });
    marker.setZIndex(1);
  });
}

function createPolygon(dotsArr) {
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

  for (let i = 0; i < polygonArr.length; i++) {
    const polygon = new maptalks.Polygon(dotsArr[i], {
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

function createMarkerLayer() {
  markerLayer = new maptalks.VectorLayer('markerLayer');
  markerLayer.addTo(map);
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

function loadObjectModel(obj) {
  const childScale = 0.004;
  const mtlLoader = new THREE.MTLLoader();
  const objLoader = new THREE.OBJLoader();
  // const myWorker = new Worker("loadModelWorker.js");
  // myWorker.postMessage(JSON.parse(JSON.stringify(obj)));
  // myWorker.onmessage = function(e) {
  //   const object = e.data;
  //   console.log(object);
  //   changeVisible(obj, map.getZoom());
  //   scene.add(object);
  //   threeLayer.renderScene();
  // }

  mtlLoader.setPath(obj.loaderPath); // ../../../assets/objects/tractorObj/
  mtlLoader.load(obj.modelMtl, function (materials) {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.setPath(obj.loaderPath);
    objLoader.load(obj.modelObj, function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.scale.set(childScale, childScale, childScale); // todo
          child.rotation.set(Math.PI * 1 / 2, -Math.PI * 1 / 2, 0);
          if (Array.isArray(child.material)) {
            return; // todo maybe remove this mesh
          }
          child.material.initColor = child.material.color.getHex();
        }
      });

      obj.model = object;
      const v = threeLayer.coordinateToVector3(new maptalks.Coordinate(obj.coords.x, obj.coords.y));
      object.position.x = v.x;
      object.position.y = v.y;
      object.position.z = v.z;

      obj.box3 = new THREE.Box3().setFromObject(object);
      const cubeGeometry = new THREE.BoxGeometry(0.03, 0.03, 0.03);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00
      });
      obj.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      obj.cube.position.x = obj.model.position.x;
      obj.cube.position.y = obj.model.position.y;
      obj.cube.position.z = obj.model.position.z;
      scene.add(obj.cube);

      const objectDivLabel = document.createElement('div');
      objectDivLabel.className = 'obj-label';
      objectDivLabel.textContent = obj.name;
      objectDivLabel.style.marginTop = '-1em';
      const objLabel = new THREE.CSS2DObject(objectDivLabel);
      obj.objectDivLabel = objectDivLabel;
      objLabel.position.x = 0;
      objLabel.position.y = 0;
      objLabel.position.z = obj.box3.getSize().z * 1.1;
      obj.model.add(objLabel);

      changeVisible(obj, map.getZoom());
      // console.log(scene); // todo
      scene.add(object);
      threeLayer.renderScene();
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
  };
  threeLayer.addTo(map);
}

function customRedraw() {
  // console.log('CUSTOM REDRAW');
  // threeLayer.renderScene(); // not remove prev textures
  // map.panBy([0, 0]);   // map.panTo(coordinate); not always work
  map.setCenter(new maptalks.Coordinate(map.getCenter()));
}

function updateCoordsForRedraw() {
  for (let i = 0; i < objectsArr.length; i++) { // todo
    updateCoordsForDraw(objectsArr[i]);
  }

  showInformation(selectedObject);

  if (map.getZoom() < zoomWhenChangeVisible + 0.2 || map.getZoom() < zoomWhenChangeVisible - 0.2) {
    return;
  }

  customRedraw();
}

function updateCoordsForDraw(obj) { // todo
  if (obj == null || obj.model == null || obj.marker == null) {
    return;
  }
  obj.coords.x += obj.speedX; // geographical coordinates
  obj.coords.y += obj.speedY; // geographical coordinates
  obj.marker.setCoordinates(new maptalks.Coordinate(obj.coords)); // geographical coordinates

  const prevX = obj.model.position.x;
  const prevY = obj.model.position.y;
  const v = threeLayer.coordinateToVector3(obj.coords);
  obj.model.position.x = v.x;
  obj.model.position.y = v.y;
  obj.model.position.z = v.z;
  obj.model.rotation.z = Math.atan2(prevY - obj.model.position.y, prevX - obj.model.position.x);

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

function selectObject(obj) {
  if (obj.model == null || obj.model.visible === false) {
    obj.mouseUnder = false;
    return false;
  }

  const objects = [];

  obj.model.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      objects.push(child);
    }
  });

  raycaster.setFromCamera(mouse, threeLayer.getCamera());
  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    obj.mouseUnder = true;

    obj.model.traverse(function (child) {
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

    threeLayer.renderScene();
    // customRedraw();
    return true;
  }

  if (intersects.length === 0) {
    const prevMouseUnderTractor = obj.mouseUnder;
    obj.mouseUnder = false;

    obj.model.traverse(function (child) {
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

    if (prevMouseUnderTractor !== obj.mouseUnder) {
      customRedraw();
    }

    return false;
  }

}

function setCanvasCursor(cursor) {
  canvasElem.style.cursor = cursor;
}

function changeVisible(obj, zoom) {
  if (zoom < zoomWhenChangeVisible + 0.2 || zoom < zoomWhenChangeVisible - 0.2) {
    if (obj.model) {
      obj.model.visible = false;
      obj.objectDivLabel.style.display = 'none';
    }
    if (obj.marker) {
      obj.marker.options.visible = true;
    }
  } else {
    if (obj.model) {
      obj.model.visible = true;
      obj.objectDivLabel.style.display = '';
    }
    if (obj.marker) {
      obj.marker.options.visible = false;
    }
  }
}

function showInformation(obj) {
  if (obj == null) {
    return;
  }

  infoWindow['infoElem'].style.display = 'block';
  infoWindow['coordX'].innerHTML = 'X = ' + obj.coords.x.toFixed(8);
  infoWindow['coordY'].innerHTML = 'Y = ' + obj.coords.y.toFixed(8);
  infoWindow['name'].innerHTML = obj.name;
}

function deltaToScale(delta) {
  let res = 1;
  for (let i = 1; i < delta; i++) {
    res = 2 * res;
  }
  return res;
}

function linearInterpolation(y0, y1, x0, x1, x) {
  if (Math.abs(x1 - x0) < 0.000000000001) {
    return y0;
  }

  return y0 + ((y1 - y0) / (x1 - x0)) * (x - x0);
}

function calcScale(mapZoom) {
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

function calcInterpolationScale(mapZoom) {
  const x0 = Math.floor(mapZoom);
  const x1 = Math.ceil(mapZoom);
  const y0 = calcScale(x0);
  const y1 = calcScale(x1);
  return linearInterpolation(y0, y1, x0, x1, mapZoom);
}
