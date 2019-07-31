import React from 'react';
import get from 'lodash/get';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
			padding: '20px'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	exConfig?: any
}

const ViewExportConfig: React.FC<IDefautProps> = (props) => {
	const { classes, exConfig } = props;
	const exportFormat = get(exConfig, 'export_format', []);

	if (exConfig === null) return <div>Loading...</div>;

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
				<div style={{ overflowY: 'auto', height: '300px', width: '100%' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{exportFormat.map((field, index) => (
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

ViewExportConfig.defaultProps = {
	exConfig: null
};

export default withStyles(styles, { withTheme: true })(ViewExportConfig);
