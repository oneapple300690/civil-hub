import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import EditPostBox from "@/Pages/Post/Edit";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import DeletePost from "./Delete";

export default function ListPosts({ className = "", posts }) {
    const user = usePage().props.auth.user;

    let count_post = 0;
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            userId: user.id,
            name: user.name,
            company: user.company,
            comment: "",
        });

    const [showingEdit, setShowingEdit] = useState({
        commentId: 0,
        showing: false,
    });

    const editComment = (commentId) => {
        setShowingEdit({
            showing:
                showingEdit.commentId != commentId
                    ? true
                    : !showingEdit.showing,
            commentId: commentId,
        });
    };

    return (
        <section className={className}>
            {posts.map((item) => (
                <div
                    key={"item_" + item.id}
                    id={"post_" + ++count_post}
                    className="flex"
                >
                    <div className="basis-9 mr-2 ml-2 mt-2">
                        <img
                            src="/storage/images/default-user.png"
                            className="w-10"
                        ></img>
                    </div>
                    <div className="flex-1 bg-stone-700 mt-2 mb-2 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <p
                                    className={
                                        item.user.length > 0 &&
                                        data.userId == item.user[0].id
                                            ? "comment-author-name-logged-in"
                                            : "comment-author-name"
                                    }
                                >
                                    {item.name}
                                </p>

                                <p className="comment-author-company">
                                    {item.company}
                                </p>
                            </div>
                            <div className="flex-1">
                                <p className="comment-date">
                                    {item.created_at}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1 justify-start whitespace-pre-line">
                                <div id={"comment-" + item.id}>
                                    {showingEdit.commentId == item.id &&
                                    showingEdit.showing ? (
                                        <div className="comment-content-edit">
                                            <EditPostBox
                                                curComment={item.comment}
                                                commentId={item.id}
                                                posts={posts}
                                            ></EditPostBox>
                                        </div>
                                    ) : (
                                        <div className="comment-content">
                                            {item.comment}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="basis-9 mr-2 ml-2 mt-2">
                        {item.user.length > 0 &&
                        data.userId == item.user[0].id ? (
                            <>
                                <img
                                    src="/storage/images/btn-edit.png"
                                    className="w-5 mb-2 cursor-pointer"
                                    onClick={() => editComment(item.id)}
                                ></img>
                                <DeletePost commentId={item.id}></DeletePost>
                            </>
                        ) : null}
                    </div>
                </div>
            ))}
        </section>
    );
}
