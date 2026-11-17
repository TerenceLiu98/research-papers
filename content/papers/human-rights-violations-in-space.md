---
title: "Human Rights Violations in Space: Assessing the External Validity of Machine-Geocoded versus Human-Geocoded Data"
type: paper
authors:
  - Logan Stundal
  - Benjamin E. Bagozzi
  - John R. Freeman
  - Jennifer S. Holmes
year: 2023
doi: "10.1017/pan.2021.40"
tags:
  - political-methodology
  - event-data
  - spatial-validation
---

## TL;DR

For FARC violence against civilians in Colombia during 2002–2009, machine-geocoded ICEWS and human-geocoded GED yield broadly comparable external predictive validity against independently collected CINEP records. Their spatial errors nevertheless differ. Agreement tables and spatial probit models reveal complementary aspects of validity; comparable predictions do not establish equivalent event-level geolocation accuracy.

## Research Question

Do machine- and human-geocoded political event datasets recover independently documented violence with comparable accuracy, and do their prediction errors exhibit different spatial patterns?

## Motivation

Agreement between humans and machines reading the same news cannot establish whether the news captures what happened. Missing coverage, ambiguous locations, and journalistic remoteness can affect both coding approaches. Aggregate agreement also conceals geographically clustered errors relevant to subnational conflict research.

## Contributions

- Combines independent-source agreement assessments with geostatistical models of event occurrence and underreporting.
- Compares ICEWS and GED against CINEP across 1,116 Colombian municipalities, the full 2002–2009 period, and conflict subperiods.
- Uses spatial error ranges and latent-field uncertainty to distinguish datasets whose predictive performance is otherwise similar.

## Method

The outcome is whether a municipality records at least one FARC-perpetrated human rights violation against civilians in the relevant period. CINEP supplies the external reference, drawing on local and national Spanish-language reporting, victim testimony, NGO records, and government sources. The study first constructs confusion matrices, then examines five journalistically remote and five proximate municipalities with substantial CINEP-recorded violence.

Separate Bayesian spatial probit models are fitted to CINEP, ICEWS, and GED. Predictors include logged distance from Bogotá, municipality population, and terrain ruggedness. A continuous Gaussian spatial field with Matérn covariance is approximated by a Gaussian Markov random field through a stochastic partial differential equation and estimated using integrated nested Laplace approximation. Municipal centroids initialize a triangulation with 196 vertices. Models estimate spatial dependence ranges and marginal variances as well as covariate effects. Additional models examine failures to record CINEP-reported events. Predictions from ICEWS- and GED-based models are assessed against CINEP using ROC curves.

## Experiments

Table 1 reports the following full-period municipality-level comparisons:

| Measure | ICEWS | GED |
| --- | ---: | ---: |
| Overall agreement | 73.4% | 78.5% |
| Agreement confidence interval | 70.7–76.0% | 76.0–80.9% |
| Cohen's kappa | 0.20 | 0.36 |
| CINEP-positive municipalities detected | 83 | 113 |
| CINEP-positive municipalities missed | 205 | 175 |
| CINEP-negative municipalities coded positive | 92 | 65 |

The table contains 288 CINEP-positive and 828 CINEP-negative municipalities. Its reported “precision accuracy” is overall agreement, not positive predictive value. Both datasets miss many positive municipalities despite relatively high overall agreement.

For 2002–2009, population and ruggedness positively predict recorded violence in all three spatial models, although the ICEWS ruggedness interval nearly reaches zero. Distance from Bogotá does not reliably predict occurrence. Population and ruggedness also explain underreporting in both datasets. GED's predictive AUC is slightly higher, but the full-period AUC confidence intervals overlap. ICEWS spatial-range and marginal-variance median estimates are closer to CINEP's in the main full-period models.

The main text also analyzes 2002–2004 and 2005–2007; 2008–2009 results are assigned to the supplement. Selected remote/proximate comparisons do not show a consistent machine-coding disadvantage. Subperiod models retain broadly similar prediction performance while revealing differences in terrain effects and spatial dependence. The authors interpret broader ICEWS source coverage as potentially offsetting noisier geolocation; supplemental spatial diagnostics also favor GED in some respects. This interpretation is distinct from the full-period binary table, where GED detects more CINEP-positive municipalities.

## Limitations

- Evidence concerns one actor, country, period, and pair of datasets; it does not establish equivalence for automated geocoding generally.
- Binary municipality-period outcomes collapse event frequencies and temporal dynamics, and municipality aggregation cannot establish exact-coordinate accuracy.
- CINEP is justified as a richer independent reference rather than demonstrated to be error-free.
- Different source coverage and coding pipelines prevent isolation of a pure human-versus-machine geolocation effect.
- The selected remote/proximate comparison covers only ten high-violence municipalities. Full spatiotemporal modeling and finer time windows remain future work.
- The supplied Markdown includes the main article but not the supplementary analyses; supplemental findings above are attributed to the authors' main-text discussion.

## Related Concepts

- [[concepts/external-validation-of-political-event-data|External Validation of Political Event Data]]: separates independent event recovery from agreement on shared texts.
- [[concepts/socio-political-event-extraction|Socio-Political Event Extraction]]: geolocation and source coverage jointly determine the usefulness of extracted records.

## Related Papers

- [[papers/abstractive-event-analysis-of-armed-conflicts-introducing-the-ucdp-aec-dataset|Abstractive Event Analysis of Armed Conflicts: Introducing the UCDP-AEC Dataset]]: evaluates extraction against expert GED records, a different validation target from independent event recovery.
- Bagozzi et al. (2019), “The Prevalence and Severity of Underreporting Bias in Machine and Human Coded Data”: prior comparison of underreporting that this paper extends spatially.
- Hammond and Weidmann (2014), “Using Machine Coded Event Data for the Micro Level Study of Political Violence”: earlier evidence of spatial shortcomings in GDELT, motivating evaluation of other datasets and models.

Published in *Political Analysis* 31:81–97 (2023); first published online 15 December 2021. Replication data: DOI 10.7910/DVN/JYVGLU.
