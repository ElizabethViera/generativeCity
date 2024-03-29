import React, { useRef, useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { Vector3, Color } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function randBetween(lo: number, hi: number): number {
  const range = hi - lo + 1;
  return Math.floor(Math.random() * range) + lo;
}

function randChoose<T>(options: Array<T>): T {
  const list = [...options];
  return list[Math.floor(Math.random() * list.length)];
}

function generateScene() {
  const geometry = new THREE.Geometry();
  function addCube(
    pos: THREE.Vector3,
    {
      top = new THREE.Color("rgb(255,255,255)"),
      left = new THREE.Color("rgb(169, 169, 169)"),
      right = new THREE.Color("rgb(90,0,90)"),
      top2,
    }: Partial<Record<"top" | "left" | "right" | "top2", THREE.Color>>
  ) {
    const size = 0.5;
    const index = geometry.vertices.length;
    const vertices = [pos]
      .flatMap((p) => [
        new THREE.Vector3(size, 0, 0).add(p),
        new THREE.Vector3(-size, 0, 0).add(p),
      ])
      .flatMap((p) => [
        new THREE.Vector3(0, size, 0).add(p),
        new THREE.Vector3(0, -size, 0).add(p),
      ])
      .flatMap((p) => [
        new THREE.Vector3(0, 0, size).add(p),
        new THREE.Vector3(0, 0, -size).add(p),
      ]);

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
    ];

    geometry.vertices.push(...vertices);
    geometry.faces.push(...faces);
  }

  // geometry.vertices = [new THREE.Vector3(-2, 3), new THREE.Vector3(2, -3), new THREE.Vector3(1, 2)]
  // geometry.faces = [new THREE.Face3(0, 1, 2)]

  for (let x = -35; x <= 30; x++) {
    for (let z = -25; z <= 35; z++) {
      const rr = randBetween(210, 225);
      const rg = randBetween(210, 225);
      const rb = randBetween(210, 225);
      const color = "rgb(" + rr + ", " + rg + ", " + rb + ")";

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
          if ((x <= 3 && x >= -4) || ((x === cx || z === cz) && y < size + 1)) {
            continue;
          }
          const rr = randBetween(230, 245) + y;
          const rg = randBetween(230, 245) + y;
          const rb = randBetween(230, 245) + y;
          const color = "rgb(" + rr + ", " + rg + ", " + rb + ")";

          const purpler = randBetween(100, 135);
          const purpleg = randBetween(0, 10);
          const purpleb = randBetween(100, 115);
          const purpleColor =
            "rgb(" + purpler + ", " + purpleg + ", " + purpleb + ")";

          const greyr = randBetween(25, 35);
          const greyg = randBetween(20, 35);
          const greyb = randBetween(25, 40);
          const greyColor = "rgb(" + greyr + ", " + greyg + ", " + greyb + ")";

          const top2r = randBetween(230, 245) + y;
          const top2g = randBetween(230, 245) + y;
          const top2b = randBetween(230, 245) + y;
          const top2Color = "rgb(" + top2r + ", " + top2g + ", " + top2b + ")";

          addCube(new THREE.Vector3(x, y, z), {
            left: new THREE.Color(greyColor),
            right: new THREE.Color(purpleColor),
            top: new THREE.Color(color),
            top2: new THREE.Color(top2Color),
          });
        }
      }
    }
  }

  for (let x = -4; x <= 4; x += 1) {
    for (let z = -40; z <= 40; z++) {
      for (let y = -20; y <= 0; y++) {
        const greyr = randBetween(70, 85);
        const greyg = randBetween(65, 80);
        const greyb = randBetween(75, 90);
        const greyColor = "rgb(" + greyr + ", " + greyg + ", " + greyb + ")";
        addCube(new THREE.Vector3(x, y, z), {
          top: new THREE.Color(greyColor),
        });
      }
    }
  }
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
  });
  return new THREE.Mesh(geometry, material);
}

async function draw(container: HTMLElement) {
  var scene = new THREE.Scene();
  // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var camera = new THREE.OrthographicCamera(
    (-10 * window.innerWidth) / window.innerHeight,
    (10 * window.innerWidth) / window.innerHeight,
    10,
    -10,
    0.1,
    1000
  );

  var light = new THREE.AmbientLight(new Color("#222"));
  var dirLight = new THREE.DirectionalLight(new Color("#FFF"));
  dirLight.position.set(0.5, 1, 1);
  scene.add(light, dirLight);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.x = -18;
  camera.position.y = 18;
  camera.position.z = 25;
  camera.rotateOnAxis(new Vector3(0, 1, 0), -Math.PI / 4);
  camera.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 4);

  const ghostguy = await new Promise<THREE.Group>((resolve) => {
    const ghost_loader = new OBJLoader();
    ghost_loader.load("/ghost.obj", resolve);
  });

  const doggo = await new Promise<THREE.Group>((resolve) => {
    const dog_loader = new OBJLoader();
    dog_loader.load("/doggo.obj", resolve);
  });

  let objectCount = 0;
  ghostguy.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      objectCount += 1;
      obj.geometry.computeVertexNormals();
      // Cylinder and Defaults
      obj.material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0x550044),
      });
      if (objectCount === 3) {
        // Sheet
        obj.material = new THREE.MeshLambertMaterial({
          color: new THREE.Color(0x550044),
        });
      }
      if (objectCount === 2) {
        // Sphere (eyes)
        obj.material = new THREE.MeshLambertMaterial({
          color: new THREE.Color(0xffffff),
        });
      }
    }
  });

  doggo.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.computeVertexNormals();
      obj.material = new THREE.MeshToonMaterial({
        color: new THREE.Color(0xd2b48c),
      });
    }
  });

  doggo.scale.x = 0.3;
  doggo.scale.y = 0.3;
  doggo.scale.z = 0.3;

  scene.add(ghostguy);
  scene.add(doggo);
  let city = generateScene();
  scene.add(city);

  let t = 0;
  let resets = 0;
  let animationStop = false;

  var animate = function () {
    requestAnimationFrame(animate);
    doggo.position.y = 4;
    doggo.position.z = 7;
    if (animationStop === true) {
      t += 0.05;
      ghostguy.position.y = 4 + 0.4 * Math.cos(t);
      ghostguy.setRotationFromEuler(new THREE.Euler(0, Math.PI - 0.65, 0));
      ghostguy.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.4);
      renderer.render(scene, camera);
      return;
    }
    t += 0.1;
    ghostguy.position.y = 4 + 0.4 * Math.cos(t);
    ghostguy.position.z = t;
    if (resets === 3 && t > 15) {
      animationStop = true;
    }
    ghostguy.setRotationFromEuler(
      new THREE.Euler(0, Math.PI, 0.04 * Math.cos(t * 0.8))
    );
    doggo.setRotationFromEuler(
      new THREE.Euler(0, Math.PI, 0.04 * Math.cos(t * 0.8))
    );
    if (t > 40) {
      resets += 1;
      t = 0;
      scene.remove(city);
      city = generateScene();
      scene.add(city);
    }

    renderer.render(scene, camera);
  };

  animate();
}

function App() {
  const ref = useRef<HTMLDivElement>(null as any);
  useEffect(() => {
    draw(ref.current);
  }, [ref]);
  return <div ref={ref} />;
}

export default App;
