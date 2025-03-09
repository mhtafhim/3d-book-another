export function setupAnimation(renderer, scene, camera, animationState, frontCoverGroup, light, lightHelper, controls) {
    function animate() {
        requestAnimationFrame(animate);
        animationState.time += 0.01;

        // Camera orbit
        if (animationState.animateCamera) {
            const cameraRadius = 30;
            camera.position.x = cameraRadius * Math.cos(animationState.time / 2);
            camera.position.z = cameraRadius * Math.sin(animationState.time / 2);
            camera.position.y = 15;
            camera.lookAt(0, 0, 0);
            
            // Update sliders to match animated position
            controls.cameraXSlider.value = camera.position.x;
            controls.cameraYSlider.value = camera.position.y;
            controls.cameraZSlider.value = camera.position.z;
        }

        // Light rotation
        if (animationState.animateLight) {
            const lightRadius = 20;
            light.position.x = lightRadius * Math.cos(animationState.time);
            light.position.z = lightRadius * Math.sin(animationState.time);
            light.position.y = 10;
            lightHelper.position.copy(light.position);
            
            // Update sliders to match animated position
            controls.lightXSlider.value = light.position.x;
            controls.lightYSlider.value = light.position.y;
            controls.lightZSlider.value = light.position.z;
        }

        // Cover animation (0 to 90 degrees)
        if (animationState.animateCover) {
            const coverAngle = (Math.sin(animationState.time) + 1) * Math.PI / 4;
            frontCoverGroup.rotation.z = coverAngle;
            
            // Update slider to match animated position
            controls.coverSlider.value = (coverAngle / (Math.PI/2)) * 90;
        }

        renderer.render(scene, camera);
    }
    
    // Start the animation loop
    animate();
}