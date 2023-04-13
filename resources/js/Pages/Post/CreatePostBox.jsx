import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function CreatePost({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
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
                <img src="/storage/images/default-user.png"></img>
                <div>
                    <TextArea
                        id="comment"
                        className="mt-1 block w-full"
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                        required
                        isFocused
                        placeholder="what would you like to say?"
                        autoComplete="comment"
                    />

                    <InputError className="mt-2" message={errors.comment} />
                </div>

                <div className="flex items-center justify-end gap-4">
                    <PrimaryButton disabled={processing}>Post</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Posted.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
