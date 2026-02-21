<script lang="ts">
	import TrackToggle, {
		device_is_tracked,
	} from '$lib/components/TrackToggle.svelte'
</script>

<header>
	<h1>Privacy Policy</h1>
</header>

<p>
	I value your privacy. This page explains what data I collect when you visit
	my website and how it is used.
</p>

<h2>Data I Collect</h2>

<p>
	When you visit the site, I store the following information in order to
	analyze page visits and sessions:
</p>
<ul>
	<li>
		A cookie (<code>session_id</code>) containing a random session
		identifier (UUID) to count each visit only once per session.
	</li>
	<li>
		Session data including: date, browser, operating system, theme
		preference, country, referrer, viewport width (mapped to device type),
		and full user agent string.
	</li>
	<li>Page visits: session ID, page path, and date.</li>
</ul>

<h2>Data Aggregation</h2>

<p>To understand website usage:</p>
<ul>
	<li>
		Browser, OS, theme, country, referrer, and device type are aggregated
		immediately into usage statistics.
	</li>
	<li>
		Session counts and page visits are aggregated weekly into monthly
		statistics.
	</li>
	<li>
		Aggregated session and page visit data are deleted monthly. After
		deletion, no individual user can be identified.
	</li>
</ul>

<h2>Cookies</h2>

<p>
	<strong>session_id</strong> is stored as a cookie to deduplicate page visits within
	a session. It expires at the end of the browser session and is not used to track
	users across websites.
</p>

<h2>Data Usage</h2>

<p>All collected data is used solely to:</p>
<ul>
	<li>Measure the number of page views and sessions.</li>
	<li>
		Understand aggregate usage trends (browser, OS, theme preference,
		country, referrer, device type).
	</li>
	<li>Improve the website according to users' needs and preferences.</li>
</ul>

<h2>Data Retention</h2>

<p>
	Session data and page visits are retained temporarily for aggregation
	purposes. Aggregated monthly statistics are deleted after one month, and no
	persistent identifiers or profiling of individual users are created.
</p>

<h2>Your Rights</h2>

<p>
	No personally identifiable data is stored that can identify you
	individually. You can delete the session cookie (<code>session_id</code>) at
	any time by clearing your browser data. All analytics are aggregated
	internally and do not identify individual users.
</p>

<h2>Changes to This Policy</h2>

<p>
	I may update this privacy policy from time to time. Updates will be posted
	on this page.
</p>

<h2>Contact</h2>

<p>
	If you have questions about this privacy policy, please <a
		href="mai&#108;t&#111;&#58;s&#99;r%69pt%72%61cc%6F&#111;%6E%40&#103;mail&#46;c%6&#70;m"
	>
		contact me
	</a>.
</p>

<h2>Analytics Preferences</h2>

{#if device_is_tracked.value}
	<p>
		You can opt out of session and page visit tracking by clicking the
		button below. This will stop all analytics for your device.
	</p>
{:else}
	<p>
		Analytics is disabled on this device. Click the button below to
		re-enable it.
	</p>
{/if}

<TrackToggle />

<style>
	h2 {
		margin-top: 2rem;
	}
</style>
