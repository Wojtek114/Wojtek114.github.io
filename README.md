# Nocturne — Art Portfolio Template

A single-page art portfolio with a three-way lighting switch (Daylight /
Blacklight / No Light) that changes both the color theme of the site and
the artwork images themselves. Hovering (or focusing, for keyboard users)
an artwork reveals its title, medium, and description.

## Files

```
index.html    the page structure
style.css     all styling, including the three color themes
script.js     your artwork list + the switch logic
images/       placeholder artwork (replace with your own)
```

## 1. Add your own artwork

Open `script.js` and edit the `ARTWORKS` array. Each piece looks like this:

```js
{
  title: "Low Tide",
  year: 2024,
  medium: "Acrylic and UV pigment on canvas",
  blurb: "Layers built up over a week, left to dry between each pour.",
  img: "images/low-tide.jpg",
}
```

- `img` is required — this is what shows in Daylight mode.
- If you have real photos of a piece taken under a blacklight, or with
  the lights off (for glow-in-the-dark work), add `imgBlacklight` and/or
  `imgNoLight` with their file paths. The switch will use those directly.
- If you leave those out, the site automatically simulates the effect
  with a CSS filter over your regular photo — so the site still works
  with just one image per piece, you'll just get a stylized approximation
  rather than a true photo of the piece glowing.

Drop your image files into the `images/` folder (jpg, png, or webp all
work) and point to them from `script.js`.

## 2. Adjust the colors (optional)

The three themes live at the top of `style.css` as CSS variables:

```css
html[data-mode="regular"]    { ... }
html[data-mode="blacklight"] { ... }
html[data-mode="nolight"]    { ... }
```

Change `--bg`, `--ink`, `--accent`, etc. in each block to restyle a mode.

## 3. Preview it locally

Just open `index.html` in a browser — no build step or server required.

## 4. Host it on GitHub Pages

1. Create a new repository on GitHub (or use an existing one).
2. Add these files to the repo (keep the folder structure as-is):
   ```
   git init
   git add .
   git commit -m "Art portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub, go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick the `main` branch and the `/ (root)` folder, then save.
5. GitHub will give you a URL like
   `https://YOUR-USERNAME.github.io/YOUR-REPO/` — that's your live site.
   It can take a minute or two to go live after the first push.

If you'd rather the site live at `https://YOUR-USERNAME.github.io`
directly (no `/YOUR-REPO/` in the URL), name the repository
`YOUR-USERNAME.github.io` instead.
