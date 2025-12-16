document.addEventListener('DOMContentLoaded', () => {
    // --- 4. Automatic Slideshow Logic ---
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides .slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    function showSlides(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Update slideIndex for looping
        if (n >= slides.length) {
            slideIndex = 0;
        } else if (n < 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex = n;
        }
        
        // Display the current slide
        slides[slideIndex].style.display = 'block';
    }

    // Function to advance the slideshow automatically
    let slideInterval = setInterval(() => showSlides(slideIndex + 1), 5000); // Change image every 5 seconds

    // Manual navigation controls
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval); // Stop auto-slide on manual click
        showSlides(slideIndex - 1);
        slideInterval = setInterval(() => showSlides(slideIndex + 1), 5000); // Restart auto-slide
    });
    
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval); // Stop auto-slide on manual click
        showSlides(slideIndex + 1);
        slideInterval = setInterval(() => showSlides(slideIndex + 1), 5000); // Restart auto-slide
    });

    // Initialize the slideshow
    if (slides.length > 0) {
        showSlides(slideIndex);
    }


    // --- 7. Collapsible Section Logic ---
    const collapsibles = document.querySelectorAll('.collapsible-btn');

    collapsibles.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle the 'active' class on the button
            this.classList.toggle('active');
            
            // Select the next sibling element, which is the content div
            const content = this.nextElementSibling;
            
            // Toggle visibility by adjusting max-height
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse the content
            } else {
                // Set max-height to the content's actual scroll height
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });


    // --- 6. Progress Bar Simulation ---
    const progressBar = document.getElementById('page-load-progress');
    let progress = 0;
    const increment = 10;
    const intervalTime = 100;

    const progressInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            progressBar.textContent = '100% - Loading Complete!';
            // Optional: Hide the progress bar section after a delay
            setTimeout(() => {
                document.getElementById('loading-bar').style.display = 'none';
            }, 1000); 
        } else {
            progressBar.textContent = progress + '%';
        }
        
        progressBar.style.width = progress + '%';
    }, intervalTime);


    // --- 3. Smooth Scrolling for Side Navigation (Optional but enhances experience) ---
    document.querySelectorAll('.side-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});