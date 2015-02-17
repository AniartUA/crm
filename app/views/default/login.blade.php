@extends('layouts.default')

@section('content')
<div class="middle-box text-center loginscreen  animated fadeInDown">
    <div>
        <div>
            <h1 class="logo-name">AniCRM</h1>
        </div>
        <h3>Welcome to AniCRM!</h3>
        <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
            <!--Continually expanded and constantly improved Inspinia Admin Them (IN+)-->
        </p>
        <p>Login in. To see it in action.</p>
        <form method="post" class="m-t" role="form" id="users_login_form" action="{{ \URL::route('auth.postForm') }}">
            <div class="form-group">
                <input id="login_email" type="email" name="email" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
                <input id="login_password" type="password" name="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group" style="text-align: right">
                remember me
                <input id="login_remember" name="remember" type="checkbox" />
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b">Login</button>

            <a href="#"><small>Forgot password?</small></a>
            <p class="text-muted text-center"><small>Do not have an account?</small></p>
            <a class="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>
        </form>
    </div>
</div>
@stop