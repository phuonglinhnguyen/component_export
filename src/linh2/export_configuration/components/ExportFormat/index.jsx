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
	exConfig?: any,
	setExportConfig?: any
}

export interface IDefautState {
	mode?: any,
	typeExportFormat?: any,
	csv?: any,
	formatItem?: any,
	selectedFormatItem?: any
}

const ExportFormat: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, exConfig, setExportConfig } = props;

	const exportFormats = get(exConfig, 'export_format', []);

	const [ mode, setMode ] = useState('add');
	const [ typeExportFormat, setTypeExportFormat ] = useState('csv/db3');
	const [ csv, setCsv ] = useState('');
	const [ formatItem, setFormatItem ] = useState(null);
	const [ selectedFormatItem, setSelectedFormatItem ] = useState(null);

	return (
		<Grid className={classes.wrapForm} spacing={24}>
			<Grid item xs={12} md={6} className={classes.formControl1}>
				<ExportFormatInput
					mode={mode}
					setMode={setMode}
					exConfig={exConfig}
					setExportConfig={setExportConfig}
					formatItem={selectedFormatItem ? selectedFormatItem : formatItem}
					setFormatItem={selectedFormatItem ? setSelectedFormatItem : setFormatItem}
					exportFormats={exportFormats}
					typeExportFormat={typeExportFormat}
					setTypeExportFormat={setTypeExportFormat}
					csv={csv}
					setCsv={setCsv}
					{...props}
				/>
			</Grid>

			<Grid item xs={12} md={6} className={classes.formControl}>
				<ExportFormatList
					formatItem={selectedFormatItem ? selectedFormatItem : formatItem}
					setFormatItem={selectedFormatItem ? setSelectedFormatItem : setFormatItem}
					setMode={setMode}
					exConfig={exConfig}
					setExportConfig={setExportConfig}
					setSelectedFormatItem={setSelectedFormatItem}
					exportFormats={exportFormats}
					typeExportFormat={typeExportFormat}
					setTypeExportFormat={setTypeExportFormat}
					csv={csv}
					setCsv={setCsv}
					{...props}
				/>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles, { withTheme: true })(ExportFormat);
