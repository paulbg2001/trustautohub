// document.addEventListener('DOMContentLoaded', function () {
//     const countrySelect = document.getElementById('country-select');
//     const cards = document.querySelectorAll('.country-card');
//
//     // Funcție pentru a actualiza vizibilitatea cardurilor
//     function updateCards(selectedCountry) {
//         cards.forEach(card => {
//             // Verificăm dacă cardul are clasa țării selectate
//             if (card.classList.contains(selectedCountry)) {
//                 card.classList.add('active'); // Afișăm cardul
//             } else {
//                 card.classList.remove('active'); // Ascundem cardul
//             }
//         });
//     }
//
//     // Eveniment pentru selectarea țării din combobox
//     countrySelect.addEventListener('change', function () {
//         const selectedCountry = this.value;
//         updateCards(selectedCountry); // Actualizăm cardurile la selectarea țării
//     });
//
//     // Inițial ascundem toate cardurile
//     updateCards(null);
// });
$('#recipeCarousel').carousel({
    interval: 3000
})

$('.carousel .carousel-item').each(function(){
    var minPerSlide = 5;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i=0;i<minPerSlide;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});

function goToSlide(slideIndex) {
    var carousel = $('#recipeCarousel');
    carousel.carousel(slideIndex);
}

// Sincronizează schimbarea slide-ului cu butoanele radio
$('#recipeCarousel').on('slide.bs.carousel', function (e) {
    var index = $(e.relatedTarget).index();
    $('input[name="carouselRadios"]').eq(index).prop('checked', true);
});
function changeImage(car) {
    var imageElement = document.getElementById('targetImage');
    if (!imageElement) {
        console.error("Elementul cu id-ul 'targetImage' nu a fost găsit.");
        return;
    }

    // Elimină clasele fade-in și fade-out pentru a reseta starea
    imageElement.classList.remove('fade-in', 'fade-out');

    // Adaugă clasa pentru dispariția imaginii
    setTimeout(function() {
        imageElement.classList.add('fade-out');
    }, 10);
    setTimeout(function() {
        switch (car) {
            case 'dacia':
                imageElement.src = '/images/Dacia-Symbol.png';
                imageElement.alt = 'National Dacia Dealers';
                break;
            case 'hyundai':
                imageElement.src = '/images/logo-hyundai.gif';
                imageElement.alt = 'Hyundai';
                break;
            case 'peugeot':
                imageElement.src = '/images/peugeot-logo.png';
                imageElement.alt = 'Peugeot';
                break;
            case 'opel':
                imageElement.src = '/images/opel-logo1.png';
                imageElement.alt = 'Opel';
                break;
            default:
                imageElement.src = '/images/flux-e-transportator.svg';
                imageElement.alt = 'ecosistemul SmartPORT';
        }

        // Elimină clasa fade-out și adaugă fade-in după schimbarea imaginii
        imageElement.classList.remove('fade-out');
        imageElement.classList.add('fade-in');
    }, 500); // Timpul să se potrivească cu tranziția CSS
}