import React, { useState } from 'react';
import get from 'lodash/get';
import { isEmpty, map } from 'lodash';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
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
import List from '@material-ui/core/List';
import FolderIcon from '@material-ui/icons/Folder';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const styles: any = (theme: any) => {
	return {
		wrapForm: {
			display: 'flex',
			justifyContent: 'space-around'
		},
		formControl: {
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
const ViewExportConfig: React.FC<IDefautProps> = (props) => {
	const { classes, exConfig, setExportConfig } = props;
	const exportFormat = exConfig.export_format;
	console.log({ exConfig });

	console.log('export_format', exportFormat);
	return (
		<React.Fragment>
			<Grid className={classes.wrapForm} spacing={24}>
				<Grid item xs={12} md={4} className={classes.formControl}>
					<label>Name</label>
					<br />
					<label>Cron Trigger</label>
					<br />
					<label>Export Destination</label>
					<br />
					<label>Collector Type</label>
				</Grid>
				<Grid item xs={12} md={8} className={classes.formControl}>
					<label>{exConfig.name}</label>
					<br />
					<label>{exConfig.cron_trigger ? getTimeByCronValue(exConfig.cron_trigger) : 'No update'}</label>
					<br />
					<label>{exConfig.export_destination}</label>
					<br />
					<label>{exConfig.collect_export_option.type}</label>
					<br />
				</Grid>
			</Grid>
			<div style={{ border: '1px dotted gray' }}>
				<div style={{ overflow: 'auto', width: '100%' }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.table}>File Name</TableCell>
								<TableCell className={classes.table}>Type</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</div>
				<div style={{ overflowY: 'auto', height: '730px', width: '100%' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{exConfig.export_format.map((field, index) => (
								<TableRow key={index} className={classes.selectRow}>
									<TableCell component="th" scope="row" className={classes.tableItem}>
										{field.fileName}
									</TableCell>
									<TableCell className={classes.tableItem}>{field.type}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(ViewExportConfig);
