import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Button } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewIcon from "@material-ui/icons/RemoveRedEye";
import Fab from '@material-ui/core/Fab';
import Tooltip from "@material-ui/core/Tooltip";
import ExportIcon from "@material-ui/icons/VerticalAlignBottom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AddDialogExport, ViewDialog } from "./ExportDialog";
const styles: any = (theme: any) => {
  return {
    container: {
      maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
      margin: `${theme.spacing.unit * 8}px 0px 0px 0px`,
      height: "880px"
    },
    export_top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "10px",
      marginRight: "10px"
    },
    titleConfig: {
      fontWeight: "bold",
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`,
      fontSize: "20px"
    },
    selectRow: {
      cursor: "pointer",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "lightgray"
      }
    },
    tableItem: {
      width: '100%'
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      background: "#d3d3d375",
      borderRadius: "50px",
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    margin: {
      margin: theme.spacing.unit,
      fontSize: "10px"
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
      fontSize: "15px"
    },
  };
};

export interface IDefautProps {
  classes?: any,
  theme?: any,
}

export interface IDefautState { }

const ExportComponent: React.FC<IDefautProps, IDefautState> = (props) => {
  const { classes } = props;
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenView, setIsOpenView] = useState(false)
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.export_top}>
          <FormLabel className={classes.titleConfig}>
            Export Configuation
          </FormLabel>
          <div className={classes.export_top}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              // onChange={onChangeSearch}
              />
            </div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsOpenAdd(true)}
            >
              Add Config
            </Button>
          </div>
        </div>
        <div style={{ overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell >
                  Cron Trigger
              </TableCell>
                <TableCell >
                  Type
              </TableCell>
                <TableCell className={classes.table} >
                  Actions
              </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </div>
        <div style={{ overflow: 'auto', height: '150px' }}>
          <Table style={{ tableLayout: 'fixed' }}>
            <TableBody>
              <TableRow
                className={classes.selectRow}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableItem}
                >
                </TableCell>
                <TableCell align="center" className={classes.tableItem}>
                </TableCell>
                <TableCell align="center" className={classes.tableItem}>
                </TableCell>
                <TableCell align="center" className={classes.tableItem}>
                  <Tooltip title="View export config" >
                    <Fab 
                    size="small" 
                    color="primary" 
                    className={classes.margin}
                    onClick={() => setIsOpenView(true)}
                    >
                      <ViewIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Export export config" >
                    <Fab size="small" color="secondary" className={classes.margin}>
                      <ExportIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Delete" >
                    <Fab size="small" color="#d50000" className={classes.margin}>
                      <DeleteIcon />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <AddDialogExport
          isOpen={isOpenAdd}
          setIsOpen={setIsOpenAdd}
        />
        <ViewDialog
        isOpen={isOpenView}
        setIsOpen={setIsOpenView}
        />
      </div>

    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(ExportComponent);