---
title: "What News Do People Get on Social Media? Analyzing Exposure and Consumption of News through Data Donations"
type: paper
authors:
  - Salim Chouaki
  - Abhijnan Chakraborty
  - Oana Goga
  - Savvas Zannettou
year: 2024
doi: "10.1145/3589334.3645399"
venue: "The ACM Web Conference 2024"
tags:
  - social-media-news
  - data-donation
  - news-exposure
  - misinformation
  - political-diversity
---

## TL;DR

This paper uses [[Data Donation]] to measure the Facebook news feeds and interactions of 472 U.S. participants. Its CheckMyNews browser extension records news posts, exposure mechanisms, visibility time, and visible and hidden interactions while limiting collection of private data. The study distinguishes selective, incidental, algorithmic, and targeted [[Social Media News Exposure]]. Selective exposure contains the largest measured share of posts from sources labeled as repeatedly spreading misinformation, while the other mechanisms produce more politically diverse news diets. Users interact with few posts, often share without opening the linked article, and engage privately with ideologically opposing sources more often than their public behavior suggests.

## Research Question

What news are Facebook users actually exposed to, which mechanisms place that news in their feeds, and how do those mechanisms relate to source quality, political diversity, visibility, and user interaction?

## Motivation

Platform data access restrictions leave external researchers unable to observe most of the news that users see. Public shares omit people who do not post and content that users prefer not to endorse publicly, while browsing histories observe only links that users open. Surveys and controlled accounts introduce different measurement gaps. The paper therefore seeks a participant-controlled method for observing exposure and consumption in real feeds at finer granularity.

## Contributions

- Develops CheckMyNews, a privacy-preserving Chrome extension for research-oriented [[Data Donation]] from real Facebook users.
- Defines four mechanisms of [[Social Media News Exposure]]: selective, incidental, algorithmic, and targeted exposure.
- Compiles 12,638 U.S. news domains and 14,451 associated Facebook pages by combining established-source audits with under-the-radar outlets that identify themselves as news media.
- Separates visible interactions, hidden interactions, and on-screen visibility time to show how public behavior differs from private engagement.
- Measures source quality and political diversity separately for each exposure mechanism instead of treating the Facebook news feed as a single channel.

## Method

CheckMyNews runs in the background while participants browse Facebook on desktop Chrome. It identifies news posts using lists of news domains and Facebook pages. For public news posts, it collects the text, media, publisher, and landing URL; for private news posts, it limits collection to the landing URL and a hashed publisher identifier. It does not collect private non-news posts. The extension also records whether at least 30% of a post is visible at half-second intervals, visible actions such as likes, comments, and shares, and hidden actions such as opening a link, image, or publisher page. Participant identifiers are pseudonymous, and the authors report institutional data-protection and ethics review, explicit consent, data minimization, and withdrawal procedures.

Recruitment through Prolific yielded 889 U.S. volunteers, of whom 720 installed the extension and 580 subsequently logged into Facebook. The analysis retains 472 participants who either browsed Facebook for at least 30 minutes or received more than ten news posts. Data were collected from November 2020 through February 15, 2021, spanning the U.S. presidential election and its aftermath. The analyzed corpus contains 143,129 news posts: 62,434 selective, 60,529 incidental, 11,566 targeted, and 8,600 algorithmic.

The paper assigns outlet-level factualness, repeated-misinformation, and political-leaning labels using NewsGuard and Media Bias Fact Check. It measures political diversity with a binary indicator for exposure to both left- and right-leaning sources and a balance score for the relative volume from each side. Pearson chi-squared tests compare interaction and source-quality proportions, while Kolmogorov-Smirnov tests compare visibility-time distributions.

## Experiments

The median category proportions computed across participants are 50% incidental, 24% selective, 9% targeted, and 4% algorithmic; because each category has its own median, these values do not sum to 100%. The proportions vary over time; targeted news reaches local peaks around the November 3 election and the December 14 Electoral College vote. These temporal alignments are descriptive and do not establish that the events caused the changes.

Across all news posts, 63% come from sources rated factual, 5.1% from sources labeled as repeatedly spreading misinformation, and 13% from under-the-radar sources. The misinformation-source share is highest for selective exposure (5.8%), followed by incidental (5.0%), algorithmic (4.5%), and targeted exposure (2.5%). Targeted exposure has the lowest factual-source share (52%) and the highest under-the-radar share (32%). Differences across mechanisms are reported as statistically significant at `p < 0.001`.

Among users with enough labeled posts for the diversity analysis, 83.8% encounter at least one left-leaning and one right-leaning source. The corresponding shares are 81.5% for incidental, 71.0% for algorithmic, 70.7% for targeted, and 47.0% for selective exposure. Algorithmic and targeted diets are the most balanced by the paper's ratio measure, while selective diets are the least balanced.

Users perform visible interactions on 2.6% and hidden interactions on 2.8% of received news posts, with both types occurring on fewer than 0.5%. They open the landing URL for only 14% of news posts they share. Median visibility time is 5.6 seconds for news posts, compared with 4.0 seconds for non-news ads and 4.1 seconds for non-news public posts. Hidden interactions are 1.8 to 6 times as frequent as visible interactions for algorithmic and targeted news.

Public interaction is more common when source and user ideology match: Republicans visibly interact with 3.1% of right-source posts versus 1.8% of left-source posts, and Democrats with 3.9% of left-source posts versus 3.1% of right-source posts. Hidden interaction reverses this pattern: Republicans interact privately with 4.1% of left-source posts versus 2.3% of right-source posts, and Democrats with 2.9% of right-source posts versus 2.4% of left-source posts. These are behavioral associations; the design does not identify why users interact or what effects the exposure has on beliefs.

## Limitations

The extension cannot observe mobile use and studies only Facebook, desktop Chrome users, and one election-centered period. Participation and attrition create substantial selection: the final sample is younger than the U.S. population, 65% male, and 76% Democratic, so it is not representative of either U.S. residents or U.S. Facebook users. Installing monitoring software may itself change behavior, even though the extended collection period was intended to let usage stabilize.

News detection depends on compiled domain and page lists and can miss outlets outside them. Quality and ideology are assigned at the source level using two external raters, so every post inherits its publisher's label regardless of article-level content. Under-the-radar status denotes missing coverage by those raters, not misinformation. Visibility on screen does not establish attention, comprehension, or belief change. The observational comparisons cannot determine causal effects of exposure mechanisms, and interpretations such as inhibition of public interaction or greater cognitive load remain hypotheses for future experiments.

## Related Concepts

- [[Data Donation]]
- [[Social Media News Exposure]]
- [[Media Ecology]]
- [[Political Polarization]]
- News diet diversity
- Platform transparency

## Related Papers

- Fletcher and Nielsen (2018), ["Are people incidentally exposed to news on social media? A comparative analysis"](https://doi.org/10.1177/1461444817724170).
- Eady et al. (2019), ["How Many People Live in Political Bubbles on Social Media? Evidence From Linked Survey and Twitter Data"](https://doi.org/10.1177/2158244019832705).
- Scharkow et al. (2020), ["How social network sites and other online intermediaries increase exposure to news"](https://doi.org/10.1073/pnas.1918279117).
- Levy (2021), ["Social Media, News Consumption, and Polarization: Evidence from a Field Experiment"](https://doi.org/10.1257/aer.20191777).
- Watts, Rothschild, and Mobius (2021), ["Measuring the news and its impact on democracy"](https://doi.org/10.1073/pnas.1912443118).

[[index|Library home]]
