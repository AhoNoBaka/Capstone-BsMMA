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

    let dx = (Math.random() - 0.5) * 1; //4 initially
    let dy = (Math.random() - 0.5) * 1;

    starContainer.appendChild(star);

    function moveStar() {
      const starRect = star.getBoundingClientRect();
      const starX = starRect.left + starRect.width / 2;
      const starY = starRect.top + starRect.height / 2;

      const distance = Math.hypot(mouseX - starX, mouseY - starY);

      if (distance < 30) { // Adjust collision distance as needed
        // Play sound
        // starSound.play();
        const soundEffect = new Audio("media/star-sound.mp3");
        soundEffect.play();

        // Change direction of the star
        dx = (starX - mouseX) / 5; //10 initially
        dy = (starY - mouseY) / 5;
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

  document.getElementById('toggleButton').addEventListener('click', function () {
    const contentElements = document.querySelectorAll('.content');
    contentElements.forEach(element => {
      element.classList.toggle('hidden');
    });
  });
});

function toggleContent() {
  const contentContainer = document.querySelector('.content-container');
  const toggleButton = document.getElementById('toggleButton');

  if (contentContainer.classList.contains('hidden')) {
    contentContainer.classList.remove('hidden');
    toggleButton.textContent = 'Hide Topics';
  } else {
    contentContainer.classList.add('hidden');
    toggleButton.textContent = 'Show Topics';
  }
}

function showButtonA() {
  const buttonA = document.getElementById("buttonA");
  buttonA.style.display = "inline"; // Makes button A visible

  // Change the video source
  const video = document.getElementById("vtuberVideo");
  const source = video.getElementsByTagName("source")[0];

  // Set the first video source
  source.src = "media/what-is-bmma.webm";
  video.muted = false;
  video.loop = false; // Ensure the video does not loop
  video.load(); // Reload the video with the new source
  video.play(); // Play the video

  // Remove any existing 'onended' event listener to avoid duplicates
  video.onended = null;

  // Add an event listener to switch back to the idle video after the first video ends
  video.onended = function () {
    console.log("First video ended. Switching to idle video."); // Debugging log
    source.src = "media/vtuber-idle-animation.mp4";
    video.muted = true;
    video.load();
    video.play();
  };
}

function showButtonB() {
  const buttonB = document.getElementById("buttonB");
  buttonB.style.display = "inline"; // Makes button B visible
}