import Dialog from "@mui/material/Dialog";
import {
  DialogContent,
  DialogTitle,
  Stack,
  Slide,
  ThemeProvider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, forwardRef } from "react";
import { EditDepositBasicData } from "../../Deposits/EditDepositBasicData";
import { depositStatus } from "../../../utils";
import { ErrorDialog } from "../ErrorDialog";
import theme from "../../../theme/theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function EditDepositBasicDataDialog({
  selectedDeposit,
  openDialog,
  onDialogOpenChange,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setIsDialogOpen(openDialog);
      onDialogOpenChange(openDialog);
    })();
  }, [openDialog, onDialogOpenChange]);

  const handleCancel = () => {
    setIsDialogOpen(false);
    onDialogOpenChange(false);
  };

  if (
    selectedDeposit &&
    parseInt(selectedDeposit.status) === depositStatus.DELETED
  ) {
    return (
      <ErrorDialog
        errorMessage={"No se puede editar un depósito ya eliminado."}
        openDialog={openDialog}
        onDialogOpenChange={onDialogOpenChange}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        maxWidth="md"
        TransitionComponent={Transition}
      >
        <Stack direction="row" alignItems="center">
          <DialogTitle
            sx={{
              ...theme.typography.montserratFont,
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Datos del depósito
          </DialogTitle>

          <IconButton onClick={() => handleCancel()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent>
          {selectedDeposit && (
            <EditDepositBasicData deposit={selectedDeposit} />
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
