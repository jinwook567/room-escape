import React from "react";
import { Modal as MaterialModal, Backdrop, Fade } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

function Modal({ open, setOpen, children }) {
  const handleClose = () => {
    setOpen(false);
  };

  const StyledModal = styled(MaterialModal)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledPaper = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: "5px solid #000",
    boxShadow: theme.shadows[3],
    borderRadius: "20px",
    padding: theme.spacing(2, 4, 3),
    width: "60%",
  }));

  return (
    <>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <StyledPaper>{children}</StyledPaper>
        </Fade>
      </StyledModal>
    </>
  );
}

export default Modal;
