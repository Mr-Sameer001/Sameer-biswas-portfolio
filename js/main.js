/**
 * Biogi Portfolio - Core Interactive Features
 * Animations, Mobile Navigation, ScrollSpy, Testimonial Slider, Modals & Popups
 */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById("menu-toggle");
  const hamburger = document.getElementById("hamburger-1");
  const sideMenu = document.querySelector(".side-menu");
  const navLinks = document.querySelectorAll(".menu-list-main ul li a");

  if (menuToggle && hamburger && sideMenu) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburger.classList.toggle("is-active");
      sideMenu.classList.toggle("show");
    });

    // Close menu when clicking outside on mobile
    document.addEventListener("click", function (e) {
      if (
        window.innerWidth < 1200 &&
        sideMenu.classList.contains("show") &&
        !sideMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        hamburger.classList.remove("is-active");
        sideMenu.classList.remove("show");
      }
    });

    // Close menu when clicking any nav item on mobile
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 1200) {
          hamburger.classList.remove("is-active");
          sideMenu.classList.remove("show");
        }
      });
    });
  }

  // 2. SCROLL ENTRANCE ANIMATIONS (IntersectionObserver)
  const animSelectors = [
    ".fade_up",
    ".fade_down",
    ".fade_left",
    ".fade_right",
    ".zoom_in",
    ".zoom_out",
    ".flip_up",
    ".flip_down",
    ".flip_left",
    ".flip_right"
  ].join(",");

  const animElements = document.querySelectorAll(animSelectors);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    animElements.forEach(function (el) {
      // If already in top of viewport on load, show immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("show");
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback: show all elements
    animElements.forEach(function (el) {
      el.classList.add("show");
    });
  }

  // 3. SCROLLSPY (Highlight active nav link)
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    let currentId = "";
    const scrollPos = window.scrollY + 160;

    sections.forEach(function (sec) {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    if (!currentId && sections.length > 0) {
      currentId = sections[0].getAttribute("id");
    }

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === "#" + currentId) {
        link.classList.add("active");
        link.parentElement.classList.add("active-menu-action");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // 4. TESTIMONIALS SLIDER
  const slider = document.querySelector(".Testimonials");
  if (slider) {
    const track = slider.querySelector(".slick-track");
    const dots = slider.querySelectorAll(".slick-dots li");
    const slides = slider.querySelectorAll(".slick-slide:not(.slick-cloned)");

    let currentIndex = 0;
    const totalSlides = slides.length || 4;
    let autoPlayTimer = null;

    function getSlideWidth() {
      const sliderWidth = slider.querySelector(".slick-list").offsetWidth;
      // Show 2 slides if container width >= 800px, else 1 slide
      return sliderWidth >= 800 ? sliderWidth / 2 : sliderWidth;
    }

    function updateSlider(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      const slideWidth = getSlideWidth();
      const offset = -(currentIndex * slideWidth);

      if (track) {
        track.style.transform = `translate3d(${offset}px, 0px, 0px)`;
      }

      dots.forEach(function (dot, i) {
        if (i === currentIndex) {
          dot.classList.add("slick-active");
        } else {
          dot.classList.remove("slick-active");
        }
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function (e) {
        e.preventDefault();
        clearInterval(autoPlayTimer);
        updateSlider(i);
        startAutoPlay();
      });
    });

    function startAutoPlay() {
      autoPlayTimer = setInterval(function () {
        updateSlider(currentIndex + 1);
      }, 4500);
    }

    window.addEventListener("resize", function () {
      updateSlider(currentIndex);
    });

    updateSlider(0);
    startAutoPlay();
  }

  // 5. POPUP MODALS
  // A. Services Popup
  const servicesPopup = document.getElementById("services-popup");
  const serviceTriggers = document.querySelectorAll('.services-column a, a[href="#services-popup"], a[href="/#services-popup"]');
  
  serviceTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      if (servicesPopup) {
        servicesPopup.style.display = "flex";
      }
    });
  });

  if (servicesPopup) {
    const closeBtn = servicesPopup.querySelector(".close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        servicesPopup.style.display = "none";
      });
    }
    servicesPopup.addEventListener("click", function (e) {
      if (e.target === servicesPopup) {
        servicesPopup.style.display = "none";
      }
    });
  }

  // B. Corporate Branding Popup (.popup-wrap)
  const popupWrap = document.querySelector(".popup-wrap");
  const popupBtns = document.querySelectorAll(".popup-btn");
  const popupClose = document.querySelector(".popup-close");

  popupBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (popupWrap) {
        popupWrap.classList.add("visible");
        popupWrap.style.display = "block";
      }
    });
  });

  if (popupClose && popupWrap) {
    popupClose.addEventListener("click", function (e) {
      e.preventDefault();
      popupWrap.classList.remove("visible");
      popupWrap.style.display = "none";
    });

    popupWrap.addEventListener("click", function (e) {
      if (e.target === popupWrap) {
        popupWrap.classList.remove("visible");
        popupWrap.style.display = "none";
      }
    });
  }

  // C. Gallery Popup (#popup2)
  const popup2 = document.getElementById("popup2");
  const galleryTriggers = document.querySelectorAll('a[href="#popup2"]');

  galleryTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      if (popup2) {
        popup2.style.display = "flex";
      }
    });
  });

  if (popup2) {
    const closeGallery = popup2.querySelector(".close");
    if (closeGallery) {
      closeGallery.addEventListener("click", function (e) {
        e.preventDefault();
        popup2.style.display = "none";
      });
    }
    popup2.addEventListener("click", function (e) {
      if (e.target === popup2) {
        popup2.style.display = "none";
      }
    });
  }

  // D. Blog Popup (#blog-popup)
  const blogTriggers = document.querySelectorAll('a[href="#blog-popup"]');
  blogTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      if (servicesPopup) {
        servicesPopup.style.display = "flex";
      }
    });
  });

  // ESC key closes any open modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (servicesPopup) servicesPopup.style.display = "none";
      if (popup2) popup2.style.display = "none";
      if (popupWrap) {
        popupWrap.classList.remove("visible");
        popupWrap.style.display = "none";
      }
    }
  });

  // 6. CONTACT FORM SUBMISSION
  const submitBtn = document.querySelector(".contact-section .wrapper.blog-btn a");
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      if (nameInput && !nameInput.value.trim()) {
        alert("Please enter your name.");
        nameInput.focus();
        return;
      }
      if (emailInput && !emailInput.value.trim()) {
        alert("Please enter your email.");
        emailInput.focus();
        return;
      }

      alert("Thank you! Your message has been sent successfully.");
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      const subjectInput = document.getElementById("subject");
      if (subjectInput) subjectInput.value = "";
      if (messageInput) messageInput.value = "";
    });
  }

  console.log("Biogi Portfolio initialized successfully.");
});

