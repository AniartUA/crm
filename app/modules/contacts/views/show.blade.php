@extends('layouts.scaffold')

@section('main')

<h1>Информация о контакте</h1>

<p>{{ link_to_route('contacts.index', 'Список контактов') }}</p>

<table class="table table-striped table-bordered">
	<thead>
		<tr>
			<th>Пользователь</th>
				<th>Название</th>
				<th>Телефон</th>
		</tr>
	</thead>

	<tbody>
		<tr>
			<td>{{{ $contact->user_id }}}</td>
					<td>{{{ $contact->name }}}</td>
					<td>{{{ $contact->phone }}}</td>
                    <td>{{ link_to_route('contacts.edit', 'Редактировать', array($contact->id), array('class' => 'btn btn-info')) }}</td>
                    <td>
                        {{ Form::open(array('method' => 'DELETE', 'route' => array('contacts.destroy', $contact->id))) }}
                            {{ Form::submit('Удалить', array('class' => 'btn btn-danger')) }}
                        {{ Form::close() }}
                    </td>
		</tr>
	</tbody>
</table>

@stop
