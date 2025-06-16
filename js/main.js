;
(function () {

    'use strict';

    var projectsArray = [
        {
            "id": "projectResume",
            "url": "https://github.com/joseeeortizz/Jose-Ortiz---Resume"
            // Note: The original diff had updated project URLs here.
            // I'm keeping the structure from the provided main.js.
            // You should ensure these URLs match the ones in your index.html.
        },
        {
            "id": "projectPortfolio",
            "url": "https://github.com/joseeeortizz/joseeeortizz.github.io"
        },
        {
            "id": "projectSnake",
            "url": "https://github.com/joseeeortizz/SNAKE" // Original was SnakeGame
        },
        {
            "id": "projectCSCI127",
            "url": "https://github.com/joseeeortizz/CSCI127-Code" // Original was CSCI-127
        },
        {
            "id": "projectMAC286",
            "url": "https://github.com/joseeeortizz/MAC-286-code" // Original was MAC-286
        },
        {
            "id": "projectCSCI132",
            "url": "https://github.com/joseeeortizz/CSCI-132"
        },
        {
            "id": "projectCSCI395",
            "url": "https://github.com/joseeeortizz/CSCI-395" // Original was CSCI-395-Introduction-to-Data-Science
        },{
			"id": "projectCSCI493",
			"url": "https://github.com/joseeeortizz/CSCI-493" // Original was CSCI-493-Parallel-Computing
		},
		{
            "id": "projectNew",
            "url": "" // Placeholder, update if project becomes available
        },
    ];

    projectsArray.forEach(element => {
        var projectObject = document.getElementById(element.id);
        if (projectObject) { // Check if element exists
            projectObject.style.cursor = 'pointer';
            projectObject.onclick = function() {
                if (element.url) { // Check if URL is not empty
                    window.open(element.url, "_blank");
                }
            }
        }
    });

    // Add "Load More" functionality
    var loadMoreButton = document.getElementById("loadMore");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", function() {
            var moreProjects = document.querySelector(".more-projects");
            if (moreProjects) {
                var isHidden = moreProjects.style.display === "none" || moreProjects.style.display === "";

                // Toggle visibility using 'flex' for Bootstrap rows, or 'block' if not using flex
                moreProjects.style.display = isHidden ? "flex" : "none";
                
                // Optionally change button text
                this.textContent = isHidden ? "Show Less" : "Load More";
            }
        });
    }


	var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            // Updated to include MacIntel for modern iPads faking Mac user agent
            return navigator.userAgent.match(/iPhone|iPad|iPod|MacIntel/i) && navigator.maxTouchPoints > 1;
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var fullHeight = function () {
        // js-fullheight is used in hero and slider-text-inner.
        // With a fixed top navbar, full height should be viewport height minus navbar height.
        // However, CSS can often handle this better (e.g., min-height: calc(100vh - 70px);)
        // For simplicity, if js-fullheight is still used, it will make elements 100% of viewport.
        // Consider adjusting CSS for #colorlib-hero and .slider-text-inner if true "full height below navbar" is needed.
		if (!isMobile.any()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};


	var counter = function () {
		$('.js-counter').countTo({
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			},
		});
	};


	var counterWayPoint = function () {
		if ($('#colorlib-counter').length > 0) {
			$('#colorlib-counter').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, {
				offset: '90%'
			});
		}
	};

	// Animations
	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});

				}, 100);

			}

		}, {
			offset: '85%' // Adjust if elements are triggered too early/late with top navbar
		});
	};


	var burgerMenu = function () {
        // This function now primarily toggles an 'active' class on the Bootstrap navbar toggler
        // for potential custom styling (e.g., hamburger to X animation).
        // Bootstrap's data attributes (data-bs-toggle, data-bs-target) handle the actual menu expansion/collapse.
		$('.js-colorlib-nav-toggle.navbar-toggler').on('click', function (event) {
			event.preventDefault();
			$(this).toggleClass('active');
            // The body 'offcanvas' class is no longer needed for the top navbar.
		});
	};

	// Click outside of Bootstrap navbar to close it
	var mobileMenuOutsideClick = function () {
		$(document).click(function (e) {
			var $topNavbarCollapse = $('#main-navbar-collapse');
			var $navbarToggler = $('.js-colorlib-nav-toggle.navbar-toggler');

			// If the click is outside the expanded navbar and outside the toggler itself
			if (!$topNavbarCollapse.is(e.target) && $topNavbarCollapse.has(e.target).length === 0 &&
				!$navbarToggler.is(e.target) && $navbarToggler.has(e.target).length === 0) {

				if ($topNavbarCollapse.hasClass('show')) {
                    // Get the Bootstrap Collapse instance and hide it
                    var bsCollapse = bootstrap.Collapse.getInstance($topNavbarCollapse[0]);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
					$navbarToggler.removeClass('active'); // Reset active state of toggle
				}
			}
		});

        // Close menu on scroll
		$(window).scroll(function () {
            var $topNavbarCollapse = $('#main-navbar-collapse');
			if ($topNavbarCollapse.hasClass('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance($topNavbarCollapse[0]);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
				$('.js-colorlib-nav-toggle.navbar-toggler').removeClass('active');
			}
		});
	};

	var clickMenu = function () {
        // Updated for the top navbar menu items
		$('#navbar-top-menu a.nav-link:not([class*="external"])').click(function (event) { // Target .nav-link within #navbar-top-menu
			var section = $(this).data('nav-section');
			
			// Immediately update the active state on click
			navActive(section);

			if ($('[data-section="' + section + '"]').length) {
				$('html, body').animate({
					// Adjust scroll offset for the fixed top navbar height (e.g., 70px)
					scrollTop: $('[data-section="' + section + '"]').offset().top - 70 
				}, 500, 'easeInOutExpo');
			}

            // Close the Bootstrap collapse menu if it's open (on mobile)
            var $topNavbarCollapse = $('#main-navbar-collapse');
            if ($topNavbarCollapse.hasClass('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance($topNavbarCollapse[0]);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
                $('.js-colorlib-nav-toggle.navbar-toggler').removeClass('active');
            }

			event.preventDefault();
			return false;
		});
	};

	// Reflect scrolling in navigation
	var navActive = function (section) {
        // Updated selectors for the top navbar
		var $navItems = $('#navbar-top-menu .nav-item');
		$navItems.removeClass('active');
		$navItems.find('a.nav-link[data-nav-section="' + section + '"]').closest('.nav-item').addClass('active');
	};

	var navigationSection = function () {
		var $section = $('section[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: '150px' // Adjust if sections highlight too early/late with top navbar
		});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () {
                // Adjust offset for fixed top navbar (e.g., 70px)
				return -$(this.element).height() + 75; // 70 for navbar + 5 buffer
			}
		});
	};

	var sliderMain = function () {
		$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true, // Set to true if you want FlexSlider's default nav arrows
            controlNav: true,   // Set to true for pagination dots
			start: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}
		});
	};

	var owlCrouselFeatureSlide = function () {
        // Check if .owl-carousel elements exist before initializing
        if ($('.owl-carousel').length > 0) {
            $('.owl-carousel').owlCarousel({
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                autoplay: true,
                loop: true,
                margin: 0,
                nav: true,
                dots: false,
                autoHeight: true,
                items: 1,
                navText: [
                    "<i class='icon-arrow-left3 owl-direction'></i>",
                    "<i class='icon-arrow-right3 owl-direction'></i>"
                ]
            });
        }
	};

	// Document on load.
	$(function () {
        fullHeight();
        // counter(); // Assuming .js-counter elements might not always be present
        // counterWayPoint(); // Assuming #colorlib-counter might not always be present
        if ($('.js-counter').length > 0 && $('#colorlib-counter').length > 0) {
            counter();
            counterWayPoint();
        }
        contentWayPoint();
        burgerMenu();
        clickMenu();
        navigationSection(); // Added this to ensure scroll spying works
        mobileMenuOutsideClick();
        sliderMain();
        owlCrouselFeatureSlide();

        // Scroll to top on reload
        $(window).on('beforeunload', function() {
            $(window).scrollTop(0);
        });
    });

}());

// Auto scroll to top of page (This IIFE was empty, can be removed or used)
// (function () {
// })()
