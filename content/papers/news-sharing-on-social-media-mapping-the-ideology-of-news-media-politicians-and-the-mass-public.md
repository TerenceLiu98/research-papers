---
title: "News Sharing on Social Media: Mapping the Ideology of News Media, Politicians, and the Mass Public"
type: paper
authors:
  - Gregory Eady
  - Richard Bonneau
  - Joshua A. Tucker
  - Jonathan Nagler
year: 2024
doi: 10.1017/pan.2024.19
tags:
  - ideology-estimation
  - political-communication
  - social-media
---

## TL;DR

A Bayesian count model jointly locates politicians, ordinary users, and news outlets on an ideological scale using shared URLs. Twitter validation shows strong agreement with congressional voting and survey measures. More electorally secure legislators share more ideologically extreme news, while extreme sharers contribute disproportionately to the political information environment.

## Research Question

Can news-sharing behavior place citizens, politicians, and media organizations on a common ideological scale, and what does that scale reveal about polarization and electoral incentives?

## Motivation

Follower-based measures locate politicians through audience perceptions. News sharing measures a behavior undertaken by both elites and citizens, permits estimation for candidates without voting records, and uses URLs available across many platforms.

## Contributions

- Joint behavioral measurement of user, politician, and outlet ideology, with separate terms for activity, popularity, and outlet dispersion.
- Validation against roll-call ideology and survey-linked attitudes, including a specification without party-specific priors.
- Evidence that elite–public comparisons depend on the measured behavior and that electoral security is associated with polarized sharing.
- An open-source R implementation, `mediascores`, and replication data identified by DOI `10.7910/DVN/1QMLOV`.

## Method

The data cover 1,152 accounts belonging to 699 political actors and 220 national political-news domains. A separate sample contains 10,000 US-located users who follow at least one politician, have sent at least 100 tweets, and have at least 25 followers. Multiple accounts belonging to one politician are combined. Shortened URLs are expanded; links within quoted portions of quote tweets are excluded because they may be shared critically.

For user or politician i and outlet m, a negative-binomial model describes sharing counts with mean

$$
\pi_{im}=\exp(\alpha_i+\gamma_m-\lVert\theta_i-\zeta_m\rVert^2).
$$

User activity and outlet popularity enter through the intercepts; ideological distance reduces expected sharing. Outlet-specific dispersion permits differences in signal strength. Bayesian hierarchical priors pool parameters, including separate ideology distributions for Democratic politicians, Republican politicians, and ordinary users. Reflection ambiguity is resolved by orienting the fitted scale liberal-to-conservative. The method does not require labeled outlet ideology; the main specification nevertheless uses politician party membership in its priors.

## Experiments

| Validation | Reported finding |
| --- | --- |
| Congressional party separation | No cross-party overlap in the main specification; about 3% overlap without party-specific ideology priors |
| NOMINATE agreement | Overall correlation 0.96, SE 0.01 |
| Within-party agreement | Senate: Democrats 0.76, Republicans 0.61; House: Democrats 0.51, Republicans 0.58 |
| Survey-linked validation | 481 of 1,341 tweeting respondents shared at least five news stories; mean correlation with three survey-based measures was 0.73 |

The sharing-based distribution places many politically engaged users to the left of the most liberal legislator, with a smaller analogous group on the right. Follower-based estimates for the same users give a different elite–public ordering. These comparisons concern politically interested news sharers.

Electoral alignment is measured using the 2016 presidential vote margin, oriented toward each legislator's party. Across four OLS specifications with 527 legislators, alignment coefficients range from 0.108 to 0.317 and are significant at the reported 1% level. The fullest specification gives 0.130 (SE 0.044), controlling for party, chamber, NOMINATE, and its interaction with party. Legislators with more extreme media scores also share substantially more news.

## Limitations

- Sharing-based ideology reflects communication choices, audience exposure, and strategic incentives; it is not a direct measurement of private beliefs or article content.
- The homophily assumption and domain-level aggregation can obscure critical sharing and variation within outlets.
- Politically engaged users and respondents with sufficient sharing are selected populations, not representative samples of the mass public.
- Electoral-competition results are observational; they do not identify causal effects of gerrymandering or electoral reform.
- Platform independence is a methodological possibility demonstrated here with Twitter, not an empirical test of cross-platform equivalence. Dynamic and article-level extensions remain proposed directions.
- Survey-linked replication data are restricted for confidentiality.

## Related Concepts

- [[concepts/news-sharing-based-ideology-estimation|News-Sharing-Based Ideology Estimation]]: jointly estimates actor and outlet positions from URL-sharing counts.
- [[concepts/social-media-ideal-point-estimation|Social-Media Ideal-Point Estimation]]: follower-based measurement supplies the key comparison between audience perceptions and actors' own behavior.

## Related Papers

- [[papers/estimating-the-ideology-of-political-youtube-videos|Estimating the Ideology of Political YouTube Videos]]: related audience-affinity measurement at video level, followed by supervised metadata prediction; it uses a different estimator and target.
- Barberá (2015), “Birds of the Same Feather Tweet Together”: the cited spatial-following approach used for comparison.
- Cormack (2016), “Extremity in Congress: Communications versus Votes”: cited evidence that electoral context shapes which positions legislators emphasize.
