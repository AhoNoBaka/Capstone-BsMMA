document.addEventListener("DOMContentLoaded", function() {
  const starContainer = document.querySelector(".star-container");
  const starSound = document.getElementById("starSound");

  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * -100 + "vh";
    star.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random speed
    star.style.transform = `translateX(${Math.random() * 200 - 100}px)`; // Random horizontal start position

    star.addEventListener("click", function() {
      starSound.play();
    });

    starContainer.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 5000); // Remove star after animation duration
  }

  setInterval(createStar, 300); // Create a new star every 300ms

  // Function to change video
  window.changeVideo = function(videoSrc) {
    var video = document.getElementById("vtuberVideo");
    var source = video.getElementsByTagName("source")[0];
    source.src = videoSrc;
    video.load();
  };
});
