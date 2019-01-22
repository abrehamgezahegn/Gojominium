import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ImageGallery.css";
class CondoImages extends Component {



  render() {

    const {condo , condoImages} =  this.props;

  const images = condoImages.map(condo => {

        // const original;
        // const thumbnail;

        return { original: `${condo}`  , thumbnail : `${condo}` }
   })

    // const images = [
    //   {
    //     original: `${condo.image1}`,
    //     thumbnail: `${condo.image1}`
    //   },
    //   {
    //     original:` ${condo.image2}`,
    //     thumbnail: ` ${condo.image2}`
    //   },
    //   {
    //     original:` ${condo.image3}`,
    //     thumbnail:` ${condo.image3}`
    //   },
    //    {
    //     original: `${condo.image4}`,
    //     thumbnail: `${condo.image4}`,
    //   },
    //   {
    //     original:` ${condo.image5}`,
    //     thumbnail: ` ${condo.image5}`,
    //   },
    //   {
    //     original:` ${condo.image6}`,
    //     thumbnail: ` ${condo.image6}`,
    //   },
    //     {
    //     original:` ${condo.image7}`,
    //     thumbnail: ` ${condo.image7}`,
    //   },
    //    {
    //     original: `${condo.image8}`,
    //     thumbnail:  `${condo.image8}`      },
    //   {
    //     original:` ${condo.image9}`,
    //     thumbnail:` ${condo.image9}`,
    //   },
    //   {
    //     original:` ${condo.image10}`,
    //     thumbnail:` ${condo.image10}`,
    //   },
    // ];

    return (
      <ImageGallery
        items={images}
        lazyLoad={true}
        showBullets={true}
        showPlayButton={false}
        defaultImage="https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png"
      />
    );
  }
}

export default CondoImages;
