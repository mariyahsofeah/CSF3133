let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");

    //hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    //increment the slide index
    slideIndex++;

    //reset to the first slide if the index exceeds the num of slides
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    //display current slide
    slides[slideIndex - 1].style.display = "block";

    //class this function again after 3 secs
    setTimeout(showSlides, 3000);
}

//initialize the slideshow
showSlides();