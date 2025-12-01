import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

ScrollSmoother.create({
  content: '#smooth-content',
  wrapper: '#smooth-wrapper',
  smooth: 1,
  effects: true,
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