'use strict';

import { params } from './params.js';
import { images } from './images.js';

const container = document.querySelector('.container');
const slide = document.querySelector('.slide');
const slide_dots = document.querySelector('.slide_dots');
const slide_caption = document.querySelector('.slide_caption');
const slide_number = document.querySelector('.slide_number');

// a képek betöltése
images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image.src;
    img.classList.add('slide_img');
    slide.insertAdjacentElement('beforeend', img);
    images[index].img = img;

    const dot = document.createElement('span');
    dot.classList.add('slide_dot');
    slide_dots.insertAdjacentElement('beforeend', dot);
    images[index].dot = dot;
})

// navigáció
function nextImage() {
    let active = images.findIndex(image => image.img.classList.contains('show'));
    active++;
    active = images.length <= active ? 0 : active;
    showHideImages(active);
}
function prevImage() {
    let active = images.findIndex(image => image.img.classList.contains('show'));
    active--;
    active = active < 0 ? images.length - 1 : active;
    showHideImages(active);
}

// képváltás
function showHideImages(index) {
    // körforgó lesz
    index = index < 0 ? images.length - 1 : index;
    // először mindent eltüntetek
    images.forEach(image => {
        image.img.classList.remove('show');
        image.dot.classList.remove('active');
    })
    // majd egyet megjelenítek
    images[index].img.classList.add('show');
    images[index].dot.classList.add('active');
    // frissítem a képhez tartozó infót is
    slide_caption.textContent = images[index].caption;
    slide_number.textContent = `${index + 1} / ${images.length}`
}

// event handling
document.querySelector('.slide_prev').addEventListener('click', prevImage);
document.querySelector('.slide_next').addEventListener('click', nextImage);
images.forEach((image, index) => image.dot.addEventListener('click', ()=>showHideImages(index)));
// autoplay beállítás/törlés
container.addEventListener('mouseout', () => container.classList.add('autoplay'));
container.addEventListener('mouseover', () => container.classList.remove('autoplay'));

// legyen az első kép látható
showHideImages(0);

// a slider magasság beállítása
slide.setAttribute('style', `height: ${params.image_height}px`);
slide.style.height = `${params.image_height}px`;

// induljon egy automatikus lejátszás
(function autoPlay(){
    setTimeout(() => {
        container.classList.contains('autoplay') && nextImage();
        autoPlay();
    }, params.period);
})();
