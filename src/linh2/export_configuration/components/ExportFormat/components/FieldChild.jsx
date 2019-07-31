import React from 'react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

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
		subHeader: {
			fontWeight: 'bold',
			fontSize: '15px',
			borderBottom: '2px solid lavender'
		},
		listItem: {
			display: 'flex'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	setSelectedFieldItem?: any,
	setIsOpenAddFieldJSON?: any,
	fieldItem?: any,
	wrapStyles?: any,
	setAddress?: any,
	isOpenFields?: any,
	setIsOpenFields?: any,
	setModeChild?: any,
	setIsOnDelete?: any,
	status?: any,
	setFieldItemDel?: any
}

const FieldChild = (props) => {
	const {
		classes,
		setSelectedFieldItem,
		setIsOpenAddFieldJSON,
		fieldItem,
		wrapStyles = {},
		setAddress,
		isOpenFields,
		setIsOpenFields,
		setModeChild,
		setIsOnDelete,
		setFieldItemDel,
		status
	} = props;

	const isEmptyFields = isEmpty(get(fieldItem, 'childs.fields', []));
	
	return (
		<ListItem
			button
			onClick={() =>
				setIsOpenFields({
					...isOpenFields,
					[fieldItem.name]: !isOpenFields[fieldItem.name]
				})}
		>
			<div className={classes.listItem} style={wrapStyles}>
				{isEmptyFields ? null : isOpenFields[fieldItem.name] ? <ExpandMore /> : <ExpandLess />}
				<ListItemText primary={fieldItem.name} secondary={fieldItem.value} />
				<ListItemSecondaryAction className={classes.hiddenActions}>
					<span>({status})</span>
					<IconButton
						aria-label="Add"
						onClick={(e) => {
							e.stopPropagation();
							setIsOpenAddFieldJSON(true);
							setAddress();
							setModeChild('addChild');
							setSelectedFieldItem(null);
						}}
					>
						<AddIcon />
					</IconButton>

					<IconButton
						aria-label="Edit"
						onClick={(e) => {
							e.stopPropagation();
							setIsOpenAddFieldJSON(true);
							setSelectedFieldItem(fieldItem);
							setAddress();
							setModeChild('editChild');
						}}
					>
						<EditIcon />
					</IconButton>

					<IconButton
						aria-label="Delete"
						onClick={(e) => {
							e.stopPropagation();
							setAddress();
							setFieldItemDel(fieldItem.name);
							setIsOnDelete(true);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</div>
		</ListItem>
	);
};

export default withStyles(styles, { withTheme: true })(FieldChild);
