import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollMagic from 'scrollmagic';
import $ from 'jquery';

const controller = new ScrollMagic.Controller();

controller.scrollTo((newpos) => {
  const navHeight = $('nav').height();
  TweenLite.to(
    window,
    0.5,
    {
      scrollTo: {
      y: newpos,
      offsetY: navHeight + 40
    }
  });
});

$(document).on('click', 'a[href^="#"]', function (e) {
  const id = $(this).attr('href');

  if ($(id).length > 0) {
    e.preventDefault();
    controller.scrollTo(id);

    if (window.history && window.history.pushState) {
      history.pushState('', document.title, id);
    }
  }
});
