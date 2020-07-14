import React, { useRef, useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import { Vector3, Color } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


function randBetween(lo: number, hi: number): number {
  const range = hi - lo + 1;
  return Math.floor(Math.random() * range) + lo;
}

function randChoose<T>(options: Array<T>): T {
  const list = [...options];
  return list[Math.floor(Math.random() * list.length)];
}

// function generateDuckScene() {
//   const geometry = new THREE.Geometry()
//   function addCube(pos: THREE.Vector3, { top = new THREE.Color("rgb(255,255,255)"), left = new THREE.Color("rgb(169, 169, 169)"), right = new THREE.Color("rgb(90,0,90)"), top2 }: Partial<Record<"top" | "left" | "right" | "top2", THREE.Color>>) {
//     const size = .5;
//     const index = geometry.vertices.length;
//     const vertices = [pos]
//       .flatMap(p => [new THREE.Vector3(size, 0, 0).add(p), new THREE.Vector3(-size, 0, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, size, 0).add(p), new THREE.Vector3(0, -size, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, 0, size).add(p), new THREE.Vector3(0, 0, -size).add(p)])





//     const faces = [
//       // top face
//       new THREE.Face3(index + 4, index + 1, index + 5, undefined, top),
//       new THREE.Face3(index + 4, index, index + 1, undefined, top2 || top),


//       // right face
//       new THREE.Face3(index + 4, index + 2, index, undefined, right),
//       new THREE.Face3(index + 4, index + 6, index + 2, undefined, right),

//       // left face
//       new THREE.Face3(index + 4, index + 7, index + 6, undefined, left),
//       new THREE.Face3(index + 4, index + 5, index + 7, undefined, left),
//     ]

//     geometry.vertices.push(...vertices);
//     geometry.faces.push(...faces);

//   }

//   function addDuckBox(pos: THREE.Vector3, { box = new THREE.Color("rgb(255,255,255)"), bottom = new THREE.Color("rgb(255, 255, 255") }) {
//     const size = 8;
//     const index = geometry.vertices.length;
//     const vertices = [pos]
//       .flatMap(p => [new THREE.Vector3(size, 0, 0).add(p), new THREE.Vector3(-size, 0, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, size, 0).add(p), new THREE.Vector3(0, -size, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, 0, size).add(p), new THREE.Vector3(0, 0, -size).add(p)])





//     const faces = [
//       // top face
//       new THREE.Face3(index + 4, index + 1, index + 5, undefined, box),
//       new THREE.Face3(index + 4, index, index + 1, undefined, box),

//       // bottom face
//       new THREE.Face3(index + 3, index + 6, index + 2, undefined, bottom),
//       new THREE.Face3(index + 3, index + 7, index + 6, undefined, bottom),

//       // back right face
//       new THREE.Face3(index + 3, index + 7, index + 5, undefined, box),
//       new THREE.Face3(index + 3, index + 5, index + 1, undefined, box),

//       // back left face
//       new THREE.Face3(index + 3, index, index + 1, undefined, box),
//       new THREE.Face3(index + 3, index + 2, index + 0, undefined, box),



//       // left face
//       new THREE.Face3(index + 4, index + 7, index + 6, undefined, box),
//       new THREE.Face3(index + 4, index + 5, index + 7, undefined, box),
//     ]

//     geometry.vertices.push(...vertices);
//     geometry.faces.push(...faces);

//   }

//   // ground
//   for (let x = -40; x <= 25; x++) {
//     for (let z = -25; z <= 45; z++) {
//       const genColor = () => {
//         const rr = randBetween(5, 15)
//         const rg = randBetween(100, 110)
//         const rb = randBetween(10, 20)
//         return "rgb(" + rr + ", " + rg + ", " + rb + ")"
//       }
//       const color = genColor()
//       addCube(new THREE.Vector3(x, 0, z), { top: new THREE.Color(color) });
//     }
//   }

//   addDuckBox(new THREE.Vector3(-4, 9, 8), { box: new THREE.Color(0x92672C), bottom: new THREE.Color(0x004400) })

//   geometry.computeFaceNormals()
//   const material = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true });
//   return new THREE.Mesh(geometry, material)

// }


// function petalGeometry() {
//   const geometry = new THREE.Geometry()
//   const size = .1;
//   const index = geometry.vertices.length;
//   const vertices = [new THREE.Vector3(0, 0, 0)]
//     .flatMap(p => [new THREE.Vector3(size, 0, 0).add(p), new THREE.Vector3(-size, 0, 0).add(p)])
//     .flatMap(p => [new THREE.Vector3(0, size, 0).add(p), new THREE.Vector3(0, -size, 0).add(p)])
//     .flatMap(p => [new THREE.Vector3(0, 0, size).add(p), new THREE.Vector3(0, 0, -size).add(p)])

//   const white = [new THREE.Color("#FFF"), new THREE.Color("#FFF"), new THREE.Color("#FFF")]
//   const faces = [
//     // top face
//     new THREE.Face3(index + 4, index + 1, index + 5, undefined, white),
//     new THREE.Face3(index + 4, index, index + 1, undefined, white),


//     // right face
//     new THREE.Face3(index + 4, index + 2, index, undefined, white),
//     new THREE.Face3(index + 4, index + 6, index + 2, undefined, white),

//     // left face
//     new THREE.Face3(index + 4, index + 7, index + 6, undefined, white),
//     new THREE.Face3(index + 4, index + 5, index + 7, undefined, white),
//   ]

//   geometry.vertices.push(...vertices);
//   geometry.faces.push(...faces);
//   geometry.computeFaceNormals()
//   return geometry
// }
// function generateFallingPetals() {
//   const geometry = petalGeometry()
//   // return new THREE.Mesh(geometry, material)

//   const petalGroup = new THREE.Group()
//   const petalMeshes: THREE.Mesh[] = []
//   for (let n = 0; n < 400; n++) {
//     let x = randBetween(-17, -3)
//     let z = randBetween(6, 22)

//     const treeTopHeight = randBetween(0, 8)
//     const pr = 255;
//     const pg = randBetween(150, 200);
//     const pb = randBetween(240, 250);
//     const pinkColor = "rgb(" + pr + ", " + pg + ", " + pb + ")"

//     const material = new THREE.MeshLambertMaterial({ color: pinkColor, vertexColors: true });
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.set(x, treeTopHeight, z);
//     petalGroup.add(mesh)
//     petalMeshes.push(mesh)
//   }
// }

// function generateFallingRain() {
//   function isRainInBox(p: THREE.Vector3) {
//     // box center is at -4, 9, 8, height is 8
//     const distance = Math.max(Math.abs(p.x + 4), Math.abs(p.y - 9), Math.abs(p.z - 8))
//     return distance <= 8
//   }
//   function generateRainDropCoords() {
//     // box center is at -4, 9, 8
//     // box is height 8
//     let x = randBetween(-27, 27)
//     let z = randBetween(-10, 30)

//     return { x, z }
//   }
//   const geometry = petalGeometry()
//   // return new THREE.Mesh(geometry, material)

//   const petalGroup = new THREE.Group()
//   const petalMeshes: THREE.Mesh[] = []
//   for (let n = 0; n < 400; n++) {
//     const { x, z } = generateRainDropCoords()


//     const treeTopHeight = randBetween(0, 60)
//     const br = 0;
//     const bg = randBetween(50, 60);
//     const bb = randBetween(240, 255);
//     const blueColor = "rgb(" + br + ", " + bg + ", " + bb + ")"

//     const material = new THREE.MeshLambertMaterial({ color: blueColor, vertexColors: true });
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.set(x, treeTopHeight, z);
//     petalGroup.add(mesh)
//     petalMeshes.push(mesh)
//   }




//   return {
//     group: petalGroup,
//     update: () => {
//       petalMeshes.forEach((m) => {

//         m.position.y -= .18
//         if (m.position.y < 0 || isRainInBox(m.position)) {
//           m.position.y = 60
//           m.position.x = randBetween(-27, 27)
//           m.position.z = randBetween(-10, 30)
//         }
//       })
//     }
//   }


// }

// function generateRiverScene() {
//   const geometry = new THREE.Geometry()
//   function addCube(pos: THREE.Vector3, { top = new THREE.Color("rgb(255,255,255)"), left = new THREE.Color("rgb(169, 169, 169)"), right = new THREE.Color("rgb(90,0,90)"), top2 }: Partial<Record<"top" | "left" | "right" | "top2", THREE.Color>>) {
//     const size = .5;
//     const index = geometry.vertices.length;
//     const vertices = [pos]
//       .flatMap(p => [new THREE.Vector3(size, 0, 0).add(p), new THREE.Vector3(-size, 0, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, size, 0).add(p), new THREE.Vector3(0, -size, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, 0, size).add(p), new THREE.Vector3(0, 0, -size).add(p)])





//     const faces = [
//       // top face
//       new THREE.Face3(index + 4, index + 1, index + 5, undefined, top),
//       new THREE.Face3(index + 4, index, index + 1, undefined, top2 || top),

//       // bottom face
//       new THREE.Face3(index + 3, index + 2, index + 6, undefined, top),
//       new THREE.Face3(index + 3, index + 6, index + 7, undefined, top2 || top),

//       // back right face
//       new THREE.Face3(index + 3, index + 7, index + 5, undefined, top),
//       new THREE.Face3(index + 3, index + 5, index + 1, undefined, top2 || top),

//       // back left face
//       new THREE.Face3(index + 3, index + 1, index, undefined, top),
//       new THREE.Face3(index + 3, index + 0, index + 2, undefined, top2 || top),

//       // right face
//       new THREE.Face3(index + 4, index + 2, index, undefined, right),
//       new THREE.Face3(index + 4, index + 6, index + 2, undefined, right),

//       // left face
//       new THREE.Face3(index + 4, index + 7, index + 6, undefined, left),
//       new THREE.Face3(index + 4, index + 5, index + 7, undefined, left),
//     ]

//     geometry.vertices.push(...vertices);
//     geometry.faces.push(...faces);

//   }

//   // ground
//   for (let x = -35; x <= 40; x++) {
//     for (let z = -25; z <= 40; z++) {
//       const rr = randBetween(50, 80)
//       const rg = randBetween(50, 90)
//       const rb = randBetween(210, 225)
//       const color = "rgb(" + rr + ", " + rg + ", " + rb + ")"

//       addCube(new THREE.Vector3(x, 0, z), { top: new THREE.Color(color) });
//     }
//   }

//   // corals
//   const colors = ['#F56853', '#FF575F', '#FA57FF', '#C453F5', '#E85BA8', '#AA20F6', '#D9F620', '#31A7D6', '#20F692']
//   const dirs = [0, 0, 0, 0, 0, 1, -1]
//   const ydirs = [0, -1, 1, 1, 1]
//   let corals: [number, number][] = []
//   while (corals.length < 45) {
//     let x = randBetween(-15, 0)
//     let z = randBetween(-5, 35)
//     if (corals.find(([cx, cz]) => x == cx && z == cz)) {
//       continue
//     } else {
//       corals.push([x, z]);
//       // draw coral at this location
//     const color = randChoose(colors)
//     for (let y = 1; y <= 8 || y < -1; y += 0) {
//       if (y > 0) {
//         addCube(new THREE.Vector3(x, y, z), { top: new THREE.Color(color), right: new THREE.Color(color), left: new THREE.Color(color) })
//       }
//       x += randChoose(dirs)
//       z += randChoose(dirs)
//       y += randChoose(ydirs)
//     }
//   }
// }


//   geometry.computeFaceNormals()
//   const material = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true });
//   return new THREE.Mesh(geometry, material)

// }
// function generateForestScene() {
//   const geometry = new THREE.Geometry()
//   function addCube(pos: THREE.Vector3, { top = new THREE.Color("rgb(255,255,255)"), left = new THREE.Color("rgb(169, 169, 169)"), right = new THREE.Color("rgb(90,0,90)"), top2 }: Partial<Record<"top" | "left" | "right" | "top2", THREE.Color>>) {
//     const size = .5;
//     const index = geometry.vertices.length;
//     const vertices = [pos]
//       .flatMap(p => [new THREE.Vector3(size, 0, 0).add(p), new THREE.Vector3(-size, 0, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, size, 0).add(p), new THREE.Vector3(0, -size, 0).add(p)])
//       .flatMap(p => [new THREE.Vector3(0, 0, size).add(p), new THREE.Vector3(0, 0, -size).add(p)])





//     const faces = [
//       // top face
//       new THREE.Face3(index + 4, index + 1, index + 5, undefined, top),
//       new THREE.Face3(index + 4, index, index + 1, undefined, top2 || top),


//       // right face
//       new THREE.Face3(index + 4, index + 2, index, undefined, right),
//       new THREE.Face3(index + 4, index + 6, index + 2, undefined, right),

//       // left face
//       new THREE.Face3(index + 4, index + 7, index + 6, undefined, left),
//       new THREE.Face3(index + 4, index + 5, index + 7, undefined, left),
//     ]

//     geometry.vertices.push(...vertices);
//     geometry.faces.push(...faces);

//   }


//   // ground
//   for (let x = -40; x <= 25; x++) {
//     for (let z = -25; z <= 45; z++) {
//       const genColor = (x: number, z: number) => {
//         const randomPink = randBetween(0, 80)
//         if (x > -18 && x < 1 && z > 2 && z < 22 && randomPink < 40) {
//           const rr = 245;
//           const rg = randBetween(120, 160);
//           const rb = randBetween(200, 230);
//           return "rgb(" + rr + ", " + rg + ", " + rb + ")"
//         } else {
//           const rr = randBetween(190, 210)
//           const rg = randBetween(235, 255)
//           const rb = randBetween(215, 225)
//           return "rgb(" + rr + ", " + rg + ", " + rb + ")"
//         }
//       }
//       const color = genColor(x, z)
//       addCube(new THREE.Vector3(x, 0, z), { top: new THREE.Color(color) });
//     }
//   }
//   // tree stumps
//   for (let x = -15; x <= -4; x++) {
//     for (let z = 7; z <= 20; z++) {
//       const randomTree = randBetween(0, 90);
//       if (randomTree < 12) {
//         // draw tree
//         const treeHeight = randBetween(5, 7)
//         for (let y = 0; y <= treeHeight; y++) {
//           const sr = randBetween(180, 215);
//           const sg = randBetween(180, 215);
//           const sb = randBetween(210, 215);
//           const sideColor = "rgb(" + sr + ", " + sg + ", " + sb + ")"
//           const tr = 255
//           const tg = randBetween(150, 200);
//           const tb = randBetween(240, 250);
//           const topColor = "rgb(" + tr + ", " + tg + ", " + tb + ")"
//           addCube(new THREE.Vector3(x, y, z), { top: new THREE.Color(topColor), left: new THREE.Color(sideColor), right: new THREE.Color(sideColor) });
//         }
//       }
//     }
//   }
//   for (let x = -17; x <= -3; x++) {
//     for (let z = 6; z <= 22; z++) {
//       const randomTree = randBetween(0, 90);

//       // draw treetops
//       if (randomTree > 12 && randomTree < 60) {
//         const treeTopHeight = randBetween(7, 8)
//         const pr = 255;
//         const pg = randBetween(150, 200);
//         const pb = randBetween(240, 250);
//         const pinkColor = "rgb(" + pr + ", " + pg + ", " + pb + ")"
//         addCube(new THREE.Vector3(x, treeTopHeight, z), { top: new THREE.Color(pinkColor), left: new THREE.Color(pinkColor), right: new THREE.Color(pinkColor) });
//       }
//     }

//   }

//   geometry.computeFaceNormals()
//   const material = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true });
//   return new THREE.Mesh(geometry, material)

// }

function generateScene() {

  const geometry = new THREE.Geometry()
  function addCube(pos: THREE.Vector3, { top = new THREE.Color("rgb(255,255,255)"), left = new THREE.Color("rgb(169, 169, 169)"), right = new THREE.Color("rgb(90,0,90)"), top2 }: Partial<Record<"top" | "left" | "right" | "top2", THREE.Color>>) {
    const size = .5;
    const index = geometry.vertices.length;
    const vertices = [pos]
      .flatMap(p => [new THREE.Vector3(size, 0, 0).add(p), new THREE.Vector3(-size, 0, 0).add(p)])
      .flatMap(p => [new THREE.Vector3(0, size, 0).add(p), new THREE.Vector3(0, -size, 0).add(p)])
      .flatMap(p => [new THREE.Vector3(0, 0, size).add(p), new THREE.Vector3(0, 0, -size).add(p)])





    const faces = [
      // top face
      new THREE.Face3(index + 4, index + 1, index + 5, undefined, top),
      new THREE.Face3(index + 4, index, index + 1, undefined, top2 || top),


      // right face
      new THREE.Face3(index + 4, index + 2, index, undefined, right),
      new THREE.Face3(index + 4, index + 6, index + 2, undefined, right),

      // left face
      new THREE.Face3(index + 4, index + 7, index + 6, undefined, left),
      new THREE.Face3(index + 4, index + 5, index + 7, undefined, left),
    ]

    geometry.vertices.push(...vertices);
    geometry.faces.push(...faces);

  }


  for (let x = -35; x <= 30; x++) {
    for (let z = -25; z <= 50; z++) {
      const rr = randBetween(210, 225)
      const rg = randBetween(210, 225)
      const rb = randBetween(210, 225)
      const color = "rgb(" + rr + ", " + rg + ", " + rb + ")"

      addCube(new THREE.Vector3(x, 0, z), { top: new THREE.Color(color) });
    }
  }

  for (let i = 0; i < 100; i++) {
    const cx = randBetween(-30, 30);
    const cz = randBetween(-30, 30);
    const size = randChoose([1, 1, 1, 1, 1, 3]);
    for (let x = cx - size; x <= cx + size; x++) {
      for (let z = cz - size; z <= cz + size; z++) {
        for (let y = 1; y <= 2 * size + 1; y++) {
          if (((x <= 3 && x >= -4) || (x === cx || z === cz)) && y < size + 1) {
            continue;
          }
          const rr = randBetween(230, 245) + y
          const rg = randBetween(230, 245) + y
          const rb = randBetween(230, 245) + y
          const color = "rgb(" + rr + ", " + rg + ", " + rb + ")"

          const purpler = randBetween(100, 135)
          const purpleg = randBetween(0, 10)
          const purpleb = randBetween(100, 115)
          const purpleColor = "rgb(" + purpler + ", " + purpleg + ", " + purpleb + ")"

          const greyr = randBetween(25, 35)
          const greyg = randBetween(20, 35)
          const greyb = randBetween(25, 40)
          const greyColor = "rgb(" + greyr + ", " + greyg + ", " + greyb + ")"


          const top2r = randBetween(230, 245) + y
          const top2g = randBetween(230, 245) + y
          const top2b = randBetween(230, 245) + y
          const top2Color = "rgb(" + top2r + ", " + top2g + ", " + top2b + ")"

          addCube(new THREE.Vector3(x, y, z), { left: new THREE.Color(greyColor), right: new THREE.Color(purpleColor), top: new THREE.Color(color), top2: new THREE.Color(top2Color) });
        }
      }
    }
  }

  for (let x = -4; x <= 4; x += 1) {
    for (let z = -40; z <= 40; z++) {
      for (let y = -20; y <= 0; y++) {
        const greyr = randBetween(70, 85)
        const greyg = randBetween(65, 80)
        const greyb = randBetween(75, 90)
        const greyColor = "rgb(" + greyr + ", " + greyg + ", " + greyb + ")"
        addCube(new THREE.Vector3(x, y, z), { top: new THREE.Color(greyColor) });
      }
    }
  }
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true });
  return new THREE.Mesh(geometry, material)

}

