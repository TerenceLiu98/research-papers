---
title: Measuring Narrative Polarization in Online Discourse
type: paper
authors:
  - Jan Elfes
  - Marco T. Bastos
  - Luca Maria Aiello
year: null
tags:
  - narrative-polarization
  - computational-social-science
  - text-as-data
  - llm-annotation
  - youtube
---

## TL;DR

Across 212 YouTube videos and 90,029 comments about the Israeli-Palestinian conflict, comment sections share more similar actor-goal narratives across partisan search environments than the videos do. Mean absolute subject divergence falls from 0.19 in transcripts to 0.07 in comments. However, more complex combinations of narrative roles retain differences in how actors are portrayed. The study measures narrative distributions, not changes in users' attitudes or causal effects of commenting.

## Research Question

How can differences in the narrative roles assigned to central actors measure polarization between information environments, and do comments reinforce or reduce the narrative differences present in videos retrieved through partisan searches?

## Motivation

Interaction networks, sentiment, and topic frequencies can identify group separation without identifying incompatible portrayals of the same actors. [[concepts/narrative-polarization|Narrative Polarization]] instead concerns who is represented as pursuing particular goals, controlling outcomes, or opposing others. Comparing actor-role relationships helps distinguish opposing representations from differences in topic emphasis alone.

## Contributions

