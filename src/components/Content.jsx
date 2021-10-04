import React, { useState } from "react";
import AddList from "./AddList";
import List from "./List";
import Paragraph from "./Paragraph";
import Button from "./Button";

const Content = () => {

  //An array of list user input
  const [todoList, setTodoList] = useState([
    {
      text: "Complete online Javascript course",
      id: 0,
      listStatus: false,
    },
    {
      text: "Jog around the park 3x",
      id: 1,
      listStatus: false,
    },
  ]);

  const [completedList, setCompletedList] = useState([]);
  const [activeList, setActiveList] = useState([]);

  // function to add a list.
  const addTodoList = (inputList) => {
    setTodoList((prev) => {
      return [...prev, inputList];
    });
  };

  //Function to delete a list
  const deleteList = (id) => {
    //return all list except the list with param(id)
    setTodoList((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
  };

  //Change status of a list to true
  const isCheckboxClick = (id, value) => {
    let elementIndex = todoList.findIndex((element) => element.id === id);
    let newArr = [...todoList];

    newArr[elementIndex] = { ...newArr[elementIndex], listStatus: value };

    setTodoList(newArr);
  };

  const handleClick = (id) => {
    const getAllTrue = todoList.filter((item) => {
      return item.listStatus === true;
    });

    const getAllFalse = todoList.filter((item) => {
      return item.listStatus === false;
    });

    if (id === "completed") {
      setCompletedList(getAllTrue);
    } else if (id === "active") {
      setActiveList(getAllFalse);
    } else if (id === "clearCompleted") {
      setTodoList((allItems) => {
        return allItems.filter((item) => {
          return item.listStatus !== true;
        });
      });
    }
  };

  return (
    <main> 
      <AddList addTodoList={addTodoList} />

      <div className="todo-box">
        <ul>
          {todoList.map((item) => (
            <List
              text={item.text}
              key={item.id}
              id={item.id}
              onDelete={deleteList}
              onCheckList={isCheckboxClick}
            />
          ))}
        </ul>
        <div className="bottom-navbar">
          <Paragraph text={todoList.length + " items left"} />

          <div className=" desktop-size">
            <Button id="all" text={"All"} />
            <Button id="active" text={"Active"} handleClick={handleClick} />
            <Button
              id="completed"
              text={"Completed"}
              handleClick={handleClick}
            />
          </div>
          <Button
            id="clearCompleted"
            text={"Clear Completed"}
            handleClick={handleClick}
          />
        </div>
      </div>

      <div className="filter-tab mobile-size">
        <Button text={"All"} />
        <Button id="active" text={"Active"} handleClick={handleClick} />
        <Button id="completed" text={"Completed"} handleClick={handleClick} />
      </div>
    </main>
  );
};

export default Content;
