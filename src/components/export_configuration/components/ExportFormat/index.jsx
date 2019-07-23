import React, { useState } from 'react';
import get from 'lodash/get';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExportFormatInput from './export_format_input';
import ExportFormatList from './export_format_list';

const styles: any = (theme: any) => {
	return {
		wrapForm: {
			display: 'flex',
			justifyContent: 'space-around'
		},
		formControl: {
			boxShadow: '-4px 3px 33px -10px rgba(0,0,0,0.75)',
			margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
			padding: '20px',
			minHeight: '200px'
		},
		formControl1: {
			margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
			padding: '20px',
			minHeight: '200px'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any
}
export interface IDefautState {}
const ExportFormat: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, exConfig, setExportConfig } = props;
	const [ mode, setMode ] = useState('add');
	console.log('exConfig Export Field', exConfig);

	return (
		<Grid className={classes.wrapForm} spacing={24}>
			<Grid item xs={12} md={6} className={classes.formControl1}>
				<ExportFormatInput mode={mode} setMode={setMode} exConfig={exConfig} setExportConfig={setExportConfig} />
			</Grid>
			<Grid item xs={12} md={6} className={classes.formControl}>
				<ExportFormatList setMode={setMode} />
			</Grid>
		</Grid>
	);
};

export default withStyles(styles, { withTheme: true })(ExportFormat);
