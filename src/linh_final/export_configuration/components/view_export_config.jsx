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
		showInfor: {
			margin: `${theme.spacing.unit * 3}px 0px 0px 0px`
		},
		showInforItem: {
			display: 'grid',
			gridTemplateColumns: '25% 75%',
			paddingBottom: '10px'
		},
		title: {
			fontWeight: 'bold'
		},
		titleTable: {
			fontWeight: 'bold',
			width: '50%'
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
	const exportCollect = get(exConfig, 'collect_export_option', {});
	
	if (exConfig === null) return <div>Loading...</div>;

	return (
		<React.Fragment>
			<div className={classes.showInfor}>
				<div className={classes.showInforItem}>
					<label className={classes.title}>Name</label>
					<label>{exConfig.name}</label>
				</div>
				<div className={classes.showInforItem}>
					<label className={classes.title}>Cron Trigger</label>
					<label>{exConfig.cron_trigger ? getTimeByCronValue(exConfig.cron_trigger) : 'No update'}</label>
				</div>
				<div className={classes.showInforItem}>
					<label className={classes.title}>Export Destination</label>
					<label>{exConfig.export_destination}</label>
				</div>
				<div className={classes.showInforItem}>
					<label className={classes.title}>Collector Type</label>
					<label>{exportCollect.type}</label>
				</div>
				<div className={classes.showInforItem}>
					<label className={classes.title}>Number of Files</label>
					<label>{exportCollect.number_of_files}</label>
				</div>
			</div>
			<div className={classes.showInforItem}>
				<label className={classes.title}>Export Format</label>
			</div>
			<div style={{ border: '1px dotted gray' }}>
				<div style={{ overflow: 'auto', width: '100%' }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.titleTable}>File Name</TableCell>
								<TableCell className={classes.titleTable} align="center">
									Type
								</TableCell>
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
									<TableCell className={classes.tableItem} align="center">
										{field.type}
									</TableCell>
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
