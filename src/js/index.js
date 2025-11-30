import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

ScrollSmoother.create({
  content: '#smooth-content',
  wrapper: '#smooth-wrapper',
  smooth: 1.5,
  effects: true,
  speed: 0.8,
});

// Your app code
import 'swiper/swiper.css';
import './components/hero-image';
import './components/product-highlight';
import './components/photo-gallery';
