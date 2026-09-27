---
title: "A data-driven network approach for characterization of political parties' ideology dynamics"
type: paper
authors:
  - Josemar Faustino
  - Hugo Barbosa
  - Eraldo Ribeiro
  - Ronaldo Menezes
year: 2019
date: "2019-07-16"
source_job_id: "c4977505-a9ef-4e95-abfb-941246ab5c16"
tags:
  - political-ideology
  - party-switching
  - social-network-analysis
  - brazil
---

## TL;DR

The paper estimates Brazilian parties' ideological trajectories by combining candidate affiliation switches with survey-initialized ideology distributions. More than two million candidacies from 1998-2018 yield 392,457 switches and ten election-year networks. Detected communities show 60.0-80.8% agreement with a reference left-center-right classification, and observed switches span shorter modeled ideological distances than randomized switches. These findings support ideological locality in party exchanges, but do not establish independent measurement accuracy or a causal effect of switching on ideology.

## Research Question

Can affiliation changes among electoral candidates support party-level ideology estimates over time, including for small and new parties with little roll-call evidence?

## Motivation

Legislative voting records cover elected representatives and can be sparse for small or newly formed parties. Electoral candidacy records also include unsuccessful candidates, providing a broader record of movement between political groups. The paper uses these exchanges as evidence about ideological affinity and as inputs to a model of changing party composition.

## Contributions

- Constructs directed, weighted [[concepts/party-switching-networks|Party-Switching Networks]] for Brazilian elections from 2000 through 2018, using 1998 candidacies as the initial observation period.
- Compares network communities with an existing categorical classification of party ideology.
- Develops a probabilistic membership-transfer model that updates party ideology distributions across election cycles.
- Examines party trajectories and compares ideological distances in observed networks with those in randomized counterparts.

## Method

### Networks and Community Structure

A node represents a party. An edge from party $i$ to party $j$ in election year $y$ has weight $w_{ij}^{y}$ equal to the number of candidates observed switching from $i$ to $j$. Remaining with a party contributes no switch. When a candidate skips an election, a changed affiliation is recorded when that candidate next appears, so the edge year need not identify the actual switching date.

The authors use a stochastic block model supporting directed, weighted networks to identify communities. Each community receives its predominant left, center, or right label from Miguel and Machado (2007). Table 3 defines matching as the proportion of parties whose reference label agrees with their community's predominant label. This assesses categorical community alignment, not the accuracy of continuous ideology estimates.

### Updating Ideology

Each party has a normal ideology distribution with mean $\mu_i$ and standard deviation $\sigma_i$ on a left-right scale whose endpoints are 1 and 10. Initial means and dispersions come from elite-survey estimates reported by Power and Zucco Jr (2009); Figure 5 identifies the starting positions with 1998. The model therefore uses external ideological anchors.

For each observed transfer, the model samples members from the origin party and moves them to the destination. A Beta-based sampling rule favors the side of the origin distribution nearer the destination's mean, with parameters determined by the parties' ideological separation. The party distributions are recomputed, and member-pool sizes are adjusted each cycle to match numbers of running candidates. The resulting change depends on transfer volume, ideological separation, and party size. A large stable candidate pool dampens the influence of incoming and departing members.

The key assumption is that ideological affinity dominates aggregate switching patterns, with other motives averaging out. Individual candidates' ideologies are simulated within this mechanism rather than independently observed.

### Randomized Comparison

For each recorded switch, the described randomization retains the origin and samples a destination with replacement from active parties. Parallel edges become weights, and the resulting networks are passed through the ideology model. Although the paper calls this a degree-preserving configuration model, this description preserves outgoing switch totals and does not establish preservation of incoming strengths or the full degree sequence.

## Experiments

### Data and Community Agreement

The source is Brazilian electoral data covering legislative and executive candidacies from 1998-2018. Table 1 reports networks with 29-38 parties and 438-1,100 directed edges. The switch counts sum to the reported total of 392,457. Selected years illustrate the scale and Table 3's community results:

| Election year | Parties | Switches | Communities | Reported matching |
| --- | ---: | ---: | ---: | ---: |
| 2000 | 29 | 1,512 | 7 | 69.5% |
| 2002 | 30 | 3,146 | 6 | 80.8% |
| 2012 | 34 | 89,344 | 6 | 63.4% |
| 2016 | 38 | 117,667 | 7 | 73.2% |
| 2018 | 38 | 7,850 | 7 | 60.0% |

Across all ten networks, matching ranges from 60.0% to 80.8% and does not improve monotonically as more switching history becomes available.

### Trajectories and Structural Checks

The model places PSOL near PT, from which many founding members originated. The authors relate this placement to later roll-call evidence identifying PSOL as left-wing. They also describe a rightward movement of PSB followed by a return toward the left, interpreting these shifts alongside Brazilian political developments. These are retrospective case comparisons; the paper does not report a held-out prediction benchmark or a numerical error measure against longitudinal external scores.

Figure 6 shows shorter modeled ideological distances for empirical switches than for randomized ones. This is consistent with ideological locality, also suggested by community alignment. No numerical effect sizes or formal test statistics for this comparison are supplied in the text.

## Limitations

- The method targets party-level trajectories and is explicitly unsuitable for estimating individual ideal points. Coverage still depends on observed affiliation histories and suitable initialization.
- Strategic, electoral, and organizational motives may also generate switching. The claim that these motives average out is an assumption, not an identified result.
- Survey anchors, normal within-party distributions, one ideological dimension, and the Beta sampling rule constrain the estimated trajectories. The supplied text does not report sensitivity analyses for these choices.
- Structural agreement is weaker evidence than independent validation of continuous positions. Distances are computed from a model already built around ideological affinity, while categorical community agreement uses a coarse external classification.
- The randomization description and its degree-preservation claim differ. This limits interpretation of precisely which structural features are controlled in the comparison.
- The supplied Markdown omits Additional file 1, including initialization values, and contains damaged mathematical text around the sampling rule. The exact parameter mapping cannot be safely reconstructed from this source alone. The authors state that intermediate files and code are available on request.

The supplied source gives the publication date but does not identify the article's own DOI; no DOI is inferred from its references.

## Related Concepts

- [[concepts/party-switching-networks|Party-Switching Networks]]: temporal affiliation exchanges as evidence about relationships between parties.
- [[concepts/social-network-analysis|Social Network Analysis]]: directed weighted graphs, communities, and randomized structural comparisons.
- [[concepts/dynamic-ideal-point-models|Dynamic Ideal Point Models]]: a related measurement problem, typically connecting latent trajectories to repeated observed responses.
- [[concepts/text-scaling-models|Text Scaling Models]]: alternative evidence for party positions from political documents.

## Related Papers

- Power and Zucco Jr (2009), "Estimating Ideology of Brazilian Legislative Parties, 1990-2005: A Research Communication": cited source of ideological initialization.
- Desposato (2006), "Parties for rent? ambition, ideology, and party switching in Brazil's chamber of deputies": cited substantive background on switching motives.
- [[papers/generalized-ideal-point-models-for-noisy-dynamic-measures-in-the-social-sciences|Generalized Ideal Point Models for Noisy Dynamic Measures in the Social Sciences]]: a later library comparison on temporal assumptions and sparse political measurements, not a citation in this 2019 paper.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: a later library comparison on measuring and validating positions using textual evidence.

[[index|Library home]]
