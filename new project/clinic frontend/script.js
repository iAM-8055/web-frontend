"use strict";

document.addEventListener("DOMContentLoaded", () => {

/* =================================================
   ELEMENTS
================================================= */

const header =
    document.querySelector(".site-header");

const menuButton =
    document.querySelector(".mobile-menu-button");

const mobileNavigation =
    document.querySelector(".mobile-navigation");

const mobileLinks =
    document.querySelectorAll(
        ".mobile-navigation a"
    );


/* =================================================
   STICKY HEADER
================================================= */

const updateHeader = () => {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

};


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();


/* =================================================
   MOBILE MENU
================================================= */

const closeMobileMenu = () => {

    if (!menuButton || !mobileNavigation) {
        return;
    }

    menuButton.classList.remove("active");

    mobileNavigation.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileNavigation.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

};


const openMobileMenu = () => {

    if (!menuButton || !mobileNavigation) {
        return;
    }

    menuButton.classList.add("active");

    mobileNavigation.classList.add("open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    mobileNavigation.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

};


if (menuButton && mobileNavigation) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNavigation.classList.contains("open");


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );

}


/* =================================================
   TESTIMONIAL CAROUSEL
================================================= */

const testimonialSlides =
    document.querySelectorAll(
        ".testimonial-slide"
    );

const testimonialDots =
    document.querySelectorAll(
        ".testimonial-dot"
    );

const testimonialPrevious =
    document.querySelector(
        ".testimonial-prev"
    );

const testimonialNext =
    document.querySelector(
        ".testimonial-next"
    );


let currentTestimonial = 0;


const showTestimonial = (index) => {

    testimonialSlides.forEach(
        (slide, slideIndex) => {

            slide.classList.toggle(
                "active",
                slideIndex === index
            );

        }
    );


    testimonialDots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === index
            );

        }
    );


    currentTestimonial = index;

};


if (
    testimonialSlides.length &&
    testimonialPrevious &&
    testimonialNext
) {

    testimonialNext.addEventListener(
        "click",
        () => {

            const nextIndex =
                (currentTestimonial + 1) %
                testimonialSlides.length;

            showTestimonial(nextIndex);

        }
    );


    testimonialPrevious.addEventListener(
        "click",
        () => {

            const previousIndex =
                (
                    currentTestimonial -
                    1 +
                    testimonialSlides.length
                ) %
                testimonialSlides.length;

            showTestimonial(previousIndex);

        }
    );


    testimonialDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showTestimonial(index);

                }
            );

        }
    );

}


/* =================================================
   FAQ ACCORDION
================================================= */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach((item) => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    if (!question) {
        return;
    }


    question.addEventListener(
        "click",
        () => {

            const wasActive =
                item.classList.contains(
                    "active"
                );


            faqItems.forEach(
                (otherItem) => {

                    otherItem.classList.remove(
                        "active"
                    );


                    const otherButton =
                        otherItem.querySelector(
                            ".faq-question"
                        );


                    if (otherButton) {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );


            if (!wasActive) {

                item.classList.add(
                    "active"
                );

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

});


/* =================================================
   SCROLL REVEAL
================================================= */

const revealElements =
    document.querySelectorAll(
        ".section > .container, " +
        ".service-card, " +
        ".feature-card, " +
        ".technology-item"
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "revealed"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "revealed"
            );

        }
    );

}


/* =================================================
   FINAL
================================================= */

console.log(
    "Lumina Dental website loaded."
);


});