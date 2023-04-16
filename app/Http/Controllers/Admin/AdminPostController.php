<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminPostController extends Controller
{
    /**
     * Display a list of all posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllPosts()
    {
        $posts = Post::orderByDesc('created_at')->with('user')->get();

        return Inertia::render('Dashboard', [
            'posts' => $posts,
        ]);
    }

    /**
     * Display a list of all posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function updatePost(Request $request)
    {
        $input = $request->all();

        $validator = $this->validatePostData($input);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $post = Post::find($input['commentId']);
        $post->name = $input['name'];
        $post->company = $input['company'];
        $post->comment = $input['comment'];
        $post->save();

        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * Display a list of all posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function deletePost(Request $request)
    {
        $input = $request->all();
        $post = Post::find($input['commentId']);
        $post->delete();

        return redirect(RouteServiceProvider::HOME);
    }

    private function validatePostData($input)
    {
        return Validator::make($input, [
            'name' => 'required',
            'company' => 'required',
            'comment' => 'required',
        ]);
    }
}
