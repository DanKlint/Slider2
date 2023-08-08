"use strict";

function createSlider(sliderLineId, options) {
  const container = document.createElement('div');
  container.classList.add('container');

  const slider = document.createElement('div');
  slider.classList.add('slider');

  const buttonWrap = document.createElement('div');
  buttonWrap.classList.add('button-wrap');

  const sliderLine = document.getElementById(sliderLineId);
  const slides = sliderLine.getElementsByTagName('img');
  
  const slideWidth = slides[0].width;
  const totalSlides = slides.length;
  let currentIndex = 0;
  let isLooping = options.loop || false;
  let slidesPerFrame = options.slidesPerFrame || 1;
  let showControls = options.showControls || false;
  let mouseStartX = 0;
  let mouseEndX = 0;
  let autoScroll = options.autoScroll || false;
  let autoScrollInterval = null;
  let autoScrollDelay = options.autoScrollDelay || 3000;

  slider.style.width=`${256 * slidesPerFrame + 6}px`;

  

  document.body.append(container);
  container.append(slider);
  slider.append(sliderLine);
  container.append(buttonWrap);



  function startAutoScroll() {
    if (autoScroll){
      if (autoScrollInterval === null) {
    autoScrollInterval = setInterval(() => {
      nextSlide();
    }, autoScrollDelay);
  }}}
  

  function stopAutoScroll() {
    if (autoScrollInterval !== null) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  sliderLine.addEventListener('mouseenter', stopAutoScroll, false); //остановка автоскролла, если мышка находится на изображении слайдера
  sliderLine.addEventListener('mouseleave', startAutoScroll, false);

  sliderLine.addEventListener('mousedown', handleMouseDown, false);
  sliderLine.addEventListener('mouseup', handleMouseUp, false);

  function handleMouseDown(event) {
    mouseStartX = event.clientX;
    sliderLine.addEventListener('mousemove', handleMouseMove, false);
  }

  function handleMouseMove(event) {
    mouseEndX = event.clientX;
  }

  function handleMouseUp(event) {
    sliderLine.removeEventListener('mousemove', handleMouseMove, false);
    handleSwipe();
  }

  function handleSwipe() {
    const mouseDiff = mouseStartX - mouseEndX;
    if (Math.abs(mouseDiff) > 50) {
      if (mouseDiff > 0) {
        nextSlide(); 
      } else {
        prevSlide(); 
      }
    }
  }

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
    sliderLine.style.transform = `translateX(${offset}px)`;
  }

  // кнопочки true/false
  if (showControls) {

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#x21e6;';
    prevBtn.id = 'prev-btn';
    prevBtn.addEventListener('click', prevSlide);

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#x21e8;';
    nextBtn.id = 'next-btn';
    nextBtn.addEventListener('click', nextSlide);

    const stopBtn = document.createElement('button');
    stopBtn.innerHTML = '&#x2016;';
    stopBtn.id = 'stop-btn';
    stopBtn.addEventListener('click', stopAutoScroll);

    const startBtn = document.createElement('button');
    startBtn.innerHTML = '&#x25BA;';
    startBtn.id = 'start-btn';
    startBtn.addEventListener('click', startAutoScroll);

    buttonWrap.append(prevBtn);
    buttonWrap.append(startBtn);
    buttonWrap.append(stopBtn);
    buttonWrap.append(nextBtn);

    startAutoScroll();
  }

  // Возвращаем объект с методами управления слайдером
  return {
    nextSlide,
    prevSlide,
    startAutoScroll,
    stopAutoScroll,
  };
}

const slider = createSlider('slider-line', {
  loop: true,
  slidesPerFrame: 1,
  showControls: true,
  autoScroll: true,
  autoScrollDelay: 5000,
});