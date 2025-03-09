import * as THREE from 'three';
import { createBookTextures } from './textures.js';
import { createLighting, createTable } from './scene.js';

export function createBook(scene) {
    // Get book materials
    const {
        coverMaterial,
        insideCoverMaterial,
        backCoverMaterial,
        pageMaterial,
        pageEdgesMaterial,
        sideMaterial
    } = createBookTextures();

    // Book dimensions
    const coverThickness = 0.2;
    const pagesThickness = 4.6;
    const bookWidth = 20;
    const bookHeight = 30;

    // Back cover
    const backCoverGeometry = new THREE.BoxGeometry(bookWidth, coverThickness, bookHeight);
    const backCoverMaterials = [
        sideMaterial,        // +x face
        sideMaterial,        // -x face (spine)
        insideCoverMaterial, // +y face (inside)
        backCoverMaterial,   // -y face (outside)
        sideMaterial,        // +z face
        sideMaterial         // -z face
    ];
    const backCover = new THREE.Mesh(backCoverGeometry, backCoverMaterials);
    backCover.position.set(0, coverThickness / 2, 0);
    backCover.castShadow = true;
    backCover.receiveShadow = true;
    scene.add(backCover);

    // Pages
    const pagesGeometry = new THREE.BoxGeometry(bookWidth, pagesThickness, bookHeight);
    const pagesMaterials = [
        pageEdgesMaterial, // +x face
        sideMaterial,      // -x face (spine)
        pageMaterial,      // +y face (top page)
        sideMaterial,      // -y face
        pageEdgesMaterial, // +z face
        pageEdgesMaterial  // -z face
    ];
    const pages = new THREE.Mesh(pagesGeometry, pagesMaterials);
    pages.position.set(0, coverThickness + pagesThickness / 2, 0);
    pages.castShadow = true;
    pages.receiveShadow = true;
    scene.add(pages);

    // Front cover with rotation group
    const frontCoverGroup = new THREE.Group();
    frontCoverGroup.position.set(-bookWidth / 2, coverThickness + pagesThickness, 0);
    const frontCoverGeometry = new THREE.BoxGeometry(bookWidth, coverThickness, bookHeight);
    const frontCoverMaterials = [
        sideMaterial,        // +x face
        sideMaterial,        // -x face
        coverMaterial,       // +y face (outside)
        insideCoverMaterial, // -y face (inside)
        sideMaterial,        // +z face
        sideMaterial         // -z face
    ];
    const frontCover = new THREE.Mesh(frontCoverGeometry, frontCoverMaterials);
    frontCover.position.set(bookWidth / 2, coverThickness / 2, 0); // Offset from group pivot
    frontCover.castShadow = true;
    frontCover.receiveShadow = true;
    frontCoverGroup.add(frontCover);
    scene.add(frontCoverGroup);

    // Add lighting and table
    const { light, lightHelper } = createLighting(scene);
    const table = createTable(scene);

    return {
        backCover,
        pages,
        frontCoverGroup,
        light,
        lightHelper,
        table
    };
}