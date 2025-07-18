import { style } from "@vanilla-extract/css";

export const vacationActiveStyle = style({
  background: "#07bc0c",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const forbiddenIntersectionStyle = style({
  background: "#ff4d4f",
  border: "1px solid #d9363e",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const vacationCellBase = style({
  height: "10px",
});
