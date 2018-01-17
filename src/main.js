import $ from 'jquery';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollMagic from 'scrollmagic';

import './js/bootstrap.min';

window.jQuery = $;

const controller = new ScrollMagic.Controller();

controller.scrollTo((newpos, f) => {
  if (newpos === 0) {
    TweenLite.to(
      window,
      0.5,
      {
        scrollTo: {
          y: 0
        }
      }
    );

    updateUrl('#');
  } else {
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

    updateUrl(newpos);
  }

  $('#navCollapsedContent').collapse('hide');
});

const updateUrl = (id) => {
  if (id === '#') { id = '/'; }
  if (window.history && window.history.pushState) {
    history.pushState('', document.title, id);
  }
}

$(document).on('click', 'a[href^=\\#]', function (e) {
  const id = $(this).attr('href');

  if (id.length > 0) {
    e.preventDefault();

    if (id === "#") {
      controller.scrollTo(0);
    } else {
      controller.scrollTo(id);
    }


  }
});
