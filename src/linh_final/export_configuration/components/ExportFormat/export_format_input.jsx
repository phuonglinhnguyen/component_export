import React from 'react';
import { isEmpty} from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import ExportField from './export_field';
import { isRequired } from '../../../tranform_configuration/services';

const styles: any = (theme: any) => {
	return {
		exportFormat: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '20px'
		},
		titleField: {
			fontWeight: 'bold'
		},
		textField: {
			marginRight: '20px',
			width: '100px'
		},
		add: {
			background: '#3f51b5',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1a237e'
			}
		},
		save: {
			background: '#689f38',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1b5e20'
			}
		},
		formInput: {
			margin: '24px 0',
			height: '500px'
		},
		hidden: {
			display: 'none'
		},
		cancel: {
			marginRight: '10px',
			background: '#ff9800',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#e65100'
			}
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	mode?: any,
	setMode?: any,
	exConfig?: any,
	setExportConfig?: any,
	formatItem?: any,
	setFormatItem?: any,
	exportFormats?: any,
	typeExportFormat?: any,
	setTypeExportFormat?: any,
	csv?: any,
	setCsv?: any,
	setConfigValidator?: any,
	exportConfigValidators?: any
}

const ExportFormatInput: React.FC<IDefautProps> = (props) => {
	const {
		classes,
		mode,
		setMode,
		exConfig,
		setExportConfig,
		formatItem: formatItemDung,
		setFormatItem,
		exportFormats,
		typeExportFormat,
		setTypeExportFormat,
		csv,
		setCsv,
		setConfigValidator,
		exportConfigValidators,
		addressFormat
	} = props;

	const typeEF = [
		{ label: 'csv', value: 'csv' },
		{ label: 'xml', value: 'xml' },
		{ label: 'json', value: 'json' },
		{ label: 'db3', value: 'db3' }
	];

	const bienDungThanhDu = (fields_export) => {
		if (formatItem.type === 'xml' || formatItem.type === 'json') {
			if (fields_export) {
				return fields_export.map((fieldItem) => {
					if (fieldItem.name || fieldItem.value) {
						if (isEmpty(fieldItem.value)) {
							fieldItem.value = fieldItem.childs.name;
						} else if (!fieldItem.childs) {
							fieldItem.childs = {
								name: fieldItem.value,
								fields: []
							};
						}
						fieldItem.childs.fields = bienDungThanhDu(fieldItem.childs.fields);
						return fieldItem;
					}
				});
			}
		}
	};

	let formatItem = { ...formatItemDung };
	if (formatItem.type === 'xml' || formatItem.type === 'json') {
		const fields_export = bienDungThanhDu(formatItem.fields_export);

		formatItem.fields_export = fields_export;
	}

	const bienDuThanhDung = (fields_export) => {
		if (formatItem.type === 'xml' || formatItem.type === 'json') {
			if (fields_export) {
				return fields_export.map((fieldItem) => {
					if (fieldItem.childs.fields.length >= 1) {
						delete fieldItem.value;
					} else if (fieldItem.childs.fields.length === 0) {
						delete fieldItem.childs;
					}

					if (fieldItem.childs) {
						fieldItem.childs.fields = bienDuThanhDung(fieldItem.childs.fields);
					}

					return fieldItem;
				});
			}
		}
	};

	const checkIsEmpty = (newFormatItem) => {
		let result = true;
		if (isEmpty(newFormatItem.type)) {
			result = false;
			setConfigValidator('type', true);
		} else {
			setConfigValidator('type', false);
		}
		if (isEmpty(newFormatItem.fileName)) {
			result = false;
			setConfigValidator('fileName', true);
		} else {
			setConfigValidator('fileName', false);
		}
		if (typeExportFormat === 'csv/db3' && csv === 'csv') {
			if (isEmpty(newFormatItem.delimiter)) {
				result = false;
				setConfigValidator('delimiter', true);
			} else {
				setConfigValidator('delimiter', false);
			}
		} else if (typeExportFormat === 'json/xml' && csv === 'xml') {
			if (isEmpty(newFormatItem.rootName)) {
				result = false;
				setConfigValidator('rootName', true);
			} else {
				setConfigValidator('rootName', false);
			}
		}

		return result;
	};

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (exportConfigValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (exportConfigValidators[name]) {
			setConfigValidator(name, false);
		}
		setFormatItem({
			...formatItem,
			[name]: value
		});
	};

	const onChangeTextType = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		if (exportConfigValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (exportConfigValidators[name]) {
			setConfigValidator(name, false);
		}
		if (value === 'csv') {
			setCsv('csv');
			setTypeExportFormat('csv/db3');
			setConfigValidator('delimiter', false);
			setConfigValidator('fileName', false);
		} else if (value === 'xml') {
			setCsv('xml');
			setTypeExportFormat('json/xml');
			setConfigValidator('rootName', false);
			setConfigValidator('fileName', false);
		} else if (value === 'json') {
			setCsv('');
			setTypeExportFormat('json/xml');
			setConfigValidator('fileName', false);
		} else if (value === 'db3') {
			setCsv('');
			setTypeExportFormat('csv/db3');
			setConfigValidator('fileName', false);
		}
		setFormatItem({
			...formatItem,
			[name]: value
		});
	};

	const onAdd = () => {
		if (formatItem.type === 'xml' || formatItem.type === 'json') {
			const fields_export = bienDuThanhDung(formatItem.fields_export);
			formatItem.fields_export = fields_export;
		}
		if (mode === 'add') {
			const newFormatItem = { ...formatItem };
			const checkEmpty = checkIsEmpty(newFormatItem);

			if (checkEmpty) {
				setExportConfig({
					...exConfig,
					export_format: [ ...exportFormats, newFormatItem ]
				});
				setFormatItem(null);
			}
		} else if (mode === 'edit') {
			const newExportFormat = exportFormats.map((_formatItem, index) => {
				if (index === addressFormat) {

					return { ...formatItem };
				}
				return _formatItem;
			});
			
			const checkEmpty = checkIsEmpty(formatItem);
			if (checkEmpty) {
				setExportConfig({
					...exConfig,
					export_format: newExportFormat
				});
				setMode('add');
				setFormatItem(null);
			}
		}
	};

	const onCancel = () => {
		setMode('add');
		setFormatItem(null);
		setCsv('');
		setNull();
	};

	const setNull = () => {
		setConfigValidator('type', false);
		setConfigValidator('fileName', false);
		setConfigValidator('delimiter', false);
		setConfigValidator('rootName', false);
	};

	return (
		<React.Fragment>
			<div className={classes.exportFormat}>
				<FormLabel className={classes.titleField}>Export Format Item</FormLabel>
				<div className={classes.actions}>
					<Fab
						size="small"
						className={mode === 'add' ? classes.hidden : classes.cancel}
						aria-label="Cancel"
						onClick={onCancel}
					>
						{mode === 'add' ? '' : <CancelIcon />}
					</Fab>
					<Fab size="small" aria-label="Add" className={mode === 'add' ? classes.add : classes.save} onClick={onAdd}>
						{mode === 'add' ? <AddIcon /> : <DoneIcon />}
					</Fab>
				</div>
			</div>
			<div className={classes.formInput}>
				<div className={classes.inputField}>
					<div style={{ display: 'block' }}>
						<TextField
							required
							select
							name="type"
							className={classes.textField}
							variant="outlined"
							label="Type"
							margin="dense"
							error={exportConfigValidators['type'].error}
							onChange={onChangeTextType}
							value={formatItem && formatItem.type ? formatItem.type : ''}
							disabled={mode === 'edit'}
						>
							{typeEF.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<FormHelperText className={classes.error}>
							{exportConfigValidators['type'].error ? exportConfigValidators['type'].message : ''}
						</FormHelperText>
					</div>
					{csv === 'xml' ? (
						<div>
							<TextField
								required
								label="rootName"
								name="rootName"
								margin="dense"
								variant="outlined"
								onChange={onChangeText}
								error={exportConfigValidators['rootName'].error}
								value={formatItem && formatItem.rootName ? formatItem.rootName : ''}
							/>
							<FormHelperText className={classes.error}>
								{exportConfigValidators['rootName'].error ? exportConfigValidators['rootName'].message : ''}
							</FormHelperText>
						</div>
					) : (
						''
					)}
					{csv === 'csv' ? (
						<div>
							<TextField
								required
								label="delimiter"
								name="delimiter"
								margin="dense"
								variant="outlined"
								onChange={onChangeText}
								error={exportConfigValidators['delimiter'].error}
								value={formatItem && formatItem.delimiter ? formatItem.delimiter : ''}
							/>
							<FormHelperText className={classes.error}>
								{exportConfigValidators['delimiter'].error ? exportConfigValidators['delimiter'].message : ''}
							</FormHelperText>
						</div>
					) : (
						''
					)}
				</div>
				<TextField
					required
					label="File Name"
					name="fileName"
					margin="dense"
					variant="outlined"
					error={exportConfigValidators['fileName'].error}
					onChange={onChangeText}
					value={formatItem && formatItem.fileName ? formatItem.fileName : ''}
				/>
				<FormHelperText className={classes.error}>
					{exportConfigValidators['fileName'].error ? exportConfigValidators['fileName'].message : ''}
				</FormHelperText>
				<div className={classes.formInput}>
					<ExportField
						formatItem={formatItem}
						setFormatItem={setFormatItem}
						exportFormats={exportFormats}
						exConfig={exConfig}
						setExportConfig={setExportConfig}
						typeExportFormat={typeExportFormat}
						setTypeExportFormat={setTypeExportFormat}
						{...props}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

ExportFormatInput.defaultProps = {
	formatItem: {
		type: 'csv'
	}
};

export default withStyles(styles, { withTheme: true })(ExportFormatInput);
