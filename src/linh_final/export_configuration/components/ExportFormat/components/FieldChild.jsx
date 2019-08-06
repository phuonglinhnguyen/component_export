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
		listItem: {
			'&:hover $listItemActions': {
				display: 'block !important',
			}
		},
		item: {
			display: 'flex'
		},
		listItemActions: {
			display: 'none'
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
		setFieldItemDel
	} = props;

	const isEmptyFields = isEmpty(get(fieldItem, 'childs.fields', []));
	return (
		<ListItem
			button
			className={classes.listItem}
			onClick={() => {
				setIsOpenFields({
					...isOpenFields,
					[fieldItem.name]: !isOpenFields[fieldItem.name]
				});
			}}
		>
			<div className={classes.item} style={wrapStyles}>
				{isEmptyFields ? (
					<div style={{ padding: '7px' }} />
				) : isOpenFields[fieldItem.name] ? (
					<ExpandMore style={{ width: '15px' }} />
				) : (
					<ExpandLess style={{ width: '15px' }} />
				)}
				<ListItemText primary={fieldItem.name} secondary={fieldItem.value} />
				<ListItemSecondaryAction className={classes.listItemActions}>
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
						<AddIcon/>
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
