/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});
// ===============================
// Dynamic Filtered Gallery
// ===============================

// STEP 1: Store image paths per category
const galleryImages = {
  wildlife: [
    { thumb: "images/thumbs/wildlife1.jpg", full: "images/fulls/wildlife1.jpg", title: "Buddy" },
    { thumb: "images/thumbs/wildlife2.jpg", full: "images/fulls/wildlife2.jpg", title: "Fluffy" },
	{ thumb: "images/thumbs/wildlife3.jpg", full: "images/fulls/wildlife3.jpg", title: "Whiskers" },
	{ thumb: "images/thumbs/wildlife4.jpg", full: "images/fulls/wildlife4.jpg", title: "Shadow" },
	{ thumb: "images/thumbs/wildlife5.jpg", full: "images/fulls/wildlife5.jpg", title: "Mittens" },
	{ thumb: "images/thumbs/wildlife6.jpg", full: "images/fulls/wildlife6.jpg", title: "Socks" },
	{ thumb: "images/thumbs/wildlife7.jpg", full: "images/fulls/wildlife7.jpg", title: "Paws" },
	{ thumb: "images/thumbs/wildlife8.jpg", full: "images/fulls/wildlife8.jpg", title: "Coco" },
	{ thumb: "images/thumbs/wildlife9.jpg", full: "images/fulls/wildlife9.jpg", title: "Bella" },
	{ thumb: "images/thumbs/wildlife10.jpg", full: "images/fulls/wildlife10.jpg", title: "Leo" },
	{ thumb: "images/thumbs/wildlife11.jpg", full: "images/fulls/wildlife11.jpg", title: "Max" },
	{ thumb: "images/thumbs/wildlife12.jpg", full: "images/fulls/wildlife12.jpg", title: "Luna" }
  ],
  landscapes: [
    { thumb: "images/thumbs/land1.jpg", full: "images/fulls/land1.jpg", title: "Sunset Ridge" },
    { thumb: "images/thumbs/land2.jpg", full: "images/fulls/land2.jpg", title: "Forest Trail" },
	{ thumb: "images/thumbs/land3.jpg", full: "images/fulls/land3.jpg", title: "Mountain Peak" },
	{ thumb: "images/thumbs/land4.jpg", full: "images/fulls/land4.jpg", title: "Ocean View" },
	{ thumb: "images/thumbs/land5.jpg", full: "images/fulls/land5.jpg", title: "Desert Dunes" },
	{ thumb: "images/thumbs/land6.jpg", full: "images/fulls/land6.jpg", title: "River Bend" },
	{ thumb: "images/thumbs/land7.jpg", full: "images/fulls/land7.jpg", title: "Rolling Hills" },
	{ thumb: "images/thumbs/land8.jpg", full: "images/fulls/land8.jpg", title: "Autumn Forest" },
	{ thumb: "images/thumbs/land9.jpg", full: "images/fulls/land9.jpg", title: "Snowy Mountains" },
	{ thumb: "images/thumbs/land10.jpg", full: "images/fulls/land10.jpg", title: "Lakeside" },
	{ thumb: "images/thumbs/land11.jpg", full: "images/fulls/land11.jpg", title: "City Skyline" },
	{ thumb: "images/thumbs/land12.jpg", full: "images/fulls/land12.jpg", title: "Starry Night" }
  ],
  people: [
  { thumb: "images/thumbs/people1.jpg", full: "images/fulls/people1.jpg", title: "Wedding Day" },
  { thumb: "images/thumbs/people2.jpg", full: "images/fulls/people2.jpg", title: "Graduation" },
  { thumb: "images/thumbs/people3.jpg", full: "images/fulls/people3.jpg", title: "Family Portrait" },
  { thumb: "images/thumbs/people4.jpg", full: "images/fulls/people4.jpg", title: "Friends Gathering" },
  { thumb: "images/thumbs/people5.jpg", full: "images/fulls/people5.jpg", title: "Birthday Celebration" },
  { thumb: "images/thumbs/people6.jpg", full: "images/fulls/people6.jpg", title: "Candid Moment" },
  { thumb: "images/thumbs/people7.jpg", full: "images/fulls/people7.jpg", title: "Outdoor Fun" },
  { thumb: "images/thumbs/people8.jpg", full: "images/fulls/people8.jpg", title: "City Life" },
  { thumb: "images/thumbs/people9.jpg", full: "images/fulls/people9.jpg", title: "Cultural Event" },
  { thumb: "images/thumbs/people10.jpg", full: "images/fulls/people10.jpg", title: "Festival Vibes" },
  { thumb: "images/thumbs/people11.jpg", full: "images/fulls/people11.jpg", title: "Sporting Event" },
  { thumb: "images/thumbs/people12.jpg", full: "images/fulls/people12.jpg", title: "Concert Night" }
]

};

// Add 'all' as a combined version
galleryImages.all = [
  ...galleryImages.wildlife,
  ...galleryImages.landscapes,
  ...galleryImages.people
];

// STEP 2: Function to render images into #dynamic-gallery
function renderGallery(category) {
  const container = document.getElementById('dynamic-gallery');
  container.innerHTML = '';

  let imagesToShow;

  if (category === 'all') {
    // Shuffle and select 6 random images
    imagesToShow = [...galleryImages.all];
    for (let i = imagesToShow.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagesToShow[i], imagesToShow[j]] = [imagesToShow[j], imagesToShow[i]];
    }
    imagesToShow = imagesToShow.slice(0, 12);
  } else {
    imagesToShow = galleryImages[category].slice(0, 12); // Only first 6 from category
  }

  imagesToShow.forEach(img => {
    const article = document.createElement('article');
    article.innerHTML = `
      <a href="${img.full}" class="image fit">
        <img src="${img.thumb}" title="${img.title}" alt="${img.title}">
      </a>
    `;
    container.appendChild(article);
  });

  // Re-apply poptrox to new images (keep this part)
  if (typeof jQuery !== 'undefined' && jQuery().poptrox) {
    jQuery('#dynamic-gallery').poptrox({
      baseZIndex: 10001,
      useBodyOverflow: false,
      usePopupEasyClose: false,
      overlayColor: '#1f2328',
      overlayOpacity: 0.65,
      usePopupDefaultStyling: false,
      usePopupCaption: true,
      popupLoaderText: '',
      windowMargin: 50,
      usePopupNav: true
    });
  }
}



// STEP 3: On page load and button click, trigger filtering
$(document).ready(function () {
  renderGallery('all'); // Show all images on initial page load

  $('.filter-btn').on('click', function () {
    const category = $(this).data('filter');
    renderGallery(category);
  });
});

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
  const splash = document.getElementById('splash-screen');

  // Wait 5 seconds total: 4s for typing, 1s pause
  setTimeout(() => {
    splash.classList.add('fade-out');
  }, 4000);
});

