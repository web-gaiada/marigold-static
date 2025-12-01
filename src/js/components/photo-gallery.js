import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const photoGalleryEl = document.querySelector('.section__photo-gallery');
    const photosEl = photoGalleryEl.querySelectorAll('.photo-item');

    const TRANSFORM_ROTATE_PROPS = [
        {
            '--tw-rotate': '1.92deg',
            '--tw-translate-x': '-40px'
        },
        {
            '--tw-rotate': '-3.11deg',
            '--tw-translate-x': '28px'
        },
        {
            '--tw-rotate': '-2.83deg',
            '--tw-translate-x': '12px',
        },
        {
            '--tw-rotate': '0deg'
        }
    ]

    // or gsap.utils.toArray('.photoGalleryEl')

    // const marqueeTextEl = document.querySelector('.marquee-text')
    const marqueeTextEl = gsap.utils.toArray('.marquee-text');
    const marqueeTl = horizontalLoop(marqueeTextEl, {
      repeat: -1,
    });

    const textEl = gsap.utils.toArray('.text-item')
    photosEl.forEach(el => {
        gsap.set(el, {
            zoom: 1.4,
            autoAlpha: 0,
            '--tw-rotate': '12deg',
            '--tw-translate-x': '12px'
        })
    })

    textEl.forEach((el, i) => {
        gsap.set(el, {
            autoAlpha: 0,
            ...TRANSFORM_ROTATE_PROPS[i]
        })
    })

    const photosHeight = photosEl[0].getBoundingClientRect().height

    const galleryTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".photo-gallery-outer",
        start: 'top top',
        end: `+=${350 * 4}px`,
        pin: true,
        pinnedContainer: ".photo-gallery-outer",
        scrub: true,
        snap: {
            snapTo: [0, 0.25, 0.5, 0.75, 1],
            delay: .05,
            duration: .1,
            inertia: false,
        }
        // once: true
      },
    });

    photosEl.forEach((photo, i) => {
        const tl = gsap.timeline()
        tl.to(textEl[i], {
            autoAlpha: 1,
            '--tw-rotate': 0,
            '--tw-translate-x': 0
        }, 0)
        tl.to(photo, {
            zoom: 1,
            autoAlpha: 1,
            ...TRANSFORM_ROTATE_PROPS[i],
        }, 0);
        galleryTl.add(tl)
    });
  });

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: 'none' },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 + gsap.getProperty(el, 'xPercent'),
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0,
      )
        .fromTo(
          item,
          { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
          {
            xPercent: xPercents[i],
            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond,
        )
        .add('label' + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }
})();
