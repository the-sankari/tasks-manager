const TaskButtonAddition = ({ setIsModalOpen }) => {
  return (
    <div
      className="w-full flex justify-end"
      onClick={() => setIsModalOpen(true)}
    >
      <button className="btn btn-outline btn-sm text-lg">Add New Task</button>
    </div>
  );
};

export default TaskButtonAddition;
