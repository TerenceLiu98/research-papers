---
title: Strategic Ambiguity of Party Positions in Multi-Party Competition
type: paper
authors:
  - Thomas Bräuninger
  - Nathalie Giger
year: null
tags:
  - party-competition
  - strategic-ambiguity
  - text-as-data
  - political-methodology
---

## TL;DR

Party leaders can use ambiguous platforms to balance electoral appeal against support from party activists, even when both audiences are risk-averse. A stochastic multiparty model predicts more centrist platforms than core constituencies and greater ambiguity for more extreme platforms. Manifesto and survey evidence from 59 party system-elections supports these observable implications, but does not directly establish that ambiguity increases votes or that leaders intentionally choose it.

## Research Question

When can ambiguity be an equilibrium strategy in multiparty competition, and how should platform location and ambiguity vary with the competing demands of voters and party members?

## Motivation

Spatial competition usually treats parties as choosing a policy position. Leaders also choose how precisely to communicate that position, while answering to both the electorate and the party organization. Existing accounts of ambiguity largely concern two-candidate competition or voters' uncertainty; this paper models multiple parties choosing both position and ambiguity and measures the ideological dispersion of their own statements.

## Contributions

- Develops a model in which leaders maximize a combination of expected electoral vote share and the probability of retaining party office.
- Explains how different prior beliefs among voters and activists can sustain ambiguous platforms despite risk aversion.
- Uses local-equilibrium analysis and simulations to derive predictions about platform moderation and a U-shaped position-ambiguity relationship.
- Measures manifesto ambiguity through the dispersion of word-level ideological scores, distinguishing that dispersion from uncertainty about a document's mean position.

## Method

Leader $j$ chooses the mean $z_j$ and standard deviation $\sigma_j$ of a uniform platform on $[z_j-\sqrt{3}\sigma_j,z_j+\sqrt{3}\sigma_j]$. The objective is $u_j=p_{1j}+\alpha p_{2j}$, where $p_{1j}$ is expected vote share, $p_{2j}$ is the probability of retaining party office, and $\alpha>0$ weights the latter. Voters have quadratic policy loss and diffuse priors, giving systematic utility

$$
v_{ij}^{*}=-(x_i-z_j)^2-\sigma_j^2.
$$

Extreme-value utility shocks yield multinomial-logit voting probabilities $\rho_{ij}$. Electoral incentives pull the leader toward the party-specific weighted electoral mean

$$
EM_j=\frac{\sum_i\rho_{ij}(1-\rho_{ij})x_i}{\sum_i\rho_{ij}(1-\rho_{ij})}.
$$

The decisive party member has a more concentrated prior centered on their own ideal point. Updating this prior with the platform produces a uniform posterior over the overlapping intervals. Ambiguity can therefore preserve activist support while allowing the platform mean to move toward voters. Holding location fixed, ambiguity lowers electoral support in the model; its strategic value comes from balancing the two objectives and permitting a different location.

As an electoral-only benchmark, setting $\alpha=0$ removes the party-office objective. The model then yields convergence to an unambiguous platform at the mean voter position. Internal party accountability and different audience priors are therefore central to the proposed explanation of ambiguity.

Equilibrium conditions are implicit because voting probabilities depend on every party's strategy. The authors characterize local Nash equilibria and simulate 100 scenarios with 1,000 normally distributed voters, 3, 5, or 7 parties, normally distributed decisive-member positions, and ten initializations per scenario. The weaker observable predictions are that platforms are more centrist than decisive members and that platform ambiguity is U-shaped in platform location.

For measurement, a Wordscores variant uses reference manifestos around 2002 and Comparative Manifesto Project left-right scores rescaled to 1–10. With relative word frequencies $w_i$ and reference-derived word scores $\xi_i$, the manifesto position and ambiguity are

$$
\mu=\sum_iw_i\xi_i,\qquad
\sigma_\xi=\sqrt{\sum_iw_i(\xi_i-\mu)^2}.
$$

This standard deviation measures within-manifesto dispersion; it is not the standard error $\sigma_\xi/\sqrt{N}$ of the position estimate. Eurobarometer supporters' mean self-placements proxy the decisive party member. Multilevel regressions allow intercepts and slopes to vary by party system-election. The ambiguity outcome is $\log(\sigma_\xi)$, with linear and quadratic platform-position terms and controls for manifesto length, vote share, government status, niche-party status, and competitor proximity.

## Experiments

The empirical analysis is observational. The paper describes coverage of 14 Western European democracies over roughly 25 years and reports 321 party-at-election observations across 59 party system-elections.

| Analysis | Reported result |
| --- | --- |
| Platform moderation, Table 1 | Slope on the decisive-member proxy: 0.319 (SE 0.037); intercept: -0.057 (SE 0.081), after centering on each electorate's mean. |
| Ambiguity, Table 2 Model 1 | Linear position coefficient: -0.331 (SE 0.051); quadratic coefficient: 0.032 (SE 0.005); 321 observations. |
| Ambiguity, Table 2 Model 2 | Quadratic coefficient: 0.025 (SE 0.005); 319 observations. |
| Ambiguity, Table 2 Model 3 | Quadratic coefficient: 0.018 (SE 0.004); 294 observations. |
| U-shape test | The authors report rejection of the null of no U-shape over the pooled interquartile interval 4.7–5.9, with $p=0.002$. |
| Measurement simulation | Across 100 repetitions using random 1,000-word hypothetical manifestos, no repetition rejects the null of no U-shape. |

The U-shape test requires a negative slope at the lower endpoint and a positive slope at the upper endpoint of the selected interval. A positive quadratic coefficient alone would also permit a monotone convex relationship, so it is not sufficient evidence for the hypothesis.

Government parties have less ambiguous manifestos in the controlled models. Niche-party status is associated with greater ambiguity under the categorical definition, but the alternative manifesto-share measure is not significant. Group-specific patterns vary: Denmark in 1987 and 1988 shows little relationship, and Italy in 1983 shows a slightly inverted U. These exceptions limit any claim that the pooled pattern holds in every election.

## Limitations

- The weighted electoral mean is unobserved, and supporters' self-placements are only a proxy for activists. The regressions test weaker implications rather than the full mechanism or a causal electoral benefit.
- Manifestos omit silence on issues and messages delivered through other channels. Ideological dispersion in a text is distinct from individual voter uncertainty and disagreement among voters about party positions.
- Reference-text selection, left-right anchoring, and language affect measurement. Cross-country differences in absolute ambiguity remain unresolved; using similar numerical scales does not itself validate survey-text comparability.
- The model assumes one policy dimension, uniform platform and prior distributions, quadratic loss, and a common weight on party office. Local-equilibrium results and the sampled simulations do not establish unrestricted global uniqueness.
- The supplied Markdown omits publication metadata and the supplementary proofs and party list. Its prose country list omits Sweden although the results figure includes Sweden, and some equations and reported slope text are corrupted. The year is left unspecified and no DOI is inferred.

## Related Concepts

- [[concepts/strategic-ambiguity-in-party-competition|Strategic Ambiguity in Party Competition]]
- [[concepts/text-scaling-models|Text Scaling Models]]
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]

## Related Papers

- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: broader context for the text-scaling choices used to measure position and ambiguity.
- [[papers/beyond-the-median-voter-a-model-of-how-the-ideological-dimension-shapes-party-polarization|Beyond the median voter: A model of how the ideological dimension shapes party polarization]]: a complementary model of party divergence based on dimensionality and satisficing, rather than activist priors and ambiguous platforms.

[[index|Library home]]
