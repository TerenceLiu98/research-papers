---
title: Position Taking in European Parliament Speeches
type: paper
authors:
  - Sven-Oliver Proksch
  - Jonathan B. Slapin
year: null
tags:
  - text-as-data
  - european-parliament
  - political-ideology
  - legislative-speech
---

## TL;DR

Wordfish estimates from speeches in the fifth European Parliament (1999-2004) primarily reflect national parties' positions on European integration and national differences associated with redistribution. Broad left-right ideology is a weaker and less consistent predictor. Estimates correlate at least 0.86 across English, French, and German versions of the speeches, although German-language results reveal a translation-related cluster. Speaking and voting thus reveal different aspects of political conflict in this setting.

## Research Question

Does the principal dimension extracted from European Parliament speeches represent left-right ideology, European integration, or national divisions? Do the answers survive changes in translation language, level of aggregation, external ideology measures, and regression specification?

## Motivation

Recorded roll-call votes cover a selected subset of parliamentary decisions and are subject to party discipline and strategic requests for recorded voting. Speeches cover a wider agenda and preserve arguments beyond binary choices. Their availability offers another source for measuring position taking, but the resulting scale needs substantive validation: an unsupervised textual dimension cannot simply be labeled left-right ideology.

## Contributions

- Constructs a multilingual corpus of parliamentary speeches and estimates positions for national parties and individual MEPs.
- Tests three competing interpretations of the speech dimension using expert surveys, roll-call estimates, and country characteristics.
- Uses translations of the same speeches to assess language robustness while identifying a localized translation discrepancy.
- Compares party and individual analyses and checks regression results with measurement-error correction and multilevel models.

## Method

### Corpus and preprocessing

The initial corpus contains 52,988 speeches and 129 national parties from the fifteen member states represented before the 2004 enlargement (Table 1). Speeches are collected in English, French, and German and pooled by national party. The analysis excludes speeches by EP Bureau members, whose interventions are largely procedural, and retains parties with at least 10,000 words. This leaves 106 parties. Words are stemmed, and the main specification keeps words used by at least thirty parties; a sensitivity check lowers the threshold to ten.

The individual-level check uses English speeches from 427 MEPs belonging to 103 parties, again requiring at least 10,000 words per included speaker. Words must occur in the speeches of at least 10 percent of included MEPs.

### Scaling and external validation

The [[concepts/text-scaling-models|Wordfish model]] specifies

$$
y_{ij} \sim \operatorname{Poisson}(\lambda_{ij}), \qquad
\log \lambda_{ij}=\alpha_i+\psi_j+\beta_j\omega_i.
$$

Here, $\alpha_i$ adjusts for party speech volume, $\psi_j$ captures baseline word frequency, $\beta_j$ is a word discrimination parameter, and $\omega_i$ is the party position. Alternating estimation updates party and word parameters; the position scale is normalized to mean zero and standard deviation one. Its substantive interpretation is assessed after estimation. Appendix A reports 95 percent intervals from 200 bootstraps.

Regressions explain these positions using the 2002 Chapel Hill expert survey (82 parties), Benoit and Laver's expert survey (64 parties with the required measures), or party-average first and second NOMINATE dimensions (106 parties). Survey models use simulation-extrapolation (SIMEX) to account for measurement error using expert-response dispersion; NOMINATE models use OLS because the supplied voting estimates lack uncertainty measures. Country fixed effects test national differences. Further models replace these with GDP per capita, log population, and average net EU budget contributions per capita over 1999-2003. Mixed-effects models account for parties nested within countries.

## Experiments

| Check | Reported evidence | Interpretation |
| --- | --- | --- |
| Translation language | Position correlations are at least 0.86 across the three languages; English-French agreement is highest. | The broad ordering is robust across these translations. |
| Aggregation | Party means of individual estimates correlate 0.79 with positions estimated from party-pooled English text. | Aggregation preserves substantial, but incomplete, agreement. |
| Country-fixed-effects models | Integration measures are significant across all nine models in Table 3; country dummies are jointly significant at the 0.01 level in each model. | Both integration and national differences characterize the speech scale. |
| Left-right measures | First-dimension NOMINATE and Benoit-Laver left-right coefficients are not significant in Table 3; Chapel Hill left-right coefficients reach the 10 percent level in English and 5 percent in French and German. | Evidence for left-right ideology is weaker and depends on the measure; it is not uniformly absent. |
| Individual MEPs | Second-dimension NOMINATE coefficient is -0.449 (SE 0.124); first-dimension coefficient is -0.015 (SE 0.082), with 427 observations (Table 4). Country effects are jointly significant at $p<0.001$. | The integration-related voting dimension and national differences also appear at the individual level. |
| National covariates | Net contributions or GDP per capita account for national differences across specifications; population effects are less consistent (Table 5 and Appendix B). | Results are consistent with a redistribution-related national divide. |

Table 6 illustrates relative magnitudes with hypothetical parties, varying one predictor from its observed minimum to maximum and holding others at their means. In the English Chapel Hill specification, the estimated fraction of parties below the hypothetical party changes from 0.84 to 0.35 for integration and from 0.98 to 0.15 for GDP per capita, compared with 0.59 to 0.40 for left-right position. These are model-based rank comparisons, not causal effects or measures of observed party movement.

## Limitations

The findings concern a pooled parliamentary term, three languages, and a restricted set of sufficiently active speakers or parties. Party aggregation masks within-party variation, while the individual check excludes less active MEPs. Pooling all policy areas can obscure issue-specific left-right conflict. A single Wordfish axis does not establish the total [[concepts/ideological-dimensionality|dimensionality]] of parliamentary preferences.

High cross-language correlations coexist with a German-speaking-party cluster at an extreme of the German scale. The authors attribute this pattern to differences between native and translated word use, potentially involving German compounds; they do not establish a universally best language. Their Wordscores comparison also uses reference speeches selected from Wordfish extremes, so it is not an independent substantive benchmark.

Speeches remain subject to floor allocation, speaker selection, and strategic expression. Differences from voting estimates therefore do not by themselves establish which source measures underlying preferences more accurately. Survey coverage differs across regressions, and the country-level associations do not identify causal mechanisms. The narrative says population significance disappears under multilevel modeling, but Appendix B retains one coefficient significant at the 10 percent level; the supported conclusion is weak, inconsistent population evidence.

The supplied Markdown does not establish publication year or a stable paper identifier; `year` is therefore left null.

## Related Concepts

- [[concepts/text-scaling-models|Text Scaling Models]]: Poisson word-count scaling and substantive validation of its latent axis.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: the interpretation of a fitted axis depends on the behavior and agenda being measured.

## Related Papers

- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a complementary validation approach using human judgments of speeches to assess substantive ordering and uncertainty.
- Slapin and Proksch (2008), "A Scaling Model for Estimating Time-Series Party Positions from Texts": the Wordfish methodological source cited by this paper.

[[index|Library home]]
