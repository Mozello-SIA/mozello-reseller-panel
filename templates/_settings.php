<h1>Settings</h1>

<div class="loader" id="settings-loader"><img src="img/loader.gif" width="77" height="7" alt=""></div>

<form id="formSettings" action="" method="post">

<h2>Your company info</h2>

<div>

<div class="halfsize">

   <label>Company</label><br>
   <input class="w100p" id="settings-company" type="text" value="" disabled="disabled"><br>

   <label>Contact name</label><br>
   <input class="w100p" id="settings-contactName" type="text" value=""><br>

   <label>Contact e-mail</label><br>
   <input class="w100p" id="settings-contactEmail" type="text" value=""><br>

   <label>Contact phone</label><br>
   <input class="w100p" id="settings-contactPhone" type="text" value=""><br>

   <label>Country</label><br>
   <input class="w100p" id="settings-addrCountry" type="text" value="" disabled="disabled"><br>

</div>



<div class="halfsize">

   <label>Address</label><br>
   <input class="w100p" id="settings-addrAddress" type="text" value=""><br>

   <label>City</label><br>
   <input class="w100p" id="settings-addrCity" type="text" value=""><br>

   <label>Region / State</label><br>
   <input class="w100p" id="settings-addrRegion" type="text" value=""><br>

   <label>ZIP / Postal code</label><br>
   <input class="w100p" id="settings-addrPostal" type="text" value=""><br>

</div>

</div>

<br style="clear: both">

<h2>Customer support info</h2>

<div>

<div class="halfsize">

   <label>Support e-mail</label><br>
   <input class="w100p" id="settings-supportEmail" type="text" value=""><br>

   <label>Support phone</label><br>
   <input class="w100p" id="settings-supportPhone" type="text" value=""><br>

</div>

<div class="halfsize">

   <label>Support website</label><br>
   <input class="w100p" id="settings-supportWebsite" type="text" value=""><br>

</div>

</div>

<br style="clear: both">

<h2>Integration &amp; API</h2>

<div>

<div class="halfsize">

   <div class="white-label">
   <label>Brand name</label><br>
   <input class="w100p" id="settings-brand" type="text" value=""><br>
   </div>

   <label>Website</label><br>
   <input class="w100p" id="settings-website" type="text" value=""><br>

   <label>URL of your logo file (PNG or SVG)</label><br>
   <input class="w100p" id="settings-logoLink" type="text" value=""><br>

   <label>Order URL</label> - <a href="/developers-reseller-api/#url-order" target="_blank">more info</a><br>
   <input class="w100p" id="settings-buyLink" type="text" value=""><br>

</div>

<div class="halfsize">

   <div class="white-label">
   <label>Custom domain for pages</label> - <a href="http://www.mozello.com/contact/" target="_blank">contact to change</a><br>
   <input class="w100p" id="settings-domain" type="text" value="" disabled="disabled"><br>
   </div>

   <label>Supported domain extensions</label><br>
   <input class="w100p" id="settings-tlds" type="text" value=""><br>

   <label>API notify URL</label> - <a href="/developers-reseller-api/#url-notification" target="_blank">more info</a><br>
   <input class="w100p" id="settings-notifyLink" type="text" value=""><br>

</div>

</div>

<br style="clear: both">

<h2>Change reseller password</h2>

<div>

<div class="halfsize">

   <label>Enter new password</label><br>
   <input class="w100p" id="password-1" type="password" value=""><br>

</div>

<div class="halfsize">

   <label>Repeat password</label><br>
   <input class="w100p" id="password-2" type="password" value=""><br>

</div>

</div>

<br style="clear: both">


<br>
<input class="button" name="" type="button" value="Save Settings" id="settings-save-btn">

</form>