import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputExport from '../input_export_component';

const styles: any = (theme: any) => {
	return {};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any,
	exConfig?: any,
	setExportConfig?: any,
	createDataExport?: any,
	isOpen?: any,
	setIsCloseDialog?: any
}

export interface IDefautState {
	cronValue?: any,
	setCronValue?: any
}

const AddDialogExport: React.FC<IDefautProps, IDefautState> = (props) => {
	const { exConfig, setExportConfig, createDataExport, isOpen, setIsCloseDialog } = props;
	const [ cronValue, setCronValue ] = useState('');

	const onSave = () => {
		createDataExport(exConfig);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsCloseDialog(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{'Add Export Config'}</DialogTitle>
			<DialogContent>
				<InputExport
					exConfig={exConfig}
					setExportConfig={setExportConfig}
					cronValue={cronValue}
					setCronValue={setCronValue}
					{...props}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsCloseDialog(false)} color="primary">
					Cancel
				</Button>
				<Button color="primary" autoFocus onClick={onSave}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddDialogExport);
