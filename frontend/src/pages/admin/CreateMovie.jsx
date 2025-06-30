import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

function CreateMovie() {
  const navigate = useNavigate();
  // image will be saved as URL
  // genre will have just id from genre schema
  // cast is array of String comma seperated
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    overAllRating: 0,
    image: null,
    genre: "",
  });
  //   current image
  const [selectedImage, setSelectedImage] = useState(null);
  // create movie trigger
  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();
  // upload image trigger
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();
  //   since genre cannot be empty. so taking 0th genre as default
  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
      // console.log(genres[0]?._id);
      // console.log(genres);
    }
  }, [genres]);

  const handleChange = (e) => {
    // name is genre
    // value is _id
    const { name, value } = e.target;

    // if genre input
    if (name === "genre") {
      // input name is genre
      // option value is _id
      // const selectedGenre = genres.find((genre) => genre.name == value);
      // console.log(selectedGenre);
      // updating with that id
      setMovieData((prevData) => ({
        ...prevData,
        genre: value,
      }));
    } else {
      // for other inputs
      // cast input is updated seperately
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    // console.log(file.size / (1024 * 1024));
  };
  const handleCreateMovie = async () => {
    // console.log("movie created");
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImageURL = null;
      // creating new form-data for image upload
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        // uploading image
        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImageURL = uploadImageResponse.data.url;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
        // adding image field as uploadedimageurl
        // console.log(movieData);
        await createMovie({
          ...movieData,
          image: uploadedImageURL,
        });

        // navigate("/admin/movies-list");
        // set inputs
        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: null,
          genre: "",
        });
        setSelectedImage(null);

        toast.success("Movie Added To Database");
      }
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };
  return (
    <div className="container flex justify-center items-center mt-4">
      <form className="w-[80%] max-w-[40rem]">
        <p className="text-green-200  text-2xl mb-4">Create Movie</p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(",")}
              onChange={(e) =>
                setMovieData({
                  ...movieData,
                  cast: e.target.value.split(","),
                })
              }
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        {/* select option
            value is genre.id
            name is genre.name
        */}
        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            >
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>
        {/*image input - show only if image isn't selected */}
        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload Image"}
            {selectedImage &&
              (selectedImage.size / (1024 * 1024)).toFixed(2) + " MB"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>
        {/* btn disabled if making request */}
        <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
}

export default CreateMovie;
