import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function ListPosts({ className = "", posts }) {
    const user = usePage().props.auth.user;

    let count_post = 0;
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
            {posts.map((item) => (
                <div
                    key={"item_" + item.id}
                    id={"post_" + ++count_post}
                    className="flex"
                >
                    <div className="flex-none mr-2">
                        <img src="/storage/images/default-user.png" className="w-10"></img>
                    </div>
                    <div className="bg-stone-700 mt-2 mb-2 flex-1 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <p className="comment-author-name">{item.name}</p>
                                <p className="comment-author-company">{item.company}</p>
                            </div>
                            <div className="flex-1">
                                <p className="comment-date">{item.created_at}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="justify-start whitespace-pre-line">
                                <p className="comment-content">{item.comment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
