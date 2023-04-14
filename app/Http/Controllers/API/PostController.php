<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends BaseController
{
    /**
     * Display a list of all posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // if (!$request->user()->tokenCan('post-list')) {
        //     return $this->sendError('Unauthorised Token Ability', []);
        // }

        // if ($request->user()->is_admin) {
        //     $posts = Post::all();
        // } else {
        //     $posts = Post::where('customer_id', $request->user()->id)->get();
        // }

        $posts = Post::all();

        return $this->sendResponse(PostResource::collection($posts), 'Posts retrieved successfully.');
    }
    /**
     * Store a newly created post in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // if (!$request->user()->tokenCan('post-store')) {
        //     return $this->sendError('Unauthorised Token Ability', []);
        // }

        $input = $request->all();

        $validator = $this->validatePostData($input);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        
        $post = Post::create($input);
        $post->user()->attach($input['user_id']);

        return redirect(RouteServiceProvider::HOME);

        // return $this->sendResponse(new PostResource($post), 'Post created successfully.');
    }

    /**
     * Display the specified post.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        // if (!$request->user()->tokenCan('post-show')) {
        //     return $this->sendError('Unauthorised Token Ability', []);
        // }

        if ($request->user()->is_admin) {
            $post = Post::find($id);
        } else {
            $post = Post::where('id', $id)->where('customer_id', $request->user()->id)->first();
        }

        if (is_null($post)) {
            return $this->sendError('Post not found.');
        }

        return $this->sendResponse(new PostResource($post), 'Post retrieved successfully.');
    }

    /**
     * Update the specified post in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        // if (!$request->user()->tokenCan('post-update')) {
        //     return $this->sendError('Unauthorised Token Ability', []);
        // }

        //  Should not allow 'update' on post that it does not belong to the user
        if (!$request->user()->is_admin && $post->customer_id !== $request->user()->id) {
            return $this->sendError('Unauthorised Token Ability', []);
        }

        $input = $request->all();

        $validator = $this->validatePostData($input);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $post->name = $input['name'];
        $post->company = $input['company'];
        $post->comment = $input['comment'];
        $post->save();

        return $this->sendResponse(new PostResource($post), 'Post updated successfully.');
    }

    /**
     * Remove the specified post from database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Post $post)
    {
        // if (!$request->user()->tokenCan('post-destroy')) {
        //     return $this->sendError('Unauthorised Token Ability', []);
        // }

        $post->delete();

        return $this->sendResponse([], 'Post deleted successfully.');
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
