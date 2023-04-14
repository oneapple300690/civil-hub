import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreatePostBox from '@/Pages/Post/Create';
import ListPostSection from '@/Pages/Post/List';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, posts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <CreatePostBox>

                        </CreatePostBox>
                        <ListPostSection posts={posts}>

                        </ListPostSection>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
