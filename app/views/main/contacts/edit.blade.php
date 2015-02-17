@extends('layouts.main') 

@section('content') 
<div class="col-lg-12">
	<div id="edit_contact" class="ibox float-e-margins">
	{{ Form::open(array('method' => 'PATCH', 'route' => array('contacts.store'), 'files' => true)) }}
		<div class="ibox-title">
			<div class="ibox-tools">
				<a class="collapse-link"> <i class="fa fa-chevron-up"></i>

				</a>
				 <!--
				<a class="dropdown-toggle" data-toggle="dropdown" href="#"> <i
					class="fa fa-wrench"></i>
				</a>
				<ul class="dropdown-menu dropdown-user">
					<li><a href="#">Config option 1</a></li>
					<li><a href="#">Config option 2</a></li>
				</ul>
				<a class="close-link"> <i class="fa fa-times"></i>
				</a>
				-->
			</div>
			<div class="row">
				<div class="col-lg-5">
					<input style="margin-bottom: 15px;" type="text" autocomplete="off" class="form-control" id="contact_name" placeholder="ФИО" value="" />
				</div>
			</div>
		</div>
		<div class="ibox-content">
			<div class="row">
				<div class="col-lg-5 form-horizontal b-r">
					<div class="form-group">
						<label class="col-lg-4 control-label">Ответственный</label>
						<div class="col-lg-8">
							<input autocomplete="off" class="form-control m-b" id="contact_responsible" type="text" value="" /> <span
								class="help-block m-b-none"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-4 control-label">Должность</label>
						<div class="col-lg-8">
							<input autocomplete="off" class="form-control m-b" id="contact_position" type="text" value="" /> <span
								class="help-block m-b-none"></span>
						</div>
					</div>
					<div id="contact_phones" class="form-group">
					    <label class="col-lg-4 control-label">Телефон</label>
					    <div class="col-lg-8"></div>
					</div>
					<div id="contact_emails" class="form-group">
					    <label class="col-lg-4 control-label">E-mail</label>
					    <div class="col-lg-8"></div>
					</div>
					<div id="contact_messengers" class="form-group">
					    <label class="col-lg-4 control-label">Мессенджер</label>
					    <div class="col-lg-8"></div>
					</div>
				</div>
				<div class="col-lg-7">
                    <div class="col-lg-12">
                        <textarea id="contact_comment" autocomplete="off" placeholder="Примечание по контакту" class="form-control"></textarea>
                    </div>
                    <div style="margin-top:5px;" class="col-lg-12">
                        <div class="m-b" id="attach_files_list"></div>
                        <i style="font-size: 20px" class="fa fa-paperclip">&nbsp;</i>
                        <a class="pse-link" href="#" id="attach_files_link">Прикрепить файлы</a>
                        <br /><br />
                    </div>
                    <div class="col-lg-12">
                        <div class="m-b" style="display: none" id="contact_files">
                        </div>
                    </div>
				</div>
				<br clear="all" />
                <div class="col-lg-5">
                    <div class="form-group text-right">
                        <button id="contact_cancel" type="button" class="btn btn-white">Отмена</button>
                        <button id="contact_save" type="submit" class="btn btn-primary">Добавить</button>
                    </div>
                </div>
			</div>
		</div>
	{{ Form::close() }} 
	</div>
</div>
<script type="text/javascript">
    require(['app'], function(){
        AniCRM.set('contactData', {{ $contactData or undefined }});
        AniCRM.set('mediaTypes', {{ $mediaTypes or undefined }});
    });
</script>
@stop