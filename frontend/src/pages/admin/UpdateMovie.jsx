import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// upload and delete image,movie
// getspecific movie using id
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
} from "../../redux/api/movie";
// get genres
import { useFetchGenresQuery } from "../../redux/api/genre";
function UpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);
  //   fetching the and setting the movie initial data
  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
    // console.log(initialMovieData);
  }, [initialMovieData]);
  // all genres for select and option
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();
  const [updateMovie, { isLoading: isUpdatingMovie, error: updateMovieError }] =
    useUpdateMovieMutation();
  const [deleteMovie, { isLoading: isDeletingMovie }] =
    useDeleteMovieMutation();
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();
  const [
    deleteImage,
    { isLoading: isDeletingImage, error: deleteImageErrorDetails },
  ] = useDeleteImageMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if genre input
    if (name === "genre") {
      // input name is genre
      // option value is _id
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

  const handleUpdateMovie = async () => {
    // if not selectedImage than update only movie
    // else delete current image and upload new image

    if (
      !movieData.name ||
      !movieData.year ||
      !movieData.detail ||
      !movieData.cast ||
      !movieData.genre
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!selectedImage) {
      // just update the movie
      try {
        await updateMovie({
          id: id,
          updatedMovie: {
            ...movieData,
          },
        });

        //   navigate("/movies");
      } catch (error) {
        console.error("Failed to update movie: ", updateMovieError);
        toast.error(`Failed to update movie: ${updateMovieError?.message}`);
        return;
      }
    } else {
      // image handling
      // first delete current image
      try {
        await deleteImage(movieData.image);
      } catch (error) {
        console.error("Failed to delete image: ", deleteImageErrorDetails);
        toast.error(
          `Failed to delete image: ${deleteImageErrorDetails?.message}`
        );
        return;
      }
      //   upload new image
      const formData = new FormData();
      formData.append("image", selectedImage);

      // uploading image
      const uploadImageResponse = await uploadImage(formData);
      if (uploadImageResponse.data) {
        const uploadedImageURL = uploadImageResponse.data.url;
        //   update movie
        try {
          await createMovie({
            ...movieData,
            image: uploadedImageURL,
          });
          //   navigate("/movies");
        } catch (error) {
          console.error("Failed to update movie: ", updateMovieError);
          toast.error(`Failed to update movie: ${updateMovieError?.message}`);
          return;
        }
      } else {
        console.error("Failed to upload image: ", uploadImageErrorDetails);
        toast.error("Failed to upload image");
        return;
      }
    }
    // if success
    toast.success("movie updated successfully!");
  };
  const handleDeleteMovie = async () => {
    // first delete image
    // then delete movie
    console.log("deleted");
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form className="w-[80%] max-w-[40rem]">
        <p className="text-green-200  text-2xl mb-4">Update Movie</p>
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
          onClick={handleUpdateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
        </button>

        <button
          type="button"
          onClick={handleDeleteMovie}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
        </button>
      </form>
    </div>
  );
}

export default UpdateMovie;
