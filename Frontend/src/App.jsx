import "./App.css";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center text-2xl">File upload</h1>
        <form className="mt-5 w-1/3 mx-auto flex flex-col items-center gap-5">
          <input type="file" className="file-input input-bordered w-full" />
          <button type="submit" className="btn btn-block">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
