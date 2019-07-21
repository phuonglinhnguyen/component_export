import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputExport from "./../input_export_component"
const styles: any = (theme: any) => {
  return {
    showDialog: {
      maxWidth: "1200px"
    }
  };
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
}
const AddDialogExport: React.FC<IDefautProps> = props => {
  const { classes, isOpen, setIsOpen } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      maxWidth="lg"
    >
      <DialogTitle>
        {"Add Export Config"}
      </DialogTitle>
      <DialogContent>
        <InputExport />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          Cancel
        </Button>
        <Button color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(AddDialogExport);
