import { style } from "@vanilla-extract/css";

export const addPeriodStyles = style({
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
});

export const periodItemStyles = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 14px",
  backgroundColor: "#f5f5f5",
  borderRadius: 8,
  border: "1px solid #e0e0e0",
});

export const periodStyles = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const modalFooterStyles = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 32,
});

export const formFieldSpacingStyles = style({
  marginBottom: 16,
});

export const modalContentStyles = style({
  maxWidth: 800,
  width: "100%",
});

export const scrollablePeriodListStyles = style({
  maxHeight: 400,
  overflowY: "auto",
  paddingRight: 4,
});
