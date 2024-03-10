---
name: Animated pie charts in Svelte
teaser: with the power of Svelte's tweened stores
repository: https://github.com/ScriptRaccoon/Abgeordnete
url: https://abgeordnete.netlify.app/
tutorial: https://youtu.be/gcK8pw7w12M
tags:
  [
    "Data visualization",
    "Svelte",
    "SVG",
    "TypeScript",
    "Mathematics",
    "Tutorial",
  ]
date: 2023-05-04
---

This is an animated pie chart that visualizes the distribution of the members of the German [Bundestag](https://de.wikipedia.org/wiki/Deutscher_Bundestag) for different age groups and political parties.

When the age group is changed via the menu, the new distribution is animated: this is very easy to do with Svelte's tweened stores. No graphics or visualization library is used. The pie chart is a hand-made SVG.

The data was extracted with a script from the German Wikipedia page [Liste der Mitglieder des Deutschen Bundestages (20. Wahlperiode)](https://de.wikipedia.org/wiki/Liste_der_Mitglieder_des_Deutschen_Bundestages_%2820._Wahlperiode%29).

To improve accessibility, below the pie chart, there is also a text-based summary.
