@extends('layouts.main')

@section('js-controller')
	app/pages/settings
@stop

@section('content')
<div class="col-lg-6">
	<div class="ibox float-e-margins">
		<div class="ibox-title">
			<h5>Медиа-типы</h5>
			<div class="ibox-tools">
				<a class="collapse-link"> <i class="fa fa-chevron-up"></i>
				</a> <a href="#" data-toggle="dropdown" class="dropdown-toggle"> <i
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
			<div class="panel-body">
				<div id="accordionMediaTypes" data-url="{{{ URL::route('settings.mediatypes.index') }}}" class="panel-group">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h5 class="panel-title">
								<a class="collapsed" href="#collapsePhones" data-parent="#accordionMediaTypes" data-toggle="collapse">Телефоны</a>
							</h5>
						</div>
						<div class="panel-collapse collapse in" id="collapsePhones">
						</div>						
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h5 class="panel-title">
								<a class="collapsed" href="#collapseMessengers" data-parent="#accordionMediaTypes" data-toggle="collapse">Мессенджеры</a>
							</h5>
						</div>
						<div class="panel-collapse collapse" id="collapseMessengers">
						</div>						
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h5 class="panel-title">
								<a class="collapsed" href="#collapseEmails" data-parent="#accordionMediaTypes" data-toggle="collapse">Emails</a>
							</h5>
						</div>
						<div class="panel-collapse collapse" id="collapseEmails">
						</div>					
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@stop
