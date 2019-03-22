const zoomWhenChangeVisible = 16;
const initZoom = 15;
const updatedInterval = 5000;
const drawInterval = 100;

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
let mapFullScreen = false;
let timer1 = null;
let timer2 = null;
let animationFrame = null;
let mapElement = null;
let mapWrapperElement = null;

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

export function init() {
  createMap();
  createMarkerLayer();
  createThreeLayer();

  stats = new Stats();
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  initInfoWindow();
  mapElement = document.getElementById('map');
  mapWrapperElement = document.getElementsByClassName('map-wrapper')[0];
  mapElement.appendChild(stats.dom);
  canvasElem = mapElement.querySelector('canvas');

  document.getElementById('full-screen-img').onclick = fullScreen;

  updateStats();
  initFetchObjects();
  createPolygon(polygonArr);

  window.addEventListener("resize", windowOnResize);

  timer1 = setInterval(() => {
    updateCoordsFromServer();
  }, updatedInterval);

  timer2 = setInterval(() => {
    updateCoordsForRedraw();
  }, drawInterval);
};

export function destroy() {
  clearInterval(timer1);
  clearInterval(timer2);
  cancelAnimationFrame(animationFrame);
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
  mapFullScreen = false;
  timer1 = null;
  timer2 = null;
  animationFrame = null;
  mapElement = null;
  mapWrapperElement = null;
};

function windowOnResize(event) {
  if (mapFullScreen === false) {
    return;
  }

  const e = document.documentElement;
  const g = document.getElementsByTagName('body')[0];
  const x = window.innerWidth || e.clientWidth || g.clientWidth;
  const y = window.innerHeight || e.clientHeight || g.clientHeight;
  mapWrapperElement.style.width = x + 'px';
  mapWrapperElement.style.height = y + 'px';
  mapWrapperElement.style.height = y + 'px';
}

function fullScreen(event) {
  const e = document.documentElement;
  const g = document.getElementsByTagName('body')[0];
  const x = window.innerWidth || e.clientWidth || g.clientWidth;
  const y = window.innerHeight || e.clientHeight || g.clientHeight;

  if (mapFullScreen === false) {
    document.body.style.overflow = 'hidden';
    mapWrapperElement.style.position = 'fixed';
    mapWrapperElement.style.width = x + 'px';
    mapWrapperElement.style.height = y + 'px';
    mapWrapperElement.style.zIndex = '10000000';
    mapElement.style.height = y + 'px';
    mapFullScreen = true;
  } else {
    document.body.style.overflow = '';
    mapWrapperElement.style.position = 'relative';
    mapWrapperElement.style.width = '';
    mapWrapperElement.style.height = '';
    mapWrapperElement.style.zIndex = '';
    mapWrapperElement.style.height = '';
    mapElement.style.height = '';
    mapFullScreen = false;
  }
}

function initInfoWindow() {
  infoWindow.infoElem = document.getElementById('info');
  infoWindow.coordX = infoWindow.infoElem.querySelector('.coords-x');
  infoWindow.coordY = infoWindow.infoElem.querySelector('.coords-y');
  infoWindow.name = infoWindow.infoElem.querySelector('.name');
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
        // y: objectsArr[i].coords.y - 0,
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
        objectsArr[j].rotationZ = Math.atan2(res[i].coords.y - objectsArr[j].prevCoords.y, -(res[i].coords.x - objectsArr[j].prevCoords.x));
        objectsArr[j].model.rotation.z = objectsArr[j].rotationZ;
      }
    }
  }
}

function updateStats() {
  animationFrame = requestAnimationFrame(updateStats);
  stats.update();
};

function initFetchObjects() {
  for (let i = 0; i < 5; i++) {
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
      // loaderPath: 'https://gitlab.com/omelyushko.igor/tractor/tree/master/43-tractor/', 
      modelMtl: 'Tractor.mtl',
      modelObj: 'Tractor.obj',
    };

    newObj.prevCoords = {};
    newObj.prevCoords.x = newObj.coords.x;
    newObj.prevCoords.y = newObj.coords.y;
    objectsArr.push(newObj);
  }

  for (let i = 0; i < objectsArr.length; i++) {
    createMarker(objectsArr[i]);
  };

  for (let i = 0; i < objectsArr.length; i++) {
    // setTimeout(() => {
    //   loadObjectModel(objectsArr[i]);
    // }, i * 1500)
    loadObjectModel(objectsArr[i]);
  };
}

function createMap() {
  map = new maptalks.Map("map", {
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
      'urlTemplate': 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      'subdomains': ['a', 'b', 'c', 'd']
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
        showInformation(selectedObject);
        return;
      }
    }
  });
}

