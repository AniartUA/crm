@extends('layouts.main')
@section('styles')
	<link href="{{ URL::asset('css/jasmine.css') }}" rel="stylesheet">
@stop

@section('content')
<div id="tests_list">
    {{ HTML::linkRoute('tests.index', 'Все', array(), array('class' => 'btn btn-primary btn-xs')) }}
</div>
<div id="tests_sandbox"></div>
<div id="tests_results"></div>
@stop('content')