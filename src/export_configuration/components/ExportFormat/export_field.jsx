import React, { useState } from 'react';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
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
import FieldChild from './components/FieldChild';
import ConfirmDialog from '../ConfirmDialog';

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
			paddingLeft: '25px'
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
export interface IDefautState { }

const ExportField: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, formatItem, typeExportFormat,exportFormats } = props;
	const [isOpenAddFieldCSV, setIsOpenAddFieldCSV] = useState(false);
	const [isOpenAddFieldJSON, setIsOpenAddFieldJSON] = useState(false);
	const [fieldItem, setFieldItem] = useState(null);
	const [fieldItemChild, setFieldItemChild] = useState(null);
	const [typeFieldChild, setTypeFieldChild] = useState('field');
	const [open, setOpen] = useState(false);
	const [selectedFieldItem, setSelectedFieldItem] = useState(null);
	const [selectedFieldChildItem, setSelectedFieldChildItem] = useState(null);
	const [address, setAddress] = useState([])
	const exportFields = get(formatItem, 'fields_export', []);
	const [isOpenFields, setIsOpenFields] = useState({})
	const [mode, setMode] = useState('add')
	const [isDelete, setIsOnDelete] = useState(false)

	console.log(selectedFieldItem);
	console.log(mode)

	const renderChilds = (parentField, parentFields, paddingLeft, fieldIndexs) => {
		return (
			<Collapse in={isOpenFields[parentField.name]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{parentFields.map((fieldItem, fieldIndex) => {
						const childFields = get(fieldItem, 'childs.fields', [])
						const newFieldIndexs = [...fieldIndexs, fieldIndex]
						return (
							<div>
								<FieldChild
									fieldItem={fieldItem}
									wrapStyles={{ paddingLeft: `${paddingLeft}px` }}
									setAddress={() => { setAddress(newFieldIndexs) }}
									setIsOpenAddFieldJSON={setIsOpenAddFieldJSON}
									setSelectedFieldItem={setSelectedFieldItem}
									isOpenFields={isOpenFields}
									setIsOpenFields={setIsOpenFields}
									setSelectedFieldItem={setSelectedFieldItem}
									setMode={setMode}
									setIsOnDelete={setIsOnDelete}
								/>
								{renderChilds(fieldItem, childFields, paddingLeft + 20, newFieldIndexs)}
							</div>
						);
					})}
				</List>
			</Collapse>)
	}

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
									<ListItem button onClick={() => { setSelectedFieldItem(fieldItem); }} className={classes.listItem}>
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
							<Fab size="small" aria-label="Add" color="primary" onClick={() => {
								setAddress([])
								setIsOpenAddFieldJSON(true);
								setMode('add')
								setSelectedFieldItem(null)
							}}>
								<AddIcon />
							</Fab>
							<span className={classes.addField}>Add Field json/xml</span>

							<List
								component="nav"
								aria-labelledby="nested-list-subheader"
								width="500px"
								subheader={<ListSubheader component="div" className={classes.subHeader}>Export Fields JSON/XML</ListSubheader>}
								className={classes.root}
							>
								{
									exportFields.map((fieldItem, fieldIndex) => {
										const parentFields = get(fieldItem, 'childs.fields', [])

										return (
											<div>
												<FieldChild
													fieldItem={fieldItem}
													className={classes.childItem}
													setAddress={() => { setAddress([fieldIndex]) }}
													setIsOpenAddFieldJSON={setIsOpenAddFieldJSON}
													setSelectedFieldItem={setSelectedFieldItem}
													isOpenFields={isOpenFields}
													setIsOpenFields={setIsOpenFields}
													setSelectedFieldItem={setSelectedFieldItem}
													setMode={setMode}
													setIsOnDelete={setIsOnDelete}
												/>

												{
													renderChilds(fieldItem, parentFields, 20, [fieldIndex])
												}
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
				isOpen={isOpenAddFieldCSV}
				setIsOpen={setIsOpenAddFieldCSV}
				fieldItem={fieldItem}
				setFieldItem={setFieldItem}
			/>

			{isOpenAddFieldJSON ? <AddField_JSON_XML
				{...props}
				exportFields={exportFields}
				// setexportFields={setexportFields}
				isOpen={isOpenAddFieldJSON}
				setIsOpen={setIsOpenAddFieldJSON}
				fieldItemChild={fieldItemChild}
				setFieldItemChild={setFieldItemChild}
				typeFieldChild={typeFieldChild}
				setTypeFieldChild={setTypeFieldChild}
				fieldItem={fieldItem}
				setFieldItem={setFieldItem}
				address={address}
				mode={mode}
				setMode={setMode}
				selectedFieldItem={selectedFieldItem}
				setSelectedFieldItem={setSelectedFieldItem}
			/> : null}

			<ConfirmDialog
				isOpen={isDelete}
				setIsOpen={setIsOnDelete}
				address={address}
				exportFields={exportFields}
				// setexportFields={setexportFields}
			/>

		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(ExportField);
