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

  var myform = $("form#register");
  myform.on('submit', function (event) {
    event.preventDefault();

    // Change to your service ID, or keep using the default service
    var service_id = "trello";
    var template_id = "trello";

    var btn = myform.find("button")
    btn.text("Enviando...");
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
