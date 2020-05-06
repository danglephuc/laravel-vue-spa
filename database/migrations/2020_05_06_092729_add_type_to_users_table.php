<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTypeToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('type')->nullable(false);
            $table->string('zoom_id')->nullable(true);
            $table->text('zoom_access_token')->nullable(true);
            $table->text('zoom_refresh_token')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropColumn('zoom_id');
            $table->dropColumn('zoom_access_token');
            $table->dropColumn('zoom_refresh_token');
        });
    }
}
