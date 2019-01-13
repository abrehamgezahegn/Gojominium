import React, { Component } from "react";
import {
  Carousel,
  CarouselCaption,
  CarouselInner,
  CarouselItem,
  View,
  Mask,
  Container
} from "mdbreact";
import "./carousel.css";

class CarouselPage extends Component {
  render() {
    return (
      <Container className="carousel-container">
        <Carousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={false}
          className="z-depth-0 carousel"
        >
          <CarouselInner className="carousel-inner">
            <CarouselItem itemId="1">
              <View className="carousel-img-container">
                <img
                  className="  carousel-img  "
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                  alt="First slide"
                />
                <Mask overlay="black-light" />
              </View>
              <CarouselCaption>
                <h3 className="h3-responsive">Sell a condo</h3>
              </CarouselCaption>
            </CarouselItem>
            <CarouselItem itemId="2">
              <View className="carousel-img-container">
                <img
                  className="  carousel-img"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(99).jpg"
                  alt="Second slide"
                />
                <Mask overlay="black-strong" />
              </View>
              <CarouselCaption>
                <h3 className="h3-responsive">Buy a condo</h3>
              </CarouselCaption>
            </CarouselItem>
            <CarouselItem itemId="3">
              <View className="carousel-img-container">
                <img
                  className=" carousel-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRER3Ep1psyHHEdb9hviH-aEE17F_DbeZj5EQX0VZlwvpZGImRbzw"
                  alt="Third slide"
                />
                <Mask overlay="black-slight" />
              </View>
              <CarouselCaption>
                <h3 className="h3-responsive"> Search for a condo </h3>
              </CarouselCaption>
            </CarouselItem>
          </CarouselInner>
        </Carousel>
      </Container>
    );
  }
}

export default CarouselPage;
