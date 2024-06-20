import {Carousel} from "react-bootstrap";
import CoverImage from "../views/Personalnformation/CoverImage";
import {useState} from "react";


const AppCarousel = ({images, interval = null, caption}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const showArrows = images.length > 1;

  return (
    <Carousel
      indicators={false}
      activeIndex={index}
      onSelect={handleSelect}
      controls={showArrows}
    >
      {images.map((image, idx) => (
        <Carousel.Item interval={interval} key={idx}>
          <CoverImage
            src={image}
            height={'11.5rem'}
          />
          { caption && (
            <Carousel.Caption>
              { caption }
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};


export default AppCarousel;