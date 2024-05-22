import Accordion from "react-bootstrap/Accordion";
import styles from "./Results.module.css";
import FavouriteTag from "../../components/FavouriteTag";
import ResultInfo from "./components/ResultInfo";
import React from "react";


const ResultItem = ({ accordElem, index, activeIndex, setActiveIndex, item }) => {
  const onClick = () => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
      accordElem.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }
  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header
        className={styles.accordionHeader}
        onClick={onClick}
      >
        <div className={styles.headerContent}>
          <FavouriteTag country={item.uname} />
          <span>{index + 1}. {item.region}</span>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <ResultInfo
          country={item}
          label={index + 1}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ResultItem;