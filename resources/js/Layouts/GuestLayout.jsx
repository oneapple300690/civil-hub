import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-tr from-zinc-900 from-10% via-neutral-600 via-50% to-zinc-950 to-90%">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-100 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-6 bg-zinc-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
