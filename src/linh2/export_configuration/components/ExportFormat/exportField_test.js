export const getDataExport = () => {
  return [
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
                value: 'Ust_Identnummer des Merchants',
                childs: {
                  name: 'Ust_Identnummer des Merchants',
                  fields: []
                }
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
          value: 'H0'
        }
      ],
      fileName: 'Merchant Name',
      delimiter: ';'
    },
    {
      type: 'xml',
      fields_export:[
        {
          name: 'sub-category',
          value: 'H0'
        },
        {
          name: 'sub-category',
          value: 'H0'
        }
      ],
      fileName: 'Merchant Name 2',
      delimiter: ';'
    }
  ]
};
