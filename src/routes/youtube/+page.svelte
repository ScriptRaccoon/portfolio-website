<script lang="ts">
	import youtube_data from '../../data/youtube/youtube.json'

	import { faYoutube } from '@fortawesome/free-brands-svg-icons'
	import Fa from 'svelte-fa'

	const { stats, video } = youtube_data
</script>

<h1>YouTube</h1>

<p>
	In 2019 I started a
	<a href="https://www.youtube.com/scriptraccoon" target="_blank">
		YouTube channel
	</a>
	on web development (in German). Today, the channel has
	<strong>{stats.subscriber_count}</strong>
	subscribers and
	<strong>{stats.video_count}</strong>
	published videos.
</p>

<p>My latest video:</p>

<a class="videolink" href={video.url} target="_blank">
	<img
		class="thumbnail"
		src={video.thumbnail_url}
		alt="thumbnail of latest video: {video.title}"
	/>
	<div class="logo" aria-hidden="true">
		<Fa icon={faYoutube} />
	</div>
</a>

<p>
	On my channel I usually do not talk about one concept per video, what most
	other channels do. Instead, I focus on
	<strong>full projects</strong>, which therefore cover several concepts and
	pieces of technology and also put them more into context. These kinds of
	videos motivated and helped me a lot when I started my journey in web
	development, which is also why I like to produce these.
</p>

<p>
	I also choose a rather slow-paced approach, explaining everything
	<strong>step by step</strong>, so that also newbies should be able to
	follow. On the other hand, I also use my YouTube channel to document my
	learnings. Both the preparation and the recording of a video improve my
	understanding of the subject. This is also why the videos started with
	rather basic Vanilla JavaScript projects in 2019 and nowadays present full
	stack applications with SvelteKit.
</p>

<p>
	I decided to do the channel in <strong>German</strong> (my native language),
	for the sole reason that there are already lots of very good channels in
	English, but only a few in German. Many people have asked me to change to
	English or make subtitles. Sorry, but I will not do that. There is a place
	for YouTube channels in every language. If you want good English content,
	please check out the channels by
	<a href="https://www.youtube.com/@DaveGrayTeachesCode" target="_blank"
		>Dave Gray</a
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
	<a href="https://www.youtube.com/@NetNinja" target="_blank">The Net Ninja</a
	>, for example.
</p>

<p>
	You can always check out the <strong>code</strong> which I link in the video
	description. Of course, the code has English variable names, and the README also
	often includes some pieces of explanation.
</p>

<p>
	Since March 2024, I also create videos for the channel
	<a href="https://www.youtube.com/@cuberaccoon" target="_blank"
		>Cube Raccoon</a
	> which is dedicated to twisty puzzles.
</p>

<style>
	.videolink {
		position: relative;
		display: inline-block;

		&:hover,
		&:focus-visible {
			.thumbnail {
				opacity: 0.5;
			}
			.logo {
				opacity: 1;
				scale: 1;
			}
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.thumbnail,
		.logo {
			transition: all 200ms ease;
		}
	}

	.thumbnail {
		width: min(100%, 320px);
		border-radius: 0.4rem;
	}

	.logo {
		font-size: 4rem;
		color: var(--font-color);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transform-origin: top left;
		opacity: 0;
		scale: 0.9;
	}
</style>
