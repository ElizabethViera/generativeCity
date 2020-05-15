import React, { useRef, useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import { Vector3 } from 'three';

function randBetween(lo: number, hi: number): number {
  const range = hi - lo + 1;
  return Math.floor(Math.random() * range) + lo;
}

function randChoose<T>(options: Array<T>): T {
  const list = [...options];
  return list[Math.floor(Math.random() * list.length)];
}

function draw(container: HTMLElement) {


  var scene = new THREE.Scene();
  // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var camera = new THREE.OrthographicCamera(-10 * window.innerWidth / window.innerHeight, 10 * window.innerWidth / window.innerHeight, 10, -10, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  var geometry = new THREE.Geometry();
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true });


  camera.position.x = -18
  camera.position.y = 18
  camera.position.z = 25;
  camera.rotateOnAxis(new Vector3(0, 1, 0), -Math.PI / 4)
  camera.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 4)


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


  // geometry.vertices = [new THREE.Vector3(-2, 3), new THREE.Vector3(2, -3), new THREE.Vector3(1, 2)]
  // geometry.faces = [new THREE.Face3(0, 1, 2)]

  for (let x = -35; x <= 30; x++) {
    for (let z = -25; z <= 35; z++) {
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
          if (x <= 3 && x >= -4 || (x === cx || z === cz) && y < size + 1) {
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

  scene.add(new THREE.Mesh(geometry, material))
  var animate = function () {
    requestAnimationFrame(animate);


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
