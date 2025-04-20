let currentParent = 1;
const totalTestimonials = 2;

function handleNextClick() {
  currentParent = currentParent % totalTestimonials + 1;
  updateTestimonial();
}

function handlePreviousClick() {
  currentParent = currentParent === 1 ? totalTestimonials : currentParent - 1;
  updateTestimonial();
}

function updateTestimonial() {
  const testimonials = document.querySelectorAll('#testimonial-1, #testimonial-2');
  testimonials.forEach((testimonial, index) => {
    if (index + 1 === currentParent) {
      testimonial.style.display = 'block';
    } else {
      testimonial.style.display = 'none';
    }
  });
}

// Keyboard navigation
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 37) {
    handlePreviousClick();
  } else if (event.keyCode === 39) {
    handleNextClick();
  }
});

// Mobile swipe detection
document.addEventListener('DOMContentLoaded', function() {
  const testimonialSection = document.querySelector('section');
  
  // Variables for touch handling
  let xDown = null;
  let yDown = null;
  
  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }
  
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }
  
  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
    
    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    
    // Only register as horizontal swipe if movement is more horizontal than vertical
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // Left swipe
        handleNextClick();
      } else {
        // Right swipe
        handlePreviousClick();
      }
    }
    
    // Reset values
    xDown = null;
    yDown = null;
  }
  
  testimonialSection.addEventListener('touchstart', handleTouchStart, false);
  testimonialSection.addEventListener('touchmove', handleTouchMove, false);
});

// Initialize
updateTestimonial();