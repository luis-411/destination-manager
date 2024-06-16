import React from "react";
import "../styles/App.css";
import styles from "./BarChart.module.css";

export const BarChart = ({ score, benchmark, color, showBenchmark }) => {
  const getText = () => {
    if (showBenchmark) {
      let diff = score.value - benchmark;
      let total = 100 - Math.abs(diff);
      if (diff === 0) {
        return (
          "The " +
          score.name +
          " of this country has the score " +
          score.value +
          " which is equal to your preference. So the " +
          score.name +
          " is 100% matching."
        );
      } else if (diff > 0) {
        return (
          "The " +
          score.name +
          " of this country has the score " +
          score.value +
          " which is " +
          Math.abs(diff) +
          "% more than what you prefer. So the " +
          score.name +
          " is " +
          total +
          "%(100-" +
          Math.abs(diff) +
          ") matching."
        );
      } else {
        return (
          "The " +
          score.name +
          " of this country has the score " +
          score.value +
          " which is " +
          Math.abs(diff) +
          "% less than what you prefer. So the " +
          score.name +
          " is " +
          total +
          "%(100-" +
          Math.abs(diff) +
          ") matching."
        );
      }
    } else {
      return (
        "The " +
        score.name +
        " of this country has the score " +
        score.value +
        "/100."
      );
    }
  };

  return (
    <div
      className={`${styles.barChart} w-100 position-relative rounded-5`}
      data-tooltip-id="barchart-tooltip"
      data-tooltip-content={getText()}
    >

      <div
        className={`${styles.bar} rounded-5`}
        style={{
          width: `calc(100% * (${score.value} / 100))`,
          backgroundColor: color,
        }}
      />
      {showBenchmark && (
        <span
          style={{
            left: `calc(100% * (${benchmark} / 100))`,
          }}
          className={styles.benchmark}
        />
      )}
    </div>
  );
};
