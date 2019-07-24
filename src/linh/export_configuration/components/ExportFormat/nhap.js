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
</List>;
