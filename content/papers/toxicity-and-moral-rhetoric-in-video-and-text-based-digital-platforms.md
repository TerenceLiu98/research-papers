---
title: "Toxicity and Moral Rhetoric in Video- and Text-Based Digital Platforms: A Multimethod Study of Political Talk Shows and News Articles in Taiwan"
type: paper
authors:
  - Yuan Hsiao
  - Chingching Chang
  - You-Jian Wu
  - Hao-Hsuan Wang
year: 2026
doi: "10.1080/10584609.2025.2572077"
tags:
  - online-political-incivility
  - moral-foundations
  - political-communication
  - multiplatform-research
  - media-effects
---

## TL;DR

This multimethod study compares toxic rhetoric in text-based news articles and video-based political talk shows produced by the same Taiwanese news organizations. Talk shows on YouTube contain more toxic language than news articles, and toxicity is most strongly associated with loyalty and authority rhetoric. A three-wave panel study further finds that talk-show exposure is associated with more exposure to toxic content, which is associated with lower social trust. The study treats these relationships as associational rather than causal.

## Research Question

The paper asks three questions: whether toxicity differs between digital platforms that emphasize visual/video and textual communication; which moral foundations are associated with toxic rhetoric and whether those associations vary by platform; and what potential consequences exposure to toxic content has for social trust.

## Motivation

Cross-platform comparisons often confound platform affordances with differences in ownership, management, producers, and audiences. Taiwan offers a useful most-similar setting because the same news organizations produce both website news and political talk shows. Comparing these formats helps isolate how communication mode may relate to toxicity while also connecting the production and reception of toxic content.

## Contributions

- Shifts attention from user-generated comments to toxicity in media-produced content.
- Connects the production of toxic rhetoric to [[Moral Foundations Theory]], with particular attention to loyalty, authority, and sanctity.
- Shows how platform mode and outlet format can work together within a larger [[Media Ecology]].
- Combines large-scale digital trace data with longitudinal survey data to examine both production and downstream associations.

## Method

The digital-data analysis uses a most-similar design. The pro-KMT organization TVBS contributes TVBS News articles and the Situation Room talk show; the pro-DPP organization SETN contributes SETN News articles and the New Taiwan Fueling talk show. The study covers January 1 through August 31, 2023, with 50,001 website news articles and 4,663 YouTube talk-show videos.

The unit of analysis is a sentence. Talk-show audio is transcribed so that language can be compared across formats, while nonverbal video content is excluded. Toxicity is measured with Google's Perspective API. Moral rhetoric is measured using a traditional-Chinese moral foundations dictionary expanded with word embeddings and manually calibrated for the Taiwanese context. Linear mixed models use random intercepts for the article or video, control for outlet political affiliation, and estimate associations between toxicity, moral-foundation indicators, platform, and their interactions. Additional Perspective API measures of identity attacks, threats, profanity, and insults provide robustness checks.

The survey component follows 1,404 respondents who completed three waves collected between May 16 and September 6, 2023. Respondents reported news-website and political-talk-show exposure, toxic-content exposure, and social trust using Breyer's scale. Linear mixed models and two-way fixed-effects models estimate associations among these measures, and causal mediation analysis evaluates the pathway from talk-show exposure through toxic-content exposure to social trust.

## Experiments

Talk shows have substantially higher toxicity scores than news articles; the difference is statistically significant at p < .001 and is consistent across the two outlet affiliations. Sentences containing moral rhetoric are also more toxic on average than sentences without it (p < .001). Among the five foundations, loyalty, authority, and sanctity are associated with the highest toxicity, while fairness has the smallest association after adjustment for the other foundations.

Platform interactions show that YouTube talk shows amplify the association between toxicity and every moral foundation, especially loyalty and authority. The authors illustrate this pattern with partisan talk-show excerpts that combine appeals to authority, law, ancestry, or religion with hostile accusations and inflammatory language.

In the survey models, standardized talk-show exposure is positively associated with toxic-content exposure in both the mixed model (beta = .07, p < .01) and the two-way fixed-effects robustness model (beta = .05, p < .05). News exposure has smaller positive associations (beta = .04 and .02, respectively). Toxic-content exposure is negatively associated with social trust in the mixed model (beta = -.09, p < .001) and the fixed-effects model (beta = -.04, p < .05). News and talk-show exposure themselves have positive associations with social trust, so the estimated mediated pathway offsets only part of that positive association: the average causal mediation effect is -.002 (p = .006), approximately 7% of the total effect.

## Limitations

The evidence is more associational than causal. The design cannot establish that platform affordances or toxic content caused the observed differences, and the mediation analysis depends on strong assumptions. The digital comparison covers only two large news organizations during a non-election period, and it compares transcribed language rather than the full visual and auditory content of video. Perspective API scores and manually calibrated dictionary measures are operational proxies, not direct measures of toxicity or moral reasoning. The survey waves are close together, so the small short-term associations should not be interpreted as evidence of immediate, complete erosion of social trust. Taiwan's political and media environment may also limit generalization.

## Related Concepts

- [[Online Political Incivility]]
- [[Moral Foundations Theory]]
- [[Media Ecology]]
- Political communication
- Social trust
- Multiplatform research

## Related Papers

- Mutz and Reeves (2005), ["The new videomalaise: Effects of televised incivility on political trust"](https://doi.org/10.1017/S0003055405051452).
- Mutz (2016), ["In-your-face politics: The consequences of uncivil media"](https://doi.org/10.1515/9781400865871).
- Van't Riet and Van Stekelenburg (2022), ["The effects of political incivility on political trust and political participation: A meta-analysis of experimental research"](https://doi.org/10.1093/hcr/hqab022).
- Scolari (2012), ["Media ecology: Exploring the metaphor to expand the theory"](https://doi.org/10.1111/j.1468-2885.2012.01404.x).
