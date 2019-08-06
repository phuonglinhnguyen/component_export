import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import { TextField, Switch } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { CronTriggerQuartz } from '@dgtx/core-component-ui';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
import ExportFormat from './ExportFormat';
import { isRequired } from '../../../views/tranform_configuration/services';
const styles: any = (theme: any) => {
	return {
		textField: {
			marginTop: '20px',
			flexBasis: 200
		},
		export_destination: {
			display: 'flex'
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
		},
		error: {
			color: 'red',
			opacity: '0.8'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any,
	exConfig?: any,
	setExportConfig?: any,
	setConfigValidator?: any,
	exportConfigValidators?: any
}

export interface IDefautState {
	statusCron?: any,
	type?: any,
	numberFiles?: any
}

const InputComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, exConfig, setExportConfig, setConfigValidator, exportConfigValidators } = props;

	const typeExConfig = get(exConfig, 'collect_export_option.type');
	const numberExConfig = get(exConfig, 'collect_export_option.number_of_files');
	const cronTrigger = exConfig ? exConfig.cron_trigger : '';

	const [ statusCron, setStatusCron ] = useState('');
	const [ type, setType ] = useState('DOC');
	const [ numberFiles, setNumberFiles ] = useState('one');

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

		if (exportConfigValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (exportConfigValidators[name]) {
			setConfigValidator(name, false);
		}

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
		const value = e.target.value;
		if (value === 'DOC') {
			setNumberFiles('one');

			setType(value);
			setExportConfig({
				...exConfig,
				collect_export_option: {
					...exConfig.collect_export_option,
					type: value,
					number_of_files: 'one'
				}
			});
		} else {
			setType(value);
			setExportConfig({
				...exConfig,
				collect_export_option: {
					...exConfig.collect_export_option,
					type: value
				}
			});
		}
	};

	const onChangeRadioNumber = (e) => {
		const value = e.target.value;
		setNumberFiles(value);
		setExportConfig({
			...exConfig,
			collect_export_option: {
				...exConfig.collect_export_option,
				number_of_files: value
			}
		});
	};

	return (
		<React.Fragment>
			<Grid className={classes.wrapForm} spacing={24}>
				<Grid item xs={12} md={6} className={classes.formControl}>
					<TextField
						required
						name="name"
						label="Name"
						onChange={onChangeText}
						value={exConfig ? exConfig.name : ''}
						error={exportConfigValidators['name'].error}
					/>
					<FormHelperText className={classes.error}>
						{exportConfigValidators['name'].error ? exportConfigValidators['name'].message : ''}
					</FormHelperText>
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
							className={classes.textField}
							onChange={onChangeText}
							value={exConfig ? exConfig.export_destination : ''}
							error={exportConfigValidators['export_destination'].error}
						/>
						<FormHelperText className={classes.error}>
							{exportConfigValidators['export_destination'].error ? (
								exportConfigValidators['export_destination'].message
							) : (
								''
							)}
						</FormHelperText>
					</div>
				</Grid>
				<Grid item xs={12} md={6} className={classes.formControl}>
					<FormControl className={classes.formCollector}>
						<FormLabel className={classes.contentField}>Collect Export</FormLabel>
						<RadioGroup
							name="type"
							className={classes.radioGroup}
							value={exConfig && typeExConfig ? typeExConfig : type}
							onChange={onChangeRadio}
						>
							<FormControlLabel value="DOC" control={<Radio />} label="DOC" />
							<FormControlLabel value="BATCH" control={<Radio />} label="BATCH" />
							<FormControlLabel value="DOC_SET" control={<Radio />} label="DOC_SET" />
						</RadioGroup>
					</FormControl>
					<br />
					<FormControl className={classes.formCollector}>
						<FormLabel className={classes.contentField}>Number of Files</FormLabel>
						<RadioGroup
							name="number_of_files"
							className={classes.radioGroup}
							value={exConfig && numberExConfig ? numberExConfig : numberFiles}
							onChange={onChangeRadioNumber}
						>
							<FormControlLabel value="one" control={<Radio />} label="One" />
							<FormControlLabel value="many" control={<Radio />} label="Many" disabled={typeExConfig === 'DOC'} />
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>
			<div style={{ paddingLeft: '20px' }}>
				<CronTriggerQuartz
					cronValue={cronTrigger}
					tabs={[ 'minutes', 'hourly', 'daily', 'weekly' ]}
					onChange={handleChangeCron}
				/>
				<br />
				<span styles={{ color: 'gray', fontFamily: 'sans-serif' }}>Cron value: {statusCron}</span>
			</div>

			<ExportFormat exConfig={exConfig} setExportConfig={setExportConfig} {...props} />
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(InputComponent);
