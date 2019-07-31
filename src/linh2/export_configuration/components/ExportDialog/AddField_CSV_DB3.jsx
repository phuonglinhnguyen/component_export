import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { isRequired } from '../../../tranform_configuration/services';
const styles: any = (theme: any) => {
	return {};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any,
	exportFields?: any,
	isOpen?: any,
	setIsOpen?: any,
	formatItem?: any,
	setFormatItem?: any,
	fieldItem?: any,
	setFieldItem?: any,
	modeChild?: any,
	selectedFieldItem?: any,
	setConfigValidator?: any,
	exportConfigValidators?: any
}

const AddField_CSV_DB3: React.FC<IDefautProps> = (props) => {
	const {
		classes,
		exportFields,
		isOpen,
		setIsOpen,
		formatItem,
		setFormatItem,
		fieldItem,
		setFieldItem,
		modeChild,
		selectedFieldItem,
		setConfigValidator,
		exportConfigValidators
	} = props;

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (exportConfigValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (exportConfigValidators[name]) {
			setConfigValidator(name, false);
		}
		setFieldItem({
			...fieldItem,
			[name]: value
		});
	};

	const checkIsEmpty = (newField) => {
		let result = true;
		if (isEmpty(newField.name)) {
			result = false;
			setConfigValidator('name', true);
		} else {
			setConfigValidator('name', false);
		}
		if (isEmpty(newField.value)) {
			result = false;
			setConfigValidator('value', true);
		} else {
			setConfigValidator('value', false);
		}
		return result;
	};

	const onAddField = () => {
		if (modeChild === 'addChild') {
			const newField = { ...fieldItem };
			const checkEmpty = checkIsEmpty(newField);
			if (checkEmpty) {
				setFormatItem({
					...formatItem,
					fields_export: [ newField, ...exportFields ]
				});
				setFieldItem(null);
				setIsOpen(false);
			}
		} else if (modeChild === 'editChild') {
			const checkEmptyEdit = checkIsEmpty(fieldItem);
			if (!checkEmptyEdit) return;
			const newFieldItem = exportFields.map((_fieldItem) => {
				if (_fieldItem.name === selectedFieldItem.name || _fieldItem.value === selectedFieldItem.value) {
					return { ...fieldItem };
				}
				return _fieldItem;
			});
			if (checkEmptyEdit) {
				setFormatItem({
					...formatItem,
					fields_export: newFieldItem
				});
				setIsOpen(false);
			}
		}
	};

	const setNull = () => {
		setConfigValidator('name', false);
		setConfigValidator('value', false);
	};
	
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{`${modeChild === 'addChild' ? 'Add' : 'Edit'}Field CSV/DB3`}</DialogTitle>
			<DialogContent>
				<TextField
					required
					label="Field Name"
					name="name"
					margin="dense"
					variant="outlined"
					onChange={onChangeText}
					value={fieldItem && fieldItem.name ? fieldItem.name : ''}
					error={exportConfigValidators['name'].error}
				/>
				<FormHelperText className={classes.error}>
					{exportConfigValidators['name'].error ? exportConfigValidators['name'].message : ''}
				</FormHelperText>
				<TextField
					required
					label="Field Value"
					name="value"
					margin="dense"
					variant="outlined"
					onChange={onChangeText}
					value={fieldItem && fieldItem.value ? fieldItem.value : ''}
					error={exportConfigValidators['value'].error}
				/>
				<FormHelperText className={classes.error}>
					{exportConfigValidators['value'].error ? exportConfigValidators['value'].message : ''}
				</FormHelperText>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={() => {
						setIsOpen(false);
						setNull();
					}}
					color="primary"
				>
					Cancel
				</Button>
				<Button
					color="primary"
					onClick={() => {
						onAddField();
					}}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddField_CSV_DB3);