function createMarker(obj) {
  const coords = new maptalks.Coordinate(obj.coords.x, obj.coords.y)
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
        'textName': obj.name,
        'textSize': 16,
        'textDy': 10,
      }
    ]
  });

  obj.marker = marker;
  obj.marker.parent = obj;
  markerLayer.addGeometry(obj.marker);
  changeVisible(obj, map.getZoom());

  marker.on('click', (e) => {
    selectedObject = e.target.parent;
    showInformation(selectedObject);
  });

  marker.on('mouseenter', function (e) {
    marker.updateSymbol({
      'markerWidth': 28 + 5,
      'markerHeight': 40 + 5,
    });
  });

  marker.on('mouseout', function (e) {
    marker.updateSymbol({
      'markerWidth': 28,
      'markerHeight': 40,
    });
  });
};

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
      document.getElementById('area-info').innerHTML = e.target.options.customName;
      document.getElementById('area-info').style.display = 'block';
    });

    polygon.on('mouseenter', function (e) {
      e.target.setSymbol(hoverSymbol);
    });

    polygon.on('mouseout', function (e) {
      e.target.setSymbol(initialSymbol);
    });

    markerLayer.addGeometry(polygon);
  };

}

function createMarkerLayer() {
  markerLayer = new maptalks.VectorLayer('markerLayer');
  markerLayer.addTo(map);
};

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

  mtlLoader.setPath(obj.loaderPath);
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

      changeVisible(obj, map.getZoom());
      console.log(scene); // ??
      scene.add(object);
      threeLayer.renderScene();
    });
  });
};

function createThreeLayer() {
  THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
  threeLayer = new maptalks.ThreeLayer('threeLayer');
  threeLayer.prepareToDraw = function (gl, localScene, camera) {
    scene = localScene;
    scene.add(new THREE.AmbientLight(0xffffff, 1));
  };
  threeLayer.addTo(map);
};

function customRedraw() {
  // console.log('CUSTOM REDRAW');
  // threeLayer.renderScene(); // not remove prev textures
  // map.panBy([0, 0]);   // map.panTo(coordinate); not always work
  map.setCenter(new maptalks.Coordinate(map.getCenter()));
};

function updateCoordsForRedraw() {
  for (let i = 0; i < objectsArr.length; i++) { // todo
    updateCoordsForDraw(objectsArr[i]);
  }

  showInformation(selectedObject);
  customRedraw();
  // if (map.getZoom() < zoomWhenChangeVisible + 0.2 || map.getZoom() < zoomWhenChangeVisible - 0.2) {
  //   customRedraw();
  // }
};

function updateCoordsForDraw(obj) { // todo
  if (obj == null || obj.model == null || obj.marker == null) {
    return;
  }
  obj.coords.x += obj.speedX; // geographical coordinates
  obj.coords.y += obj.speedY; // geographical coordinates

  obj.marker.setCoordinates(new maptalks.Coordinate(obj.coords)); // geographical coordinates

  const v = threeLayer.coordinateToVector3(obj.coords);
  obj.model.position.x = v.x;
  obj.model.position.y = v.y;
  obj.model.position.z = v.z;
  // globalObject.translateZ(0.0000000001);
};

function selectObjects() {
  setCanvasCursor('inherit');

  for (let i = 0; i < objectsArr.length; i++) {
    if (selectObject(objectsArr[i]) === true) {
      setCanvasCursor('pointer');
      return;
    }
  }
};

function selectObject(obj) {
  if (obj.model == null || obj.model.visible === false) {
    obj.mouseUnder = false;
    return false;
  }

  var objects = [];

  obj.model.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      objects.push(child);
    }
  });

  raycaster.setFromCamera(mouse, threeLayer.getCamera());
  var intersects = raycaster.intersectObjects(objects);

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

};

function setCanvasCursor(cursor) {
  canvasElem.style.cursor = cursor;
};

function changeVisible(obj, zoom) {
  if (zoom < zoomWhenChangeVisible + 0.2 || zoom < zoomWhenChangeVisible - 0.2) {
    if (obj.model) {
      obj.model.visible = false;
    }
    if (obj.marker) {
      obj.marker.options.visible = true;
    }
  } else {
    if (obj.model) {
      obj.model.visible = true;
    }
    if (obj.marker) {
      obj.marker.options.visible = false;
    }
  }
};

function showInformation(obj) {
  if (obj == null) {
    return;
  }

  infoWindow.infoElem.style.display = 'block';
  infoWindow.coordX.innerHTML = 'X = ' + obj.coords.x.toFixed(8);
  infoWindow.coordY.innerHTML = 'Y = ' + obj.coords.y.toFixed(8);
  infoWindow.name.innerHTML = obj.name;
};

function deltaToScale(delta) {
  let res = 1;
  for (let i = 1; i < delta; i++) {
    res = 2 * res;
  }
  return res;
};

function linearInterpolation(y0, y1, x0, x1, x) {
  if (Math.abs(x1 - x0) < 0.000000000001) {
    return y0;
  }

  return y0 + ((y1 - y0) / (x1 - x0)) * (x - x0);
};

function calcScale(mapZoom) {
  let delta = 0;
  let result = 1;
  if (mapZoom === initZoom) {
    return 1;
  } else if (mapZoom > initZoom) {
    delta = mapZoom - initZoom + 1;
    return 1 / deltaToScale(delta);
  } else {
    delta = initZoom - mapZoom + 1;
    return deltaToScale(delta);
  }
};

function calcInterpolationScale(mapZoom) {
  const x0 = Math.floor(mapZoom);
  const x1 = Math.ceil(mapZoom);
  const y0 = calcScale(x0);
  const y1 = calcScale(x1);
  return linearInterpolation(y0, y1, x0, x1, mapZoom);
};
