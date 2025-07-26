'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HeroItem } from './HeroItem';
export function Hero() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      dir="rtl"
      autoplay={{ delay: 6000, pauseOnMouseEnter: true, disableOnInteraction: true }}
    >
      <SwiperSlide>
        <HeroItem />
      </SwiperSlide>
      <SwiperSlide>
        <HeroItem />
      </SwiperSlide>
      <SwiperSlide>
        <HeroItem />
      </SwiperSlide>
    </Swiper>
  );
}
