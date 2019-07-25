import React, { useState } from 'react';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/tranform_configuration';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { AddField_CSV_DB3, AddField_JSON_XML } from './../ExportDialog';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import get from 'lodash/get';
import { getDataExportFieldChilds } from './test_exportfield_child';
const styles: any = (theme: any) => {
	return {
		exportField: {
			marginTop: '20px',
			border: '1px solid gray',
			minHeight: '500px',
			padding: '20px'
		},
		addField: {
			color: '#3f51b5',
			fontFamily: 'sans-serif',
			marginLeft: '10px'
		},
		root: {
			width: '100%',
			marginTop: '20px',
			backgroundColor: theme.palette.background.paper,
			maxHeight: '500px',
			overflowY: 'auto'
		},
		nested: {
			paddingLeft: '40px'
		},
		nested1: {
			paddingLeft: '80px'
		},
		subHeader: {
			fontWeight: 'bold',
			fontSize: '15px',
			borderBottom: '2px solid lavender'
		}
	};
};

export interface IDefautProps {
	classes?: any
}
export interface IDefautState {}

const ExportField: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, formatItem, typeExportFormat } = props;
	const [ isOpenAddFieldCSV, setIsOpenAddFieldCSV ] = useState(false);
	const [ isOpenAddFieldJSON, setIsOpenAddFieldJSON ] = useState(false);
	const [ fieldItem, setFieldItem ] = useState(null);
	const [ fieldItemChild, setFieldItemChild ] = useState(null);
	const [ exportFieldChilds, setExportFieldChilds ] = useState(() => {
		return getDataExportFieldChilds();
	});
	const [ typeFieldChild, setTypeFieldChild] = useState('field');
	const [ open, setOpen ] = useState(true);
	const [ open1, setOpen1 ] = useState(true);
	const exportFields = get(formatItem, 'fields_export', []);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClick1 = () => {
		setOpen1(!open1);
	};

	return (
		<React.Fragment>
			<div className={classes.exportField}>
				{typeExportFormat === 'csv/db3' ? (
					<div>
						<Fab
							size="small"
							aria-label="Add"
							color="primary"
							onClick={() => {
								setIsOpenAddFieldCSV(true);
							}}
						>
							<AddIcon />
						</Fab>
						<span className={classes.addField}>Add Field csv/db3</span>
						<List
							component="nav"
							aria-labelledby="nested-list-subheader"
							width="500px"
							subheader={
								<ListSubheader component="div" className={classes.subHeader}>
									Export Fields CSV/DB3
								</ListSubheader>
							}
							className={classes.root}
						>
							{exportFields.map((fieldItem) => {
								return (
									<ListItem button onClick={handleClick} className={classes.listItem}>
										<ListItemText primary={fieldItem.name} secondary={fieldItem.value} />

										<ListItemSecondaryAction className={classes.hiddenActions}>
											<IconButton aria-label="Edit" onClick={() => setIsOpenAddFieldCSV(true)}>
												<EditIcon />
											</IconButton>
											<IconButton aria-label="Delete" onClick={() => setIsOpenAddFieldCSV(true)}>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								);
							})}
						</List>
					</div>
				) : (
					<div>
						<Fab
							size="small"
							aria-label="Add"
							color="primary"
							onClick={() => {
								setIsOpenAddFieldJSON(true);
							}}
						>
							<AddIcon />
						</Fab>
						<span className={classes.addField}>Add Field json/xml</span>
						<List
							component="nav"
							aria-labelledby="nested-list-subheader"
							width="500px"
							subheader={
								<ListSubheader component="div" className={classes.subHeader}>
									Export Fields JSON/XML
								</ListSubheader>
							}
							className={classes.root}
						>
							{exportFieldChilds.map((fieldItem) => {
								return (
									<div>
										<ListItem button onClick={handleClick} className={classes.listItem}>
											{open ? <ExpandLess /> : <ExpandMore />}
											<ListItemText primary={fieldItem.name} secondary={fieldItem.value} />

											<ListItemSecondaryAction className={classes.hiddenActions}>
												<IconButton aria-label="Add" onClick={() => setIsOpenAddFieldJSON(true)}>
													<AddIcon />
												</IconButton>
												<IconButton aria-label="Edit" onClick={() => setIsOpenAddFieldJSON(true)}>
													<EditIcon />
												</IconButton>
												<IconButton aria-label="Delete" onClick={() => setIsOpenAddFieldJSON(true)}>
													<DeleteIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</div>
								);
							})}
						</List>
					</div>
				)}
			</div>
			<AddField_CSV_DB3
				{...props}
				exportFields={exportFields}
				formatItem={formatItem}
				isOpen={isOpenAddFieldCSV}
				setIsOpen={setIsOpenAddFieldCSV}
				fieldItem={fieldItem}
				setFieldItem={setFieldItem}
			/>
			<AddField_JSON_XML
				{...props}
				exportFieldChilds={exportFieldChilds}
				isOpen={isOpenAddFieldJSON}
				setIsOpen={setIsOpenAddFieldJSON}
				fieldItemChild={fieldItemChild}
				setFieldItemChild={setFieldItemChild}
				setExportFieldChilds={setExportFieldChilds}
				typeFieldChild={typeFieldChild}
				setTypeFieldChild={setTypeFieldChild}
			/>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(ExportField);
