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
  if (event.key === 'ArrowLeft') {     
    handlePreviousClick();   
  } else if (event.key === 'ArrowRight') {     
    handleNextClick();   
  } 
});  

// Mobile swipe detection 
document.addEventListener('DOMContentLoaded', function() {   
  const testimonialSection = document.querySelector('section');      
  
  // Variables for touch handling   
  let xDown = null;   
  let yDown = null;
  let isProcessingSwipe = false;
  const swipeThreshold = 50; // Minimum swipe distance to trigger action
      
  function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    isProcessingSwipe = false;
  }
      
  function handleTouchMove(evt) {
    if (!xDown || !yDown || isProcessingSwipe) {
      return;
    }
          
    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
          
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
          
    // Only register as horizontal swipe if movement is more horizontal than vertical
    // and exceeds the threshold
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > swipeThreshold) {
      isProcessingSwipe = true; // Prevent multiple triggers
      
      if (xDiff > 0) {
        // Left swipe - go to next
        handleNextClick();
      } else {
        // Right swipe - go to previous
        handlePreviousClick();
      }
      
      // Reset values
      xDown = null;
      yDown = null;
    }
  }
  
  function handleTouchEnd() {
    // Reset values when touch ends
    xDown = null;
    yDown = null;
    isProcessingSwipe = false;
  }
      
  testimonialSection.addEventListener('touchstart', handleTouchStart, false);
  testimonialSection.addEventListener('touchmove', handleTouchMove, false);
  testimonialSection.addEventListener('touchend', handleTouchEnd, false);
});  

// Initialize
updateTestimonial();