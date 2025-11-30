import Swiper from "swiper";

;(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const heroImage = document.querySelector('#hero-image')
        const swiperEl = heroImage.querySelector('.swiper')
        const swiper = new Swiper(swiperEl, {
            slidesPerView: 1,
        })
    })
})()