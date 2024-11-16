"use client";

import { useEffect, useState, useRef } from "react";
import characterStyle from "../components/character_li/character_li.module.css";

export default function MainClient() {
  const [cellCount, setCellCount] = useState(16); // 슬라이드 개수
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 인덱스
  const [isHorizontal, setIsHorizontal] = useState(true); // 방향
  const carouselRef = useRef(null); // Carousel 요소 참조
  const [radius, setRadius] = useState(0); // Carousel 반지름 계산
  const theta = 360 / Math.max(cellCount, 3); // 최소 셀 개수를 3으로 제한

  // Carousel 회전
  const rotateCarousel = () => {
    const carousel = carouselRef.current;
    const angle = theta * selectedIndex * -1;
    if (carousel) {
      carousel.style.transform = `translateZ(${-radius}px) rotate${
        isHorizontal ? "Y" : "X"
      }(${angle}deg)`;
    }
  };

  // Carousel 초기화 및 업데이트
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const cellSize = isHorizontal
        ? carousel.offsetWidth
        : carousel.offsetHeight;

      // 반지름 계산 수정
      const newRadius = Math.max(
        Math.round(cellSize / 2 / Math.sin(Math.PI / cellCount)), // sin 사용으로 안정적 반지름 계산
        200 // 최소 반지름 제한
      );
      setRadius(newRadius);

      const cells = Array.from(carousel.children); // Carousel Cell
      cells.forEach((cell, index) => {
        if (index < cellCount) {
          const cellAngle = theta * index;
          cell.style.transform = `rotate${
            isHorizontal ? "Y" : "X"
          }(${cellAngle}deg) translateZ(${newRadius}px)`;
          cell.style.opacity = 1;
        } else {
          cell.style.opacity = 0;
          cell.style.transform = "none";
        }
      });
    }

    rotateCarousel(); // 초기 회전
  }, [cellCount, isHorizontal, selectedIndex]);

  // 이전 버튼
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
  };

  // 다음 버튼
  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % cellCount);
  };

  return (
    <>
      <div className={characterStyle.scene}>
        <div className={characterStyle.carousel} ref={carouselRef}>
          {Array.from({ length: cellCount }).map((_, index) => (
            <div className={characterStyle.carousel__cell} key={index}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className={characterStyle.carouselOption}>
        <p>
          <label>
            Cells:
            <input
              type="range"
              min="3"
              max="20"
              value={cellCount}
              onChange={(e) => setCellCount(Number(e.target.value))}
            />
          </label>
        </p>
        <p>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </p>
        <p>
          Orientation:
          <label>
            <input
              type="radio"
              name="orientation"
              value="horizontal"
              checked={isHorizontal}
              onChange={() => setIsHorizontal(true)}
            />
            Horizontal
          </label>
          <label>
            <input
              type="radio"
              name="orientation"
              value="vertical"
              checked={!isHorizontal}
              onChange={() => setIsHorizontal(false)}
            />
            Vertical
          </label>
        </p>
      </div>
    </>
  );
}
