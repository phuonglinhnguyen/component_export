import React from 'react';
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
		childs:{
			paddingLeft: '40px'
		}
	};
};
export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any
}
const AddField_JSON_XML: React.FC<IDefautProps> = (props) => {
	const {
		classes,
		exportFieldChilds,
		setExportFieldChilds,
		isOpen,
		setIsOpen,
		formatItem,
		setFormatItem,
		fieldItemChild,
		setFieldItemChild,
		typeFieldChild,
		setTypeFieldChild
	} = props;

	const typeChild = [ { label: 'FieldItemChild', value: 'fieldChild' }, { label: 'FieldItem', value: 'field' } ];

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFieldItemChild({
			...fieldItemChild,
			[name]: value
		});
	};
	const onChangeTextType = (name, value) => {
		setFieldItemChild({
			...fieldItemChild,
			[name]: value
		});
	};

	const onAddFieldChild = () => {
		const newField = { ...fieldItemChild };
		setExportFieldChilds([ ...exportFieldChilds, newField ]);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
			<DialogTitle className="tilte-dialog">{'Add Field JSON/XML'}</DialogTitle>
			<DialogContent>
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
					name="typeChild"
					select
					className={classes.textField}
					variant="outlined"
					label="Type Child"
					margin="dense"
					onChange={(e) => {
						onChangeTextType(e.target.name, e.target.value);
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
					<TextField
						required
						label="Field Value"
						className={classes.textField}
						name="childs"
						margin="dense"
						variant="outlined"
						onChange={onChangeText}
					/>
				) : (
					<div className={classes.childs}>
						<TextField
							required
							label="Field Name Child"
							className={classes.textField}
							name="childs"
							margin="dense"
							variant="outlined"
							onChange={onChangeText}
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

export default withStyles(styles, { withTheme: true })(AddField_JSON_XML);
