import { style } from "@vanilla-extract/css";

export const SelectMonthYearFieldStyle = style({
  display: "flex",
  gap: 20,
  alignItems: "center",
  margin: 20,
});

export const UserRowStyles = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
});

export const VacationActiveStyles = style({
  background: "#07bc0c",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ForbiddenIntersectionStyles = style({
  background: "#ff4d4f",
  border: "1px solid #d9363e",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const VacationCellBaseStyles = style({
  height: "10px",
});

export const IconButtonStyles = style({
  marginLeft: "8px",
});

export const TableContainerStyles = style({
  maxHeight: "70vh",
  overflow: "auto",
  marginTop: "16px",
  borderRadius: "8px",
});

export const ButtonContainerStyles = style({
  display: "flex",
  gap: "12px",
  marginTop: "24px",
  marginLeft: "10px",
  marginBottom: "20px",
});

export const UploadContainerStyles = style({
  display: "flex",
  gap: "12px",
  marginTop: "16px",
  marginLeft: "10px",
});

export const ExportButtonStyles = style({
  height: "106px",
  width: "220px",
  padding: "0 24px",
  fontWeight: 600,
  borderRadius: 15,
});
