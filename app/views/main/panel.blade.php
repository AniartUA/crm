<div class="col-lg-10">
	<h2>@yield('pageTitle', $pageTitle) {{-- composers.php --}}</h2>
	@if ($breadcrumbs)
		<ol class="breadcrumb">
	        @foreach ($breadcrumbs as $breadcrumb)
	            @if (!$breadcrumb->last)
	                <li><a href="{{{ $breadcrumb->url }}}">{{{ $breadcrumb->title }}}</a></li>
	            @else
	                <li class="active"><strong>{{{ $breadcrumb->title }}}</strong></li>
	                @section('pageTitle')
	               		 {{{ $breadcrumb->title }}}
	                @stop
	            @endif
	        @endforeach
	    </ol>
	@endif
</div>