- Defines narrative polarization through structural differences in actors' narrative positions.
- Operationalizes [[concepts/greimas-actantial-model|Greimas' Actantial Model]] with LLM annotations and introduces subject divergence for actor-goal comparisons.
- Separates overlap in core narratives from differences in richer, recurring role configurations called narrative motifs.
- Demonstrates the framework on partisan YouTube environments with human annotation checks, permutation tests, and sensitivity analyses.

## Method

### Sampling and Annotation

Search queries are derived from issues emphasized in U.S. protest records and checked with Google Trends. The authors retrieve the top 20 relevant videos per query through the YouTube Data API, restricting videos to English, 4-20 minutes, and publication between October 7, 2023 and October 1, 2024. Duplicate and low-comment videos are removed, including videos shared with neutral queries. Environment labels denote query orientation, not verified political identities of viewers or commenters.

The analysis retains top-level comments of 25-600 words and excludes replies. The authors transcribe videos using Whisper large-v3 and split transcripts at the first sentence boundary after 150 words. DeepSeek-R1-Distill-Qwen-32B, at temperature 0, assigns six actantial roles using a label inventory developed from exploratory annotation of 11,000 comments and human deliberation: 21 actors and seven objects. Helper is dropped from analysis because it rarely appears.

A core narrative is a Subject-Object pair: who pursues what. Objects include violence, peace, territory, power, information, rights/freedoms, and security/safety. Actors are grouped as Israeli (Israel/Israelis, IDF, Zionists, Jews) or Palestinian (Palestine/Palestinians, Hamas, Arabs, Muslims) for divergence analysis; other and unspecified subjects are excluded. These are analytical groupings used by the authors, not claims that the categories are socially interchangeable.

### Measures and Motifs

For distributions of core narratives, overlap is the shared probability mass:

$$
O(P,Q)=\sum_x\min\{p(x),q(x)\}.
$$

For object $i$, let $p(i,\mathrm{IS})$ and $q(i,\mathrm{IS})$ be the Israeli-subject attribution shares in Israeli-leaning and Palestinian-leaning environments, conditional on retained actor groups. Subject divergence is

$$
D(i)=p(i,\mathrm{IS})-q(i,\mathrm{IS}).
$$

The range is $[-1,1]$. A negative value means comparatively greater Palestinian attribution in the Israeli-leaning environment; it does not imply that Palestinians receive the majority of attributions there. Agreement across environments likewise need not imply equal attribution to the two actor groups.

Three motifs extend the actor-goal pair (Section 3.2):

| Motif | Role configuration | Interpretive dimension |
| --- | --- | --- |
| Convergent | One actor group occupies Subject, Sender, and Receiver | Self-determination or internal conflict |
| Adversarial | One group is Subject and Sender; the other is Receiver and Opponent | Directed harm, resistance, or retaliation |
| Dependent | One group is Subject and Receiver; the other is Sender and Opponent | An opposing actor controls the desired outcome |

## Experiments

### Corpus and Reliability

| Environment | Videos | Transcript segments | Comments |
| --- | --- | --- | --- |
| Israeli-leaning | 107 | 912 | 55,894 |
| Palestinian-leaning | 105 | 981 | 34,135 |

These are the partisan comparison samples in Table 4. The table also reports a separate neutral sample of 25 videos and 31,832 comments, which is not included in the headline totals.

Two expert annotators label a stratified sample selected across the three query categories. Of 330 sampled comments, 292 remain after exclusions; 72% are coded by both humans. Table 5 reports agreement involving the two humans and the LLM, averaged across five roles: micro-F1 0.73, macro-F1 0.56, and Krippendorff's alpha 0.59. Subject micro-F1 is 0.59, versus Object micro-F1 of 0.74. These are inter-coder agreement summaries, not accuracy against an independent adjudicated gold standard.

### Core Narrative Results

Table 1 reports transcript-comment overlap of 0.71 within the Israeli-leaning environment and 0.68 within the Palestinian-leaning environment. Across environments, overlap is 0.63 for transcripts and 0.80 for comments. Mean absolute subject divergence is 0.19 versus 0.07, respectively (Section 3.1).

| Object | Transcript divergence | Comment divergence | Bonferroni-adjusted p, transcripts / comments |
| --- | --- | --- | --- |
| Rights/freedoms | 0.248 | 0.040 | 0.210 / 0.028 |
| Violence | -0.430 | -0.051 | <0.001 / <0.001 |
| Peace | -0.029 | 0.146 | 1.000 / <0.001 |
| Information | -0.177 | 0.010 | 0.842 / 1.000 |
| Territory | -0.184 | -0.109 | 0.142 / <0.001 |
| Power | -0.087 | approximately 0 | 1.000 / 1.000 |
| Security/safety | 0.183 | 0.123 | 0.016 / <0.001 |

Values come from Appendix Tables A1-A2, with 3,000 permutations. Only violence and security/safety survive Bonferroni correction in transcripts; rights/freedoms and territory are significant only before that correction. Peace is an exception to the overall reduction: its divergence is larger in comments. Several comment differences remain statistically significant despite smaller magnitudes.

Normalized narrative entropy is similar: 0.84 (95% CI 0.82-0.85) in transcripts and 0.82 (0.82-0.83) in comments. Lower comment divergence therefore coexists with comparable narrative diversity, rather than simply reflecting concentration on fewer narratives. Confidence intervals use 3,000 bootstrap resamples.

### Motifs and Robustness

Motifs reveal differences concealed by similar actor-goal distributions. Convergent Israeli security narratives are more prevalent under Israeli-leaning videos and can foreground internal criticism of government security provision. The dependent motif with Palestinian subjects is more pronounced under Israeli-leaning videos for rights/freedoms, security/safety, and territory. Adversarial motifs reveal different justifications surrounding violence. These interpretations combine quantitative motif frequencies with close reading; they are representations in comments, not factual endorsements of those comments.

Appendix figures vary actor groupings by dropping actor pairs, increase transcript segment length from 150 to 250 words, and examine Sender, Receiver, and Opponent divergence. The supplied Markdown contains figure captions but no numerical tables for these sensitivity analyses, so their exact effect changes are not recoverable from the text alone.

## Limitations

- Evidence concerns one conflict, platform, language, and query-based sample. Search orientation is not a measure of individual ideology, and search results can change over time.
- Excluding short comments and replies restricts the discourse measured. Aggregated comment distributions do not establish what users actually see; popularity-based exposure is not modeled, although videos with more comments contribute more observations.
- Reliability is uneven across roles and labels. Mean alpha of 0.59 falls below the 0.67 threshold discussed by the authors, and macro-F1 is substantially lower than micro-F1. Ambiguity includes whether a comment refers to the conflict or the video, and whether it emphasizes violence by one actor or security sought by another.
- Missing roles constrain motif interpretation: Sender, Receiver, and Opponent are absent in 44%, 38%, and 53% of comments, respectively (Table A3). Broad actor groups also suppress finer distinctions within societies.
- The study does not directly test whether comments react against video framing, whether narratives move between groups, or whether the observed distributions reduce ideological or affective polarization.

Publication year, venue, and a stable identifier for this manuscript are not provided in the supplied text. The year is left unspecified rather than inferred from cited works or access dates.

## Related Concepts

- [[concepts/narrative-polarization|Narrative Polarization]]: compares actor representations across information environments.
- [[concepts/greimas-actantial-model|Greimas' Actantial Model]]: supplies the role structure for core narratives and motifs.
- [[concepts/causal-micro-narrative-classification|Causal Micro-Narrative Classification]]: a related measurement approach centered on causal explanations rather than actantial roles.

## Related Papers

- [[papers/causal-micro-narratives|Causal Micro-Narratives]]: a methodological comparison within this library, using an expert ontology to classify causal explanations in news. It is not a cited baseline or an empirical comparison in the present manuscript.
- Elfes, "Mapping News Narratives Using LLMs and Narrative-Structured Text Embeddings" (2025), reference 44: the annotation approach's precursor as identified by the authors.
- Kligler-Vilenchik, Baden, and Yarchi, "Interpretative Polarization across Platforms" (2020), reference 36: a related account of differences in interpretive frameworks.

[[index|Library home]]
