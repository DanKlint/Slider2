"use strict";

function createSlider(containerId, options) {
    const container = document.getElementById(containerId);
    const slides = container.getElementsByTagName('img');
    const slideWidth = slides[0].width; // Получаем ширину слайда (предполагаем, что все слайды одинаковой ширины)
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isLooping = options.loop || false;
    let slidesPerFrame = options.slidesPerFrame || 1;
    let showControls = options.showControls || false;

    //переключение слайдера вперед
    function nextSlide() {
      currentIndex = (currentIndex + slidesPerFrame) % totalSlides;
      if (!isLooping && currentIndex === 0) {
        currentIndex = totalSlides - slidesPerFrame;
      }
      updateSlider();
    }

    // назад
    function prevSlide() {
      currentIndex = (currentIndex - slidesPerFrame + totalSlides) % totalSlides;
      if (!isLooping && currentIndex === totalSlides - slidesPerFrame) {
        currentIndex = 0;
      }
      updateSlider();
    }

    // Функция обновления слайдера
    function updateSlider() {
      const offset = -currentIndex * slideWidth;
      container.style.transform = `translateX(${offset}px)`;
    }

    function updateSlider() {
      const offset = -currentIndex * slideWidth;
      container.style.transform = `translateX(${offset}px)`;
    }

    // кнопочки true/false
    if (showControls) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Далее';
      nextBtn.addEventListener('click', nextSlide);

      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Назад';
      prevBtn.addEventListener('click', prevSlide);

      container.parentNode.insertBefore(prevBtn, container); 
      container.parentNode.insertBefore(nextBtn, container);
    }

    // Возвращаем объект с методами управления слайдером
    return {
      nextSlide,
      prevSlide,
    };
  }

  const slider = createSlider('slider-line', {
    loop: true,
    slidesPerFrame: 1,
    showControls: true,
  });





