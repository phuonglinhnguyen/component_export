import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/export_configuration';
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

const AddDialogExport: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		exConfig,
		setExportConfig,
		createDataExport,
		isOpen,
		pending,
		refreshPage,
		setIsCloseDialog
	} = props;
	const [ cronValue, setCronValue ] = useState('');

	const onSave = () => {
		createDataExport(exConfig);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsCloseDialog(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">
				<Translate value={`${KEY_TRANSLATE}.add_export`} />
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
					<Translate value={`${KEY_TRANSLATE}.cancel`} />
				</Button>
				<Button color="primary" autoFocus onClick={onSave} disabled={pending ? pending : refreshPage}>
					<Translate value={`${KEY_TRANSLATE}.save`} />
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddDialogExport);
