
# Image Adjustments Verification Test

This page verifies that the adapted Obsidian ITS Theme Image Adjustments CSS is working correctly in the MkDocs Material workspace.

---

## 1. Positioning & Float Alignment

### Float Left (`left` or `locl`)
This image should float to the left, and this text should wrap around its right side nicely. We are also setting width to `wsmall` (200px) and aspect ratio to `cover`.

![left wsmall cover](https://picsum.photos/400/400)
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

<div style="clear: both;"></div>

---

### Float Right (`right` or `locr`)
This image should float to the right, and this text should wrap around its left side nicely. We are setting it to `wtiny` (100px) and `profile` (circular shape).

![right wtiny profile](https://picsum.photos/400/400)
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

<div style="clear: both;"></div>

---

### Centered (`center` or `ctr`)
This image should be centered on the page with block display. It uses width `ws-med` (300px) and `border` styling.

![center ws-med border](https://picsum.photos/500/300)

---

## 2. Sizing Verification

Here are three different static sizing widths:
- `wmicro` (70px): ![wmicro](https://picsum.photos/200/200)
- `wtiny` (100px): ![wtiny](https://picsum.photos/200/200)
- `wsmall` (200px): ![wsmall](https://picsum.photos/200/200)

And three different height sizing constraints:
- `hmicro` (70px): ![hmicro cover](https://picsum.photos/400/200)
- `htiny` (100px): ![htiny cover](https://picsum.photos/400/200)
- `hsmall` (200px): ![hsmall cover](https://picsum.photos/400/200)

---

## 3. Pipe Syntax Compatibility (`|` Separator)

This test verifies that Obsidian's pipe separator syntax works correctly in MkDocs:
- Floated Left using Pipe Syntax (`|left wsmall cover`):
  ![Test Image|left wsmall cover](https://picsum.photos/300/300)
  This paragraph test is wrapping around a floated image that has a title followed by `|left wsmall cover`.
  
<div style="clear: both;"></div>

- Floated Right using Pipe Syntax (`|right wtiny circle`):
  ![Test Image|right wtiny circle](https://picsum.photos/300/300)
  This paragraph test is wrapping around a floated circular image using the pipe separator syntax.

<div style="clear: both;"></div>

---

## 4. Banner Styling (`banner`, `sban`)

### standard banner (`banner` with height `wsmall` 200px)
![banner cover](https://picsum.photos/800/300)

### sban cover (height auto, width 100%)
![sban cover](https://picsum.photos/800/200)

---

## 5. Profile & Portrait Shapes

- **Profile Medium**:
  ![profile+medium](https://picsum.photos/300/300)
- **Portrait Small**:
  ![portrait+small cover](https://picsum.photos/300/500)

---

## 6. Color Filters & Flips

- **Dark Mode Invert (`invertb`)**:
  ![wsmall invertb](https://picsum.photos/200/200)
- **Horizontal Flip (`flip-x`)**:
  ![wsmall flip-x](https://picsum.photos/200/200)
