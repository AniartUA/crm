@extends('layouts.scaffold')

@section('main')

<h1>Создание контакта</h1>

{{ Form::open(array('route' => 'contacts.store')) }}
	<ul>
        <li>
            {{ Form::label('user_id', 'Пользователь:') }}
            {{ Form::input('number', 'user_id') }}
        </li>

        <li>
            {{ Form::label('name', 'Название:') }}
            {{ Form::text('name') }}
        </li>

        <li>
            {{ Form::label('phone', 'Телефон:') }}
            {{ Form::text('phone') }}
        </li>

		<li>
			{{ Form::submit('Создать', array('class' => 'btn btn-info')) }}
		</li>
	</ul>
{{ Form::close() }}

@if ($errors->any())
	<ul>
		{{ implode('', $errors->all('<li class="error">:message</li>')) }}
	</ul>
@endif

@stop


