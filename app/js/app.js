import {
  Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation,
} from 'swiper';

import { gsap, Power2 } from 'gsap';
import Micromodal from 'micromodal';

Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation]);

document.addEventListener('DOMContentLoaded', () => {
  // modal

  Micromodal.init({
    openTrigger: 'data-micromodal-open',
    closeTrigger: 'data-micromodal-close',
    disableFocus: true,
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  });

  /// Swiper
  const swiperIMG = new Swiper('.slider-img', {
    loop: false,
    speed: 2400,
    parallax: true,
    pagination: {
      el: '.slider-pagination-count .total',
      type: 'custom',
      renderCustom(swiper, current, total) {
        const totalRes = total >= 10 ? total : `0${total}`;
        return totalRes;
      },
    },

  });

  const swiperTEXT = new Swiper('.slider-text', {
    loop: false,
    speed: 2400,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,

    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',

    },
  });

  swiperIMG.controller.control = swiperTEXT;
  swiperTEXT.controller.control = swiperIMG;

  /// Gear

  const gear = document.querySelector('.slider-gear');

  swiperTEXT.on('slideNextTransitionStart', () => {
    gsap.to(gear, 2.8, {
      rotation: '+=40',
      ease: Power2.easeOut,
	 });
  });
  swiperTEXT.on('slidePrevTransitionStart', () => {
    gsap.to(gear, 2.4, {
      rotation: '-=40',
      ease: Power2.easeOut,
		 });
  });

  /// Slide Change
  const curnum = document.querySelector('.slider-pagination-count .current');
  const pagecur = document.querySelector('.slider-pagination-current__num');

  swiperTEXT.on('slideChange', () => {
    const ind = swiperTEXT.realIndex + 1;
    const indRes = ind >= 10 ? ind : `0${ind}`;
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: Power2.easeOut,
      onComplete() {
        gsap.to(curnum, 0.1, {
          force3D: true,
          y: 10,
        });
        curnum.innerHTML = indRes;
        pagecur.innerHTML = indRes;
      },
    });
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
      delay: 0.3,
    });
  });
  const body = document.querySelector('body');
  const cursor = document.getElementById('cursor');
  const links = document.getElementsByTagName('a');
  let mouseX = 0; let mouseY = 0; let posX = 0; let
    posY = 0;

  function mouseCoords(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  }

  gsap.to({}, 0.01, {

    repeat: -1,

    onRepeat: () => {
      posX += (mouseX - posX) / 1;
      posY += (mouseY - posY) / 1;

      gsap.set(cursor, {
        css: {
          left: posX,
          top: posY,
        },
      });
    },
  });

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', () => {
      cursor.classList.add('active');
    });

    links[i].addEventListener('mouseout', () => {
      cursor.classList.remove('active');
    });
  }

  body.addEventListener('mouseout', () => {
    cursor.classList.add('hidden');
  });
  body.addEventListener('mousemove', (e) => {
    mouseCoords(e);
    cursor.classList.remove('hidden');
  });
  body.addEventListener('mousemove', (e) => {
    mouseCoords(e);
  });
});
