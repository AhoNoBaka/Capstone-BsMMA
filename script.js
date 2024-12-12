document.addEventListener("DOMContentLoaded", function() {
  const starContainer = document.querySelector(".star-container");
  const starSound = document.getElementById("starSound");
  let mouseX = 0, mouseY = 0;

  // Function to update mouse position
  document.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.innerHTML = '⭐'; // Use the star emoji

    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * window.innerHeight;

    star.style.left = initialX + 'px';
    star.style.top = initialY + 'px';

    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;

    starContainer.appendChild(star);

    function moveStar() {
      const starRect = star.getBoundingClientRect();
      const starX = starRect.left + starRect.width / 2;
      const starY = starRect.top + starRect.height / 2;

      const distance = Math.hypot(mouseX - starX, mouseY - starY);

      if (distance < 30) { // Adjust collision distance as needed
        // Play sound
        starSound.play();

        // Change direction of the star
        dx = (starX - mouseX) / 10;
        dy = (starY - mouseY) / 10;
      }

      star.style.left = (star.offsetLeft + dx) + 'px';
      star.style.top = (star.offsetTop + dy) + 'px';

      requestAnimationFrame(moveStar);
    }

    requestAnimationFrame(moveStar);

    setTimeout(() => {
      star.remove();
    }, 5000); // Remove star after animation duration
  }

  setInterval(createStar, 300); // Create a new star every 300ms

  // Function to change video
  window.changeVideo = function(videoSrc) {
    const video = document.getElementById("vtuberVideo");
    const source = video.getElementsByTagName("source")[0];
    source.src = videoSrc;
    video.load();
  };
});
