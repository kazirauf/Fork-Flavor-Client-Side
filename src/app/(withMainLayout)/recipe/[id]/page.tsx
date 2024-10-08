/* eslint-disable prettier/prettier */
"use client";

import { useParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import {
  Avatar,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { FaCirclePlus } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useCommentRecipe,
  useDownvoteRecipe,
  useEditCommentRecipe,
  useGetSingleRecipe,
  useRateRecipe,
  useUpvoteRecipe,
} from "@/src/hooks/recipe.hooks";
import Loader from "@/src/components/Loader/Loader";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hooks";
import { useUser } from "@/src/context/user.provider";

const RecipeDetails = () => {
  const params = useParams();
  const { id } = params;

  const { user } = useUser();

  const { data, isLoading } = useGetSingleRecipe(id as string);

  const {
    mutate: upvoteRecipe,
    isPending: isUpvotePending,
    data: upvoteRecipeData,
  } = useUpvoteRecipe();

  const {
    mutate: downvoteRecipe,
    isPending: isDownvotePending,
    data: downVoteRecipeData,
  } = useDownvoteRecipe();

  const { mutate: followUser, isPending: isFollowUserPending } =
    useFollowUser();

  const { mutate: unfollowUser, isPending: isUnfollowUserPending } =
    useUnfollowUser();

  const { mutate: rateRecipe, isPending: isRateRecipePending } =
    useRateRecipe();

  const { mutate: commentRecipe, isPending: isCommentRecipePending } =
    useCommentRecipe();

  const { mutate: editComment, isPending: isEditCommentPending } =
    useEditCommentRecipe();

  const recipe = data?.data?.result;
  const postOwner = data?.data?.postOwner;

  // Calculate average rating from the `rating` array
  const calculateAverageRating = (
    ratings: { id: string; rating: number }[]
  ) => {
    if (!ratings || ratings?.length === 0) return 0.0;

    const totalRating = ratings?.reduce((acc, curr) => acc + curr?.rating, 0);

    return totalRating / ratings?.length;
  };

  const averageRating = calculateAverageRating(recipe?.rating || []);

  const handleUpvote = async (id: string) => {
    upvoteRecipe(id);
  };

  const handleDownvote = async (id: string) => {
    downvoteRecipe(id);
  };

  const handleFollow = async () => {
    followUser(postOwner?._id);
  };

  const handleUnfollow = async () => {
    unfollowUser(postOwner?._id);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm();

  // Handle rating form submission
  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      rating: Number(data.rating),
    };

    rateRecipe({ id: recipe?._id as string, payload: formattedData });
    onOpenChange();
  };

  // Handle Comment Submit
  const { control, handleSubmit: handleCommentSubmit, reset } = useForm();

  const onCommentSubmit = async (data: any) => {
    commentRecipe({ id: recipe?._id as string, payload: data });
    reset();
  };

  const {
    isOpen: isCommentModalOpen,
    onOpen: onCommentModalOpen,
    onOpenChange: onCommentModalOpenChange,
  } = useDisclosure();

  const [commentToEdit, setCommnetToEdit] = useState("");
  const [commentId, setCommnetId] = useState("");

  const handleOpenCommentEditModal = (id: string, comment: string) => {
    setCommnetToEdit(comment);
    setCommnetId(id);
    onCommentModalOpen();
  };

  const handleUpdateComment = async (e: FormEvent) => {
    e.preventDefault();

    editComment({
      recipeId: recipe?._id,
      commentId,
      payload: { comment: commentToEdit },
    });

    onCommentModalOpenChange();
  };

  useEffect(() => {
    if (upvoteRecipeData && !upvoteRecipeData.success) {
      toast.error(upvoteRecipeData.message);
    } else if (upvoteRecipeData && upvoteRecipeData.success) {
      toast.success("Recipe upvotted successfully!");
    }
  }, [upvoteRecipeData]);

  useEffect(() => {
    if (downVoteRecipeData && !downVoteRecipeData.success) {
      toast.error(downVoteRecipeData.message);
    } else if (downVoteRecipeData && downVoteRecipeData.success) {
      toast.success("Recipe downvotted successfully!");
    }
  }, [downVoteRecipeData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#F5EDED]">
      <div className="w-[90%] mx-auto py-10 md:w-[80%]">
        {" "}
        {/* Responsive width */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
          {/* Recipe Image */}
          <div className="relative">
            <img
              alt={recipe?.title}
              className="w-full h-[300px] md:h-[500px] object-cover" // Responsive height
              src={recipe?.image}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
              <h1 className="text-white text-2xl md:text-4xl font-bold">
                {recipe?.title}
              </h1>{" "}
              {/* Responsive text size */}
            </div>
          </div>

          {/* Recipe Content */}
          <div className="p-4 md:p-8">
            {" "}
            {/* Responsive padding */}
            {/* Recipe Title and Details */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {recipe?.title}
              </h2>
              <div className="text-secondary text-lg md:text-xl font-bold">
                Average Rating: {averageRating?.toFixed(1)}
              </div>
            </div>
            <div className="border-2 border-button mt-3 p-3 rounded-lg inline-flex justify-center items-center gap-2 md:gap-5 text-gray-900">
              <Avatar src={postOwner?.profilePicture} />

              <div>
                <h1 className="text-lg md:text-xl">
                  Posted by{" "}
                  <span className="text-secondary">{postOwner?.name}</span>
                </h1>

                <h1 className="text-md md:text-lg">{postOwner?.email}</h1>
              </div>

              {user?.email === postOwner?.email ? (
                ""
              ) : (
                <Button
                  className={`text-sm md:text-lg bg-button font-bold ${user?.role === "admin" && "hidden"}`}
                  isDisabled={isFollowUserPending || isUnfollowUserPending}
                  isLoading={isFollowUserPending || isUnfollowUserPending}
                  startContent={<FaCirclePlus />}
                  onClick={
                    postOwner?.followers?.includes(user?._id)
                      ? handleUnfollow
                      : handleFollow
                  }
                >
                  {postOwner?.followers?.includes(user?._id)
                    ? " Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>
            {/* Recipe Description */}
            <div
              dangerouslySetInnerHTML={{ __html: recipe?.content }}
              className="mt-4 text-gray-700 text-md md:text-lg leading-relaxed"
            />
          </div>

          <div
            className={`pb-5 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 ${user?.role === "admin" && "hidden"}`}
          >
            <Button
              className="text-lg md:text-xl"
              color="success"
              isDisabled={isUpvotePending || isDownvotePending}
              isLoading={isUpvotePending}
              startContent={<BiUpvote />}
              variant="bordered"
              onClick={() => handleUpvote(recipe?._id)}
            >
              Upvote ({recipe?.upvote?.length})
            </Button>

            <Button
              className="text-lg md:text-xl"
              color="danger"
              isDisabled={isUpvotePending || isDownvotePending}
              isLoading={isDownvotePending}
              startContent={<BiDownvote />}
              variant="bordered"
              onClick={() => handleDownvote(recipe?._id)}
            >
              Downvote ({recipe?.downvote?.length})
            </Button>
          </div>

          {user?.email !== postOwner?.email && (
            <div
              className={`pb-5 flex justify-center items-center gap-3 md:gap-5 ${user?.role === "admin" && "hidden"}`}
            >
              <Button className="bg-button text-lg font-bold" onPress={onOpen}>
                Rate this Recipe
              </Button>

              <Modal
                className="p-3 bg-primary"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* Select for rating */}
                    <Select
                      className="max-w-xs"
                      label="How much would you rate this recipe?"
                      {...register("rating", { required: true })}
                    >
                      <SelectItem key={"1"}>1</SelectItem>
                      <SelectItem key={"2"}>2</SelectItem>
                      <SelectItem key={"3"}>3</SelectItem>
                      <SelectItem key={"4"}>4</SelectItem>
                      <SelectItem key={"5"}>5</SelectItem>
                    </Select>

                    {/* Submit button */}
                    <Button
                      isDisabled={isRateRecipePending}
                      isLoading={isRateRecipePending}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </ModalContent>
              </Modal>
            </div>
          )}

          <div className={`mt-10 pb-5 ${user?.role === "admin" && "hidden"}`}>
            {recipe?.comments?.length === 0 ? (
              <div className="text-2xl text-center font-bold text-red-600">
                There Are no comments for this post yet.
              </div>
            ) : (
              recipe?.comments?.map((comment: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center text-gray-900 p-3 rounded-lg border-2 border-button w-full md:w-[70%] mx-auto mb-5"
                >
                  <div className="flex gap-3">
                    <Avatar
                      className="flex-shrink-0"
                      src={
                        comment?.profilePicture ||
                        "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      }
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-lg">
                        {comment?.name || "Unknown User"}
                      </h1>
                      <h1 className="text-lg">
                        {comment?.comment || "No comment text provided."}
                      </h1>
                    </div>
                  </div>

                  {user?._id === comment?.id && (
                    <div>
                      <Button
                        isIconOnly
                        aria-label="Edit"
                        className="bg-button"
                        onPress={() =>
                          handleOpenCommentEditModal(
                            comment?._id,
                            comment?.comment
                          )
                        }
                      >
                        <FaEdit className="text-xl" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}

            <div className="w-full md:w-[70%] mx-auto mt-10">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleCommentSubmit(onCommentSubmit)}
              >
                <Controller
                  control={control}
                  defaultValue=""
                  name="comment"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      required
                      label="Comment"
                      placeholder="Leave a comment for this recipe"
                    />
                  )}
                />

                <Button
                  className="bg-button text-lg font-bold"
                  isDisabled={isCommentRecipePending}
                  isLoading={isCommentRecipePending}
                  type="submit"
                >
                  Comment
                </Button>
              </form>

              <Modal
                isOpen={isCommentModalOpen}
                onOpenChange={onCommentModalOpenChange}
              >
                <ModalContent>
                  <form
                    className="p-5 flex flex-col gap-5 bg-primary"
                    onSubmit={handleUpdateComment}
                  >
                    <Textarea
                      required
                      label="Edit Comment"
                      value={commentToEdit}
                      onChange={(e) => setCommnetToEdit(e.target.value)}
                    />

                    <Button
                      className="bg-button text-lg font-bold"
                      isDisabled={isEditCommentPending}
                      isLoading={isEditCommentPending}
                      type="submit"
                    >
                      Edit Comment
                    </Button>
                  </form>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
