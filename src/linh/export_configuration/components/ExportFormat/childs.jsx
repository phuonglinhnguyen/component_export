import React, { useState } from 'react';
import { isEmpty, filter, get } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/tranform_configuration';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles: any = (theme: any) => {
	return {
		nested1:{
			paddingLeft: '80px'
		}
	};
};

export interface IDefautProps {
	classes?: any
}
export interface IDefautState {}

const Childs: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes,openChild } = props;
	const [ open, setOpen ] = useState(true);

	const handleClick = () => {
		setOpen(!open);
	};
	
	return (
		<React.Fragment>
			<Collapse in={openChild} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested1}>
					{open ? <ExpandLess /> : <ExpandMore />}
						<ListItemText primary="Item lv3" />
						<ListItemSecondaryAction>
							<IconButton aria-label="Add">
								<AddIcon />
							</IconButton>
							<IconButton aria-label="Edit">
								<EditIcon />
							</IconButton>
							<IconButton aria-label="Delete">
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Collapse>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(Childs);
