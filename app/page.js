"use client";
import React, { useState } from "react";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  const [topTask, settopTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    settopTask([...topTask, { title: title, desc: desc }]);
    settitle("");
    setdesc("");
  };

  const deleteHandler = (task) => {
    let copyTask = [...topTask];
    copyTask.splice(task, 1); // 1 is the number of element to be deleted
    settopTask(copyTask);
  };

  const completionHandler = (task) => {
    let copyTask = [...topTask];
    // Change the color to red
    copyTask[task].title = <strike className="text-red-500"><span className="text-red-500">{copyTask[task].title}</span></strike>;
    copyTask[task].desc = <strike className="text-red-500"><span className="text-red-500">{copyTask[task].desc}</span></strike>;
    settopTask(copyTask);
  }; 

  let renderTask = <h2>No Task Found</h2>;
  if (topTask.length > 0) {
    renderTask = topTask.map((task, index) => {
      return (
        <li key={index} className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-between w-2/3">
              <h5 className="text-2xl font-semibold">{task.title}</h5>
              <p className="text-lg font-medium">{task.desc}</p>
          </div>
          <button 
          onClick={() => completionHandler(index)}
          className="bg-lime-500 text-white px-4 py-2 rounded">Complete</button>
          <button 
          onClick={() => deleteHandler(index)}
          className="bg-red-400 text-white px-4 py-2 rounded">Delete</button>
        </li>
      );
    });
  }
  return (
    // Fragment
    <>
      <h1 className="bg-black text-white p-5 text-4xl font-bold text-center">
        Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Type whatever you like"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Wanna describe it?"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-3 m-5 text-2xl font-bold text-center rounded">
          Add New +
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
