import * as THREE from 'three';

// Function to create realistic book cover texture
export function createCoverTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Background gradient - reddish leather texture
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#8B2323');  // dark red
    gradient.addColorStop(1, '#A52A2A');  // brown red
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add leather texture pattern
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 5 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add embossed border
    ctx.strokeStyle = 'rgba(255,215,0,0.7)'; // Gold color
    ctx.lineWidth = 15;
    ctx.strokeRect(30, 30, 452, 452);
    
    // Add title text
    ctx.fillStyle = 'rgba(255,215,0,0.9)'; // Gold color
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('a Introvert Guy', 256, 160);
    
    // Add author text
    ctx.font = 'italic 32px serif';
    ctx.fillText('by Mahmudul Haque', 256, 240);
    
    // Add embossed design
    ctx.fillStyle = 'rgba(255,215,0,0.6)';
    ctx.beginPath();
    ctx.arc(256, 350, 60, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas;
}

// Function to create inside cover texture
export function createInsideCoverTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Light paper texture
    ctx.fillStyle = '#F5F5DC'; // Beige
    ctx.fillRect(0, 0, 512, 512);
    
    // Add subtle paper grain
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 1, 1);
    }
    
    // Add handwritten notes
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = 'italic 20px cursive';
    ctx.textAlign = 'left';
    ctx.fillText('To my dearest friend,', 70, 120);
    ctx.fillText('May this book bring you joy...', 90, 160);
    ctx.fillText('Best wishes,', 100, 320);
    ctx.fillText('- The Author', 120, 350);
    
    return canvas;
}

export function createFrontPageTexture(imagePath) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
        imagePath,
        () => { console.log('Front page texture loaded successfully.'); },
        undefined,
        (err) => { console.error('Error loading front page texture:', err); }
    );
    return texture;
}

// Function to create page texture with text content
export function createPageTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Cream colored paper
    ctx.fillStyle = '#FFFAF0'; // Floral white
    ctx.fillRect(0, 0, 512, 512);
    
    // Add subtle paper texture
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 1, 1);
    }
    
    // Add page header
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Chapter 1', 256, 60);
    
    // Add page content - paragraph text
    ctx.font = '16px serif';
    ctx.textAlign = 'left';
    const lines = [
        "It was a dark and stormy night; the rain",
        "fell in torrents — except at occasional",
        "intervals, when it was checked by a violent",
        "gust of wind which swept up the streets,",
        "rattling along the housetops, and fiercely",
        "agitating the scanty flame of the lamps",
        "that struggled against the darkness.",
        "",
        "The man walked slowly down the empty",
        "street, his footsteps echoing in the silence.",
        "He paused briefly, looking over his shoulder",
        "as if expecting someone to emerge from the",
        "shadows that gathered at every corner."
    ];
    
    lines.forEach((line, index) => {
        ctx.fillText(line, 50, 120 + (index * 24));
    });
    
    // Add page number
    ctx.font = 'italic 14px serif';
    ctx.textAlign = 'center';
    ctx.fillText('1', 256, 460);
    
    return canvas;
}

// Function to create page edges texture
export function createPageEdgesTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base color - slightly off-white
    ctx.fillStyle = '#F8F8F0';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add subtle texture
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 1, 1);
    }
    
    // Add page lines with variation
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    const numLines = 60;
    const baseSpacing = 512 / numLines;
    
    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        // Vary line position slightly
        const y = i * baseSpacing + (Math.random() * 2 - 1);
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        // Vary line thickness
        ctx.lineWidth = Math.random() * 0.5 + 0.2;
        ctx.stroke();
    }
    
    return canvas;
}

export function createBookTextures() {
    // Create textures
    const coverTexture = new THREE.CanvasTexture(createCoverTexture());
    const insideCoverTexture = new THREE.CanvasTexture(createInsideCoverTexture());
    const backCoverTexture = new THREE.CanvasTexture(createCoverTexture()); // Reuse cover texture
    const pageTexture = new THREE.CanvasTexture(createPageTexture());
    const pageEdgesTexture = new THREE.CanvasTexture(createPageEdgesTexture());
    const frontPageTexture = createFrontPageTexture('js/front-page.jpg'); // Update the path

    // Create materials
    // const coverMaterial = new THREE.MeshPhongMaterial({ 
    //     map: coverTexture,
    //     bumpMap: coverTexture,
    //     bumpScale: 0.1,
    //     shininess: 30
    // });

    const coverMaterial = new THREE.MeshPhongMaterial({
        map: frontPageTexture,
        bumpMap: frontPageTexture,
        bumpScale: 0.05
    });
    
    const insideCoverMaterial = new THREE.MeshPhongMaterial({ 
        map: insideCoverTexture,
        bumpScale: 0.5
    });
    
    const backCoverMaterial = new THREE.MeshPhongMaterial({ 
        map: backCoverTexture,
        bumpMap: backCoverTexture,
        bumpScale: 0.1,
        shininess: 30
    });
    
    const pageMaterial = new THREE.MeshPhongMaterial({ 
        map: pageTexture,
        bumpMap: pageTexture,
        bumpScale: 0.02
    });
    
    const pageEdgesMaterial = new THREE.MeshPhongMaterial({ 
        map: pageEdgesTexture,
        bumpMap: pageEdgesTexture,
        bumpScale: 0.03
    });
    
    const sideMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc }); // Gray for sides

    return {
        coverMaterial,
        insideCoverMaterial,
        backCoverMaterial,
        pageMaterial,
        pageEdgesMaterial,
        sideMaterial
    };
}