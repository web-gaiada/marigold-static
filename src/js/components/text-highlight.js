import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

;(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const textHighlightEl = document.querySelector('.section__text-highlight')
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
        const lineTl = gsap.timeline({
            scrollTrigger: {
                trigger: textHighlightEl,
                start: 'center center',
                once: true,
                markers: true
            }
        })
        lineTl.to(lineEl, {
            width: '60px'
        })
    })
})()