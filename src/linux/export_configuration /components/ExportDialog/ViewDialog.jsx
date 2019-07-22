import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ViewExport from './../view_export_config';
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
const ViewDialog: React.FC<IDefautProps> = (props) => {
	const { classes, isOpen, setIsOpen, exConfig, setExportConfig, setIsCloseDialog } = props;
	console.log({ setExportConfig });
	console.log({ exConfig });
	// console.log(exConfig.name);
	return (
		<Dialog open={isOpen} onClose={() => setIsCloseDialog(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{'View Export Config'}</DialogTitle>
			<DialogContent>
        <ViewExport exConfig={exConfig} setExportConfig={setExportConfig}/>
      </DialogContent>

			<DialogActions>
				<Button onClick={() => setIsCloseDialog(false)} color="primary">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(ViewDialog);
