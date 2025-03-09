import * as THREE from 'three';
import { initScene, createRenderer } from './scene.js';
import { createBook } from './book.js';
import { setupControls } from './controls.js';
import { setupAnimation } from './animation.js';

// Initialize the scene, camera, and renderer
const { scene, camera } = initScene();
const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create the 3D book and add it to the scene
const { backCover, pages, frontCoverGroup, light, lightHelper, table } = createBook(scene);

// Setup animation variables and control handlers
const animationState = {
    time: 0,
    animateCover: true,
    animateCamera: true,
    animateLight: true,
    isCoverOpen: false
};

// Setup UI controls
const controls = setupControls(animationState, camera, frontCoverGroup, light, lightHelper);

// Setup and start the animation loop
setupAnimation(renderer, scene, camera, animationState, frontCoverGroup, light, lightHelper, controls);