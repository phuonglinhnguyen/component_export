export const getDataField = () => {
	return [
		{
			type: 'csv',
			fields_export: [
				{
					name: 'Capture Date',
					value: 'Capture Date'
				},
				{
					name: 'Merchant Name',
					value: 'Merchant Name'
				},
				{
					name: 'Txn Amount',
					value: 'Txn Amount'
				},
				{
					name: 'Txn Currency',
					value: 'Txn Currency'
				},
				{
					name: 'Foreign Txn Amount',
					value: 'Foreign Txn Amount'
				},
				{
					name: 'Rechnung Nr.',
					value: 'Rechnung Nr'
				},
				{
					name: 'Ust-Identnummer des Merchants',
					value: 'Ust_Identnummer des Merchants'
				}
			],
			fileName: 'Merchant Name',
			delimiter: ';'
		},
		{
			type: 'db3',
			fields_export: [
				{
					name: 'Barcode',
					value: 'Barcode'
				},
				{
					name: 'VA-Nummer',
					value: 'VA-Nummer'
				},
				{
					name: 'Anrede',
					value: 'Anrede'
				},
				{
					name: 'Titel',
					value: 'Titel'
				},
				{
					name: 'Name',
					value: 'Name'
				},
				{
					name: 'Vorname',
					value: 'Vorname'
				},
				{
					name: 'Straße',
					value: 'Strasse'
				}
			],
			fileName: 'Capture Date'
		}
	];
};
