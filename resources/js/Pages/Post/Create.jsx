import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import StandardButton from "@/Components/StandardButton";
import TextArea from "@/Components/TextArea";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function CreatePost({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, reset, processing, recentlySuccessful } =
        useForm({
            userId: user.id,
            name: user.name,
            company: user.company,
            comment: "",
        });

    const submit = (e) => {
        e.preventDefault();
        reset('comment');
        post(route("posts.store"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex">
                    <div className="basic-9 mr-2 ml-2 mt-2">
                        <img
                            src="/shared/images/default-user.png"
                            className="w-10"
                        ></img>
                    </div>
                    <div className="flex-1 bg-stone-700 rounded-lg mt-2 mb-2">
                        <div>
                            <TextArea
                                id="comment"
                                className="p-4 mt-1 mb-1 bg-transparent text-white border-none focus:outline-none focus:border-none focus:ring-transparent active:border-white block w-full"
                                value={data.comment}
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
                                Post
                            </StandardButton>
                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out "
                            >
                                <p className="text-sm text-white m-4">
                                    POSTED.
                                </p>
                            </Transition>
                        </div>
                    </div>
                    <div className="basis-9 ml-2 mt-2 mr-2"></div>
                </div>

                <div className="flex items-center justify-end gap-4"></div>
            </form>
        </section>
    );
}
