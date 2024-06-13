import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

const sliderContent = [
  "Iron Jacket",
  "Hoodieee",
  "Sweatshirt",
  "Velvet Soles",
  "Chic Allure",
  "Echelon Leather",
];

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  const [currentContentIndex, setCurrentContentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    gsap.to(".slide-next-img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  const splitTextIntoSpans = (selector) => {
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      let text = element.innerText;
      let splitText = text
        .split("")
        .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
        .join("");
      element.innerHTML = splitText;
    });
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    splitTextIntoSpans(".slider-content-active h1");
    gsap.to(".slide-active img", {
      scale: 2,
      duration: 2,
      ease: "power3.out",
    });

    gsap.to(".slider-content-active h1 span", {
      top: "-175px",
      stagger: 0.05,
      ease: "power3.out",
      duration: 0.5,
      onComplete: () => {
        gsap.to(".slider-content-active", {
          top: "-175px",
          duration: 0.25,
          ease: "power3.out",
        });
      },
    });

    splitTextIntoSpans(".slider-content-next h1");
    gsap.set(".slider-content-next h1 span", { top: "200px" });

    gsap.to(".slider-content-next", {
      top: "0",
      duration: 1.125,
      ease: "power3.out",
      onComplete: () => {
        const currentActiveContent = document.querySelector(".slider-content-active");
        if (currentActiveContent) {
          currentActiveContent.classList.remove("slider-content-active");
          currentActiveContent.classList.add("slider-content-old");
        }
        gsap.to(".slider-content-next h1 span", {
          top: 0,
          stagger: 0.05,
          ease: "power3.out",
          duration: 0.5,
          onComplete: () => {
            const oldContent = document.querySelector(".slider-content-old");
            if (oldContent) {
              oldContent.parentNode.removeChild(oldContent);
            }
            const nextContent = document.querySelector(".slider-content-next");
            nextContent.classList.remove("slider-content-next");
            nextContent.classList.add("slider-content-active");
            nextContent.style.top = "0";

            setCurrentContentIndex((prevIndex) => (prevIndex + 1) % sliderContent.length);
            const nextContentText = sliderContent[(currentContentIndex + 1) % sliderContent.length];
            const newContentHTML = `<div class="slider-content-next" style="top: 200px;"><h1>${nextContentText}</h1></div>`;
            document
              .querySelector(".slider-content")
              .insertAdjacentHTML("beforeend", newContentHTML);
          },
        });
      },
    });

    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    const newSlideHTML = `
      <div class="slide-next">
        <div class="slide-next-img">
          <img src=${images[currentImageIndex]} alt="" />
        </div>
      </div>`;

    document.querySelector(".slider").insertAdjacentHTML("beforeend", newSlideHTML);

    gsap.to(".slider .slide-next:last-child .slide-next-img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    const slideNextImg = document.querySelector(".slide-next-img");
    gsap.to(slideNextImg, {
      width: "100vw",
      height: "100vh",
      duration: 2,
      ease: "power3.out",
      onComplete: () => {
        const currentActiveSlide = document.querySelector(".slide-active");
        if (currentActiveSlide) {
          currentActiveSlide.parentNode.removeChild(currentActiveSlide);
        }
        const nextSlide = document.querySelector(".slide-next");
        if (nextSlide) {
          nextSlide.classList.remove("slide-next");
          nextSlide.classList.add("slide-active");

          const nextSlideImg = nextSlide.querySelector(".slide-next-img");
          if (nextSlideImg) {
            nextSlideImg.classList.remove("slide-next-img");
          }
        }

        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      },
    });
  };

  return (
    <div onClick={handleClick}>
      <nav>
        <div className="logo">
          <a href="#">Falak Fit</a>
        </div>
        <div className="links">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </div>
        <div className="shop">
          <a href="#">Search</a>
          <a href="#">Cart</a>
          <a href="#">Account</a>
        </div>
      </nav>

      <div className="copy">
        <p>Lifestyle catalogue</p>
        <p>2024 / 2025</p>
      </div>

      <footer>
        <p>Launching Soon</p>
      </footer>

      <div className="slider">
        <div className="slide-active">
          <img src={images[0]} alt="" />
        </div>
        <div className="slide-next">
          <div className="slide-next-img">
            <img src={images[1]} alt="" />
          </div>
        </div>
      </div>

      <div className="slider-content">
        <div className="slider-content-active">
          <h1>Iron Jacket</h1>
        </div>
        <div className="slider-content-next">
          <h1>Hoodieee</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
