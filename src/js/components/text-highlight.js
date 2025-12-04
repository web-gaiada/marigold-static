import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

;(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const textHighlightEl = document.querySelector('.section__text-highlight')
        if(!textHighlightEl) return
        const TEXT_CLASS = [
            'font-serif',
            'font-extra',
            'font-sans'
        ]
        const lineEl = textHighlightEl.querySelector('.line')
        // textHighlightEl.querySelectorAll('.font-extra').forEach(el => {
        //     let i = 0
        //     el.textChange = setInterval(() => {
        //         i++
        //         if(i > TEXT_CLASS.length) {
        //             i = 0
        //         }
        //         el.classList.add(TEXT_CLASS[i])
        //         el.classList.remove(TEXT_CLASS[i-1])
        //     }, 2500)

        // })

        const textTl = gsap.timeline({
            scrollTrigger: {
                // once: true,
                start: 'center center',
                trigger: textHighlightEl,
            }
        })
        textHighlightEl.querySelectorAll('.trigger-slide').forEach(el => {
            textTl.fromTo(el, {
                x: el.dataset.direction == 'right' ? '110%' : '-110%',
                autoAlpha: 0,
                duration: .4,
                ease: 'power3.inOut',
            }, {
                x: 0,
                autoAlpha: 1,
                duration: .4,
                ease: 'power3.inOut',
            }, 0)
        })
        textHighlightEl.querySelectorAll('.highlight-mask').forEach(el => {
            textTl.fromTo(el, {
                overflow: 'hidden'
            }, {
                overflow: 'visible'
            }, 0)
        })
        const lineTl = gsap.timeline({
            scrollTrigger: {
                trigger: textHighlightEl,
                start: 'center center',
                once: true,
                // markers: true
            }
        })
        lineTl.to(lineEl, {
            width: '60px'
        })
    })
})()