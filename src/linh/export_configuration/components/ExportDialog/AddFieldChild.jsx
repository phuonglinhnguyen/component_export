import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
const styles: any = (theme: any) => {
	return {
		childs: {
			paddingLeft: '40px'
		}
	};
};
export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any
}
const AddFieldChild: React.FC<IDefautProps> = (props) => {
	const {
		classes,
		exportFieldChilds,
		setExportFieldChilds,
		isOpen,
		setIsOpen,
		fieldItemChild,
		setFieldItemChild,
		typeFieldChild,
		setTypeFieldChild,
		setFieldItem,
		fieldItem
	} = props;

	const typeChild = [ { label: 'FieldItemChild', value: 'fieldChild' }, { label: 'FieldItem', value: 'field' } ];

	const [ childItem, setChildItem ] = useState(null);
	const onChangeTextFieldChild = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log({value});
		
		setFieldItemChild({
			...fieldItemChild,
			[name]: value
		});
	};
	
	const onChangeTextChild = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setChildItem({
			...childItem,
			[name]: value
		});
	};

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFieldItem({
			...fieldItem,
			[name]: value
		});
	};

	const onAddFieldChild = () => {
		if (typeFieldChild === 'field') {
			const newField = { ...fieldItem };
			console.log({newField});
			// setExportFieldChilds([ newField, ...exportFieldChilds ]);
		} else if (typeFieldChild === 'fieldChild') {
			const newFieldChild = { ...childItem };
			let new_field_item = {
				...fieldItemChild,
				childs: newFieldChild
			};
			console.log({new_field_item});
			
			// setExportFieldChilds([ new_field_item, ...exportFieldChilds ]);
			// setTypeFieldChild('field');
		}
	};
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{'Add Field Childs'}</DialogTitle>
			<DialogContent>
				<TextField
					required
					name="typeChild"
					select
					className={classes.textField}
					variant="outlined"
					label="Type Child"
					margin="dense"
					onChange={(e) => {
						if (e.target.value === 'field') {
							setTypeFieldChild('field');
						} else if (e.target.value === 'fieldChild') {
							setTypeFieldChild('fieldChild');
						}
					}}
					value={fieldItemChild && fieldItemChild.typeChild ? fieldItemChild.typeChild : 'field'}
				>
					{typeChild.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				{typeFieldChild === 'field' ? (
					<div>
						<TextField
							required
							label="Field Name"
							className={classes.textField}
							name="name"
							margin="dense"
							variant="outlined"
							onChange={onChangeText}
						/>
						<TextField
							required
							label="Field Value"
							className={classes.textField}
							name="value"
							margin="dense"
							variant="outlined"
							onChange={onChangeText}
						/>
					</div>
				) : (
					<div className={classes.childs}>
						<TextField
							required
							label="Field Name"
							className={classes.textField}
							name="name"
							margin="dense"
							variant="outlined"
							onChange={onChangeTextFieldChild}
						/>
						<TextField
							required
							label="Field Name Child"
							className={classes.textField}
							name="name"
							margin="dense"
							variant="outlined"
							onChange={onChangeTextChild}
						/>
					</div>
				)}
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color="primary">
					Cancel
				</Button>
				<Button
					color="primary"
					onClick={() => {
						onAddFieldChild();
						setIsOpen(false);
					}}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddFieldChild);
