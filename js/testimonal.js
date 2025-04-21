
  let currentTestimonial = 1;
  const totalTestimonials = 2;

  function showTestimonial(index) {
    for (let i = 1; i <= totalTestimonials; i++) {
      const testimonial = document.getElementById(`testimonial-${i}`);
      if (testimonial) {
        testimonial.style.display = (i === index) ? 'block' : 'none';
      }
    }
  }

  function handleNextClick() {
    currentTestimonial++;
    if (currentTestimonial > totalTestimonials) {
      currentTestimonial = 1;
    }
    showTestimonial(currentTestimonial);
  }

  function handlePreviousClick() {
    currentTestimonial--;
    if (currentTestimonial < 1) {
      currentTestimonial = totalTestimonials;
    }
    showTestimonial(currentTestimonial);
  }

  // Optionally: Swipe gesture for touch devices
  let startX = 0;
  let endX = 0;

  document.querySelector(".testimonial-section").addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  document.querySelector(".testimonial-section").addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      handleNextClick(); // Swipe Left
    } else if (endX - startX > 50) {
      handlePreviousClick(); // Swipe Right
    }
  });
