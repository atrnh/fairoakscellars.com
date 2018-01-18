import $ from 'jquery';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollMagic from 'scrollmagic';

import './js/bootstrap.min';

window.jQuery = $;

const controller = new ScrollMagic.Controller();

controller.scrollTo((newpos, f) => {
  const scrollToOptions = { y: newpos };

  if (newpos !== 0) {
    const mobileNavHeight = (
      $('#mobile-nav').height() - $('#navCollapsedContent').height()
    );
    const navHeight = $('#destkop-nav').height() || mobileNavHeight;
    scrollToOptions.offsetY = navHeight + 40;
  }

  TweenLite.to(window, 0.5, { scrollTo: scrollToOptions });
  $('#navCollapsedContent').collapse('hide');
  f();  // callback
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

    const newLocation = id === '#' ? 0 : id;
    controller.scrollTo(newLocation, () => updateUrl(id));
  }
});
