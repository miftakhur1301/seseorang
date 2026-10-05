const readButton = document.querySelector("#read-message");
const letter = document.querySelector("#letter");
const forgiveButton = document.querySelector("#forgive-button");
const thankYou = document.querySelector("#thank-you");
const heartBurst = document.querySelector("#heart-burst");
const lightbox = document.querySelector("#lightbox");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxContent = document.querySelector("#lightbox-content");
const lightboxCaption = document.querySelector("#lightbox-caption");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

readButton.addEventListener("click", () => {
  letter.hidden = false;
  letter.classList.add("letter-arrives");
  letter.scrollIntoView({
    behavior: reduceMotion.matches ? "instant" : "smooth",
    block: "start",
  });
  readButton.setAttribute("aria-expanded", "true");
});

forgiveButton.addEventListener("click", () => {
  forgiveButton.disabled = true;
  thankYou.hidden = false;

  if (!reduceMotion.matches) {
    showHearts();
  }
});

document.querySelectorAll(".photo-card").forEach((photoCard) => {
  photoCard.addEventListener("click", () => {
    const visual = photoCard.querySelector(".photo-visual");
    const image = visual.querySelector(".photo-image");
    const enlargedVisual = image ? image.cloneNode() : visual.cloneNode(true);

    if (image) {
      enlargedVisual.className = "photo-image";
    }

    lightboxContent.replaceChildren(enlargedVisual);
    lightboxCaption.textContent = photoCard.dataset.photo;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

lightbox.addEventListener("close", () => {
  lightboxContent.replaceChildren();
});

function showHearts() {
  const decorations = ["♡", "✦", "♡", "✧", "♡", "✦", "♡"];

  decorations.forEach((decoration, index) => {
    const particle = document.createElement("span");
    particle.className = "heart-particle";
    particle.textContent = decoration;
    particle.style.setProperty("--particle-index", index);
    heartBurst.append(particle);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
  });
}
