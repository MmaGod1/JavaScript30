# Day 16 - Mouse Move Shadow

Took a while for the maths to sink in. So, here's a description for any one who cares.

This project applies a colorful, multi-directional text shadow to a heading (`<h1>`) based on the user's mouse position inside a container (`.hero`). It uses DOM events and basic geometry to create an interactive visual effect.

This README explains **why the code works**, not just how — including two critical pieces of logic:

---

## 📍 Part 1: Mouse Position Correction (offsetX/offsetY)

### ❓ What's the Problem?

When you listen for `mousemove` on a container like `.hero`, the event can also trigger when the mouse is over a child element, like `<h1>`.

In that case, `e.offsetX` and `e.offsetY` will be **relative to the child element**, not to `.hero`. This breaks our shadow effect, which relies on knowing the cursor's position **inside `.hero` only**.

### 💡 The Fix

To correct this, we **manually add the child element’s offset** from `.hero`:

```js
if (this !== e.target) {
  x += e.target.offsetLeft;
  y += e.target.offsetTop;
}
````

### 📐 Conceptual Formula

```txt
mouse's position relative to .hero =
mouse's position relative to h1 +
h1’s position relative to .hero
```

This ensures that no matter where the mouse is — on `.hero` directly or on its children — the shadow is always calculated **relative to `.hero`**.

---

## 🎨 Part 2: The Shadow Movement Formula

```js
const xWalk = Math.round((x / width * maxDistance) - (maxDistance / 2));
const yWalk = Math.round((y / height * maxDistance) - (maxDistance / 2));
```

This determines **how far** the shadow moves in the X and Y directions.

---

### 🔍 Formula Breakdown

| Part                  | What It Does                           | Why It's Needed                            |
| --------------------- | -------------------------------------- | ------------------------------------------ |
| `x / width`           | Normalize mouse position into 0 → 1    | So it works no matter the screen size      |
| `* maxDistance`       | Stretch the 0–1 value to 0–maxDistance | To control how far the shadow can move     |
| `- (maxDistance / 2)` | Recenter the value around 0            | So center = no shadow, edges = full shadow |
| `Math.round(...)`     | Remove decimals                        | Clean, crisp shadows (avoid blurry pixels) |

---

### 🧠 Why Subtract `maxDistance / 2`?

Without this, the shadow offset would go from `0 → maxDistance`, and you'd never get zero movement in the middle. We want it centered:

```txt
Left of container  → -maxDistance / 2
Middle of container → 0
Right of container → +maxDistance / 2
```

So we subtract `maxDistance / 2` to **center the range around zero**.

This is a general pattern in UI math called:

### 🎯 Centering a Range Around Zero

Whenever you're turning user input (mouse, scroll, etc.) into movement or rotation — and you want the center of the element to mean "no effect" — subtract half of the total effect range.

```js
let value = ((position / max) * range) - (range / 2);
```


## ✅ Summary

This project uses two smart adjustments:

1. **Offset Correction**:
   `offsetX/Y` gives wrong values on child elements, so we add `offsetLeft/Top` to compensate.

2. **Shadow Centering**:
   Shadow values are centered by subtracting `maxDistance / 2`, allowing smooth symmetrical animation from the center.
