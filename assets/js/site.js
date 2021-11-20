

/**
 * アンカースクロール
 */
;(function(global, $, undefined) {
  'use strict';

  const scrollToAnchor = function(hash, useAnimation) {
    const $header = $('.header');
    const targetId = decodeURIComponent(hash);

    let scroll = 0;
    let target = $(targetId);
    target = target.length ? target : $("[id=" + hash.slice(1) + "]");

    if (target.length) {
      const avail = $(document).height() - $(window).height();
      const headerHeight = ($header.css('position') === 'fixed') ? $header.height() : 0;

      scroll = target.offset().top - headerHeight;
      if (scroll > avail) {
        scroll = avail;
      }

      if(useAnimation) {
        $("html, body").animate({scrollTop: scroll}, 400);
      } else {
        $('html, body').scrollTop(scroll);
      }
    }
  }

  // リンククリック時
  $("a[href^='#']").not('[data-no-scroll]').on("click.anchor-scroll", function(e) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      e.preventDefault();
      scrollToAnchor(this.hash, true);
    }
  });

  // ページロード時
  $(window).on('load', function() {
    if( location.hash ) {
      scrollToAnchor(location.hash, false);
    }
  });
}(this, jQuery));
/**
 * 折りたたみ
 */
;(function(global, $, undefined) {
  'use strict';

  $(function () {
    $('[data-toggle="collapse"]').off('click.anchor-scroll').click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $head  = $(this);
      const id = $head.attr('href');
      const $content = $(id);
      const group = $head.data('toggle-group');

      if( $content.hasClass('is-opening') || $content.hasClass('is-closing') ) {
        return;
      }

      if( $head.hasClass('is-opened') ) {
        $head.removeClass('is-opened');
        $content.css('height', $content.get(0).scrollHeight);

        //NOTE: あえてreflowを発生させる（この記述がないと、このすぐ後にheightを変更したときにtransitionが効かない）
        // 参考 https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js
        $content.get(0).offsetHeight;

        $content
          .addClass('is-closing')
          .removeClass('is-opened')
          .one('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
            $(this).removeClass('is-closing');
          })
          .css('height', '');
      } else {
        if( group ) {
          $('.is-opened[data-toggle-group="' + group + '"]').not($head).each(function() {
            const $head2  = $(this);
            const id2 = $head2.attr('href');
            const $content2 = $(id2);

            $head2.removeClass('is-opened');
            $content2.css('height', $content2.get(0).scrollHeight);

            //NOTE: あえてreflowを発生させる（この記述がないと、このすぐ後にheightを変更したときにtransitionが効かない）
            // 参考 https://github.com/twbs/bootstrap/blob/main/js/src/collapse.js
            $content2.get(0).offsetHeight;

            $content2
              .addClass('is-closing')
              .removeClass('is-opened')
              .one('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                $(this).removeClass('is-closing');
              })
              .css('height', '');
          });
        }

        $head.addClass('is-opened');

        $content
          .addClass('is-opening')
          .one('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
            $head.addClass('is-opened');
            $(this).addClass('is-opened').removeClass('is-opening').css('height','');
          })
          .css('height', $content.get(0).scrollHeight);
      }
    });
  });
}(this, jQuery));
/**
 * スマホメニュー開閉
 */
;(function(global, $, undefined) {
  'use strict';

  $(function () {
    const $button = $('[data-menu]');
    const $menu = $('.header__bottom');

    $('[data-menu]').click(function(e) {
      e.preventDefault();

      if( $button.hasClass('is-opened') ) {
        $button.removeClass('is-opened');
        $menu.removeClass('is-opened');
      } else {
        $button.addClass('is-opened');
        $menu.addClass('is-opened');
      }
    });

    $('.header-menu > a').click(function(e) {
      if( $button.hasClass('is-opened') ) {
        $button.removeClass('is-opened');
        $menu.removeClass('is-opened');
      }
    });
  });
}(this, jQuery));

$(function(){
  window.onscroll = function () {
    var check = window.pageYOffset ;
    var docHeight = $(document).height();
    var dispHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    if(check > docHeight-dispHeight-1000){
      // ページ下部で非表示
      $('.fixed-menu').fadeOut(500);
    }else if( scrollTop > dispHeight){
      // ファーストビュー分スクロール後に非表示
      $('.fixed-menu').fadeIn(500);
    }else{
      // ファーストビュー内に入ったら非表示
      $('.fixed-menu').fadeOut(500);
    }
  };
});


