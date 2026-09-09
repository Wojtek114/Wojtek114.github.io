/* -------------------------------------------------------
   YOUR ARTWORK GOES HERE
   -------------------------------------------------------
   Add one object per piece. Fields:

   title        - name of the piece
   year         - string or number
   medium       - e.g. "Acrylic on canvas"
   blurb        - short description shown on hover
   img          - path to the "regular light" photo (required)
   imgBlacklight- path to a photo taken under UV/blacklight
                  (optional — leave it out and a UV-style
                  filter will be simulated on the regular image)
   imgNoLight   - path to a photo taken with the lights off,
                  e.g. of glow-in-the-dark paint (optional —
                  leave it out and a dark/glow filter will be
                  simulated instead)
------------------------------------------------------- */

const ARTWORKS = [
  {
    title: "Low Tide",
    year: 2024,
    medium: "Acrylic and UV pigment on canvas",
    blurb: "Layers built up over a week, left to dry between each pour.",
    img: "images/piece-01.svg",
  },
  {
    title: "Static Field",
    year: 2023,
    medium: "Ink and phosphorescent paint on panel",
    blurb: "The stripes only align when you stand off to one side.",
    img: "images/piece-04.svg",
  },
  {
    title: "Understory",
    year: 2024,
    medium: "Acrylic on canvas",
    blurb: "Painted from a photo taken on a hike outside Bastrop.",
    img: "images/piece-02.svg",
  },
  {
    title: "Warm Front",
    year: 2022,
    medium: "Oil on wood panel",
    blurb: "Part of a series about Texas summers.",
    img: "images/piece-05.svg",
  },
  {
    title: "Signal",
    year: 2025,
    medium: "UV-reactive ink on canvas",
    blurb: "Barely visible in daylight; this one is built for the dark.",
    img: "images/piece-06.svg",
  },
  {
    title: "After Hours",
    year: 2023,
    medium: "Acrylic and glow pigment on canvas",
    blurb: "The circles are hand-mixed to glow at slightly different rates.",
    img: "images/piece-03.svg",
  },
];

const MODE_CAPTIONS = {
  regular: "Viewing under regular gallery light.",
  blacklight: "Viewing under blacklight — UV-reactive pigments are lit up.",
  nolight: "Viewing with the lights off — only glow-in-the-dark paint shows.",
};

/* -------------------------------------------------------
   Render the gallery
------------------------------------------------------- */

const galleryEl = document.getElementById("gallery");

function renderGallery() {
  galleryEl.innerHTML = "";

  ARTWORKS.forEach((piece) => {
    const card = document.createElement("figure");
    card.className = "artwork";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.src = piece.img;
    img.alt = `${piece.title}, ${piece.medium}`;
    img.dataset.imgRegular = piece.img;
    if (piece.imgBlacklight) img.dataset.imgBlacklight = piece.imgBlacklight;
    if (piece.imgNoLight) img.dataset.imgNolight = piece.imgNoLight;
    card.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.className = "artwork-caption";
    caption.innerHTML = `
      <h2>${piece.title}</h2>
      <p class="meta">${piece.medium} &middot; ${piece.year}</p>
      <p class="blurb">${piece.blurb}</p>
    `;
    card.appendChild(caption);

    galleryEl.appendChild(card);
  });

  applyModeToImages(currentMode);
}

/* -------------------------------------------------------
   Lighting switch
------------------------------------------------------- */

const rockers = document.querySelectorAll(".rocker");
const modeCaptionEl = document.getElementById("mode-caption");
let currentMode = "regular";

function applyModeToImages(mode) {
  document.querySelectorAll(".artwork img").forEach((img) => {
    let src = img.dataset.imgRegular;
    let usingFallback = true;

    if (mode === "blacklight" && img.dataset.imgBlacklight) {
      src = img.dataset.imgBlacklight;
      usingFallback = false;
    } else if (mode === "nolight" && img.dataset.imgNolight) {
      src = img.dataset.imgNolight;
      usingFallback = false;
    }

    if (img.getAttribute("src") !== src) img.setAttribute("src", src);

    if (usingFallback) {
      img.setAttribute("data-using-fallback", "");
    } else {
      img.removeAttribute("data-using-fallback");
    }
  });
}

function setMode(mode) {
  currentMode = mode;
  document.documentElement.setAttribute("data-mode", mode);
  modeCaptionEl.textContent = MODE_CAPTIONS[mode];

  rockers.forEach((btn) => {
    const active = btn.dataset.mode === mode;
    btn.setAttribute("aria-checked", String(active));
  });

  applyModeToImages(mode);
}

rockers.forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

/* -------------------------------------------------------
   Init
------------------------------------------------------- */

renderGallery();
setMode("regular");
