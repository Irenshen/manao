$(document).ready(function () {
  //burder
  $(".burger").click(function () {
    $(".menu-wrap").addClass("menu-active");
    $("body").addClass("modal-open");
  });

  $(".header-close").click(function () {
    $(".menu-wrap").removeClass("menu-active");
    $("body").removeClass("modal-open");
  });

  //menu-mobile
  if ($(window).width() <= 500) {
    $("header a").click(function () {
      $(".menu-wrap").removeClass("menu-active");
      $("body").removeClass("modal-open");
    });
  }

  //header-active (background)
  !(function () {
    const e = document.querySelector(".header");
    window.onscroll = () => {
      window.pageYOffset > 50
        ? e.classList.add("header-active")
        : e.classList.remove("header-active");
    };
  })();

  //navigation page
  if ($(".nav-block").length > 0) {
    let flySections = $(".fly-section"),
      flyNav = $(".nav-block__list"),
      flyNav_height = 108;

    $(window).on("scroll", function () {
      let cur_pos = $(this).scrollTop();
      flySections.each(function () {
        let top = $(this).offset().top - flyNav_height - 20,
          bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          flyNav.find("a").removeClass("active");
          flySections.removeClass("active");
          $(this).addClass("active");
          flyNav
            .find('a[href="#' + $(this).attr("id") + '"]')
            .addClass("active");
        }
        if (cur_pos <= flyNav_height) {
          flyNav.find("a").removeClass("active");
        }
      });

    });

    flyNav.find("a").on("click", function () {
      let $el = $(this),
        elemId = $el.attr("href");

      $("html, body").animate(
        {
          scrollTop: $(elemId).offset().top - flyNav_height,
        },
        100
      );

      return false;
    });
  }

  //popup

  $(".popup-close").click(function () {
    $(".popup").removeClass("opened");
    $("body").removeClass("modal-open");
  });

  if ($(".popup")) {
    document.addEventListener("click", function (e) {
      let target = e.target;
      // console.log(target.classList);
      if (
        target.classList.contains("popup-close") ||
        target.classList.contains("popup__inner")
      ) {
        $(".popup").removeClass("opened");
        $("body").removeClass("modal-open");
      }
    });
  }

  //swiper
  let publicationsSlider = new Swiper(".publications-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    touchRatio: 1,
    watchOverflow: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "visibleSlide",

    navigation: {
      nextEl: ".swiper-btn-publications-next",
      prevEl: ".swiper-btn-publications-prev",
    },
    breakpoints: {
      460: {
        slidesPerView: 1,
      },
    },
  });

  //form validation
  $(function () {
    $("#feedback-form").on("submit", function (e) {

      e.preventDefault();

      // Clear previous errors
      $(".input-item__error").text("");

      let isValid = true;

      // Validate name input
      const nameInput = $('input[name="name"]');
      if (nameInput.val().trim() === "") {
        $(nameInput)
          .siblings(".input-item__error")
          .text('Поле "Имя" обязательно для заполнения.');
        isValid = false;
      }

      // Validate email input
      const emailInput = $('input[name="adress"]');
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(emailInput.val())) {
        $(emailInput)
          .siblings(".input-item__error")
          .text('Поле "Адрес сайта" заполнено неверно.');
        isValid = false;
      }

      // Validate description input
      const descriptionInput = $('textarea[name="description"]');
      if (descriptionInput.val().trim() === "") {
        $(descriptionInput)
          .siblings(".input-item__error")
          .text('Поле "Описание задач" обязательно для заполнения.');
        isValid = false;
      }

      // Validate at least one checkbox is checked
      const checkboxes = $(".checkebox");
      let isCheckboxChecked = false;
      checkboxes.each(function () {
        if ($(this).is(":checked")) {
          isCheckboxChecked = true;
          return false;
        }
      });
      if (!isCheckboxChecked) {
        $(".form__checkeboxes")
          .children(".input-item__error")
          .text("Пожалуйста, выберите хотя бы одну опцию.");
        isValid = false;
      }

      //reset form values
      function resetFormValues() {
        $('.footer__form input[type="text"], .footer__form textarea').val("");
        $(".footer__form .checkebox").prop("checked", false);
      }

    
      // submit 
      if (isValid) {
        let form_data_check = $('input[type=checkbox]').map(function() {
          return { name: this.name, value: this.checked ? this.value : "false" };
        }).get();
        var form_data = $('#feedback-form').serializeArray()

        form_data.push(form_data_check);
        console.log(form_data);


        e.preventDefault();
        // $(this).off('submit');
        // $(this).submit();
        $(".popup").addClass("opened");
        $("body").addClass("modal-open");
        resetFormValues();

      }
    });
  });
});
