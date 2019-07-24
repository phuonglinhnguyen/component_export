import React, { useState } from 'react';
import get from 'lodash/get';
import { isEmpty } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Switch } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import { CronTriggerQuartz } from '@dgtx/core-component-ui';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
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
	theme?: any
}
const InputComponent: React.FC<IDefautProps> = (props) => {
	const { classes, exConfig, setExportConfig } = props;
	const [ statusCron, setStatusCron ] = useState('');
	const [ type, setType ] = useState('DOC');
	const cronTrigger = exConfig ? exConfig.cron_trigger : '';

	const handleChangeCron = (cronValue) => {
		setExportConfig({
			...exConfig,
			cron_trigger: cronValue
		});
		let status = getTimeByCronValue(cronValue);
		setStatusCron(status);
	};

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log({ value });

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
							name="file"
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

			<CronTriggerQuartz
				cronValue={cronTrigger}
				tabs={[ 'minutes', 'hourly', 'daily', 'weekly' ]}
				onChange={handleChangeCron}
			/>
			<br />
			<span styles={{ color: 'gray', fontFamily: 'sans-serif' }}>Cron value: {statusCron}</span>
			<ExportFormat exConfig={exConfig} setExportConfig={setExportConfig} />
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(InputComponent);
