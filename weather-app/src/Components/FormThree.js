// Import Library
// import { v4 as uuid } from "uuid";
import { useState } from "react";
import Card from "./Card";
import ViewListTwo from "./ViewListTwo";

function AddForm() {
  const blankForm = {
    index: 0,
    activity: "",
    location: "",
    // time: "",
    // comment: "",
  };

  // Function For adding new row object
  const handleAdd = () => {
    // setRows([
    //   ...rows,
    //   {
    //     id: uuid(),
    //     activity: "",
    //     location: "",
    //   },
    // ]);
    // setEdit(true);
  };

  // Initial states
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  // Create List when Add Button is click
  const [list, setList] = useState([]);
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");

  // Delete Handler
  const handlerDeleteItem = (id) => {
    // console.log(e.currentTarget.dataset.id);
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.id !== id);
      return updatedList;
    });
  };

  return (
    <>
    <ViewListTwo list={list} />  
    </>
  );
}

export default AddForm;
