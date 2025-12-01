import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

;(() => {

    document.addEventListener("DOMContentLoaded", () => {
        const titleBreakEl = document.querySelector('.section__title-break')
        const outlineWrappers = titleBreakEl.querySelectorAll('.text-outline-wrapper p')
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: titleBreakEl,
                start: 'top center',
                end: 'bottom top',
                scrub: true,
                
            }
        })
        tl.to(outlineWrappers[0], {
            rotate: '2deg'
        }, 0)
        tl.to(outlineWrappers[1], {
            rotate: '-2deg'
        }, 0)
    })

})()