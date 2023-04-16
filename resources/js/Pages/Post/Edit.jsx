import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useRef } from "react";
import { Transition } from "@headlessui/react";
import StandardButton from "@/Components/StandardButton";

export default function EditPost({
    className = "",
    curComment,
    commentId,
    posts,
}) {
    const user = usePage().props.auth.user;

    const commentEditingInput = useRef();

    const {
        data,
        setData,
        post,
        get,
        reset,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        userId: user.id,
        name: user.name,
        company: user.company,
        comment: curComment,
        commentId: commentId,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("adminPost.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
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
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex">
                    <div className="grow bg-stone-700 rounded-lg mt-2 mb-2">
                        <div>
                            <TextArea
                                id={"comment-" + commentId}
                                className="p-4 mt-1 mb-1 bg-transparent rounded-lg text-white border-gray-900 focus:outline-none focus:border-white focus:ring-transparent block w-full"
                                value={data.comment}
                                ref={commentEditingInput}
                                onChange={(e) =>
                                    setData("comment", e.target.value)
                                }
                                required
                                isFocused
                                placeholder="what would you like to say?"
                                autoComplete="comment"
                                rows="7"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.comment}
                            />
                        </div>

                        <div className="text-right">
                            <StandardButton
                                disabled={processing}
                                className="m-2"
                            >
                                Update
                            </StandardButton>
                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out "
                            >
                                <p className="text-sm text-white m-4">
                                    Updated.
                                </p>
                            </Transition>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4"></div>
            </form>
        </section>
    );
}
