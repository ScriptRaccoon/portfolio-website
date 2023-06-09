<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Script Raccoon - YouTube</title>
</svelte:head>

<h1>YouTube</h1>

<p>
	In 2019 I started a <a
		href="https://www.youtube.com/scriptraccoon"
		target="_blank"
	>
		YouTube channel
	</a>
	on web development. {#if data.stats}
		Today, the channel has {data.stats.subscriberCount} subscribers and
		{data.stats.videoCount} published videos.
	{/if}
</p>

<p>
	On my channel I usually do not talk about one piece of technology
	per video, what most other channels do. Instead, I focus on full
	projects, which therefore cover several pieces of technology and
	also put them more into context. These kinds of videos motivated and
	helped me a lot when I started my journey in web development, which
	is also why I like to produce these.
</p>
<p>
	I also choose a rather slow-paced approach, explaining every step,
	so that also newbies should be able to follow. On the other hand, I
	also use my YouTube channel to document my learnings. Both the
	preparation and the recording of a video improve my understanding of
	the subject. This is also why the videos started with rather basic
	Vanilla JavaScript projects in 2019 and nowadays present full stack
	applications with SvelteKit.
</p>

<p>
	I decided to do the channel in German (my native language), for the
	sole reason that there are already lots of very good channels in
	English, but only a few in German. Many people have asked me to
	change to English or make subtitles. Sorry, but I will not do that.
	There is a place for YouTube channels in every language. If you want
	good English content, please check out the channels by Dave Gray,
	Traversy Media, Kevin Powell, Web Dev Simplified, and The Net Ninja,
	for example.
</p>
<p>
	You can always check out the code which I link in the video
	description. Of course, the code has English variable names, and the
	README also often includes some pieces of explanation.
</p>
