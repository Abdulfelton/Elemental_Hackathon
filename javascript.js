$(document).ready(function() {
    let currentSlide = 0;
    const slides = $('.slide');
    const slideCount = slides.length;
    let autoSlideInterval;

    // Create slider dots
    function createDots() {
        $('.slider-nav').empty();
        for (let i = 0; i < slideCount; i++) {
            $('.slider-nav').append('<div class="slider-nav-dot"></div>');
        }
        updateDots();
    }

    // Update active dot
    function updateDots() {
        $('.slider-nav-dot').removeClass('active');
        $('.slider-nav-dot').eq(currentSlide).addClass('active');
    }

    // Function to move to specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        currentSlide = index;
        $('.slider').css('transform', `translateX(-${currentSlide * 100}%)`);
        updateDots();
        resetAutoSlide();
    }

    // Start auto sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize slider
    function initSlider() {
        createDots();
        startAutoSlide();
        
        // Next and previous arrows
        $('.next').click(function() {
            goToSlide(currentSlide + 1);
            console.log("trigger");
            
        });
        
        // $('.prev').click(function() {
        //     goToSlide(currentSlide - 1);
        // });
        
        // Click on dots
        $(document).on('click', '.slider-nav-dot', function() {
            goToSlide($(this).index());
        });
        
        // Pause on hover
        $('.slider-container').hover(
            function() { clearInterval(autoSlideInterval); },
            function() { startAutoSlide(); }
        );
    }

    // Handle window resize
    $(window).resize(function() {
        $('.slider').css('transform', `translateX(-${currentSlide * 100}%)`);
    });

    // Initialize the slider
    initSlider();
});


