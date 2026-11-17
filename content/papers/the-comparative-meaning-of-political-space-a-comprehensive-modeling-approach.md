---
title: "The comparative meaning of political space: a comprehensive modeling approach"
type: paper
authors:
  - Garret Binding
  - Jelle Koedam
  - Marco R. Steenbergen
year: 2023
doi: 10.1017/psrm.2023.16
source_job_id: b26a34b9-dc2c-444f-b17d-4c769b03b61e
tags:
  - political-measurement
  - bayesian-measurement
  - item-response-theory
---

## TL;DR

A hierarchical Bayesian model separates country-specific issue–ideology relationships and party-specific issue deviations from expert noise and national response-scale differences. Applied to the 2019 Chapel Hill Expert Survey, it finds relatively stable economic ideological meanings across Western Europe, more heterogeneous cultural meanings, and especially variable mappings of European integration issues.

First published online May 18, 2023. [Paper](https://doi.org/10.1017/psrm.2023.16); [replication materials](https://doi.org/10.7910/DVN/98ZAOG).

## Research Question

How can comparative party scaling distinguish measurement-related differential item functioning from substantive differences in what ideology means across countries and how parties position themselves on particular issues?

## Motivation

Treating every departure from measurement invariance as an artifact can obscure meaningful political variation. The same ideological position may imply different issue positions across countries, while parties may depart from their general ideology on issues central to their identity. Aggregating expert ratings also conceals variation in observer precision.

## Contributions

- Combines four sources of variation: expert error, national response styles, country-specific ideological discrimination, and party–issue idiosyncrasy.
- Extends random-effects IRT with country-varying discrimination and thresholds, alongside scale and shift adjustments related to Aldrich–McKelvey scaling.
- Uses these components to describe differences in issue politicization and deviations from a common two-dimensional party space.

## Method

For party $i$, issue $j$, country $c$, and expert $e$, the latent predictor is

$$
y^*_{ijce}=\frac{(\theta_{ic}^{\top}\beta_{jc}+\gamma_{ij})\zeta_c}{\sigma_e}.
$$

The ideological coordinates $\theta_{ic}$ interact with country-specific discrimination vectors $\beta_{jc}$, decomposed into common means and country–issue deviations. The additive $\gamma_{ij}$ represents party–issue preferences unexplained by ideology. Country stretch $\zeta_c$ and expert error scale $\sigma_e$ capture measurement variation. An ordered probit model connects this predictor to ratings through issue cutpoints with country and country–issue shifts (Section 3).

Bayesian estimation in Stan uses normal latent-position and item-parameter priors, hierarchical covariance structures for item deviations, and positive scale parameters. Identification standardizes ideological positions, centers idiosyncratic and item random effects, and sets expert and country scales to mean one. Economic intervention has zero cultural loading; immigration policy has zero economic loading. Starting party positions use prior knowledge. The reported convergence diagnostic is $\hat R<1.1$ for all parameters.

## Experiments

The application covers **15 Western-European countries, 21 issues, 129 parties, and 191 experts** in CHES 2019. Items comprise five economic, ten social/cultural, and six EU issues. Multiple expert observations per party–issue support separating idiosyncrasy from ideology and estimating expert error.

- Estimated coordinates correlate with standardized mean expert placements at **0.93 for economic left–right** and **0.90 for GAL–TAN** (Figure 1). These are face-validity checks against the same survey context.
- Economic intervention, deregulation, redistribution, and spending versus tax cuts show little cross-national discrimination variation. Cultural heterogeneity is more pronounced for religion, urban–rural emphasis, and regional status (Figure 2).
- EU issues show the greatest cross-national variation. The authors describe EU conflict as primarily cultural in the United Kingdom and primarily economic in Greece, referring to supplementary country estimates.
- The largest party-specific shocks concern religion, urban–rural emphasis, regional policy, environment, and social lifestyle (Figure 3). Supplementary analyses associate these with confessional, agrarian, regionalist, and green party profiles.
- The authors report that idiosyncratic preferences deliver the largest single-component performance gain over conventional IRT in supplementary model comparisons; numerical comparison scores are not supplied in the available text.

## Limitations

Comparisons impose a common dimensionality and substantive zero-loading restrictions. Different dimensional structures across countries are another possible source of DIF and are not estimated jointly here. The full model requires repeated observations across countries, parties, raters, and issues; simpler data require restricted models. Evidence comes from one survey wave in Western Europe, and suggested extensions to voter or text-based placements are not demonstrated applications. Supplementary estimates and model comparisons are referenced but not included in the supplied Markdown. Party-specific shocks describe departures from ideology; they do not by themselves identify strategic entrepreneurship as their cause.

## Related Concepts

- [[concepts/differential-item-functioning|Differential Item Functioning]]: separates substantive heterogeneity from response-scale artifacts.
- [[concepts/item-response-theory|Item Response Theory]]: supplies the multidimensional ordinal measurement framework.
- [[concepts/aldrich-mckelvey-scaling|Aldrich-McKelvey Scaling]]: provides the related shift-and-stretch treatment of scale use.

## Related Papers

- [[papers/estimating-individuals-political-perceptions-while-adjusting-for-differential-item-functioning|Estimating Individuals’ Political Perceptions While Adjusting for Differential Item Functioning]]: a related library treatment separating substantive perceptions from response-scale differences using vignette anchors, rather than country-varying item relationships.
- Hare et al. (2015), “Using Bayesian Aldrich-McKelvey Scaling to Study Citizens’ Ideological Preferences and Perceptions”: cited scaling predecessor.
- Lauderdale, Hanretty, and Vivyan (2018), “Decomposing Public Opinion Variation into Ideology, Idiosyncrasy, and Instability”: cited motivation for idiosyncratic preference components.
