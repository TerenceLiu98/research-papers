---
title: Achieving Statistical Significance with Control Variables and Without Transparency
type: paper
authors:
  - Gabriel S. Lenz
  - Alexander Sahn
year: 2020
doi: "10.1017/pan.2020.31"
journal: Political Analysis
tags:
  - research-transparency
  - regression
  - metascience
---

## TL;DR

Reanalyzing 49 observational AJPS studies, Lenz and Sahn estimate conservatively that about 30% rely on undisclosed control-induced increases in effect estimates for statistical significance. Their recommendation is to disclose a bivariate or design-required minimal specification and explain consequential changes after adjustment. Suppression alone establishes neither bias nor a false positive.

## Research Question

How frequently do published findings depend on suppression effects, and do authors provide enough information for readers to recognize and evaluate that dependence?

## Motivation

Control variables can increase the magnitude of a focal coefficient as well as reduce its standard error. When significance depends on the former, readers need a substantive explanation of the adjustment. Reporting only selected multivariate specifications can conceal this sensitivity and leave discretion over controls difficult to assess.

## Contributions

- Audits suppression and disclosure using reproduced estimates from a leading political science journal.
- Separates changes in statistical significance associated with coefficient changes from those associated with standard-error changes.
- Compares observational and randomized studies and examines variation across combinations of controls.
- Proposes minimal-model disclosure as a practical diagnostic for review.

## Method

Following a preanalysis plan, the authors select AJPS articles from 2013–2015 that primarily advance one causal claim and use a standard statistical model with at least one control. Of 163 articles, 64 qualify: 49 observational and 15 experimental. The full models average nine controls. The authors reproduce the main estimates, with a handful of standard-error discrepancies.

For each focal explanatory variable, they compare the full model with a bivariate or minimal model. The latter retains covariates required by the design or identification strategy, including interaction main effects, lagged outcomes, or fixed effects; about half of the studies require such terms. Disclosure includes bivariate information in tables, plots, cross-tabs, differences in means, text, or notes.

Their broad definition of [[concepts/suppression-effects-in-regression|Suppression Effects in Regression]] covers control-induced coefficient increases and sign reversals. Figures 2–4 distinguish coefficient and standard-error contributions to p-value changes. Figure 7 explores all control combinations, sampling when there are more than 10,000 possibilities and excluding two studies for computational cost.

## Experiments

This is a replication and reanalysis audit, not an experiment on researcher behavior.

| Evidence | Reported result |
| --- | --- |
| Suppression moving p-values toward 0.05 | About 20 of 49 observational studies; only one discloses its presence |
| Undisclosed dependence | Conservative estimate 15/49, about 30%; broader potentially publication-relevant count 19/49, about 40% |
| Among studies without bivariate disclosure | 19/34, about 55%, under the broader count |
| Mean p-value change after controls | Decrease of 0.33 without disclosure versus increase of 0.001 with disclosure; rank-sum p = 0.0009 |
| Coefficient-change component | Mean decrease of 0.29 in nondisclosing studies; between-group rank-sum p = 0.0027 |
| Experimental comparison | Little sign of control-driven p-value decreases; median sample size 868, minimum 156 |

The broader count includes studies that do not reach p < 0.05 in the full specification and should not be interpreted as 19 demonstrated threshold crossings. The direction of the nondisclosure pattern persists across years, subfields, fixed-effect choices, minimal-model covariate requirements, control counts, and exclusion of sign reversals. Control-combination distributions often span significance thresholds and sometimes opposite signs. These results are reported in Sections 2–4 and Figures 2–7.

## Limitations

The sample is restricted to qualifying studies in one journal over three years. The analysis does not establish which suppression effects are unjustified, which findings are false positives, or whether authors deliberately selected favorable models. Publication consequences are inferred as possibilities rather than observed counterfactual decisions. Bivariate estimates are diagnostic comparisons, not inherently less biased causal estimates. The broad suppression definition pools different mechanisms; the audit does not identify those mechanisms systematically. Exploring controls already selected by authors captures only part of possible modeling discretion.

## Related Concepts

- [[concepts/suppression-effects-in-regression|Suppression Effects in Regression]] — central coefficient-change phenomenon.
- [[concepts/publication-bias|Publication Bias]] — significance incentives motivate the concern, but publication selection itself is not identified by the audit.
- [[concepts/endogenous-research-design|Endogenous Research Design]] — control selection can depend on researcher decisions and observed results.

## Related Papers

- [[papers/ideological-bias-in-the-production-of-research-findings|Ideological bias in the production of research findings]] — complementary evidence on associations between researcher characteristics, specification choices, and estimates; it does not establish the motives of authors in this audit.
- Middleton et al. (2016), “Bias Amplification and Bias Unmasking” — cited for mechanisms through which adjustment can expose or amplify bias.
- Simonsohn, Simmons, and Nelson (2020), “Specification Curve: Descriptive and Inferential Statistics on All Reasonable Specifications” — cited as a broader approach to specification transparency.

Source: [article](https://doi.org/10.1017/pan.2020.31), published online 16 November 2020; supplied text identifies volume 29, pages 356–369. [Replication materials](https://doi.org/10.7910/DVN/XIEJCR). Year above follows the supplied online publication date.
