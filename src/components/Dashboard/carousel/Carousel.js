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
import { Button } from "antd";

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
                  src="http://www.buildingshows.com/BuildingShows/media/BS/MarketInsights/90000018.jpg"
                  alt="First slide"
                />
                <Mask overlay="black-light" />
              </View>
              <CarouselCaption>
                <Button className="carousel-btn"> Sell a condo</Button>
              </CarouselCaption>
            </CarouselItem>
            <CarouselItem itemId="2">
              <View className="carousel-img-container">
                <img
                  className="  carousel-img"
                  src="https://s-ec.bstatic.com/images/hotel/max1024x768/115/115939417.jpg"
                  alt="Second slide"
                />
                <Mask overlay="black-strong" />
              </View>
              <CarouselCaption>
                <Button className="carousel-btn">Buy a condo </Button>
              </CarouselCaption>
            </CarouselItem>
            <CarouselItem itemId="3">
              <View className="carousel-img-container">
                <img
                  className=" carousel-img"
                  src="https://static.euronews.com/articles/348248/1024x538_348248.jpg?1477848764"
                  alt="Third slide"
                />
                <Mask overlay="black-slight" />
              </View>
              <CarouselCaption>
                <Button className="carousel-btn"> Search for a condo </Button>
              </CarouselCaption>
            </CarouselItem>
          </CarouselInner>
        </Carousel>
      </Container>
    );
  }
}

export default CarouselPage;
