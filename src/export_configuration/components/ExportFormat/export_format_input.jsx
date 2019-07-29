import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import ExportField from './export_field';

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
			margin: '24px 0'
		},
		query: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center'
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
		},
		error: {
			color: 'red',
			opacity: '0.8'
		},
		helper: {
			opacity: '0.5'
		},
		inputField: {
			display: 'flex'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any
}
export interface IDefautState { }

const ExportFormatInput: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		mode,
		setMode,
		exConfig,
		setExportConfig,
		formatItem,
		setFormatItem,
		exportFormats,
		typeExportFormat,
		setTypeExportFormat
	} = props;

	const typeEF = [
		{ label: 'csv', value: 'csv' },
		{ label: 'xml', value: 'xml' },
		{ label: 'json', value: 'json' },
		{ label: 'db3', value: 'db3' }
	];

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormatItem({
			...formatItem,
			[name]: value
		});
	};

	const onChangeTextType = (name, value) => {
		setFormatItem({
			...formatItem,
			[name]: value
		});
	};

	const onAddTest = () => {
		if (mode === 'add') {
			const newFormatItem = { ...formatItem };
			setExportConfig({
				...exConfig,
				export_format: [...exportFormats, newFormatItem]
			});
			setFormatItem(null);
		} else if (mode === 'edit') {
			const newExportFormat = exportFormats.map((_formatItem) => {
				if (_formatItem.type === formatItem.type) {
					return { ...formatItem };
				}
				return _formatItem;
			});
			setExportConfig({
				...exConfig,
				export_format: newExportFormat
			});
			setMode('add');
			setFormatItem(null);
		}
		console.log({ exportFormats });

	};

	const onCancel = () => {
		setMode('add');
		setFormatItem(null);
	};
	console.log({ formatItem });

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
					<Fab
						size="small"
						aria-label="Add"
						className={mode === 'add' ? classes.add : classes.save}
						onClick={onAddTest}
					>
						{mode === 'add' ? <AddIcon /> : <DoneIcon />}
					</Fab>
				</div>
			</div>
			<div className={classes.formInput}>
				<div className={classes.inputField}>
					<TextField
						required
						select
						name="type"
						className={classes.textField}
						variant="outlined"
						label="Type"
						margin="dense"
						onChange={(e) => {
							onChangeTextType(e.target.name, e.target.value);
							if (e.target.value === 'csv' || e.target.value === 'db3') {
								setTypeExportFormat('csv/db3');
							} else if (e.target.value === 'json' || e.target.value === 'xml') {
								setTypeExportFormat('json/xml');
							}
						}}
						value={formatItem && formatItem.type ? formatItem.type : 'csv'}
					>
						{typeEF.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						required
						label="File Name"
						name="fileName"
						margin="dense"
						variant="outlined"
						onChange={onChangeText}
						value={formatItem && formatItem.fileName ? formatItem.fileName : ''}
					/>
				</div>

				<div className={classes.formInput}>
					<ExportField
						formatItem={formatItem}
						setFormatItem={setFormatItem}
						exportFormats={exportFormats}
						exConfig={exConfig}
						setExportConfig={setExportConfig}
						typeExportFormat={typeExportFormat}
						setTypeExportFormat={setTypeExportFormat}
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
