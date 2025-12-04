import Swiper from "swiper";

;(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const heroImage = document.querySelector('.section__hero-image')
        if(!heroImage) return
        const swiperEl = heroImage.querySelector('.swiper')
        const swiper = new Swiper(swiperEl, {
            slidesPerView: 1,
        })
    })
})()