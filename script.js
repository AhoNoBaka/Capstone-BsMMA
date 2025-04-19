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

function pressButtonX() {
  const buttonX = document.getElementById("buttonX");
  buttonX.src = "media/Star-Pressed.png"; // Change the image to 'Star-Pressed.png'
  showButton("A"); // Show button A

  // Show the "What is BMMA?" section
  const infoText = document.getElementById("infoText");
  infoText.style.display = "block"; // Make it visible
  infoText.scrollIntoView({ behavior: "smooth" }); // Scroll to this section

  // Change the video source
  const video = document.getElementById("vtuberVideo");
  const source = video.getElementsByTagName("source")[0];

  // Set the first video source
  source.src = "media/what-is-bmma.webm";
  video.muted = false;
  video.loop = false; // Set to false to allow the video to end
  video.load(); // Reload the video with the new source
  video.play(); // Play the video

  // Add an event listener to switch back to the idle video after the first video ends
  video.onended = function () {
    source.src = "media/vtuber-idle-animation.mp4";
    video.muted = true;
    video.loop = true; // Loop the idle animation
    video.load();
    video.play();
  };
}

function pressButton(buttonId, textId) {
  const button = document.getElementById(`button${buttonId}`);
  
  // Determine the correct pressed image based on the button type
  if (button.src.includes("Star-Start.png")) {
    button.src = "media/Star-Pressed.png"; // Change to 'Star-Pressed.png'
  } else if (button.src.includes("Diamond-Start.png")) {
    button.src = "media/Diamond-Pressed.png"; // Change to 'Diamond-Pressed.png'
  }

  showButton(String.fromCharCode(buttonId.charCodeAt(0) + 1)); // Show the next button

  // Show the corresponding text
  const textElement = document.getElementById(textId);
  textElement.style.display = "block"; // Make it visible
  textElement.scrollIntoView({ behavior: "smooth" }); // Scroll to this section
}

// Example usage for button A
function pressButtonA() {
  pressButton("A", "curriculumText");
}

function pressButtonB() {
  pressButton("B", "yearOne");
}

function pressButtonC() {
  pressButton("C", "yearTwo");
}

function pressButtonD() {
  pressButton("D", "yearThree");
}

function pressButtonE() {
  pressButton("E", "yearFour");
}

function pressButtonF() {
  pressButton("F", "skillsText");
}

function pressButtonG() {
  pressButton("G", "skillOne");
}

function pressButtonH() {
  pressButton("H", "skillTwo");
}

function pressButtonI() {
  pressButton("I", "skillThree");
}

function pressButtonJ() {
  pressButton("J", "skillFour");
}

function pressButtonK() {
  pressButton("K", "futureProfession");
}

function pressButtonL() {
  pressButton("L", "professionOne");
}

function pressButtonM() {
  pressButton("M", "professionTwo");
}

function pressButtonN() {
  const buttonN = document.getElementById("buttonN");
  buttonN.src = "media/Diamond-Pressed.png"; // Change the image to 'Diamond-Pressed.png'

  const professionThree = document.getElementById("professionThree");
  professionThree.style.display = "block"; // Make it visible
  professionThree.scrollIntoView({ behavior: "smooth" }); // Scroll to this section
  const buttonO = document.getElementById("buttonO");
  buttonO.style.display = "inline"; // Ensure button O is visible
}

function pressButtonO() {
  const buttonO = document.getElementById("buttonO");
  buttonO.src = "media/Diamond-Pressed.png"; // Change the image to 'Diamond-Pressed.png'

  const thankYou = document.getElementById("thankYou");
  thankYou.style.display = "block"; // Make it visible
  thankYou.scrollIntoView({ behavior: "smooth" }); // Scroll to this section
}

function showButton(buttonId) {
  const button = document.getElementById(`button${buttonId}`);
  button.style.display = "inline"; // Makes the button visible
}

function showInfoText(textId) {
  const allInfoTexts = document.querySelectorAll('.info-text');
  allInfoTexts.forEach(text => {
    text.style.display = 'none'; // Hide all other info-text elements
  });

  const textElement = document.getElementById(textId);
  textElement.style.display = 'block'; // Show the selected info-text
  textElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the visible section
}