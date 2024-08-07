import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function App() {
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("image", data.image[0]);

      const response = await axios.post(
        "http://localhost:3000/file-upload",
        formData
      );

      console.log(response.data);
      setImage(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center text-2xl">File upload</h1>
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-5 w-1/3 mx-auto flex flex-col items-center gap-5"
        >
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input input-bordered w-full"
          />
          {errors.image?.type === "required" && (
            <p role="alert">Bitte eine Datei auswählen!</p>
          )}
          <button type="submit" className="btn btn-block">
            Upload
          </button>
        </form>
        {image && (
          <div>
            {" "}
            <img src={image.destination} /> <p>{image.destination}</p>{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
