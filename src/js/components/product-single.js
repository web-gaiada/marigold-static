import Swiper from "swiper";

;(() => {

    const createNavItem = (i) => {
        const div = document.createElement('div')
        div.classList.add('product-single__nav-button')
        div.classList.add('nav-button')
        div.dataset.index = i
        if(!i) div.classList.add('active');
        return div
    }

    document.addEventListener("DOMContentLoaded", () => {
        const productSingleEl = document.querySelector('.section__product-single')
        if(!productSingleEl) return
        const swiperEl = productSingleEl.querySelector('.swiper')
        const swiper = new Swiper(swiperEl, {
            slidesPerView: 1
        })
        const navEl = productSingleEl.querySelector('[data-swiper-nav="product-single"]')
        for (let i = 0; i < swiper.slides.length; i++) {
            navEl.append(createNavItem(i))
        }

        document.addEventListener("click", function(e){
            const target = e.target.closest(".product-single__nav-button"); // Or any other selector.
            if(target){
                document.querySelectorAll('.product-single__nav-button').forEach(el => {
                    el.classList.remove('active')
                })
                target.classList.add('active')
                swiper.slideTo(parseInt(target.dataset.index))
                // Do something with `target`.
            }
        });

        swiper.on('slideChange', (swiper) => {
            document.querySelectorAll('.product-single__nav-button').forEach((el, i) => {
                if(i == swiper.activeIndex) {
                    el.classList.add('active')
                    return
                }
                el.classList.remove('active')
            })
            // document.querySelector(`.product-single__nav-button[data-index="${swiper.activeIndex}"]`).classList('add')
        })

        const inputBuyAmount = productSingleEl.querySelector('input.buy-amount__display')
        productSingleEl.querySelector('.buy-amount-wrapper .plus-button').addEventListener('click', () => {
            inputBuyAmount.value = parseInt(inputBuyAmount.value) + 1
        })
        productSingleEl.querySelector('.buy-amount-wrapper .minus-button').addEventListener('click', () => {
            if(inputBuyAmount.value == inputBuyAmount.getAttribute('min')) return
            inputBuyAmount.value = parseInt(inputBuyAmount.value) - 1
        })

    })

})()