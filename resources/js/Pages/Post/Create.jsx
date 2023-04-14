import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function CreatePost({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            user_id: user.id,
            name: user.name,
            company: user.company,
            comment: "",
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("posts.store"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex">
                    <div className="flex-none mr-2">
                        <img
                            src="/storage/images/default-user.png"
                            className="w-10"
                        ></img>
                    </div>
                    <div className="bg-stone-700 rounded-lg mt-2 mb-2 flex-1">
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
                            <PrimaryButton
                                disabled={processing}
                                className="m-2"
                            >
                                Post
                            </PrimaryButton>
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
                </div>

                <div className="flex items-center justify-end gap-4"></div>
            </form>
        </section>
    );
}
