import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ConfirmDialog = (props) => {
	const {
		isOpen,
		setIsOpen,
		address,
		exportFields,
		formatItem,
		setFormatItem,
		fieldItemDel,
		typeExportFormat,
	} = props;

	//'json/xml
	const onDeleteFieldChild = () => {
		//address=[1]
		if (address.length === 1) {
			const fieldIndex = address[0];
			const newExportFieldChilds = exportFields.filter((_, index) => {
				return fieldIndex !== index;
			});

			setFormatItem({
				...formatItem,
				fields_export: newExportFieldChilds
			});
		} else {
			// address = [1, 2]
			let field = exportFields[address[0]];
			let newField = field;
			for (let i = 1; i < address.length - 1; i++) {
				const fieldAdress = address[i];
				newField = newField.childs.fields[fieldAdress];
			}

			const fieldAdress = address[address.length - 1];
			const newFieldsArray = newField.childs.fields.filter((_, index) => {
				return fieldAdress !== index;
			});
			newField.childs.fields = newFieldsArray;
		}
		setIsOpen(false);
	};
	
	// 'csv/db3'
	const onDeleteField = (name) => {
		const newField = exportFields.filter((fieldItem) => fieldItem.name !== name);
		const updateFields = { ...formatItem, fields_export: newField };
		setFormatItem(updateFields);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<DialogContent>
				Delete <span style={{ color: 'red', fontWeight: 'bolder' }}>{fieldItemDel}</span>?{' '}
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color="primary">
					Cancel
				</Button>
				{typeExportFormat === 'csv/db3' ? (
					<Button
						onClick={() => {
							onDeleteField(fieldItemDel);
						}}
						color="primary"
						autoFocus
					>
						Ok Field
					</Button>
				) : (
					<Button
						onClick={() => {
							onDeleteFieldChild();
						}}
						color="primary"
						autoFocus
					>
						Ok Childs
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
