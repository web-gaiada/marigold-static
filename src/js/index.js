import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText);

const __ScrollSmoother__ = ScrollSmoother.create({
  content: '#smooth-content',
  wrapper: '#smooth-wrapper',
  smooth: 1,
  effects: true,
  normalizeScroll: true,
  smoothTouch: true,
  speed: 0.5,
});

// Your app code
import 'swiper/swiper.css';
import './components/hero-image';
import './components/text-highlight';
import './components/product-highlight';
import './components/photo-gallery';
import "./components/product-list";
import "./components/title-break";
import "./components/product-single";


;(() => {
  document.addEventListener("DOMContentLoaded", () => {

    const mobileMenu = document.querySelector("aside#mobile-menu")
    const logoMenu = mobileMenu.querySelector('.logo-image-header img.logo-image')
    const tl = gsap.timeline({paused: true})
    tl.fromTo(mobileMenu, {
      translateY: '-100%',
      ease: 'power1.inOut'
    }, {
      translateY: '0%',
      ease: 'power1.inOut'
    }, 0)
    tl.fromTo(logoMenu, {
      scale: .6,
      ease: 'power1.inOut'
    }, {
      scale: 1.1,
      ease: 'power1.inOut'
    }, 0)
    
    tl.fromTo('#smooth-wrapper', {
      translateY: 0,
      zIndex: 2,
      borderRadius: '0',
      ease: 'power1.inOut'
    }, {
      translateY: '90%',
      zIndex: 9999,
      borderRadius: '6px',
      ease: 'power1.inOut'
    }, 0)
    mobileMenu.action = {
      open: () => {
        tl.play()
        __ScrollSmoother__.paused(true)
      },
      close: () => {
        tl.reverse()
        __ScrollSmoother__.paused(false)
      }
    }

    const hamburger = document.querySelector('.hamburger')
    hamburger.addEventListener("click", () => {
      mobileMenu.action.open()
    })
    mobileMenu.querySelector('.menu-close').addEventListener('click', () => {
      mobileMenu.action.close()
    })

  })
})()

;(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '#page',
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     pin: true,
    //   }
    // })
    // tl.to('#navigation', {

    // })
    const heroImage = document.querySelector('.section__hero-image')
    const navigation = document.querySelector('#navigation')
    if(heroImage) {
      gsap.to({}, {
        scrollTrigger: {
          trigger: heroImage,
          start: "bottom top",
          end: "bottom top",
          onEnter: () => document.body.classList.remove('inside-hero'),
          onLeaveBack: () => document.body.classList.add('inside-hero')
        }
      })
    } else {
      document.body.classList.add('nav-active')
    }
    let lastScroll = 0
    window.addEventListener('scroll', () => {
      if(lastScroll > window.scrollY) {
        document.body.classList.add('nav-active')
      } else {
        document.body.classList.remove('nav-active')
      }
      lastScroll = window.scrollY
    })
  })

})()

;(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const ageVerificationEl = document.querySelector('.modal__age-verification')

    ageVerificationEl.modal = {
      open: () => {
        gsap.to(ageVerificationEl, {
          display: 'block',
          autoAlpha: 1,
          position: 'fixed'
        })
        __ScrollSmoother__.paused(true)
      },
      
      close: () => {
        gsap.to(ageVerificationEl, {
          display: 'none',
          autoAlpha: 0,
          position: 'static'
        })
        __ScrollSmoother__.paused(false)
      }
    }

    if(localStorage.getItem('ageVerification')) {
      return
    }

    ageVerificationEl.modal.open()

    const yesButton = ageVerificationEl.querySelector('.yes-button')
    const noButton = ageVerificationEl.querySelector('.no-button')

    yesButton.addEventListener('click', () => {
      localStorage.setItem('ageVerification', true)
      ageVerificationEl.modal.close()
    })

    noButton.addEventListener('click', () => {
      window.open('https://www.youtube.com/channel/UCbCmjCuTUZos6Inko4u57UQ', '_blank').focus()
    })

  })
})()





// Stickies Component
;(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const whatsappSticky = document.querySelector('#whatsapp-sticky')
    const whatsappText = whatsappSticky.querySelector('.text-wrapper')
    whatsappSticky.action = {
      open: () => {
        gsap.to(whatsappText, {
          width: 'auto',
          ease: 'power1',
          duration: .2,
        })
      },
      close: () => {
        gsap.to(whatsappText, {
          width: 0,
          ease: 'power1',
          duration: .2,
        })
      }
    }
    whatsappSticky.addEventListener('mouseenter', () => {
      whatsappSticky.action.open()
    })
    whatsappSticky.addEventListener('mouseleave', () => {
      whatsappSticky.action.close()
    })
    window.addEventListener('scroll', () => {
      if(window.scrollY > 300) {
        whatsappSticky.action.close()
      } else {
        whatsappSticky.action.open()
      }
    })
  })
})()


;(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const splitEl = document.querySelectorAll('[data-split-text]')
    if(!splitEl.length) return
    document.fonts.ready.then(() => {
      splitEl.forEach(el => {
        SplitText.create(el, {
          type: el.dataset.splitType,
          // wordsClass: 'word-wrapper',
          autoSplit: true,
          smartWrap: true,
          // linesClass: 'force-line',
          // mask
          mask: el.dataset.splitType,
          onSplit: (self) => {
            const classes = el.classList.value.split(' ')
            self[el.dataset.splitType].forEach(d => {
              // const grandParent = d.parentElement.parentElement
              // if(grandParent.tagName == 'SPAN' && grandParent.classList.contains('font-extra')) {
              //   const boundWidth = d.getBoundingClientRect().width
              //   // const innerWidth = d.clientWidth
              //   // console.log(boundWidth, innerWidth)
              //   d.style.width = `${boundWidth + 12}px`
              // }
              classes.forEach(clas => {
                if(clas.includes('font')) return
                d.classList.add(clas)
              })
              d.classList.add('overflow-y-hidden')
            })
            const tl = gsap.timeline({
              paused: true,
              scrollTrigger: {
                trigger: el,
                start: "center center",
                once: true,
                // markers: true
              },
              // onComplete: () => {
              //   self.revert()
              // }
            })
            self[el.dataset.splitType].forEach((el, i) => {
              tl.fromTo(el, {
                yPercent: 120,
                // force3d: true
              }, {
                yPercent: 0,
                duration: .25,
                delay: i * .04,
                ease: 'power3.out'
              })
            })
            // console.log(self[el.dataset.splitType])
  
            // ScrollTrigger.create({
              
            //   markers: true,
            //   onEnter: () => {
            //     gsap.to(self[el.dataset.splitType], {
            //       yPercent: 0
            //     })
            //   }
            // })
          }
        })
      })
    })
  })
})()