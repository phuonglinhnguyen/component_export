export const getDataExportFieldChilds = () => {
	return [
		{
			name: 'category',
			childs: {
				name: 'child_node',
				fields: [
					{
						name: 'Ust-Identnummer des Merchants',
						value: 'Ust_Identnummer des Merchants'
					},
					{
						name: 'Umsatzsteuersatz 1',
						value: 'Umsatzsteuersatz 1'
					}
				]
			}
		},
		{
			name: 'cat',
			childs: {
				name: 'child_node',
				fields: [
					{
						name: 'terrace',
						value: 'H35'
					},
					{
						name: 'live-sport',
						value: 'H9'
					},
					{
						name: 'recommendation',
						value: 'H54',
						childs: {
							name: 'child_node',
							fields: [
								{
									name: 'terrace',
									value: 'H35'
								},
								{
									name: 'live-sport',
									value: 'H9'
								},
								{
									name: 'recommendation',
									value: 'H54'
								}
							]
						}
					}
				]
			}
		},
		{
			name: 'sub-category',
			value: 'H0'
		},
		{
			name: 'open',
			value: 'H13'
		},
		{
			name: 'payment',
			value: 'H9'
		},
		{
			name: 'awning',
			value: 'H35'
		},
		{
			name: 'accessibility',
			value: 'H37'
		}
	];
};
