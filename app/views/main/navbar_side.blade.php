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
			<li @if($menu->isItemActive($menuItem['id'])) class="active" @endif >
				<a href="{{{ $menuItem['url'] }}}">
					<i class="{{ $menuItem['iconClass'] }}"></i> 
					<span class="nav-label">{{ $menuItem['title'] }}</span> 
				</a>
			</li>
			@endforeach;
		</ul>
	</div>
</nav>