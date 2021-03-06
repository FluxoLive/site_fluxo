$(function () {
  // =====================================================
  //      NAVBAR
  // =====================================================
  var c,
    currentScrollTop = 0;
  $(window).on("scroll load", function () {
    if ($(window).scrollTop() >= 100) {
      $(".navbar").addClass("active");
    } else {
      $(".navbar").removeClass("active");
    }

    // Navbar functionality
    var a = $(window).scrollTop(),
      b = $(".navbar").height();

    currentScrollTop = a;
    if (c < currentScrollTop && a > b + b) {
      $(".navbar").addClass("scrollUp");
    } else if (c > currentScrollTop && !(a <= b)) {
      $(".navbar").removeClass("scrollUp");
    }
    c = currentScrollTop;
  });

  // =====================================================
  //      PREVENTING URL UPDATE ON NAVIGATION LINK
  // =====================================================
  $(".link-scroll").on("click", function (e) {
    var anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr("href")).offset().top - 100
        },
        1000
      );
    e.preventDefault();
  });

  // =====================================================
  //      SCROLL SPY
  // =====================================================
  $("body").scrollspy({
    target: "#navbarSupportedContent",
    offset: 80
  });

  // =====================================================
  //      pulse botão
  // =====================================================
  $(".btn").on("mouseover mouseout", function () {
    $(this).toggleClass("animated pulse");
  });

  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
    spOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      }
    };
  $('.phone').mask(SPMaskBehavior, spOptions);


  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 6,
        nav: true,
        loop: false
      }
    }
  })

  var myform = $("form#register");
  myform.on('submit', function (event) {
    event.preventDefault();

    // Change to your service ID, or keep using the default service
    var service_id = "trello";
    var template_id = "trello";

    var btn = myform.find("button")
    btn.text("Enviando...").attr('disabled', true)
    emailjs.sendForm(service_id, template_id, myform[0])
      .then(function () {
        myform[0].reset()
        btn.text("OBRIGADO! Entraremos em contato").attr('disabled', true).removeClass('btn-gradient').addClass('btn-success');
        setTimeout(() => {
          btn.text("Enviar").removeClass('btn-success').addClass('btn-gradient').removeAttr('disabled')
          $("#modal-register").modal('hide');
        }, 3000)
      }, function (err) {
        btn.text("Ocorreu um erro! Tente novamente").attr('disabled', true).removeClass('btn-gradient').addClass('btn-danger');
        setTimeout(() => {
          btn.text("Enviar").removeClass('btn-danger').addClass('btn-gradient').removeAttr('disabled')
        }, 3000)

      });
    return false;
  });
});
