@extends('layouts.main')
@section('styles')
	<link href="{{ URL::asset('css/plugins/dataTables/dataTables.bootstrap.css') }}" rel="stylesheet">
@stop

@section('content')
<div class="row">
	<div class="col-lg-12">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>
					Список всех контактов
				</h5>
				<div class="ibox-tools">
					<a class="collapse-link"> <i class="fa fa-chevron-up"></i>
					</a> <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <i
						class="fa fa-wrench"></i>
					</a>
					<ul class="dropdown-menu dropdown-user">
						<li><a href="#">Config option 1</a></li>
						<li><a href="#">Config option 2</a></li>
					</ul>
					<a class="close-link"> <i class="fa fa-times"></i>
					</a>
				</div>
			</div>
			<div class="ibox-content">
				<a href="{{ URL::route('contacts.edit', 0) }}" class="btn btn-primary">
					<i class="fa fa-plus"></i>
					Новый контакт
				</a>
				<table id="contacts_list" class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>Имя</th>
							<th>Телефон</th>
							<th>Email</th>
							<th>Мессенджер</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th>Имя</th>
							<th>Телефон</th>
							<th>Email</th>
							<th>Мессенджер</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
	<script src="{{ URL::asset('js/plugins/dataTables/jquery.dataTables.js') }}"></script>
	<script src="{{ URL::asset('js/plugins/dataTables/dataTables.bootstrap.js') }}"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('#contacts_list').dataTable();
		});
	</script>
@stop