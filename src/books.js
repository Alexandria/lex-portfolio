import * as THREE from "three";
import { DragControls } from "three/addons/controls/DragControls.js";

/**
 * Create the scene and renderer
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * Light
 */

const ambientLight = new THREE.AmbientLight("#E5E5E5");
scene.add(ambientLight);

const light = new THREE.DirectionalLight("#CBC2FF", 0.6);
scene.add(light);

const loader = new THREE.TextureLoader();
const urls = [
  "src/images/edge.jpg",
  "src/images/bookSpine.webp",
  "src/images/edge.jpg",
  "src/images/edge.jpg",
  "src/images/bookCover.jpg",
  "src/images/bookCover.jpg",
];

/**
 * Create the 3D book materials
 */
const geometry = new THREE.BoxGeometry(1.5, 2, 0.2);
const materials = urls.map((url) => {
  return new THREE.MeshBasicMaterial({ map: loader.load(url) });
});
const material2 = new THREE.MeshToonMaterial({ color: "#e042f5" });
const material3 = new THREE.MeshBasicMaterial({ color: "#7542f5" });
const material4 = new THREE.MeshBasicMaterial({ color: "#42c5f5" });

const cube = new THREE.Mesh(geometry, materials);
const book2 = new THREE.Mesh(geometry, material2);
const book3 = new THREE.Mesh(geometry, materials);
const book4 = new THREE.Mesh(geometry, material4);
cube.position.x = -6;
book2.position.x = -3;
book3.position.x = 0;
book4.position.x = 3;

scene.add(cube);
scene.add(book2);
scene.add(book3);
scene.add(book4);

camera.position.z = 5;

const controls = new DragControls(
  [cube, book2, book3, book4],
  camera,
  renderer.domElement
);
controls.mode = "rotate";
controls.rotateSpeed = 7;

/**
 * Event Listener for drag drop controls
 */

export const animateBook = () => {
  requestAnimationFrame(animateBook);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animateBook();
