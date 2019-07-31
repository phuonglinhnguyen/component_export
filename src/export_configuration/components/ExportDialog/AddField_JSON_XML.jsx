import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty'
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
const styles: any = (theme: any) => {
	return {
		childs: {
			paddingLeft: '40px'
		}
	};
};
export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any
}
const AddField_JSON_XML: React.FC<IDefautProps> = (props) => {
	const {
		classes,
		exportFields,
		// setexportFields,
		isOpen,
		setIsOpen,
		formatItem,
		setFormatItem,
		fieldItemChild,
		setFieldItemChild,
		typeFieldChild,
		setTypeFieldChild,
		address,
		mode, setMode,
		selectedFieldItem, setSelectedFieldItem,
	} = props;

	const [fieldItem, setFieldItem] = useState(() => {
		if (selectedFieldItem) {
			return selectedFieldItem
		}
		return { name: '', value: '' }
	});

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFieldItem({
			...fieldItem,
			[name]: value
		});
	};

	const onAddFieldItem = () => {
		// address
		const initExportField = {
			name: fieldItem.name,
			value: fieldItem.value,
		}

		if (mode === 'add') {
			if (isEmpty(address)) {
				// setexportFields([initExportField, ...exportFields])
				setFormatItem({
					...formatItem,
					fields_export:[fieldItem, ...exportFields]
				})
			} 
			else {
				if (address.length === 1) {
					const newField = exportFields[address[0]]
					newField.childs.fields.push(initExportField)
					exportFields[address[0]] = newField
					// setexportFields(exportFields)
					setFormatItem({
						...formatItem,
						fields_export: exportFields
					})
				} else {
					// address = [1, 2]
					let field = exportFields[address[0]]
					let newField = field
					for (let i = 1; i < address.length; i++) {
						const fieldAdress = address[i];
						newField = newField.childs.fields[fieldAdress]
					}
					newField.childs.fields.push(initExportField)
					exportFields[address[0]] = field
					// setexportFields(exportFields)
					setFormatItem({
						...formatItem,
						fields_export: exportFields
					})
				}
			}
		} else if (mode === 'edit') {
			console.log(address);
			if (address.length === 1) {
				const newField = exportFields[address[0]]
				newField.name = fieldItem.name;
				newField.value = fieldItem.value;
				newField.childs.name = fieldItem.value;

				exportFields[address[0]] = { ...newField }
				// setexportFields(exportFields)
			} else {
				// address = [1, 2]
				let field = exportFields[address[0]]
				let newField = field
				for (let i = 1; i < address.length; i++) {
					const fieldAdress = address[i];
					newField = newField.childs.fields[fieldAdress]
				}
				newField.name = fieldItem.name;
				newField.value = fieldItem.value;
				newField.childs.name = fieldItem.value;
				exportFields[address[0]] = field
				// setexportFields(exportFields)
			}
		}
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{`${mode === 'add' ? 'Add' : 'Edit'} Field JSON/XML`}</DialogTitle>
			<DialogContent>
				<TextField
					required
					label="Field Name"
					className={classes.textField}
					name="name"
					margin="dense"
					variant="outlined"
					value={fieldItem.name}
					onChange={onChangeText}
				/>
				<TextField
					required
					label="Field Value"
					className={classes.textField}
					name="value"
					margin="dense"
					variant="outlined"
					value={fieldItem.value}
					onChange={onChangeText}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color="primary">Cancel</Button>
				<Button
					color="primary"
					onClick={onAddFieldItem}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddField_JSON_XML);
