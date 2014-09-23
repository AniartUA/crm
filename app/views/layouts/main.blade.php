<!doctype html>
<html>
    <head>
	    <!-- Metadata -->
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>@lang('views/main.title')</title>
	    <!-- CSS Files -->
	    <link href="{{ URL::asset('css/bootstrap.min.css') }}" rel="stylesheet">
	    <link href="{{ URL::asset('font-awesome/css/font-awesome.css') }}" rel="stylesheet">
	    <link href="{{ URL::asset('css/animate.css') }}" rel="stylesheet">
	    <link href="{{ URL::asset('css/style.css') }}" rel="stylesheet">
		@yield('styles')
	    <link href="{{ URL::asset('css/anicrm.css') }}" rel="stylesheet">
	</head>
	<body>
		<div id="wrapper">
			@include('main.navbar_side')
			<div id="page-wrapper" class="gray-bg">
				<div class="row border-bottom">
					@include('main.navbar_top')
				</div>
				<div class="row wrapper border-bottom white-bg page-heading">
					@include('main.panel')
				</div>
				<div class="wrapper wrapper-content animated fadeIn">
					<div class="row">
						@yield('content')
					</div>
				</div>
			</div>
		</div>
		<!-- Mainly scripts -->
		<script src="{{ URL::asset('js/libs/plugins/pace/pace.min.js') }}"></script>
		<script type="text/javascript" src="{{ URL::asset('js/config.js') }}"></script>
		<script data-main="@yield('js-controller')" src="{{ URL::asset('js/libs/require.js') }}"></script>
	</body>
</html>