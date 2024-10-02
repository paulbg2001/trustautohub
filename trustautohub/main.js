document.addEventListener('DOMContentLoaded', function () {
    const carouselElement = document.querySelector('#carouselExampleCaptions');

    let isMouseDown = false;
    let startX, endX;

    // Detectăm când începe un swipe pe desktop (mousedown)
    carouselElement.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        startX = event.clientX;
    });

    // Detectăm când se termină un swipe pe desktop (mouseup)
    carouselElement.addEventListener('mouseup', (event) => {
        if (isMouseDown) {
            endX = event.clientX;
            handleSwipe();
            isMouseDown = false;
        }
    });

    // Detectăm mutarea mouse-ului în timpul unui swipe (mousemove)
    carouselElement.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            endX = event.clientX;
        }
    });

    // Anulăm evenimentul dacă mouse-ul este mutat în afara carousel-ului
    carouselElement.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    // Funcție pentru a gestiona direcția swipe-ului
    function handleSwipe() {
        const swipeThreshold = 50; // pragul minim pentru a considera un swipe
        if (startX - endX > swipeThreshold) {
            // Swiped left
            const nextButton = carouselElement.querySelector('.carousel-control-next');
            if (nextButton) {
                nextButton.click();
            }
        } else if (endX - startX > swipeThreshold) {
            // Swiped right
            const prevButton = carouselElement.querySelector('.carousel-control-prev');
            if (prevButton) {
                prevButton.click();
            }
        }
    }

    function startCounter(counter) {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / 100; // ajustează 300 pentru a controla viteza

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 50);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    }

    const counters = document.querySelectorAll('.count'); // Asigură-te că elementele tale de tip counter au această clasă

    const options = {
        root: null, // null înseamnă că se utilizează viewport-ul browser-ului
        rootMargin: '0px',
        threshold: 0.1 // ajustează acest procent pentru a decide cât din element trebuie să fie vizibil înainte de a începe numărătoarea
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target); // Pornește numărătoarea doar dacă elementul este vizibil
            } else {
                entry.target.innerText = '0'; // Resetează numărătoarea la 0 când elementul iese din viewport
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter); // Începe observarea fiecărui element de tip counter
    });

});


