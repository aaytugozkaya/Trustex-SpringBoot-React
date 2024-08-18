import React from "react";
import PropTypes from "prop-types";

const AssetsCard = ({ title, changePercent, changeValue, totalValue, quantity, cost, lastPrice, totalAssetsValue }) => {
  

  return (
    <div style={styles.cardContainer}>
      <div style={styles.titleContainer}>
        <span style={styles.title}>{title}</span>
        <span style={styles.totalValue}>{totalValue.toFixed(2)} TL</span>
      </div>
      <div style={styles.detailsContainer}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Satılabilir Adet</span>
          <span style={styles.detailValue}>{quantity.toFixed(2)}</span>
        </div>
        <div style={styles.detailItem}>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Son İşlem Fiyatı</span>
          <span style={styles.detailValue}>{lastPrice.toFixed(2)} TL</span>
        </div>
      </div>
    </div>
  );
};

AssetsCard.propTypes = {
  title: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  lastPrice: PropTypes.number.isRequired,
  totalAssetsValue: PropTypes.number.isRequired,
};

const styles = {
  cardContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    width: '30%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    margin: "10px",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  valueContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  totalValue: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  changePercent: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  progressBarContainer: {
    position: "relative",
    backgroundColor: "#d3d3d3",
    borderRadius: "5px",
    height: "8px",
    marginBottom: "10px",
  },
  progressPercentage: {
    position: "absolute",
    left: "5px",
    top: "-20px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  progressBar: {
    backgroundColor: "#32cd32",
    height: "100%",
    borderRadius: "5px",
  },
  detailsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: "14px",
    color: "#888",
  },
  detailValue: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default AssetsCard;