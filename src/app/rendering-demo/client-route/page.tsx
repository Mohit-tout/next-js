'use client'

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css';
import { serverSideFunction } from "@/utils/server-utils";
import Image from 'next/image';
import photo1 from "../../routing-demo/photo-feed/photos/1.jpg";
import photo2 from "../../routing-demo/photo-feed/photos/2.jpg";
import photo3 from "../../routing-demo/photo-feed/photos/3.jpg";


const ClientRoutePage = () => {
    const result = serverSideFunction();
    const settings = {
        dots: true,
    };
    return <>
        <h1>Client Route {result}</h1>
        <div className="image-slider-container">
            <Slider {...settings}>
                <div>
                    <Image
                        
                        className="w-full object-cover aspect-square "
                        alt='image1'
                        src={photo1} />
                </div>
                <div>
                    <Image
                        
                        className="w-full object-cover aspect-square "
                        alt='image2'
                        src={photo2}/>
                </div>
                <div>
                    <Image
                        
                        className="w-full object-cover aspect-square "
                        alt='image3'
                        src={photo3}/>
                </div>
                {/* <div>
                    <Image
                        
                        className="w-full object-cover aspect-square "
                        alt='image4'
                        src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_640.jpg"
                         />
                </div> */}
            </Slider>
        </div>
    </>
}

export default ClientRoutePage;