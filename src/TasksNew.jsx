export function TasksNew({ onCreate }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onCreate(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input name="title" type="text" />
        </div>
        <div>
          Url: <input name="url" type="text" />
        </div>
        <div>
          Start_Time: <input name="start_time" type="datetime" />
        </div>
        <div>
          End_Time: <input name="end_time" type="datetime" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}