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
    const star = document.createElement("img");
    star.classList.add("star");
    star.src = "media/Star-Falling.png"; // Use the PNG image
    star.alt = "Falling Star"; // Add alt text for accessibility

    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * window.innerHeight;

    star.style.left = initialX + 'px';
    star.style.top = initialY + 'px';

    let dx = (Math.random() - 0.5) * 1; // Adjust speed as needed
    let dy = (Math.random() - 0.5) * 1;

    starContainer.appendChild(star);

    function moveStar() {
      const starRect = star.getBoundingClientRect();
      const starX = starRect.left + starRect.width / 2;
      const starY = starRect.top + starRect.height / 2;

      const distance = Math.hypot(mouseX - starX, mouseY - starY);

      if (distance < 30) { // Adjust collision distance as needed
        // Randomly select a sound effect
        const sounds = [
          { src: "media/star-sound.mp3", volume: 0.1 },
          { src: "media/star-sound-1.mp3", volume: 0.1 },
          { src: "media/star-sound-2.mp3", volume: 0.1 },
          { src: "media/star-pipe.mp3", volume: 0.5, chance: 0.02 }
        ];

        const random = Math.random();
        let selectedSound = sounds[0]; // Default sound

        if (random < 0.05) {
          selectedSound = sounds[3]; // star-pipe
        } else {
          selectedSound = sounds[Math.floor(Math.random() * 3)]; // Other sounds
        }

        const soundEffect = new Audio(selectedSound.src);
        soundEffect.volume = selectedSound.volume;

        // Slow down the playback rate for star-pipe.mp3
        if (selectedSound.src.includes("star-pipe.mp3")) {
          soundEffect.playbackRate = 0.75; // Adjust the rate as needed (e.g., 0.5 for half speed)
        }

        soundEffect.play();

        dx = (starX - mouseX) / 5;
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

function playVideo(videoSrc, onEndSrc, loopOnEnd = true, mutedOnEnd = true) {
  const video = document.getElementById("vtuberVideo");
  const source = video.getElementsByTagName("source")[0];

  // Set the new video source
  source.src = videoSrc;
  video.muted = false;
  video.loop = false; // Set to false to allow the video to end
  video.load(); // Reload the video with the new source
  video.play(); // Play the video

  // Add an event listener to switch back to the idle video after the video ends
  video.onended = function () {
    source.src = onEndSrc;
    video.muted = mutedOnEnd;
    video.loop = loopOnEnd; // Loop the idle animation if specified
    video.load();
    video.play();
  };
}

function pressButtonX() {
  const buttonX = document.getElementById("buttonX");
  buttonX.src = "media/Star-Pressed.png"; // Change the image to 'Star-Pressed.png'
  showButton("A"); // Show button A

  // Show the "What is BMMA?" section
  const infoText = document.getElementById("infoText");
  infoText.style.display = "block"; // Make it visible
  infoText.scrollIntoView({ behavior: "smooth" }); // Scroll to this section

  // Play the "What is BMMA?" video and return to idle animation
  playVideo("media/what-is-bmma.webm", "media/vtuber-idle-animation.mp4");
}

function pressButton(buttonId, textId, videoSrc) {
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

  // Play the specified video and return to idle animation
  if (videoSrc) {
    playVideo(videoSrc, "media/vtuber-idle-animation.mp4");
  }
}

// Example usage for button A
function pressButtonA() {
  pressButton("A", "curriculumText", "media/curriculum.webm");
  showModal('quizModal1');
}

function pressButtonB() {
  pressButton("B", "yearOne", "media/curriculum-1st-year.webm");
}

function pressButtonC() {
  pressButton("C", "yearTwo", "media/curriculum-2nd-year.webm");
  showModal('quizModal2');
}

function pressButtonD() {
  pressButton("D", "yearThree", "media/curriculum-3rd-year.webm");
}

function pressButtonE() {
  pressButton("E", "yearFour", "media/curriculum-4th-year.webm");
}

function pressButtonF() {
  pressButton("F", "skillsText", "media/skills.webm");
  showModal('quizModal3');
}

function pressButtonG() {
  pressButton("G", "skillOne", "media/skills-photog.webm");
}

function pressButtonH() {
  pressButton("H", "skillTwo", "media/skills-digi-drawing.webm");
  showModal('quizModal4');
}

function pressButtonI() {
  pressButton("I", "skillThree", "media/skills-graphic-design.webm");
}

function pressButtonJ() {
  pressButton("J", "skillFour", "media/skills-3d-modeling.webm");
  showModal('quizModal5');
}

function pressButtonK() {
  pressButton("K", "futureProfession", "media/professions.webm");
}

function pressButtonL() {
  pressButton("L", "professionOne", "media/profession-photographer-film.webm");
}

function pressButtonM() {
  pressButton("M", "professionTwo", "media/profession-illustrator.webm");
}

function pressButtonN() {
  pressButton("N", "professionThree", "media/profession-creatives.webm");
  // const buttonN = document.getElementById("buttonN");
  // buttonN.src = "media/Diamond-Pressed.png"; // Change the image to 'Diamond-Pressed.png'

  // const professionThree = document.getElementById("professionThree");
  // professionThree.style.display = "block"; // Make it visible
  // professionThree.scrollIntoView({ behavior: "smooth" }); // Scroll to this section
  // const buttonO = document.getElementById("buttonO");
  // buttonO.style.display = "inline"; // Ensure button O is visible
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

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");

  // Create a modal background overlay
  const modalBg = document.createElement("div");
  modalBg.style.position = "fixed";
  modalBg.style.top = "0";
  modalBg.style.left = "0";
  modalBg.style.width = "100%";
  modalBg.style.height = "100%";
  modalBg.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Semi-transparent black
  modalBg.style.zIndex = "1000";

  // Create a container for the "correct" image with a white background
  const correctContainer = document.createElement("div");
  correctContainer.style.position = "fixed";
  correctContainer.style.top = "50%";
  correctContainer.style.left = "50%";
  correctContainer.style.transform = "translate(-50%, -50%)";
  correctContainer.style.backgroundColor = "white"; // White background
  correctContainer.style.padding = "20px";
  correctContainer.style.borderRadius = "10px";
  correctContainer.style.textAlign = "center";
  correctContainer.style.zIndex = "1001";
  correctContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

  // Display the "correct" image
  const correctImage = document.createElement("img");
  correctImage.src = "media/quiz-correct.PNG";
  correctImage.alt = "Correct Answer";
  correctImage.style.width = "300px"; // Adjust size as needed
  correctImage.style.height = "auto";

  // Append the image to the container
  correctContainer.appendChild(correctImage);

  // Append the modal background and container to the body
  document.body.appendChild(modalBg);
  document.body.appendChild(correctContainer);

  // Play the "correct" sound
  const correctSound = new Audio("media/correct-sound.mp3");
  correctSound.volume = 0.5; // Set the volume to 0.5
  correctSound.play();

  // Remove the image, container, and modal background after 0.5 seconds
  setTimeout(() => {
    correctContainer.remove();
    modalBg.remove();
  }, 500);
}

// Add hover behavior for wrong answers
document.querySelectorAll(".quiz-choice.wrong").forEach(button => {
  button.addEventListener("mouseover", () => {
    const currentX = button.getBoundingClientRect().left; // Current X position
    const currentY = button.getBoundingClientRect().top;  // Current Y position

    // Generate random offsets within 50-75 pixels
    const offsetX = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 25);
    const offsetY = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 25);

    // Calculate new positions
    const newX = Math.min(
      Math.max(currentX + offsetX, 0), // Ensure it doesn't go off the left edge
      window.innerWidth - button.offsetWidth // Ensure it doesn't go off the right edge
    );
    const newY = Math.min(
      Math.max(currentY + offsetY, 0), // Ensure it doesn't go off the top edge
      window.innerHeight - button.offsetHeight // Ensure it doesn't go off the bottom edge
    );

    // Apply the new position
    button.style.transform = `translate(${newX - currentX}px, ${newY - currentY}px)`;
    button.style.transition = "transform 0.3s ease"; // Smooth movement
  });
});