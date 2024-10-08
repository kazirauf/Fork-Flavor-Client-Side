"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import Swal from "sweetalert2";

import {
  useDeleteRecipeFromAdmin,
  useGetAllRecipiesForAdmin,
  usePublishRecipe,
  useUnpublishRecipe,
} from "@/src/hooks/recipe.hooks";
import Loader from "@/src/components/Loader/Loader";

const ManageRecipies = () => {
  const { data: recepiesData, isLoading } = useGetAllRecipiesForAdmin();
  const { mutate: unpublishRecipe } = useUnpublishRecipe();
  const { mutate: publishRecipe } = usePublishRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipeFromAdmin();

  const [loadingRecipeId, setLoadingRecipeId] = useState<string | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

  const handleAction = async (id: string, status: boolean) => {
    setLoadingRecipeId(id); // Set loading for the specific recipe

    if (status === true) {
      Swal.fire({
        title: "Are you sure you want to unpublish this recipe?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, unpublish it!",
      }).then((result) => {
        if (result.isConfirmed) {
          unpublishRecipe(id, {
            onSuccess: () => setLoadingRecipeId(null), // Reset loading state after success
            onError: () => setLoadingRecipeId(null), // Reset loading state on error as well
          });
        } else {
          setLoadingRecipeId(null); // Reset loading state if action is canceled
        }
      });
    } else if (status === false) {
      Swal.fire({
        title: "Are you sure you want to publish this recipe?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, publish it!",
      }).then((result) => {
        if (result.isConfirmed) {
          publishRecipe(id, {
            onSuccess: () => setLoadingRecipeId(null),
            onError: () => setLoadingRecipeId(null),
          });
        } else {
          setLoadingRecipeId(null);
        }
      });
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    setRecipeToDelete(id);
    Swal.fire({
      title: "Are you sure you want to delete this recipe?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(id, {
          onSuccess: () => setRecipeToDelete(null),
          onError: () => setRecipeToDelete(null),
        });
      } else {
        setRecipeToDelete(null);
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-8 pb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Manage <span className="text-secondary">Recipes</span>
      </h1>

      {/* Responsive Table Wrapper */}
      <div className="hidden md:block">
        {" "}
        {/* Show table on medium and larger screens */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {recepiesData?.map((recipe: any, index: number) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <img
                    alt={recipe?.title}
                    className="w-16 h-16 object-cover rounded"
                    src={recipe?.image}
                  />
                </td>
                <td className="p-4 text-lg font-bold text-gray-900">
                  {recipe?.title}
                </td>
                <td className="p-4">
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      recipe?.isPublished === true
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {recipe?.isPublished ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td className="p-4">
                  <Button
                    className="bg-primary ml-4 font-bold text-lg"
                    isDisabled={loadingRecipeId === recipe?._id}
                    isLoading={loadingRecipeId === recipe?._id}
                    onClick={() =>
                      handleAction(recipe?._id, recipe?.isPublished)
                    }
                  >
                    {recipe?.isPublished ? "Unpublish" : "Publish"}
                  </Button>

                  <Button
                    className="bg-red-500 ml-4 font-bold text-lg"
                    isDisabled={recipeToDelete === recipe?._id}
                    isLoading={recipeToDelete === recipe?._id}
                    onClick={() => handleDeleteRecipe(recipe?._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Stack Layout */}
      <div className="block md:hidden">
        {" "}
        {/* Show on small screens */}
        {recepiesData?.map((recipe: any, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-4 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <img
                alt={recipe?.title}
                className="w-16 h-16 object-cover rounded"
                src={recipe?.image}
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {recipe?.title}
                </h2>
                <span
                  className={`py-1 px-2 rounded-full text-sm ${
                    recipe?.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {recipe?.isPublished ? "Published" : "Unpublished"}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                className="bg-primary font-bold text-lg"
                isDisabled={loadingRecipeId === recipe?._id}
                isLoading={loadingRecipeId === recipe?._id}
                onClick={() => handleAction(recipe?._id, recipe?.isPublished)}
              >
                {recipe?.isPublished ? "Unpublish" : "Publish"}
              </Button>
              <Button
                className="bg-red-500 font-bold text-lg"
                isDisabled={recipeToDelete === recipe?._id}
                isLoading={recipeToDelete === recipe?._id}
                onClick={() => handleDeleteRecipe(recipe?._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRecipies;
