import React, { useState } from 'react';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../store/actions/export_configuration';
import { filter, isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormLabel from '@material-ui/core/FormLabel';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
import { AddDialogExport, ViewDialog, DeleteDialogExport } from './ExportDialog';
import ExConfig from './Models/ExConfig';
const styles: any = (theme: any) => {
	return {
		container: {
			maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
			margin: `${theme.spacing.unit * 8}px 0px 0px 0px`,
			height: '880px'
		},
		export_top: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline',
			marginBottom: '10px',
			marginRight: '10px'
		},
		titleConfig: {
			fontWeight: 'bold',
			margin: `${theme.spacing.unit * 3}px 0px 0px 0px`,
			fontSize: '20px'
		},
		selectRow: {
			cursor: 'pointer',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: 'lightgray'
			}
		},
		tableItem: {
			width: '100%'
		},
		table: {
			fontSize: '15px',
			fontWeight: 'bold'
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginRight: theme.spacing.unit * 2,
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing.unit * 3,
				width: 'auto'
			}
		},
		searchIcon: {
			width: theme.spacing.unit * 9,
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		inputRoot: {
			color: 'inherit',
			width: '100%'
		},
		inputInput: {
			background: '#d3d3d375',
			borderRadius: '50px',
			paddingTop: theme.spacing.unit,
			paddingRight: theme.spacing.unit,
			paddingBottom: theme.spacing.unit,
			paddingLeft: theme.spacing.unit * 10,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: 200
			}
		},
		margin: {
			margin: '5px',
			fontSize: '10px'
		},
		extendedIcon: {
			marginRight: theme.spacing.unit,
			fontSize: '15px'
		}
	};
};

export interface IDefautProps {}
export interface IDefautState {}
const ExportComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		data,
		setExportConfig,
		setSelectedExportConfig,
		setIsOpenAddDialog,
		setIsOpenViewDialog,
		setIsOpenDelDialog,
		isOpenAdd,
		isOpenView,
		isOpenDel
	} = props;

	const exportConfigs = data.data;
	const [ selectedExportConfig ] = useState(null);
	const [ strSearch, setStrSearch ] = useState(null);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
	const [ configDel, setConfigDel ] = React.useState('');
	// =====Search
	let searchTimeout = null;

	const onChangeSearch = (e) => {
		const value = e.target.value;
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		searchTimeout = setTimeout(() => {
			setStrSearch(value);
		}, 500);
	};

	//==Rows Per Page
	const handleChangePage = (newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	//Data Filter
	const exportData = filter(exportConfigs, (exConfig) => {
		if (isEmpty(strSearch)) {
			return true;
		}
		const strToSearch = exConfig.name.toLowerCase();
		return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
	});

	return (
		<React.Fragment>
			<div className={classes.container}>
				<div className={classes.export_top}>
					<FormLabel className={classes.titleConfig}>Export Configuation</FormLabel>
					<div className={classes.export_top}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								onChange={onChangeSearch}
							/>
						</div>
						<IconButton
							size="large"
							onClick={() => {
								let project_id = props.history.location.pathname
									.replace('/projects/', '')
									.replace('/export-config', '');
								let new_config = new ExConfig();
								new_config.project_id = project_id;
								setExportConfig(new_config);
								setIsOpenAddDialog(true);
							}}
						>
							<AddIcon />
						</IconButton>
					</div>
				</div>
				<div style={{ overflow: 'auto' }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.table}>Name</TableCell>
								<TableCell className={classes.table}>Cron Trigger</TableCell>
								<TableCell className={classes.table}>Type</TableCell>
								<TableCell className={classes.table}>Actions</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</div>
				<div style={{ overflow: 'auto', height: '500px' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{exportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exConfig, index) => (
								<TableRow className={classes.selectRow}>
									<TableCell component="th" scope="row" className={classes.tableItem}>
										{exConfig.name}
									</TableCell>
									<TableCell className={classes.tableItem}>
										{exConfig.cron_trigger ? getTimeByCronValue(exConfig.cron_trigger) : 'No Update'}
									</TableCell>
									<TableCell className={classes.tableItem}>{exConfig.collect_export_option.type}</TableCell>
									<TableCell className={classes.tableItem}>
										<Tooltip title="View export config">
											<IconButton
												aria-label="View"
												onClick={() => {
													setSelectedExportConfig(exConfig);
													setIsOpenViewDialog(true);
												}}
											>
												<ViewIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Edit export config">
											<IconButton aria-label="Edit">
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
												aria-label="Delete"
												onClick={(e) => {
													e.stopPropagation();
													setConfigDel(exConfig.name);
													setSelectedExportConfig(exConfig);
													setIsOpenDelDialog(true);
												}}
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={exportData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
				<AddDialogExport isOpen={isOpenAdd} setIsOpen={setIsOpenAddDialog} {...props} />
				<ViewDialog
					exConfig={selectedExportConfig}
					setExportConfig={setSelectedExportConfig}
					isOpen={isOpenView}
					setIsOpen={setIsOpenViewDialog}
					selectedList={selectedExportConfig}
					setSelectedList={setSelectedExportConfig}
					{...props}
				/>
				<DeleteDialogExport
					isOpen={isOpenDel}
					setIsOpen={setIsOpenDelDialog}
					exConfig={selectedExportConfig}
					setExportConfig={setSelectedExportConfig}
					selectedList={selectedExportConfig}
					setSelectedList={setSelectedExportConfig}
					configDel={configDel}
					{...props}
				/>
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(ExportComponent);
