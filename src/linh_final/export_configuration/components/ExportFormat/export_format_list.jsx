import React, { useState } from 'react';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/export_configuration';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles: any = (theme: any) => {
	return {
		titleField: {
			fontWeight: 'bold'
		},
		demo: {
			backgroundColor: theme.palette.background.paper,
			overflowY: 'auto',
			height: '300px'
		},
		customSearch: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline',
			paddingBottom: '20px',
			borderBottom: '2px solid lavender'
		},
		selectList: {
			cursor: 'pointer',
			transition: 'background 0.1s ease-in',
			'&:hover ': {
				background: 'lightgray'
			},
			'&:hover $listAction ': {
				display: 'block !important',
			},
			
		},
		listAction:{
			display: 'none'
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
		}
	};
};

export interface IDefautProps {
	classes?: any,
	exportFormats?: any,
	setMode?: any,
	exConfig?: any,
	setExportConfig?: any,
	setSelectedFormatItem?: any,
	setTypeExportFormat?: any,
	setCsv?: any,
	setConfigValidator?: any,
	setFormatItem?: any
}

export interface IDefautState {
	isOpen?: any,
	delFormatItem?: any,
	strSearch?: any
}

const ExportFormatList: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		exportFormats,
		setMode,
		exConfig,
		setExportConfig,
		setSelectedFormatItem,
		setTypeExportFormat,
		setCsv,
		setConfigValidator,
		setFormatItem,
		setAddressFormat,
	} = props;

	const [ isOpen, setIsOpen ] = useState(false);
	const [ delFormatItem, setDelFormatItem ] = useState('');
	const [ strSearch, setStrSearch ] = useState(null);

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

	const formatData = filter(exportFormats, (formatItem) => {
		if (isEmpty(strSearch)) {
			return true;
		}
		const strToSearch = formatItem.type.toLowerCase();
		return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
	});

	const deleteFormatItem = (fileName) => {
		const newFormat = exportFormats.filter((formatItem) => formatItem.fileName !== fileName);
		const updateConfig = { ...exConfig, export_format: newFormat };
		setExportConfig(updateConfig);
		setFormatItem(null);
		setMode('add');
	};

	const setNull = () => {
		setConfigValidator('type', false);
		setConfigValidator('fileName', false);
		setConfigValidator('delimiter', false);
		setConfigValidator('rootName', false);
	};

	return (
		<React.Fragment>
			<div className={classes.customSearch}>
				<FormLabel className={classes.titleField}>List Export Format</FormLabel>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search by Type...."
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput
						}}
						onChange={onChangeSearch}
					/>
				</div>
			</div>

			<div className={classes.demo}>
				<List>
					{formatData.map((formatItem, index) => {
						return (
							<ListItem
								key={formatItem.id}
								classes={{ container: classes.selectList }}
								onClick={() => {
									setAddressFormat(index);
									setSelectedFormatItem(formatItem);
									if (formatItem.type === 'csv') {
										setCsv('csv');
										setTypeExportFormat('csv/db3');
									} else if (formatItem.type === 'xml') {
										setCsv('xml');
										setTypeExportFormat('json/xml');
									} else if (formatItem.type === 'json') {
										setCsv('');
										setTypeExportFormat('json/xml');
									} else if (formatItem.type === 'db3') {
										setCsv('');
										setTypeExportFormat('csv/db3');
									}
									setNull();
									setMode('edit');
								}}
							>
								<ListItemIcon>
									<FolderIcon />
								</ListItemIcon>
								<ListItemText primary={formatItem.fileName} secondary={formatItem.type} />
								<ListItemSecondaryAction className={classes.listAction}>
									<IconButton
										aria-label="Delete"
										onClick={() => {
											setIsOpen(true);
											setDelFormatItem(formatItem.fileName);
										}}
									>
										<DeleteIcon />
									</IconButton>
									<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
										<DialogContent>
											Delete <span style={{ color: 'red', fontWeight: 'bolder' }}>{delFormatItem}</span>?{' '}
										</DialogContent>

										<DialogActions >
											<Button onClick={() => setIsOpen(false)} color="primary">
											<Translate value={`${KEY_TRANSLATE}.cancel`} />
											</Button>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													deleteFormatItem(delFormatItem);
													setIsOpen(false);
												}}
												color="primary"
												autoFocus
											>
											<Translate value={`${KEY_TRANSLATE}.ok_delete`} />
											</Button>
										</DialogActions>
									</Dialog>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})}
				</List>
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(ExportFormatList);
