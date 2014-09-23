@extends('layouts.scaffold')

@section('main')

<h1>Импорт контактов</h1>

<p>
{{ link_to_route('contacts.index', 'Список контактов') }}
</p>

{{ Form::open(array('route' => 'contacts.import', 'files' => true, 'method' => 'post')) }}
	<ul>
		<li>
			{{ Form::label('import_file', 'Файл импорта(*.csv): ')}}
			{{ Form::file('import-file') }}
		</li>
	</ul>
{{ Form::submit('Импортировать', array('class' => 'btn btn-info')) }}
{{ Form::close() }}

@if ($errors->any())
	<ul>
		{{ implode('', $errors->all('<li class="error">:message</li>')) }}
	</ul>
@endif
@if (Session::has('importResult'))
	<p class="alert-success">
		Все ок! Импортировано записей: <b>{{Session::get('importResult')}}</b>
	</p>
@endif

@stop