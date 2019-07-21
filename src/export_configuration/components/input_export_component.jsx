import React, { useState } from "react";
import get from "lodash/get";
import { isEmpty } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { TextField, Switch } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from '@material-ui/icons/Folder'

const styles: any = (theme: any) => {
  return {
    textField: {
      flexBasis: 200,
    },
    export_destination: {
      display: 'flex',
    },
    margin: {
      margin: theme.spacing.unit,
    },
  };
};


export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
}
const InputComponent: React.FC<IDefautProps> = props => {
  const { classes } = props;

  const onFilesChange = (files) => {
    var _Profile_PIC = document.getElementById('export-des').value;
    console.log({ files })
    console.log(_Profile_PIC);

  }
  return (
    <React.Fragment>
      <TextField
        required
        name="name"
        label="Name"
        className={classes.textField}
      // onChange={onChangeText}
      />
      <FormControlLabel
        label="Active"
        control={
          <Switch
            name="active"
            // checked={config ? config.active : true}
            // onChange={onChangeActive}
            color="primary"
          />
        }
      />
      <FormControl className={classes.formCollector}>
        <FormLabel className={classes.contentField}>
          Collect Export
        </FormLabel>
        <RadioGroup
          name="collector"
          className={classes.radioGroup}
        // value={collectorValue()}
        // onChange={onChangeRadio}
        >
          <FormControlLabel
            value="doc_status"
            control={<Radio />}
            label="DOC"
          />
          <FormControlLabel
            value="batch_status"
            control={<Radio />}
            label="BATCH"
          />
          <FormControlLabel
            value="doc_set_status"
            control={<Radio />}
            label="DOC_SET"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="export-des">Export Destination</InputLabel>
        <Input
          required
          id="export-des"
          name="file"
          onChange={onFilesChange}
        />
      </FormControl>

    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(InputComponent);
