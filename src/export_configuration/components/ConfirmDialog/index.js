import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const ConfirmDialog = props => {
  const {
    isOpen,
    setIsOpen,
    deleteFormatItem,
    delFormatItem,
    address,
    exportFieldChilds,
    setExportFieldChilds,
  } = props


  const onDelete = (e) => {
    e.stopPropagation();
    console.log(address);

    if (address.length === 1) {
      const fieldIndex = address[0]
      const newExportFieldChilds = exportFieldChilds.filter((_, index) => {
        return fieldIndex !== index
      })
      console.log(newExportFieldChilds);
      setExportFieldChilds(newExportFieldChilds)
    } 
    else {
      // address = [1, 2]
      let field = exportFieldChilds[address[0]]
      let newField = field
      for (let i = 1; i < address.length - 1; i++) {
        const fieldAdress = address[i];
        newField = newField.childs.fields[fieldAdress]
      }

      const fieldAdress = address[address.length - 1]
      const newFieldsArray = newField.childs.fields.filter((_, index) => {
        return fieldAdress !== index
      })
      newField.childs.fields = newFieldsArray
      console.log(exportFieldChilds);
      
      // setExportFieldChilds(exportFieldChilds)
    }


    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent>
        Delete <span style={{ color: 'red', fontWeight: 'bolder' }}>{delFormatItem}</span>?{' '}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">Cancel</Button>
        <Button
          onClick={onDelete}
          color="primary"
          autoFocus
        >Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog