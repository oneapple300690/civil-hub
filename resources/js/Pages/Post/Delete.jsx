import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useRef } from "react";
import { Transition } from "@headlessui/react";

export default function DeletePost({ className = "", commentId, posts }) {
    const user = usePage().props.auth.user;

    const commentEditingInput = useRef();

    const { data, setData, get, post, errors, processing, recentlySuccessful } =
        useForm({
            userId: user.id,
            name: user.name,
            commentId: commentId,
        });

    const deleteComment = (e) => {
        e.preventDefault();

        post(route("adminPost.delete"), {
            preserveScroll: true,
            onSuccess: () => {
                posts = get(route("dashboard"));
            },
            onError: (errors) => {
                if (errors.comment) {
                    commentEditingInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <img
                src="/shared/images/btn-delete.png"
                className="w-5 cursor-pointer"
                onClick={(e) => deleteComment(e)}
            ></img>
        </section>
    );
}
