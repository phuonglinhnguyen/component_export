import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputExport from '../input_export_component';
import ExConfig from './../Models/ExConfig'
const styles: any = (theme: any) => {
	return {};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any,

}

export interface IDefautState {

}

const AddDialogExport: React.FC<IDefautProps, IDefautState> = (props) => {
	const { exConfigs, setExportConfigs, isOpen, setIsOpen } = props;
	const [exConfig, setExportConfig] = useState(() => {
    return new ExConfig();
  });
	const onSave = () => {
		const newExConfigs = [...exConfigs, exConfig];
    setExportConfigs(newExConfigs);
		setExportConfig(new ExConfig());
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{'Add Export Config'}</DialogTitle>
			<DialogContent>
				<InputExport
					exConfig={exConfig}
					setExportConfig={setExportConfig}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color="primary">
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
