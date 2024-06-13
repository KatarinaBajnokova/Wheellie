gsap.to(".ad-container", { duration: 1, opacity: 1 }); 
// Fades in the ad container over a duration of 1 second. The ad container starts off invisible (opacity: 0) and becomes fully visible (opacity: 1).

gsap.fromTo(".ad-container", { x: '-100%' }, { x: '0%', duration: 2 }); 
// Animates the ad container to slide in from the left side of the screen. 
// The animation starts with the container positioned off the screen to the left (x: '-100%') and moves it to its final position (x: '0%') over 2 seconds.


gsap.to(".logo img", { duration: 1, opacity: 1, delay: 2 }); 
// Makes the logo image fade in, becoming fully visible (opacity: 1) over 1 second, with a delay of 2 seconds before the animation starts.

gsap.fromTo(".logo img", { x: '-100%' }, { x: '2%', duration: 2, delay: 2 }); 
// Animates the logo image to slide in from the left. 
// It starts off-screen to the left (x: '-100%') and moves to its final position (x: '2%') over 2 seconds, starting the animation after a 2-second delay.


gsap.to("#feature1", { duration: 1, opacity: 1, delay: 4 }); 
// Makes the first feature item ("Accessibility") fade in, becoming fully visible (opacity: 1) over 1 second, with a delay of 4 seconds before the animation starts.

gsap.to("#feature2", { duration: 1, opacity: 1, delay: 5 }); 
// Makes the second feature item ("Inclusivity") fade in, becoming fully visible (opacity: 1) over 1 second, with a delay of 5 seconds before the animation starts.

gsap.to("#feature3", { duration: 1, opacity: 1, delay: 6 }); 
// Makes the third feature item ("Empowerment") fade in, becoming fully visible (opacity: 1) over 1 second, with a delay of 6 seconds before the animation starts.


gsap.to(".cta", { duration: 1, opacity: 1, delay: 7 }); 
// Makes the CTA button fade in, becoming fully visible (opacity: 1) over 1 second, with a delay of 7 seconds before the animation starts.

gsap.to(".cta", { duration: 0.5, scale: 1.1, repeat: -1, yoyo: true, delay: 8 }); 
// Makes the CTA button grow and shrink. 
// It scales the button up to 110% of its original size (scale: 1.1) over 0.5 seconds, then scales it back down to its original size, repeating indefinitely (repeat: -1) with a yoyo effect (yoyo: true), starting the animation after an 8-second delay.


document.getElementById('ctaButton').addEventListener('click', function() { 
// Selects the CTA button by its ID ('ctaButton') and adds an event listener to it. 
// The event listener waits for a 'click' event to occur.

    window.location.href = 'main.html'; 
    // Redirects the browser to 'main.html' when the CTA button is clicked. 
});
