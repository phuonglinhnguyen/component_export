import React from 'react';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/export_configuration';
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
	isOpen?: any,
	setIsOpen?: any,
	deleteDataExport?: any,
	exConfig?: any,
	configDel?: any
}
const DeleteDialogExport: React.FC<IDefautProps> = (props) => {
	const { isOpen, setIsOpen, deleteDataExport, exConfig, configDel } = props;

	const onOK = () => {
		deleteDataExport(exConfig);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<DialogContent>
				You sure delete config <span style={{ color: 'red', fontWeight: 'bolder' }}>{configDel}</span> ?
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color="primary">
					<Translate value={`${KEY_TRANSLATE}.cancel`} />
				</Button>
				<Button onClick={onOK} color="primary" autoFocus>
					<Translate value={`${KEY_TRANSLATE}.ok_delete`} />
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(DeleteDialogExport);
