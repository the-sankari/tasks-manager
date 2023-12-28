import React, { useEffect, useState } from "react";
import TaskButtonAddition from "../components/TaskButtonAddition";
import TaskList from "../components/TaskList";
import useFetch from "../useFetch";
import TaskModelAddition from "../components/TaskModelAddition";
import FetchData from "../tools/FetchData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { DroppableStrictModel as Droppable } from "../tools/DroppableStrictModel";
import SideNavbar from "../components/SideNavbar";




const Home = () => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const [themeMode] = useState("light"); // Example: Setting theme mode
  //fetch all tasks

  const { data, loading } = useFetch(
    "http://localhost:3010/tasks"
  );

  const [tasks, setTasks] = useState(data);

  useEffect(() => {
    const arrayIdOrder = JSON.parse(localStorage.getItem("taskIdOrder"));
    //if not set taskIdOrder in localstorage
    if (!arrayIdOrder && data?.length) {
      localStorage.setItem(
        "taskIdOrder",
        JSON.stringify(data?.map((task) => task.id))
      );
    }

    //if set in localstorage
    let updatedTasks = [];
    if (arrayIdOrder?.length && data?.length) {
      updatedTasks = arrayIdOrder.map((id) =>
        data.find((task) => task.id === id)
      );

      const newTasks = data.filter((task) => !arrayIdOrder.includes(task.id));
      updatedTasks = [...newTasks, ...updatedTasks];
    }

    setTasks(updatedTasks || data);
  }, [data]);

  console.log(tasks);

  const onClickTask = (e, taskId) => {
    e.stopPropagation();
    navigate(`/task/${taskId}`);
  };

  const onEditTaskId = (e, taskId) => {
    e.stopPropagation();
    setEditTaskId(taskId);
  };

  const toggleTaskActivity = (taskId) => {
    // Implement the logic to toggle task activity
    // here i want to fetch the task first and check
    // if task is already isActivte or not
    // if it is active then i want to update the task activityLog
    // start time and end time
    // else i want to update the task lastStartTime

    const activeTask = tasks.find((task) => task.id === taskId);
    console.log(activeTask);
    const isActive = activeTask?.isActive;
    const activityLog = activeTask?.activityLog;
    const lastStartTime = activeTask?.lastStartTime;
    let updatedTask = {};

    if (isActive) {
      updatedTask = {
        ...activeTask,
        isActive: false,
        activityLog: [
          ...activityLog,
          {
            startTime: lastStartTime,
            endTime: new Date().toISOString(),
          },
        ],
      };
    } else {
      updatedTask = {
        ...activeTask,
        isActive: true,
        lastStartTime: new Date().toISOString(),
      };
    }

    const { error } = FetchData(`http://localhost:3010/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (error) {
      toast.error("Error updating task");
      console.log(error);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  const editExitTask = (e, updatedTask) => {
    e.stopPropagation();
    // Implement the logic to edit task name
    const { error } = FetchData(
      `http://localhost:3010/tasks/${updatedTask.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    );

    if (error) {
      toast.error("Error updating task");
      console.log(error);
      return;
    }
    toast.success("Task updated successfully");
    setEditTaskId(null);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const addTagToTask = (taskId, newTag) => {
    // Implement the logic to add a tag to a task
  };

  const removeTagFromTask = async (e, taskId, tagToRemove) => {
    e.stopPropagation();
    // Implement the logic to remove a tag from a task
    const filteredTags = tasks
      .find((task) => task.id === taskId)
      .tags.filter((tag) => tag !== tagToRemove);
    console.log(filteredTags);
    const { error } = await FetchData(`http://localhost:3010/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: tasks
          .find((task) => task.id === taskId)
          .tags.filter((tag) => tag !== tagToRemove),
      }),
    });

    if (error) {
      toast.error("Error removing tag");
      console.log(error);
      return;
    }
    toast.success("Tag removed successfully");
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, tags: task.tags.filter((tag) => tag !== tagToRemove) }
          : task
      )
    );
  };

  const addNewTask = async (newTask) => {
    console.log(newTask);
    const { data, error } = await FetchData("http://localhost:3010/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (error) {
      toast.error("Error adding task");
      console.log(error);
      return;
    }
    toast.success("Task added successfully");
    setTasks((prevTasks) => [data, ...prevTasks]);
  };

  const removeTask = async (e, taskId) => {
    e.stopPropagation();
    // Implement the logic to remove a task
    const { error } = await FetchData(`http://localhost:3010/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (error) {
      toast.error("Error removing task");
      console.log(error);
      return;
    }
    toast.success("Task removed successfully");
    //remove this task id from localstorage
    const arrayIdOrder = JSON.parse(localStorage.getItem("taskIdOrder"));
    const updatedArrayIdOrder = arrayIdOrder.filter((id) => id !== taskId);
    localStorage.setItem("taskIdOrder", JSON.stringify(updatedArrayIdOrder));
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const OnDragEnd = async (result) => {
    if (!result.destination) return;
    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // setTasks(items);
    const idsOrderArray = items.map((task) => task.id);
    // set tasksOrderId from localstorage
    localStorage.setItem("taskIdOrder", JSON.stringify(idsOrderArray));
    // update taskIdOrder
    setTasks(items);

    console.log(items);
  };
const getTaskColor = (index) => {
    const colors = themeMode === "dark" ? taskColors.dark : taskColors.light;
    const colorIndex = index % colors.length;
    return colors[colorIndex];
};
const taskColors = {
  light: [
    'bg-blue-700',
    'bg-green-700',
    'bg-purple-700',
    'bg-pink-700',
  ]

};
  return (
         <>
        <div className="flex relative h-screen">
          <div className="md:block hidden flex-none w-1/5">
            <SideNavbar />
          </div>
          <div className="lg:right-0 lg:w-4/5 w-full flex-1 justify-center align-center mt-2 mb-30 p-4 overflow-hidden ">
            {/* Task List Container */}
            <div className="min-h-[300px] bg-slate-400/20 rounded-md shadow flex-1 justify-center pl-10 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center justify-center py-3 px-10">
                <div className="w-full mt-4 text-3xl font-semibold mb-10 flex items-center justify-between">
                  <TaskButtonAddition setIsModalOpen={setIsModalOpen} />
                </div>
                {loading ? (
                  <Loader />
                ) : (
                  <DragDropContext onDragEnd={OnDragEnd}>
                    <Droppable droppableId="tasks">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="w-full overflow-y-auto max-h-[500px]" // Adjust the max height as needed
                        >
                          {tasks?.map((task, index) => {
                            const taskColor = getTaskColor(index);

    
                            return (
                              <Draggable
                                key={task?.id}
                                draggableId={task?.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`${taskColor} rounded-md p-4 mb-4`}
                                  >
                                    <TaskList
                                      key={task?.id}
                                      task={task}
                                      toggleTaskActivity={toggleTaskActivity}
                                      editExitTask={editExitTask}
                                      removeTask={removeTask}
                                      addTagToTask={addTagToTask}
                                      removeTagFromTask={removeTagFromTask}
                                      editTaskId={editTaskId}
                                      setEditTaskId={setEditTaskId}
                                      activeTaskId={activeTaskId}
                                      setActiveTaskId={setActiveTaskId}
                                      onClickTask={onClickTask}
                                      onEditTaskId={onEditTaskId}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>
            </div>
          </div>
        </div>
    
        {isModalOpen && (
          <TaskModelAddition
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            addNewTask={addNewTask}
          />
        )}
      </>
    );
    
      

    
};

export default Home;
