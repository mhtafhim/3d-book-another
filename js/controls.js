export function setupControls(animationState, camera, frontCoverGroup, light, lightHelper) {
    // Get control elements
    const coverSlider = document.getElementById('coverSlider');
    const cameraXSlider = document.getElementById('cameraXSlider');
    const cameraYSlider = document.getElementById('cameraYSlider');
    const cameraZSlider = document.getElementById('cameraZSlider');
    const lightXSlider = document.getElementById('lightXSlider');
    const lightYSlider = document.getElementById('lightYSlider');
    const lightZSlider = document.getElementById('lightZSlider');

    // Button controls
    document.getElementById('toggleCover').addEventListener('click', () => {
        animationState.animateCover = !animationState.animateCover;
        if (!animationState.animateCover) {
            animationState.isCoverOpen = !animationState.isCoverOpen;
            frontCoverGroup.rotation.z = animationState.isCoverOpen ? Math.PI / 2 : 0;
        }
    });

    document.getElementById('toggleCamera').addEventListener('click', () => {
        animationState.animateCamera = !animationState.animateCamera;
    });

    document.getElementById('toggleLight').addEventListener('click', () => {
        animationState.animateLight = !animationState.animateLight;
    });

    document.getElementById('openCoverBtn').addEventListener('click', () => {
        animationState.animateCover = false;
        animationState.isCoverOpen = true;
        frontCoverGroup.rotation.z = Math.PI / 2;
        coverSlider.value = 90;
    });

    document.getElementById('closeCoverBtn').addEventListener('click', () => {
        animationState.animateCover = false;
        animationState.isCoverOpen = false;
        frontCoverGroup.rotation.z = 0;
        coverSlider.value = 0;
    });

    document.getElementById('resetCameraBtn').addEventListener('click', () => {
        animationState.animateCamera = false;
        camera.position.set(0, 15, 30);
        camera.lookAt(0, 0, 0);
        cameraXSlider.value = 0;
        cameraYSlider.value = 15;
        cameraZSlider.value = 30;
    });

    // Slider controls
    coverSlider.addEventListener('input', () => {
        if (!animationState.animateCover) {
            const angle = (coverSlider.value / 90) * Math.PI / 2;
            frontCoverGroup.rotation.z = angle;
        }
    });

    function updateCameraPosition() {
        if (!animationState.animateCamera) {
            camera.position.x = parseFloat(cameraXSlider.value);
            camera.position.y = parseFloat(cameraYSlider.value);
            camera.position.z = parseFloat(cameraZSlider.value);
            camera.lookAt(0, 0, 0);
        }
    }

    cameraXSlider.addEventListener('input', updateCameraPosition);
    cameraYSlider.addEventListener('input', updateCameraPosition);
    cameraZSlider.addEventListener('input', updateCameraPosition);

    function updateLightPosition() {
        if (!animationState.animateLight) {
            light.position.x = parseFloat(lightXSlider.value);
            light.position.y = parseFloat(lightYSlider.value);
            light.position.z = parseFloat(lightZSlider.value);
            lightHelper.position.copy(light.position);
        }
    }

    lightXSlider.addEventListener('input', updateLightPosition);
    lightYSlider.addEventListener('input', updateLightPosition);
    lightZSlider.addEventListener('input', updateLightPosition);

    // Keyboard shortcuts for cover open (O) and close (C)
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        if (key === 'o') {
            animationState.animateCover = false;
            animationState.isCoverOpen = true;
            frontCoverGroup.rotation.z = Math.PI / 2;
            coverSlider.value = 90;
        } else if (key === 'c') {
            animationState.animateCover = false;
            animationState.isCoverOpen = false;
            frontCoverGroup.rotation.z = 0;
            coverSlider.value = 0;
        }
    });

    // Keyboard shortcuts for camera movement using arrow keys
    document.addEventListener('keydown', (event) => {
        if (!animationState.animateCamera) {
            const delta = 1; // movement step
            switch(event.key) {
                case 'ArrowUp':
                    cameraZSlider.value = parseFloat(cameraZSlider.value) - delta;
                    updateCameraPosition();
                    break;
                case 'ArrowDown':
                    cameraZSlider.value = parseFloat(cameraZSlider.value) + delta;
                    updateCameraPosition();
                    break;
                case 'ArrowLeft':
                    cameraXSlider.value = parseFloat(cameraXSlider.value) - delta;
                    updateCameraPosition();
                    break;
                case 'ArrowRight':
                    cameraXSlider.value = parseFloat(cameraXSlider.value) + delta;
                    updateCameraPosition();
                    break;
            }
        }
    });
    
    
    document.addEventListener('click', () => {
    if (!animationState.isCoverOpen) {
        animationState.animateCover = false;
        animationState.isCoverOpen = true;
        frontCoverGroup.rotation.z = Math.PI / 2;
        coverSlider.value = 90;
    } else {
        animationState.animateCover = false;
        animationState.isCoverOpen = false;
        frontCoverGroup.rotation.z = 0;
        coverSlider.value = 0;
    }
});
    

    return {
        coverSlider,
        cameraXSlider,
        cameraYSlider,
        cameraZSlider,
        lightXSlider,
        lightYSlider,
        lightZSlider
    };
}