<nav class="navbar-default navbar-static-side" role="navigation">
	<div class="sidebar-collapse">
		<ul class="nav" id="side-menu">
			<li class="nav-header">
				<div class="dropdown profile-element">
					<span>
						 <img alt="image" class="img-circle"  src="img/profile_small.jpg">
					</span> 
					<a data-toggle="dropdown" class="dropdown-toggle" href="#"> 
						<span class="clear"> 
							<span class="block m-t-xs"> 
								<strong class="font-bold">Amelia Smith</strong>
							</span> 
							<span class="text-muted text-xs block">
								Art Director 
								<b class="caret"></b>
							</span>
						</span>
					</a>
					<ul class="dropdown-menu animated fadeInRight m-t-xs">
						<li><a href="profile.html">Profile</a></li>
						<li><a href="contacts.html">Contacts</a></li>
						<li><a href="mailbox.html">Mailbox</a></li>
						<li class="divider"></li>
						<li><a href="login.html">Logout</a></li>
					</ul>
				</div>
				<div class="logo-element">IN+</div>
			</li>
			@foreach($menu->getItems() as $menuItem)
		    <?$isActive = $menu->isItemActive($menuItem['id']);?>
			<li @if( $isActive ) class="active" @endif >
				<a href="{{{ $menuItem['url'] }}}">
				    @if( isset($menuItem['iconClass']) )
					<i class="{{ $menuItem['iconClass'] }}"></i>
					@endif
					<span class="nav-label">{{{ $menuItem['title'] }}}</span>
					@if(isset($menuItem['items']))
					<span class="fa arrow"></span>
					@endif
				</a>
				@if(isset($menuItem['items']))
				<ul class="nav nav-second-level collapse @if( $isActive ) in @endif" style="height: auto">
				    @foreach($menuItem['items']->getItems() as $menuItem2)
				    <?$isActive2 = $menuItem['items']->isItemActive($menuItem2['id']);?>
				    <li @if($isActive2) class="active" @endif >
				        <a href="{{{$menuItem2['url']}}}">
				            @if( isset($menuItem2['iconClass']))
				            <i class="{{ $menuItem2['iconClass'] }}"></i>
				            @endif
				            {{{ $menuItem2['title'] }}}
				            @if( isset($menuItem2['items'] ))
				            <span class="fa arrow"></span>
				            @endif
				        </a>
				        @if( isset($menuItem2['items']) )
				        <ul class="nav nav-third-level collapse @if($isActive2) in @endif" style="height: auto">
				            @foreach($menuItem2['items']->getItems as $menuItem3)
				            <li @if($menuItem2['items']->isItemActive($menuItem3['id'])) class="active" @endif>
				                <a href="{{{ $menuItem3['url']  }}}">{{{ $menuItem3['title']  }}}</a>
				            </li>
				            @endforeach
				        </ul>
				        @endif
				    </li>
				    @endforeach
				</ul>
				@endif
			</li>
			@endforeach;
		</ul>
	</div>
</nav>