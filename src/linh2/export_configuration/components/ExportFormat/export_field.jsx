import React, { useState } from 'react';
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
import { getDataExport } from './exportField_test'

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
			borderBottom: '2px solid lavender',
			paddingLeft: '0 !important'
		},
		childItem: {
			paddingLeft: '40px'
		},
		error: {
			color: 'red',
			opacity: '0.8'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	formatItem?: any,
	typeExportFormat?: any
}
export interface IDefautState {
	isOpenAddFieldCSV?: any,
	isOpenAddFieldJSON?: any,
	isOpenFields?: any,
	fieldItem?: any,
	fieldItemChild?: any,
	selectedFieldItem?: any,
	address?: any,
	modeChild?: any,
	isDelete?: any,
	fieldItemDel?: any,
	status?: any
}

const ExportField: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, formatItem, typeExportFormat } = props;

	const exportFields = get(formatItem, 'fields_export', []);

	const [isOpenAddFieldCSV, setIsOpenAddFieldCSV] = useState(false);
	const [isOpenAddFieldJSON, setIsOpenAddFieldJSON] = useState(false);
	const [isOpenFields, setIsOpenFields] = useState({});
	const [fieldItem, setFieldItem] = useState(null);
	const [fieldItemChild, setFieldItemChild] = useState(null);
	const [selectedFieldItem, setSelectedFieldItem] = useState(null);
	const [address, setAddress] = useState([]);
	const [modeChild, setModeChild] = useState('addChild');
	const [isDelete, setIsOnDelete] = useState(false);
	const [fieldItemDel, setFieldItemDel] = useState('');
	const [status, setStatus] = useState('');
	const [exportFieldTest, setExportFieldTest] = useState(() => {
		return getDataExport()
	})

	const renderChilds = (parentField, parentFields, paddingLeft, fieldIndexs) => {
		return (
			<Collapse in={isOpenFields[parentField.name]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{parentFields.map((fieldItem, fieldIndex) => {
						const childFields = get(fieldItem, 'childs.fields', []);
						const newFieldIndexs = [...fieldIndexs, fieldIndex];
						return (
							<div>
								<FieldChild
									status={status}
									setStatus={setStatus}
									fieldItem={fieldItem}
									wrapStyles={{ paddingLeft: `${paddingLeft}px`, display: 'flex' }}
									setAddress={() => {
										setAddress(newFieldIndexs);
									}}
									setIsOpenAddFieldJSON={setIsOpenAddFieldJSON}
									setSelectedFieldItem={setSelectedFieldItem}
									isOpenFields={isOpenFields}
									setIsOpenFields={setIsOpenFields}
									setSelectedFieldItem={setSelectedFieldItem}
									setModeChild={setModeChild}
									setIsOnDelete={setIsOnDelete}
									setFieldItemDel={setFieldItemDel}
									{...props}
								/>
								{renderChilds(fieldItem, childFields, paddingLeft + 20, newFieldIndexs)}
							</div>
						);
					})}
				</List>
			</Collapse>
		);
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
								setModeChild('addChild');
								setIsOpenAddFieldCSV(true);
								setSelectedFieldItem(null);
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
								console.log(fieldItem);
								
								return (
									<ListItem button className={classes.listItem}>
										<ListItemText primary={fieldItem.name} secondary={fieldItem.value} />

										<ListItemSecondaryAction className={classes.hiddenActions}>
											<IconButton
												aria-label="Edit"
												onClick={() => {
													setModeChild('editChild');
													setSelectedFieldItem(fieldItem);
													setIsOpenAddFieldCSV(true);
												}}
											>
												<EditIcon />
											</IconButton>
											<IconButton
												aria-label="Delete"
												onClick={() => {
													setFieldItemDel(fieldItem.name);
													setSelectedFieldItem(fieldItem);
													setIsOnDelete(true);
												}}
											>
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
									setAddress([]);
									setIsOpenAddFieldJSON(true);
									setModeChild('addChild');
									setSelectedFieldItem(null);
								}}
							>
								<AddIcon />
							</Fab>
							<span className={classes.addField}>Add Field json/xml</span>

							<List
								component="nav"
								aria-labelledby="nested-list-subheader"
								subheader={
									<ListSubheader component="div" className={classes.subHeader}>
										Export Fields JSON/XML
								</ListSubheader>
								}
								className={classes.root}
							>
								{exportFields.map((fieldItem, fieldIndex) => {
									const parentFields = get(fieldItem, 'childs.fields', []);

									return (
										<div className={classes.hihi}>
											<FieldChild
												status={status}
												setStatus={setStatus}
												fieldItem={fieldItem}
												setAddress={() => {
													setAddress([fieldIndex]);
												}}
												setIsOpenAddFieldJSON={setIsOpenAddFieldJSON}
												setSelectedFieldItem={setSelectedFieldItem}
												isOpenFields={isOpenFields}
												setIsOpenFields={setIsOpenFields}
												setSelectedFieldItem={setSelectedFieldItem}
												setModeChild={setModeChild}
												setIsOnDelete={setIsOnDelete}
												setFieldItemDel={setFieldItemDel}
												{...props}
											/>

											{renderChilds(fieldItem, parentFields, 40, [fieldIndex])}
										</div>
									);
								})}
							</List>
						</div>
					)}
			</div>

			{isOpenAddFieldCSV ? (
				<AddField_CSV_DB3
					{...props}
					exportFields={exportFields}
					isOpen={isOpenAddFieldCSV}
					setIsOpen={setIsOpenAddFieldCSV}
					fieldItem={selectedFieldItem ? selectedFieldItem : fieldItem}
					setFieldItem={selectedFieldItem ? setSelectedFieldItem : setFieldItem}
					modeChild={modeChild}
					setModeChild={setModeChild}
					address={address}
					selectedFieldItem={selectedFieldItem}
					setSelectedFieldItem={setSelectedFieldItem}
				/>
			) : null}

			{isOpenAddFieldJSON ? (
				<AddField_JSON_XML
					{...props}
					exportFields={exportFields}
					isOpen={isOpenAddFieldJSON}
					setIsOpen={setIsOpenAddFieldJSON}
					fieldItemChild={fieldItemChild}
					setFieldItemChild={setFieldItemChild}
					fieldItem={fieldItem}
					setFieldItem={setFieldItem}
					address={address}
					modeChild={modeChild}
					setModeChild={setModeChild}
					selectedFieldItem={selectedFieldItem}
					setSelectedFieldItem={setSelectedFieldItem}
					status={status}
					setStatus={setStatus}
				/>
			) : null}

			<ConfirmDialog
				{...props}
				fieldItem={selectedFieldItem ? selectedFieldItem : fieldItem}
				setFieldItem={selectedFieldItem ? setSelectedFieldItem : setFieldItem}
				exportFields={exportFields}
				isOpen={isDelete}
				setIsOpen={setIsOnDelete}
				address={address}
				fieldItemDel={fieldItemDel}
				typeExportFormat={typeExportFormat}
				selectedFieldItem={selectedFieldItem}
				setSelectedFieldItem={setSelectedFieldItem}
				modeChild={modeChild}
				setModeChild={setModeChild}
			/>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(ExportField);
