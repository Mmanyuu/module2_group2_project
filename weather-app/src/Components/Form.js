// Form to Read, Add, Update and Delete user dummy data (UsersData.js)
// Letting user to add other activity on current day
// https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
// https://github.com/joshnh/Git-Commands
// https://www.geeksforgeeks.org/how-to-create-an-editable-table-with-add-delete-and-search-filter-using-reactjs/

// Import Library
import { v4 as uuid } from "uuid";
import { useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { Box, Button, Snackbar, Table, TableBody,
  TableCell, TableHead, TableRow} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Card from "./Card";
// import ViewList from "./ViewList";
// import { dummyData } from "./UsersData";
// import ViewListDummy from "./ViewListDummy";
// import Calendar from "./Calendar";

// Creating styles
const useStyles = makeStyles({
  root: {
      "& > *": {
          borderBottom: "unset",
      },
  },
  table: {
      minWidth: 300,
  },
  snackbar: {
      bottom: "104px",
  },
});

function Form() {
  // Creating style object
  const classes = useStyles();

  // const blankForm = {
  //   index: 0,
  //   activity: "",
  //   location: "",
  //   // time: "",
  //   // comment: "",
  // };

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([
    { index: 0, activity: "", location: "" },
  ]);

  // Initial states
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: uuid(),
        activity: "",
        location: "",
      },
    ]);
    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
    setDisable(true);
    setOpen(true);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
    const list = [...rows];
    list.splice(i, 1);
    setRows(list);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <Table>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar>
      <Box margin={1}>
        <TableHead style={{ display: "flex", justifyContent: "space-between" }}>
          <TableBody>
            {isEdit ? (
              <div>
                <Button onClick={handleAdd}>
                  {/* <AddBoxIcon onClick={handleAdd} /> */}
                  ADD ➕
                </Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <Button disabled align="right" onClick={handleSave}>
                        {/* <DoneIcon /> */}
                        SAVE ✔
                      </Button>
                    ) : (
                      <Button align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon />
                  ADD
                </Button>
                <Button align="right" onClick={handleEdit}>
                  <CreateIcon />
                  EDIT
                </Button>
              </div>
            )}
          </TableBody>
        </TableHead>
        {/* <TableRow align="center">&nbsp;</TableRow> */}

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <div>
                  <TableRow>
                    {isEdit ? (
                      <div>
                        <TableCell padding="none">
                          <input
                            value={row.activity}
                            name="activity"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <input
                            value={row.location}
                            name="location"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                      </div>
                    ) : (
                      <div>
                        <TableCell component="th" scope="row">
                          {row.activity}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.location}
                        </TableCell>
                      </div>
                    )}
                    {isEdit ? (
                      <Button className="mr10" onClick={handleConfirm}>
                        <ClearIcon />
                      </Button>
                    ) : (
                      <Button className="mr10" onClick={handleConfirm}>
                        <DeleteOutlineIcon />
                      </Button>
                    )}
                    {showConfirm && (
                      <div>
                        <Dialog
                          open={showConfirm}
                          onClose={handleNo}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Confirm Delete"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to delete
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => handleRemoveClick(i)}
                              color="primary"
                              autoFocus
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={handleNo}
                              color="primary"
                              autoFocus
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )}
                  </TableRow>
                </div>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Table>
  );
}

export default Form;