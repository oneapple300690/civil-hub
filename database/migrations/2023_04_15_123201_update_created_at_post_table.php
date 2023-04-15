<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE `posts` MODIFY created_at timestamp default CURRENT_TIMESTAMP NOT NULL");
        DB::statement("ALTER table `posts` MODIFY column updated_at timestamp default CURRENT_TIMESTAMP NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
