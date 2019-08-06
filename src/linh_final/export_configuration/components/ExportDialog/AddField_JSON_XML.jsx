import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/export_configuration';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { isRequired } from '../../../tranform_configuration/services';

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
	theme?: any,
	exportFields?: any,
	isOpen?: any,
	setIsOpen?: any,
	formatItem?: any,
	setFormatItem?: any,
	address?: any,
	modeChild?: any,
	selectedFieldItem?: any,
	setConfigValidator?: any,
	exportConfigValidators?: any,
	setStatus?: any
}

export interface IDefautState {
	fieldItem?: any
}

const AddField_JSON_XML: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		exportFields,
		isOpen,
		setIsOpen,
		formatItem,
		setFormatItem,
		address,
		modeChild,
		selectedFieldItem,
		setConfigValidator,
		exportConfigValidators,
	} = props;

	const [ fieldItem, setFieldItem ] = useState(() => {
		if (selectedFieldItem) {
			return selectedFieldItem;
		}
		return { name: '', value: '' };
	});

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
		if (!newField.name) {
			result = false;
			setConfigValidator('name', true);
		} else {
			setConfigValidator('name', false);
		}
		if (!newField.value) {
			result = false;
			setConfigValidator('value', true);
		} else {
			setConfigValidator('value', false);
		}
		return result;
	};

	const setNull = () => {
		setConfigValidator('name', false);
		setConfigValidator('value', false);
	};

	const onAddFieldItem = () => {
		const checkEmpty = checkIsEmpty(fieldItem);
		if (checkEmpty) {
			// address
			const initExportField = {
				name: fieldItem.name,
				value: fieldItem.value
			};

			if (modeChild === 'addChild') {
				if (isEmpty(address)) {
					setFormatItem({
						...formatItem,
						fields_export: [ initExportField, ...exportFields ]
					});
				} else {
					// address = [1]
					if (address.length === 1) {
						const newField = exportFields[address[0]];
						newField.childs.fields.push(initExportField);
						exportFields[address[0]] = newField;

						setFormatItem({
							...formatItem,
							fields_export: exportFields
						});
					} else {
						// address = [1, 2]
						let field = exportFields[address[0]];
						let newField = field;
						for (let i = 1; i < address.length; i++) {
							const fieldAdress = address[i];
							newField = newField.childs.fields[fieldAdress];
						}
						newField.childs.fields.push(initExportField);
						exportFields[address[0]] = field;
						setFormatItem({
							...formatItem,
							fields_export: exportFields
						});
					}
				}
			} else if (modeChild === 'editChild') {
				if (address.length === 1) {
					const newField = exportFields[address[0]];
					newField.name = fieldItem.name;
					newField.value = fieldItem.value;
					newField.childs.name = fieldItem.value;

					exportFields[address[0]] = { ...newField };
				} else {
					// address = [1, 2]
					let field = exportFields[address[0]];
					let newField = field;
					for (let i = 1; i < address.length; i++) {
						const fieldAdress = address[i];
						newField = newField.childs.fields[fieldAdress];
					}
					newField.name = fieldItem.name;
					newField.value = fieldItem.value;
					newField.childs.name = fieldItem.value;
					exportFields[address[0]] = field;
				}
			}
			setIsOpen(false);
		}
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{`${modeChild === 'addChild'
				? 'Add'
				: 'Edit'} Field JSON/XML`}</DialogTitle>
			<DialogContent>
				<div style={{ display: 'block' }}>
					<TextField
						required
						label="Field Name"
						name="name"
						margin="dense"
						variant="outlined"
						value={fieldItem.name}
						onChange={onChangeText}
						error={exportConfigValidators['name'].error}
					/>
					<FormHelperText className={classes.error}>
						{exportConfigValidators['name'].error ? exportConfigValidators['name'].message : ''}
					</FormHelperText>
				</div>
				<div style={{ display: 'block' }}>
					<TextField
						required
						label="Field Value"
						name="value"
						margin="dense"
						variant="outlined"
						value={fieldItem.value}
						onChange={onChangeText}
						error={exportConfigValidators['value'].error}
					/>
					<FormHelperText className={classes.error}>
						{exportConfigValidators['value'].error ? exportConfigValidators['value'].message : ''}
					</FormHelperText>
				</div>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={() => {
						setIsOpen(false);
						setNull();
					}}
					color="primary"
				>
					<Translate value={`${KEY_TRANSLATE}.cancel`} />
				</Button>
				<Button color="primary" onClick={onAddFieldItem}>
					{modeChild === 'addChild' ? 'Add' : 'Edit'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddField_JSON_XML);
