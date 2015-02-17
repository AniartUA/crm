<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('files', function(Blueprint $table){
            $table->increments('id');
            $table->integer('size')->unsigned();
            $table->string('content_type', 255)->nullable();
            $table->string('subdir', 255)->nullable();
            $table->string('name', 255);
            $table->string('original_name', 255);
            $table->string('description', 512)->nullable();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('files');
		//
	}

}
