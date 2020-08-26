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
    console.log(event)

    // Change to your service ID, or keep using the default service
    var service_id = "trello";
    var template_id = "trello";

    myform.find("button").text("Sending...");
    emailjs.sendForm(service_id, template_id, myform[0])
      .then(function () {
        alert("Sent!");
        myform.find("button").text("Send");
      }, function (err) {
        alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        myform.find("button").text("Send");
      });
    return false;
  });
});
