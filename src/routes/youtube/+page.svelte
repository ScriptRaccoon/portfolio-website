<script lang="ts">
	export let data;
	const { stats, video } = data;
</script>

<h1>YouTube</h1>

<p>
	In 2019 I started a
	<a href="https://www.youtube.com/scriptraccoon" target="_blank">
		YouTube channel
	</a>
	on web development.
	{#if stats}
		Today, the channel has
		<strong>{stats.subscriber_count}</strong>
		subscribers and
		<strong>{stats.video_count}</strong>
		published videos.
	{/if}
</p>

{#if video}
	<p>My latest video (in German):</p>
	<a href={video.url} target="_blank">
		<img
			class="thumbnail"
			src={video.thumbnail_url}
			alt="thumbnail of latest video: {video.title}"
		/>
	</a>
{/if}

<p>
	On my channel I usually do not talk about one concept per video,
	what most other channels do. Instead, I focus on
	<strong>full projects</strong>, which therefore cover several
	concepts and pieces of technology and also put them more into
	context. These kinds of videos motivated and helped me a lot when I
	started my journey in web development, which is also why I like to
	produce these.
</p>
<p>
	I also choose a rather slow-paced approach, explaining everything
	<strong>step by step</strong>, so that also newbies should be able
	to follow. On the other hand, I also use my YouTube channel to
	document my learnings. Both the preparation and the recording of a
	video improve my understanding of the subject. This is also why the
	videos started with rather basic Vanilla JavaScript projects in 2019
	and nowadays present full stack applications with SvelteKit.
</p>

<p>
	I decided to do the channel in <strong>German</strong> (my native
	language), for the sole reason that there are already lots of very
	good channels in English, but only a few in German. Many people have
	asked me to change to English or make subtitles. Sorry, but I will
	not do that. There is a place for YouTube channels in every
	language. If you want good English content, please check out the
	channels by
	<a
		href="https://www.youtube.com/@DaveGrayTeachesCode"
		target="_blank">Dave Gray</a
	>,
	<a href="https://www.youtube.com/@TraversyMedia" target="_blank"
		>Traversy Media</a
	>,
	<a href="https://www.youtube.com/@KevinPowell" target="_blank"
		>Kevin Powell</a
	>,
	<a href="https://www.youtube.com/@WebDevSimplified" target="_blank"
		>Web Dev Simplified</a
	>, and
	<a href="https://www.youtube.com/@NetNinja" target="_blank"
		>The Net Ninja</a
	>, for example.
</p>
<p>
	You can always check out the <strong>code</strong> which I link in the
	video description. Of course, the code has English variable names, and
	the README also often includes some pieces of explanation.
</p>

<style>
	.thumbnail {
		width: 16rem;
	}
</style>
