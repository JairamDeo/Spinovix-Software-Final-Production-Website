


document.addEventListener("DOMContentLoaded", () => {
    let counter = 0
    const top_line = document.querySelectorAll(".top_line");
    const middle_line = document.querySelectorAll(".middle_line")
    const bottom_line = document.querySelectorAll(".bottom_line")

    function updateUI() {

        top_line.forEach(line => {
            line.classList.toggle('w-[80px]', counter >= 3);
            line.classList.toggle('w-[0px]', counter < 3);
          });
  
  
          middle_line.forEach(line => {
            line.classList.toggle('lg:h-[144px]', counter >= 2);
            line.classList.toggle('h-[100px]', counter >= 2 && window.innerWidth >= 1024);
            line.classList.toggle('h-[0px]', counter < 2);
          });
  
          bottom_line.forEach(line => {
            line.classList.toggle('w-[80px]', counter >= 1);
            line.classList.toggle('w-[0px]', counter < 1);
          });

    }
    function incrementCounter() {
        if (counter === 3) {
            counter = 0;
        } else {
            counter++;
        }
        updateUI();
    }
    setInterval(incrementCounter, 700);
})



