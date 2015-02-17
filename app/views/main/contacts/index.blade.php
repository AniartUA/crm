@extends('layouts.main')

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
				<a href="{{ URL::route('contacts.create') }}" class="btn btn-primary">
					<i class="fa fa-plus"></i>
					Новый контакт
				</a>
	    		<div id="contacts_table">

				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    require(['app'], function(){
        AniCRM.set('contactsList', {{ $contacts or undefined }});
    });
</script>
@stop