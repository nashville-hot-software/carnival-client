import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      color: "#33475B",
      backgroundColor: "#F5F8FA",
      boxShadow: "2px 2px 4px 1px #cacaca",
    },
    content: {
      // '&:last-child': {
      //   paddingBottom: 0
      // }
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 30,
      fontFamily: "Roboto",
      fontWeight: 500,
      color: "#33475B",
    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
      marginTop: 10,
      minWidth: 120,
      marginLeft: 0,
    },
    selectSaleType: {
      minWidth: "150px",
      "&.MuiInput-underline:after": {
        borderBottom: "1px solid gray",
      },
    },
    selectLabel: {
      color: "gray",
      fontSize: "14px",
      "&.MuiFormLabel-root.Mui-focused": {
        color: "gray",
      },
    },
    arrowIcon: {
      marginRight: "10px",
      marginTop: "240px",
      "&:hover": {
        cursor: "pointer",
      },
    },
  }));

  export default useStyles;