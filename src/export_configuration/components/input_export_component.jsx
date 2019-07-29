import React, { useState } from 'react';
import { isEmpty } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Switch } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

import ExportFormat from './ExportFormat';
const styles: any = (theme: any) => {
	return {
		textField: {
			flexBasis: 200
		},
		textField1: {
			marginTop: '20px',
			flexBasis: 200
		},
		export_destination: {
			display: 'flex'
		},
		margin: {
			margin: theme.spacing.unit
		},
		wrapForm: {
			display: 'flex',
			justifyContent: 'space-around'
		},
		formControl: {
			margin: `${theme.spacing.unit * 2}px 0px ${theme.spacing.unit * 2}px 0px`,
			padding: '20px'
		},
		radioGroup: {
			flexDirection: 'row',
			flexWrap: 'initial'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any,
	exConfig?: any,
	setExportConfig?: any
}
const InputComponent: React.FC<IDefautProps> = (props) => {
	const { classes, exConfig, setExportConfig } = props;
	const [ type, setType ] = useState('DOC');

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setExportConfig({
			...exConfig,
			[name]: value
		});
	};

	const onChangeActive = (e) => {
		const name = e.target.name;
		const checked = e.target.checked;

		setExportConfig({
			...exConfig,
			[name]: checked
		});
	};

	const onChangeRadio = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setType(value);
		setExportConfig({
			...exConfig,
			collect_export_option: {
				...exConfig.collect_export_option,
				type: value
			}
		});
	};

	return (
		<React.Fragment>
			<Grid className={classes.wrapForm} spacing={24}>
				<Grid item xs={12} md={6} className={classes.formControl}>
					<TextField required name="name" label="Name" className={classes.textField} onChange={onChangeText} />
					<FormControlLabel
						label="Active"
						control={
							<Switch
								name="active"
								checked={exConfig ? exConfig.active : true}
								onChange={onChangeActive}
								color="primary"
							/>
						}
					/>
					<br />
					<div>
						<TextField
							required
							name="export_destination"
							label="Export Destination"
							placeholder="//PATH"
							fullWidth="true"
							className={classes.textField1}
							onChange={onChangeText}
						/>
					</div>
				</Grid>
				<Grid item xs={12} md={6} className={classes.formControl}>
					<FormControl className={classes.formCollector}>
						<FormLabel className={classes.contentField}>Collect Export</FormLabel>
						<RadioGroup name="collector" className={classes.radioGroup} value={type} onChange={onChangeRadio}>
							<FormControlLabel value="DOC" control={<Radio />} label="DOC" />
							<FormControlLabel value="BATCH" control={<Radio />} label="BATCH" />
							<FormControlLabel value="DOC_SET" control={<Radio />} label="DOC_SET" />
						</RadioGroup>
					</FormControl>
					<br />
					<TextField
						type="number"
						defaultValue="1"
						name="number_of_files"
						label="Number of Files"
						className={classes.textField}
						margin="dense"
						onChange={onChangeText}
						variant="outlined"
					/>
				</Grid>
			</Grid>

			<ExportFormat exConfig={exConfig} setExportConfig={setExportConfig} />
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(InputComponent);
