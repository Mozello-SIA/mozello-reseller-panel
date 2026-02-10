<!DOCTYPE HTML>

<html>

<head>
  <title>Mozello Reseller</title>
  <meta name="robots" content="noindex" />
  <link href="css/style.css" rel="stylesheet" type="text/css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
  <script src="js/reseller_api.js"></script>
  <script src="js/script.js"></script>
</head>

<body>

<?php include('templates/_menu.php'); ?>

<div class="message showInTrial" id="signupPanel">
Account in test mode. To publish websites and go live, please <a class="signupLink" href="#">pay the sign-up fee</a>.
</div>

<div class="message" id="messagePanel">
<div class="messageClose">&#10060;</div>
<div class="messageText"></div>
</div>

<div id="content">

<a class="logo2" href="https://www.mozello.com"><img src="mozello-logo.svg" alt="Mozello"></a>

<div class="view" id="viewLogin" style="display: block">
<?php include('templates/_login.php'); ?>
</div>

<div class="view" id="viewWebsites">
<?php include('templates/_websites.php'); ?>
</div>

<div class="view" id="viewWebsite">
<?php include('templates/_website.php'); ?>
</div>

<div class="view" id="viewSettings">
<?php include('templates/_settings.php'); ?>
</div>

<div class="view" id="viewMoney">
<?php include('templates/_money.php'); ?>
</div>

<div class="view" id="viewIntegration">
<?php include('templates/_integration.php'); ?>
</div>

<div class="view" id="viewSupport">
<?php include('templates/_support.php'); ?>
</div>

</div>

</body>

</html>