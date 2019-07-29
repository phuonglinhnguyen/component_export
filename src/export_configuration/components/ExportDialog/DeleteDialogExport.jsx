import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles: any = (theme: any) => {
	return {};
};
export interface IDefautProps {
	styles?: any,
	theme?: any,
}
const DeleteDialogExport: React.FC<IDefautProps> = (props) => {
	const { isOpen, setIsOpen, exConfig, configDel } = props;

	const onOK = () => {
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<DialogContent>
				You sure delete config <span style={{ color: 'red', fontWeight: 'bolder' }}>{configDel}</span> ?
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color="primary">
				cancel
				</Button>
				<Button onClick={onOK} color="primary" autoFocus>
					ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(DeleteDialogExport);
