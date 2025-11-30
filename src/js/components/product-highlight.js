import gsap from 'gsap'
;(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const productHighlightEl = document.querySelector('.section__product-highlight')
        


        // repeatText
        const repeatTextEl = productHighlightEl.querySelector('.repeat-text')
        const repeatText = repeatTextEl.dataset.repeatText
        const wrapperRepeatText = repeatTextEl.querySelector('.inner-wrapper')
        for(let i = 0; i < 6; i++) {
            const div = document.createElement('div')
            div.style.position = 'absolute'
            div.style.top = 0
            div.style.left = '50%'
            div.style.transform = 'translateX(-50%)'
            div.classList.add('text-repeater')
            div.innerText = repeatText
            wrapperRepeatText.append(div)
        }
        const textRepeatEl = repeatTextEl.querySelector('.text-repeater')
        // setTimeout(() => {
            // repeatTextEl.querySelectorAll('.text-repeater').forEach((el, i) => {
            //     for(let k = j; k < 5; k++) {
            //         console.log(k, 'k')
            //         gsap.to(el, {
            //             top: `${textRepeatEl.getBoundingClientRect().height * k}px`,
            //             // delay: k * .15,
            //             duration: .45,
            //             ease: "power3.inOut"
            //         })
            //     }
            //     j++
            //     console.log(j)
            // })
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: productHighlightEl,
                // onEnter: textRepeatAnim,
                start: 'top center'
            }
        })

        // const textRepeatAnim = () => {
            const theEl = repeatTextEl.querySelectorAll('.text-repeater')
            for(let i = 0; i < 5; i++) {
                for (let k = i; k < 5; k++) {
                    tl.to(theEl[k], {
                        top: `${textRepeatEl.getBoundingClientRect().height * i}px`,
                        duration: .25,
                        ease: 'power3.inOut',
                        delay: i * .2
                    }, 0)
                }
            }
        // }
        // }, 2500)

        const rotateLogoEl = document.querySelector('.rotate-icon-wrapper img')
        gsap.to(rotateLogoEl, {
            rotation: 360,
            duration: 9,
            ease: "none",
            repeat: -1
        })
    })
})()