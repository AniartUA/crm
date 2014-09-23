@extends('layouts.main') 

@section('content') 
{{ Form::open(array('method' => 'PATCH', 'route' => array('contacts.store'), 'files' => true)) }}
<div class="col-lg-5">
	<div class="ibox float-e-margins">
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
					<input type="text" class="form-control" placeholder="ФИО" value="" />
				</div>
			</div>
		</div>
		<div class="ibox-content">
			<div class="row">
				<div class="col-sm-10 form-horizontal">
					<div class="form-group">
						<label class="col-lg-4 control-label">Ответственный</label>
						<div class="col-lg-8">
							<input class="form-control" type="text" value="" /> <span
								class="help-block m-b-none"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-4 control-label">Должность</label>
						<div class="col-lg-8">
							<input class="form-control" type="email" value="" /> <span
								class="help-block m-b-none"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-4 control-label">Телефон</label>
						<div class="col-lg-8">
							<div class="input-group m-b">
								<div class="input-group-btn">
									<button type="button" class="btn btn-white dropdown-toggle"
										data-toggle="dropdown">
										Action <span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li><a href="#">Action</a></li>
										<li><a href="#">Another action</a></li>
										<li><a href="#">Something else here</a></li>
										<li class="divider"></li>
										<li><a href="#">Separated link</a></li>
									</ul>
								</div>
								<input type="text" class="form-control">
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-4 control-label">Email</label>
						<div class="col-lg-8">
							<div class="input-group m-b">
								<div class="input-group-btn">
									<button type="button" class="btn btn-white dropdown-toggle"
										data-toggle="dropdown">
										Action <span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li><a href="#">Action</a></li>
										<li><a href="#">Another action</a></li>
										<li><a href="#">Something else here</a></li>
										<li class="divider"></li>
										<li><a href="#">Separated link</a></li>
									</ul>
								</div>
								<input type="text" class="form-control">
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-4 control-label">Skype</label>
						<div class="col-lg-8">
							<div class="input-group m-b">
								<div class="input-group-btn">
									<button type="button" class="btn btn-white dropdown-toggle"
										data-toggle="dropdown">
										Action <span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li><a href="#">Action</a></li>
										<li><a href="#">Another action</a></li>
										<li><a href="#">Something else here</a></li>
										<li class="divider"></li>
										<li><a href="#">Separated link</a></li>
									</ul>
								</div>
								<input type="text" class="form-control">
							</div>
						</div>
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
	</div>
</div>
{{ Form::close() }} @stop
