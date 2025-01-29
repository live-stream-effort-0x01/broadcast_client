import React, { useRef } from "react";


import "./Slider.css";


import icon from "../icon";

const SliderComponent = () => {
  const sliderRef = useRef(null);

  const options = {
    duration: 1000,
    loop: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    perView: 2,
    spacing: 15,
  };

  const next = () => {
    sliderRef.current?.next();
  };

  const prev = () => {
    sliderRef.current?.prev();
  };

  return (
    <>
      <div ref={sliderRef} {...options}>
        <div className="slide slide1">
          <img
            className="slide-img-out"
            src="https://photo.znews.vn/w660/Uploaded/kbd_pilk/2020_07_26/5_1.jpg"
            alt=""
          />
          <div className="slide-img">
            <img
              src="https://photo.znews.vn/w660/Uploaded/kbd_pilk/2020_07_26/5_1.jpg"
              alt=""
            />
            <form className="slide-hover">
              <div className="slide-hover-left">
                <img
                  src="https://cdn-i.vtcnews.vn/files/f2/2016/03/13/than-hinh-boc-lua-cua-5-nu-dj-nong-bong-nhat-1.jpg"
                  alt=""
                  className="slide-hover-avatar"
                />
                <div className="slide-hover-content">
                  <span className="slide-hover-content-name">Sweetiefox</span>
                  <span className="slide-hover-content-view">1.5k views</span>
                </div>
              </div>
              <div className="slide-hover-right">
                <span className="slide-hover-notify">
                  check out this stream from athony_kongphan!
                </span>
                <div className="slide-hover-list-tag">
                  <div className="slide-hover-tag">Tag Tag</div>
                  <div className="slide-hover-tag">Tag</div>
                </div>
              </div>
            </form>
          </div>
          <img
            className="slide-img-out"
            src="https://photo.znews.vn/w660/Uploaded/kbd_pilk/2020_07_26/5_1.jpg"
            alt=""
          />
        </div>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <br />
        <button className="slider-button-left" onClick={prev}>
          <img src={icon.prev} alt="Previous" />
        </button>
        <button className="slider-button-right" onClick={next}>
          <img src={icon.next} alt="Next" />
        </button>
      </div>
    </>
  );
};

export default SliderComponent;
