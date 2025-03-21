---
name: Spotify playlist finder
teaser: to find all playlists which contain a specific song
repository: https://github.com/ScriptRaccoon/spotify-playlist-finder
url: https://spotify-playlist-finder.onrender.com/
tutorial:
tags: ['Tool', 'Express', 'Vanilla JS', 'Authentication', 'EJS']
date: 2021-01-24
---

This app allows you to find all of your Spotify playlists that contain a specific song. Surprisingly, Spotify does not offer this functionality on its own.

As of 2021, you can only search within your library, i.e. your saved songs, within a specific playlist, and of course globally as well. A search within all of your saved playlists has been posted as a [feature request](https://community.spotify.com/t5/Live-Ideas/Your-Library-Search-within-all-Playlists/idi-p/1558149) but has not been implemented yet. This feature is useful, for example, to find possible duplicates.

This is why I created this little search tool, using the [Spotify Web API](https://developer.spotify.com/documentation/web-api) within an Express app. Users can authenticate with their Spotify account. This generates an access token that is saved to the client's session storage.

There is an option to save the search result in the local storage of the browser, making any subsequent search _much_ faster.
