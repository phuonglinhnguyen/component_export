import React, { useState } from 'react';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../store/actions/export_configuration';
import { filter, isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
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
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
import { AddDialogExport, ViewDialog, DeleteDialogExport, EditDialodExport } from './ExportDialog';
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
		table: {
			fontSize: '15px',
			fontWeight: 'bold',
			width: '25%'
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
		extendedIcon: {
			marginRight: theme.spacing.unit,
			fontSize: '15px'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	data?: any,
	setExportConfig?: any,
	setSelectedExportConfig?: any,
	setIsOpenAddDialog?: any,
	setIsOpenEditDialog?: any,
	setIsOpenViewDialog?: any,
	setIsOpenDelDialog?: any,
	isOpenAdd?: any,
	isOpenEdit?: any,
	isOpenView?: any,
	isOpenDel?: any,
	pending?: any,
	success?: any,
	refreshPage?: any
}

export interface IDefautState {
	selectedExportConfig?: any,
	strSearch?: any,
	page?: any,
	rowsPerPage?: any,
	configDel?: any
}

const ExportComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		data,
		setExportConfig,
		setSelectedExportConfig,
		setIsOpenAddDialog,
		setIsOpenEditDialog,
		setIsOpenViewDialog,
		setIsOpenDelDialog,
		isOpenAdd,
		isOpenEdit,
		isOpenView,
		isOpenDel,
		pending,
		success,
		refreshPage
	} = props;

	const exportConfigs = data.data;

	const [ selectedExportConfig ] = useState(null);
	const [ strSearch, setStrSearch ] = useState(null);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(10);
	const [ configDel, setConfigDel ] = useState('');

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
					<FormLabel className={classes.titleConfig}>
						<Translate value={`${KEY_TRANSLATE}.title_export`} />
					</FormLabel>
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
				<Paper style={{ overflow: 'auto' }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.table}>
									<Translate value={`${KEY_TRANSLATE}.name`} />
								</TableCell>
								<TableCell className={classes.table} align="center">
									<Translate value={`${KEY_TRANSLATE}.cron_trigger`} />
								</TableCell>
								<TableCell className={classes.table} align="center">
									<Translate value={`${KEY_TRANSLATE}.type`} />
								</TableCell>
								<TableCell className={classes.table} align="center">
									<Translate value={`${KEY_TRANSLATE}.actions`} />
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</Paper>
				<Paper style={{ overflow: 'auto', height: '730px' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{exportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exConfig, index) => (
								<TableRow className={classes.selectRow}>
									<TableCell component="th" scope="row">
										{exConfig.name}
									</TableCell>
									<TableCell align="center">
										{exConfig.cron_trigger ? getTimeByCronValue(exConfig.cron_trigger) : 'No Update'}
									</TableCell>
									<TableCell align="center">{exConfig.collect_export_option.type}</TableCell>
									<TableCell align="center">
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
											<IconButton
												aria-label="Edit"
												onClick={() => {
													setSelectedExportConfig(exConfig);
													setIsOpenEditDialog(true);
												}}
											>
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
				</Paper>
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
				<AddDialogExport
					isOpen={isOpenAdd}
					setIsOpen={setIsOpenAddDialog}
					pending={pending}
					success={success}
					refreshPage={refreshPage}
					{...props}
				/>
				<EditDialodExport
					isOpen={isOpenEdit}
					setIsOpen={setIsOpenEditDialog}
					pending={pending}
					success={success}
					refreshPage={refreshPage}
					{...props}
				/>
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
