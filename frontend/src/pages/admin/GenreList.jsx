import React, { useState } from "react";

import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
} from "../../redux/api/genre";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

function GenreList() {
  const { data: genres, refetch } = useFetchGenresQuery();

  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    // console.log("genre created");
    e.preventDefault();
    if (!name) {
      toast.error("name is required!");
      return;
    }
    try {
      await createGenre({ name }).unwrap();
      toast.success("Genre created Successfully!");
      setName("");
      refetch();
      return;
    } catch (error) {
      console.log(error);
      toast.error("failed to create Genre!");
    }
  };
  const handleUpdateGenre = async (e) => {
    // console.log("genre updated");
    e.preventDefault();
    if (!updatingName) {
      toast.error("Name is required!");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      toast.success(`${result.name} is updated`);
      refetch();
      // reset the selected genre, input, modal visible
      setSelectedGenre(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("failed to update Genre!");
    }
  };

  const handleDeleteGenre = async (e) => {
    // console.log("genre deleted");
    e.preventDefault();
    try {
      await deleteGenre(selectedGenre._id).unwrap();

      toast.success(`${selectedGenre.name} is deleted.`);
      refetch();
      setSelectedGenre(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
  };

  return (
    <div className="mx-4 flex flex-col md:flex-row justify-center">
      <div className="md:w-3/4 p-3 relative">
        <h1 className="text-3xl md:text-4xl  mb-4 ml-4">Manage Genres</h1>
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer"
                onClick={() => {
                  {
                    // add to selectedGenre,modalvisible true, updatingname for update
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} close={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
}
export default GenreList;
