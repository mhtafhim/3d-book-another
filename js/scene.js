import * as THREE from 'three';

export function initScene() {
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);
    
    return { scene, camera };
}

export function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Enable shadows in the renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
}

export function createLighting(scene) {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1.0); // Soft ambient light
    scene.add(ambientLight);
    
    // Main point light with shadows
    const light = new THREE.PointLight(0xffffff, 300, 100); 
    light.position.set(10, 10, 10);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 50;
    scene.add(light);

    // Helper sphere to visualize light position
    const lightHelper = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    lightHelper.position.copy(light.position);
    scene.add(lightHelper);
    
    return { light, lightHelper };
}

export function createTable(scene) {
    // Table surface
    const tableGeometry = new THREE.PlaneGeometry(100, 100);
    const tableMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xaaaaaa,
        side: THREE.DoubleSide
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.rotation.x = -Math.PI / 2; // Rotate to lie flat
    table.position.y = -0.1; // Slightly below the book
    table.receiveShadow = true;
    scene.add(table);
    
    return table;
}