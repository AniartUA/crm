@extends('layouts.main') 

@section('js-controller')
	app/pages/contacts/create
@stop

@section('content') 
<div class="col-lg-5">
	<div id="edit_contact" class="ibox float-e-margins">
	{{ Form::open(array('method' => 'PATCH', 'route' => array('contacts.store'), 'files' => true)) }}
		<div class="ibox-title">
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
			<div class="row">
				<div class="col-lg-10">
					<input type="text" class="form-control" id="contact_name" placeholder="ФИО" value="" />
				</div>
			</div>
		</div>
		<div class="ibox-content">
			<div class="row">
				<div class="col-sm-10 form-horizontal">
					<div class="form-group">
						<label class="col-lg-4 control-label">Ответственный</label>
						<div class="col-lg-8">
							<input class="form-control" id="contact_responsible" type="text" value="" /> <span
								class="help-block m-b-none"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-4 control-label">Должность</label>
						<div class="col-lg-8">
							<input class="form-control" id="contact_position" type="text" value="" /> <span
								class="help-block m-b-none"></span>
						</div>
					</div>
					<div id="contact_phones" class="form-group">
					</div>
					<div id="contact_emails" class="form-group">
					</div>
					<div id="contact_messengers" class="form-group">
					</div>
					<div class="col-lg-12">
						<div class="form-group pull-right">
							<button type="submit" class="btn btn-white">Отмена</button>
							<button type="submit" class="btn btn-primary">Добавить</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{{ Form::close() }} 
	</div>
</div>
<script type="text/javascript">
    AniCRM.set('contactData', {});
    AniCRM.set('mediaTypes', {{ $mediaTypes or undefined }});
</script>
@stop