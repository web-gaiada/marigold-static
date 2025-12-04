import gsap from "gsap";

;(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const productListWrapper = document.querySelector('.section__product-list')
        if(!productListWrapper) return
        const productList = productListWrapper.querySelectorAll('.product-item')
        const defaultHoverState = {
            '--product-border-color': 'unset',
            '--product-border-style': 'unset',
            '--product-border-width': '0px',
            '--product-title-color': '#565656',
            '--product-subtitle-color': '#909090',
            '--product-opacity': 0,
            '--product-visibility': 'hidden',
            '--product-border-rotate': '0deg',
            '--product-z-index': '-1'
        }
        // productList.forEach(el => {
        //     gsap.to(el.querySelector('.hover-image'), {
        //         autoAlpha: 0
        //     })
        // })
        productList.forEach(el => {
            el.addEventListener("mouseenter", () => {
                gsap.to(el, {
                    '--product-border-color': '#fff',
                    '--product-border-style': 'solid',
                    '--product-border-width': '1px',
                    '--product-title-color': '#fff',
                    '--product-subtitle-color': '#fff',
                    '--product-opacity': 1,
                    '--product-visibility': 'visible',
                    '--product-border-rotate': '-1.1deg',
                    '--product-z-index': '1'
                })
            })

            el.addEventListener("mouseleave", () => {
                gsap.to(el, {...defaultHoverState})
            })
        })


    })
})()