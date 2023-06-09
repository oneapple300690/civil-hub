import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        company: "",
        username: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    {/* <InputLabel htmlFor="name" value="Name" /> */}

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full placeholder:text-slate-400"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        placeholder="NAME"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    {/* <InputLabel htmlFor="company" value="Company" /> */}

                    <TextInput
                        id="company"
                        name="company"
                        value={data.company}
                        className="mt-1 block w-full placeholder:text-slate-400"
                        autoComplete="company"
                        isFocused={true}
                        onChange={(e) => setData("company", e.target.value)}
                        required
                        placeholder="COMPANY"
                    />

                    <InputError message={errors.company} className="mt-2" />
                </div>

                <div className="mt-4">
                    {/* <InputLabel htmlFor="username" value="Username" /> */}

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full placeholder:text-slate-400"
                        autoComplete="username"
                        onChange={(e) => setData("username", e.target.value)}
                        required
                        placeholder="USERNAME"
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    {/* <InputLabel htmlFor="password" value="Password" /> */}

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full placeholder:text-slate-400"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        placeholder="PASSWORD"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    {/* <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    /> */}

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full placeholder:text-slate-400"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                        placeholder="RE-PASSWORD"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="" disabled={processing}>
                        Sign Up
                    </PrimaryButton>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-white hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already have an account? Sign In
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
