import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const photoGalleryEl = document.querySelector('.section__photo-gallery');
    if(!photoGalleryEl) return
    const photosEl = photoGalleryEl.querySelectorAll('.photo-item');

    const TRANSFORM_ROTATE_PROPS = [
        {
            // '--tw-rotate': '1.92deg',
            '--tw-rotate': '18.9deg',
            '--tw-translate-x': '-40px'
        },
        {
            // '--tw-rotate': '-3.11deg',
            '--tw-rotate': '-9.2deg',
            '--tw-translate-x': '28px'
        },
        {
            // '--tw-rotate': '-2.83deg',
            '--tw-rotate': '-14.5deg',
            '--tw-translate-x': '12px',
        },
        {
            '--tw-rotate': '4deg'
        }
    ]

    const textEl = gsap.utils.toArray('.text-item')
    photosEl.forEach(el => {
        gsap.set(el, {
            // zoom: 1.8,
            autoAlpha: 0,
            '--tw-rotate': '12deg',
            '--tw-translate-x': '12px',
            transformOrigin: 'center center'
        })
    })

    textEl.forEach((el, i) => {
        gsap.set(el, {
            autoAlpha: 0,
            ...TRANSFORM_ROTATE_PROPS[i]
        })
    })

    const steps = photosEl.length;
    const height = 350 * steps;

    const galleryTl = [];                        // store all child animations
    let state = new Array(steps).fill("idle");    // "idle" | "played" | "reversed"

    // build animations (paused, controlled manually)
    photosEl.forEach((photo, i) => {
        const tl = gsap.timeline({ paused: true });

        tl.to(textEl[i], {
            autoAlpha: 1,
            "--tw-rotate": 0,
            "--tw-translate-x": 0,
            duration: .4,
            ease: 'none',
        }, 0);

        tl.to(photo, {
            // zoom: 1,
            autoAlpha: 1,
            duration: .4,
            ease: 'back.out(1.7)',
            ...TRANSFORM_ROTATE_PROPS[i]
        }, 0);

        galleryTl.push(tl);
    });

    // main scroll Interaction
    ScrollTrigger.create({
        trigger: ".photo-gallery-outer",
        start: "top top",
        end: `+=${height}px`,
        pin: true,
        scrub: true,
        onUpdate(self) {
            const p = self.progress;       // 0 → 1
            const direction = self.direction; // 1 = down, -1 = up

            galleryTl.forEach((tl, i) => {
                const threshold = i / steps;

                // scrolling down → play
                if (direction === 1 && p >= threshold && state[i] !== "played") {
                    state[i] = "played";
                    tl.play();
                }

                // scrolling up → reverse
                if (direction === -1 && p < threshold && state[i] !== "reversed") {
                    state[i] = "reversed";
                    tl.reverse();
                }
            });
        },
    });


    // const photoGalleryEl = document.querySelector('.section__photo-gallery');
    // if (photoGalleryEl) {
    //     const photosEl = photoGalleryEl.querySelectorAll('.photo-item');
    //     const textEl = gsap.utils.toArray('.text-item');
    //     const TRANSFORM_DATA = [
    //       { rotation: 18.9, x: -40 },
    //       { rotation: -9.2, x: 28 },
    //       { rotation: -14.5, x: 12 },
    //       { rotation: 4, x: 0 }
    //     ];
    //     photosEl.forEach((el, i) => {
    //         const config = TRANSFORM_DATA[i] || { rotation: 0, x: 0 };
    //         const startRotation = config.rotation + gsap.utils.random(-60, 60);

    //         gsap.set(el, {
    //             autoAlpha: 0,
    //             '--tw-rotate': `${startRotation}deg`,
    //             transformOrigin: "center center"
    //         });
    //     });

    //     textEl.forEach((el) => {
    //         gsap.set(el, { autoAlpha: 0, y: 20 });
    //     });

    //     const steps = photosEl.length;
    //     const height = 350 * steps;
    //     const galleryTl = [];
    //     let state = new Array(steps).fill("idle");

    //     photosEl.forEach((photo, i) => {
    //         const config = TRANSFORM_DATA[i] || { rotation: 0, x: 0 };
    //         const tl = gsap.timeline({ paused: true });

    //         tl.to(photo, {
    //             duration: 0.4,
    //             autoAlpha: 1,
    //             '--tw-rotate': `${config.rotation}deg`,
                
    //             ease: "back.out(0.6)",
    //         }, 0);
    //         tl.to(textEl[i], {
    //             autoAlpha: 1,
    //             y: 0,
    //             duration: 0.5,
    //             ease: "power2.out",
    //         }, 0.2);

    //         galleryTl.push(tl);
    //     });
    //     ScrollTrigger.create({
    //         trigger: ".photo-gallery-outer",
    //         start: "top top",
    //         end: `+=${height}px`,
    //         pin: true,
    //         onUpdate(self) {
    //             const p = self.progress;
    //             const direction = self.direction;

    //             galleryTl.forEach((tl, i) => {
    //                 const threshold = i / steps; 

    //                 if (direction === 1 && p >= threshold && state[i] !== "played") {
    //                     state[i] = "played";
    //                     tl.timeScale(1).play();
    //                 }

    //                 if (direction === -1 && p < threshold && state[i] !== "reversed") {
    //                     state[i] = "reversed";
    //                     tl.timeScale(1.5).reverse();
    //                 }
    //             });
    //         },
    //     });
    // }



    const marqueeTextEl = gsap.utils.toArray('.marquee-text');
    const marqueeTl = horizontalLoop(marqueeTextEl, {
      repeat: -1,
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
