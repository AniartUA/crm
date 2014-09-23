<nav class="navbar navbar-static-top " role="navigation" style="margin-bottom: 0">
	<div class="navbar-header" style="padding-left: 12px;">
		<div class="btn-group" style="float: left">
			<button class="navbar-minimalize minimalize-styl-2 btn btn-primary ">
				<i class="fa fa-bars"></i> 
			</button>
			<div class="btn-group">
				<button class="btn btn-primary dropdown-toggle minimalize-styl-2" data-toggle="dropdown">
					<i class="fa fa-plus"></i>
					@lang('views/main.add') 
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li>
						<a href="#">
							<i class="fa fa-user"></i>
							@lang('views/main.contact')
						</a>
					</li>
				</ul>
			</div>
			<button type="button" class="btn btn-primary minimalize-styl-2">@lang('views/main.functions')</button>
		</div>				
		<form role="search" class="navbar-form-custom" style="float:left" method="post"
			action="search_results.html">
			<div class="form-group">
				<input type="text" placeholder="@lang('views/main.find_somewhat')"
					class="form-control" name="top-search" id="top-search">
			</div>
		</form>
	</div>
	<ul class="nav navbar-top-links navbar-right">
		<li class="dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown" href="#">
				<span id="navbar_top_clock"></span>
				<span class="caret"></span>
			</a>
			<ul class="dropdown-menu" role="menu">
				<li>
					<a href="#">Действие</a>
				</li>
			</ul>
		</li>
	</ul>				
</nav>