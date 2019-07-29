export const getDataExport = () => {
	return [
		{
			name: 'EXPORT_0',
			cron_trigger: '0/10 * * * * ?',
			export_destination: '/mnt/x-storage/Projects_SIT/089_190611_002_505657/Export',
			active: false,
			project_id: '5d099a031927c3001465f932',
			collect_export_option: {
				type: 'DOC'
			},
			export_format: [
				{
					type: 'xml',
					fields_export: [
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
								name: 'child_linh',
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
							value: 'H0',
							childs: {
								name: 'H0',
								fields: [
								]
							}
						}
					],
					fileName: 'Merchant Name',
					delimiter: ';'
				},
				{
					type: 'csv',
					fields_export: [
						{
							name: 'Merchant Name',
							value: 'Merchant Name'
						},
						{
							name: 'Leistungsbezeichnung 1',
							value: 'Leistungsbezeichnung 1'
						}
					],
					fileName: 'Merchant Name',
					delimiter: ';'
				}
			]
		}
	];
};
