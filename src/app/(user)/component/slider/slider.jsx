"use client"
import React, { useEffect, useRef } from 'react';

export default function SliderComponent() {
    const sliderRef = useRef(null);
    const totalSlides = 3;
    let currentIndex = 0;

    const showSlide = (index) => {
        if (index < 0 || index >= totalSlides) {
            return;
        }

    
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }
    };

    const autoSlide = () => {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }, 2500);
    };

    useEffect(() => {
        autoSlide();
    }, []);

    return (
        <div className="home-slider">
            <div className="main-slider" ref={sliderRef}>
                <div className="main-slider-item">
                    <img src="img/slider_1.jpg" alt="Slider Image" />
                </div>
                <div className="main-slider-item">
                    <img src="img/slider_2.jpg" alt="Slider Image" />
                </div>
                <div className="main-slider-item">
                    <img src="img/slider_3.jpg" alt="Slider Image" />
                </div>
            </div>
        </div>
    );
};