async function draw(container: HTMLElement) {


  var scene = new THREE.Scene();
  // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var camera = new THREE.OrthographicCamera(-10 * window.innerWidth / window.innerHeight, 10 * window.innerWidth / window.innerHeight, 10, -10, 0.1, 1000);

  var light = new THREE.AmbientLight(new Color("#888"))
  var dirLight = new THREE.DirectionalLight(new Color("#AAA"))
  dirLight.position.set(45, 80, 60)
  dirLight.castShadow = true
  scene.add(light, dirLight)
  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  dirLight.shadow.mapSize.width = 2048;  // default
  dirLight.shadow.mapSize.height = 2048; // default
  dirLight.shadow.camera.near = 45;    // default
  dirLight.shadow.camera.far = 200;     // default
  dirLight.shadow.camera.left = -100;
  dirLight.shadow.camera.right = 100;
  dirLight.shadow.camera.top = 100;
  dirLight.shadow.camera.bottom = -100;




  camera.position.x = -18
  camera.position.y = 18
  camera.position.z = 25;
  camera.rotateOnAxis(new Vector3(0, 1, 0), -Math.PI / 4)
  camera.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 4)






  // load ghost and dog
  const ghostguy = await new Promise<THREE.Group>((resolve) => {
    const ghost_loader = new OBJLoader()
    ghost_loader.load('/ghost.obj', resolve);
  })

  const doggo = await new Promise<THREE.Group>((resolve) => {
    const dog_loader = new OBJLoader()
    dog_loader.load('/doggo.obj', resolve);
  })

  // // load ducky
  // const ducky = await new Promise<THREE.Group>((resolve) => {
  //   const ducky_loader = new OBJLoader()
  //   ducky_loader.load('/ducky.obj', resolve);
  // })


  // ducky.scale.x = 1.3
  // ducky.scale.y = 1.3
  // ducky.scale.z = 1.3
  // ducky.position.x = -4
  // ducky.position.z = 12
  // ducky.position.y = 4
  // ducky.rotateOnAxis(new THREE.Vector3(0, 1, 0), -.7)

  // ducky.traverse((obj) => {
  //   if (obj instanceof THREE.Mesh) {
  //     obj.geometry.computeVertexNormals();
  //     obj.material = new THREE.MeshToonMaterial({ color: new THREE.Color(0x20292f) })
  //   }
  // })

  let objectCount = 0
  ghostguy.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      objectCount += 1
      obj.geometry.computeVertexNormals();
      // Cylinder and Defaults
      obj.material = new THREE.MeshLambertMaterial({ color: new THREE.Color(0x550044) });
      if (objectCount === 3) {
        // Sheet
        obj.material = new THREE.MeshLambertMaterial({ color: new THREE.Color(0x550044) });
      }
      if (objectCount === 2) {
        // Sphere (eyes)
        obj.material = new THREE.MeshLambertMaterial({ color: new THREE.Color(0xFFFFFF) });
      }
    }
  })

  doggo.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.computeVertexNormals();
      obj.material = new THREE.MeshToonMaterial({ color: new THREE.Color(0xADA09C) })
    }
  })

  doggo.scale.x = 0.3
  doggo.scale.y = 0.3
  doggo.scale.z = 0.3

  // canyon scene
  let city = generateScene()
  scene.add(ghostguy)
  scene.add(doggo)
  scene.add(city)

  //forest scene
  //let forest = generateForestScene()
  //let { group: petalGroup, update: updatePetals } = generateFallingPetals()
  //scene.add(forest, petalGroup)

  // // river scene
  // let river = generateRiverScene()
  // river.castShadow = true
  // river.receiveShadow = true
  // scene.add(river)

  // // duck scene
  // let outside = generateDuckScene()
  // scene.add(outside)
  // scene.add(ducky)
  // let { group: petalGroup, update: updatePetals } = generateFallingRain()
  // scene.add(petalGroup)

  let t = 0
  let resets = 0
  let animationStop = false

  var animate = function () {
    requestAnimationFrame(animate);
    // // forest scene
    // updatePetals()
    // ducky.setRotationFromEuler(new THREE.Euler(0.04 * Math.cos(t * .8), -Math.PI / 4, 0.02 * Math.cos(t * .2)))
    // t += 0.05
    // canyon scene
    doggo.position.y = 4
    doggo.position.z = 7
    if (animationStop === true) {
      t += 0.05
      ghostguy.position.y = 4 + 0.4 * (Math.cos(t))
      ghostguy.setRotationFromEuler(new THREE.Euler(0, Math.PI - .65, 0))
      ghostguy.rotateOnAxis(new THREE.Vector3(1, 0, 0), .4)
      renderer.render(scene, camera);
      return
    }
    t += 0.1
    ghostguy.position.y = 4 + 0.4 * (Math.cos(t))
    ghostguy.position.z = t
    if (resets === 3 && t > 15) {
      animationStop = true
    }
    ghostguy.setRotationFromEuler(new THREE.Euler(0, Math.PI, 0.04 * Math.cos(t * .8)))
    doggo.setRotationFromEuler(new THREE.Euler(0, Math.PI, 0.04 * Math.cos(t * .8)))
    if (t > 40) {
      resets += 1
      t = 0
      scene.remove(city)
      city = generateScene()
      scene.add(city)
    }

    renderer.render(scene, camera);
  };

  animate();

}


function App() {
  const ref = useRef<HTMLDivElement>(null as any)
  useEffect(() => {
    draw(ref.current);
  }, [ref])
  return <div ref={ref} />
}

export default App;
