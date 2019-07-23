import React, { useState } from 'react';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/tranform_configuration';
import FormLabel from '@material-ui/core/FormLabel';
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddFieldDialog from './../ExportDialog/AddFieldDialog';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
const styles: any = (theme: any) => {
	return {
		exportField: {
			marginTop: '20px',
			border: '1px solid gray',
			minHeight: '500px',
			padding: '20px',
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
		subHeader:{
			fontWeight:'bold',
			fontSize:'15px',
			borderBottom: '2px solid lavender'
		}
	};
};

export interface IDefautProps {
	classes?: any
}
export interface IDefautState {}

const ExportField: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes } = props;
	const [ isOpen, setIsOpen ] = useState(false);
	const [ open, setOpen ] = React.useState(true);
	const [ open1, setOpen1 ] = React.useState(true);
	const handleClick = () => {
		setOpen(!open);
	};
	const handleClick1 = () => {
		setOpen1(!open1);
	};
	return (
		<React.Fragment>
			<div className={classes.exportField}>
				<Fab
					size="small"
					aria-label="Add"
					color="primary"
					onClick={() => {
						setIsOpen(true);
					}}
				>
					<AddIcon />
				</Fab>
				<span className={classes.addField}>Add Field</span>
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					width="500px"
					subheader={
						<ListSubheader component="div" className={classes.subHeader}>
							Export Fields
						</ListSubheader>
					}
					className={classes.root}
				>
					<ListItem button onClick={handleClick} className={classes.listItem}>
						{open ? <ExpandLess /> : <ExpandMore />}
						<ListItemText primary="Item lv1" />

						<ListItemSecondaryAction className={classes.hiddenActions}>
							<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
								<EditIcon />
							</IconButton>
							<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem button onClick={handleClick1} className={classes.nested}>
								{open1 ? <ExpandLess /> : <ExpandMore />}
								<ListItemText primary="Item lv2" />
								<ListItemSecondaryAction>
									<IconButton aria-label="Add" onClick={() => setIsOpen(true)}>
										<AddIcon />
									</IconButton>
									<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
										<EditIcon />
									</IconButton>
									<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
							<Collapse in={open1} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem button className={classes.nested1}>
										<ListItemText primary="Item lv3" />
										<ListItemSecondaryAction>
											<IconButton aria-label="Add" onClick={() => setIsOpen(true)}>
												<AddIcon />
											</IconButton>
											<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
												<EditIcon />
											</IconButton>
											<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								</List>
							</Collapse>
						</List>
					</Collapse>
					<ListItem button onClick={handleClick}>
						{open ? <ExpandLess /> : <ExpandMore />}
						<ListItemText primary="Item lv1" />

						<ListItemSecondaryAction>
							<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
								<EditIcon />
							</IconButton>
							<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem button onClick={handleClick1} className={classes.nested}>
								{open1 ? <ExpandLess /> : <ExpandMore />}
								<ListItemText primary="Item lv2" />
								<ListItemSecondaryAction>
									<IconButton aria-label="Add" onClick={() => setIsOpen(true)}>
										<AddIcon />
									</IconButton>
									<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
										<EditIcon />
									</IconButton>
									<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
							<Collapse in={open1} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem button className={classes.nested1}>
										<ListItemText primary="Item lv3" />
										<ListItemSecondaryAction>
											<IconButton aria-label="Add" onClick={() => setIsOpen(true)}>
												<AddIcon />
											</IconButton>
											<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
												<EditIcon />
											</IconButton>
											<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								</List>
							</Collapse>
						</List>
					</Collapse>
					<ListItem button onClick={handleClick}>
						{open ? <ExpandLess /> : <ExpandMore />}
						<ListItemText primary="Item lv1" />

						<ListItemSecondaryAction>
							<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
								<EditIcon />
							</IconButton>
							<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItem button onClick={handleClick1} className={classes.nested}>
								{open1 ? <ExpandLess /> : <ExpandMore />}
								<ListItemText primary="Item lv2" />
								<ListItemSecondaryAction>
									<IconButton aria-label="Add" onClick={() => setIsOpen(true)}>
										<AddIcon />
									</IconButton>
									<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
										<EditIcon />
									</IconButton>
									<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
							<Collapse in={open1} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem button className={classes.nested1}>
										<ListItemText primary="Item lv3" />
										<ListItemSecondaryAction>
											<IconButton aria-label="Add" onClick={() => setIsOpen(true)}>
												<AddIcon />
											</IconButton>
											<IconButton aria-label="Edit" onClick={() => setIsOpen(true)}>
												<EditIcon />
											</IconButton>
											<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								</List>
							</Collapse>
						</List>
					</Collapse>
				</List>
			</div>
			<AddFieldDialog isOpen={isOpen} setIsOpen={setIsOpen} />
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(ExportField);
