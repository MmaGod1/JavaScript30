#  Day 13 - Slide in on Scroll

I decided to use this scroll calculation instead of Wes Bos' version because it was more understandable and easier for me to reason about visually.

```js
    const imageMidpoint = sliderImage.offsetTop + sliderImage.height / 2;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const scrollBottom = window.scrollY + window.innerHeight;
```

### What I learned:

* `window.scrollY` tells how far the user has scrolled from the top.
* `window.innerHeight` is the height of the visible browser window.
* Adding `scrollY + innerHeight` gives the **bottom** of the viewport.
* I used the **middle of the image** as the trigger point (using `offsetTop + height / 2`) to decide when to slide it in.
* This logic also checks if the image hasn’t been completely scrolled past (`window.scrollY < imageBottom`).
* It made more sense to me compared to Wes Bos’ approach, and it works exactly the same.

This way, the animation only activates when the image is halfway into view and deactivates when it's out of view.
