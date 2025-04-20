const marquee = document.querySelector('.marquee');
const boxes = document.querySelectorAll('.boxx1');

boxes.forEach((box) => {
  box.addEventListener('mouseover', () => {
    marquee.style.animationPlayState = 'paused';
  });

  box.addEventListener('mouseout', () => {
    marquee.style.animationPlayState = 'running';
  });
});