import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
const styles: any = (theme: any) => {
	return {
		showDialog: {
			maxWidth: '1200px'
		}
	};
};
export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any
}
const AddFieldDialog: React.FC<IDefautProps> = (props) => {
	const { classes, isOpen, setIsOpen } = props;

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{'Add Field'}</DialogTitle>
			<DialogContent>
				<TextField
					required
					label="Field Name"
					className={classes.textField}
					name="fieldName"
					margin="dense"
					variant="outlined"
				/>
				<TextField
					required
					label="Field Value"
					className={classes.textField}
					name="fieldValue"
					margin="dense"
					variant="outlined"
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color="primary">
					Cancel
				</Button>
				<Button onClick={() => setIsOpen(false)} color="primary">
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddFieldDialog);
