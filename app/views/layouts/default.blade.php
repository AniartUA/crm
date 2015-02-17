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
		@yield('styles')
	    <link href="{{ URL::asset('css/animate.css') }}" rel="stylesheet">
	    <link href="{{ URL::asset('css/style.css') }}" rel="stylesheet">
	    <link href="{{ URL::asset('css/anicrm.css') }}" rel="stylesheet">
		<!-- Mainly scripts -->
		<script type="text/javascript" src="{{ URL::asset('js/config.js') }}"></script>
		<script data-main="app.js" src="{{ URL::asset('js/libs/require.js') }}"></script>
	</head>
	<body class="gray-bg">
    	@yield('content')
	</body>
</html>