import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
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
	setIsCloseDialog?: any,
	pending?: any,
	refreshPage?: any
}

export interface IDefautState {
	cronValue?: any
}

const EditDialogExport: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		exConfig,
		setExportConfig,
		updateDataExport,
		isOpen,
		setIsCloseDialog,
		pending,
		refreshPage
	} = props;
	const [ cronValue, setCronValue ] = useState('');

	const onUpdate = () => {
		updateDataExport(exConfig);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsCloseDialog(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">
				{'Edit Export Config'}
				{pending ? (
					<div className={classes.iconProgress}>
						<CircularProgress color="secondary" size={40} />
					</div>
				) : (
					''
				)}
			</DialogTitle>
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
				<Button color="primary" autoFocus onClick={onUpdate} disabled={pending ? pending : refreshPage}>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(EditDialogExport);
