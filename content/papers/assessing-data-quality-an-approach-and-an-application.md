---
title: "Assessing Data Quality: An Approach and An Application"
type: paper
authors:
  - Kelly McMann
  - Daniel Pemstein
  - Brigitte Seim
  - Jan Teorell
  - Stafan Lindberg
year: 2022
doi: 10.1017/pan.2021.27
source_job_id: fcf302cd-2eb6-4410-ab36-35da93426f1c
tags:
  - measurement
  - data-quality
  - corruption
---

## TL;DR

Data consumers should assess content validity, the data generation process, and convergent validity together, then adapt substantive research to the resulting strengths and weaknesses. Applied to V-Dem corruption measures, this framework supports their use for material corruption among public officials and historical comparisons while identifying conceptual omissions and contexts with greater measurement uncertainty.

Published in *Political Analysis* 30 (2022), 426–449; online September 15, 2021. [Article](https://doi.org/10.1017/pan.2021.27). The supplied author line spells Lindberg's first name “Stafan,” retained here.

## Research Question

How can researchers assess existing measures systematically and use that assessment to guide substantive analysis, rather than merely accepting or rejecting a dataset?

## Motivation

Existing guidance often targets data producers, isolates individual validation tools, or treats validation as a pass/fail exercise. Consumers instead need to understand which theoretical constructs, cases, and comparisons an imperfect measure can support.

## Contributions

- Integrates qualitative and quantitative tools into a three-component [[concepts/data-quality-assessment|Data Quality Assessment]] framework.
- Develops an audit of data generation and models respondent disagreement and potential contextual biases.
- Combines cross-measure divergence regressions with blind qualitative case studies.
- Demonstrates how validation findings can change research scope and interpretation.

## Method

Content assessment maps indicators onto the intended construct and uses factor analysis as complementary evidence. Process assessment examines management, sources, respondent selection and coding, aggregation, and coverage. Convergence assessment compares alternative measures, models their discrepancies, and checks independently written case narratives against quantitative trajectories.

The application uses six V-Dem indicators: executive and public-sector bribery and embezzlement, legislative corruption, and judicial corruption. The dataset described covers nearly all countries from 1900–2012. V-Dem uses [[concepts/item-response-theory|Item Response Theory]] to account for respondent reliability and differing ordinal scale use; bridge respondents, lateral coding, and anchoring vignettes support calibration. Executive and public-sector subindices are formed separately, then averaged with legislative and judicial indicators to give the four governmental spheres equal weight.

## Experiments

These are observational validation analyses, not randomized experiments.

| Assessment | Reported evidence |
| --- | --- |
| Factor structure | Single-factor loadings range from 0.693 for legislative corruption to 0.848 for public-sector embezzlement. A two-factor model explains less than 2% additional variance. |
| Respondent disagreement | Pooled regression covers 69,939 observations in 173 countries. Freedom of expression has coefficient −0.039 (country-clustered SE 0.009); disagreement is greater at low corruption levels. The pooled historical-time coefficient is insignificant. |
| Situational closeness | Tested interactions between respondent ideological preferences and corresponding country characteristics are not statistically significant; this does not establish absence of all bias. |
| Aggregate convergence | Pooled correlations with WGI and CPI are around 0.90, with comparisons also examined year by year. |
| Divergence from WGI | Table 5 reports positive association with the female respondent share, 0.052 (SE 0.025), and negative association with the PhD share, −0.084 (SE 0.023). These are discrepancy predictors, not evidence that either group is less accurate. |

Blind case studies examine Georgia and Zambia for divergence from other indices and historical Spain and the United States for temporal coverage. The main text presents Zambia and the United States; the other cases are reported in the supplement. Broad trajectories align with case accounts, though small Zambian dips in the late 1990s and 2011 lack corresponding narrative support.

## Limitations

- V-Dem is better aligned with material corruption among public officials than with vote buying, nepotism, or revolving-door practices; its suitability depends on the research construct.
- Shared experts can create correlated errors across indicators, weakening factor-analytic evidence. The authors discourage predicting one V-Dem corruption indicator with another.
- Alternative indices are not ground truth: convergence can reflect shared errors, and divergence does not identify which measure is correct.
- Low freedom of expression and low corruption are associated with greater disagreement and uncertainty, potentially weakening substantive inference in those settings.
- Process audits depend on producer transparency; detailed respondent diagnostics require metadata that may be unavailable.
- The supplied Markdown omits footnote bodies and the supplementary appendix. Its introduction is inconsistent about the education direction in divergence; Table 5 and the discussion agree that higher PhD shares predict less divergence, as reported above.

## Related Concepts

- [[concepts/data-quality-assessment|Data Quality Assessment]]: connects validation evidence to research design and interpretation.
- [[concepts/item-response-theory|Item Response Theory]]: calibrates expert ratings while representing differences in reliability and scale use.

## Related Papers

- Adcock and Collier (2001), “Measurement Validity: A Shared Standard for Qualitative and Quantitative Research”: conceptual validation framework discussed by the authors.
- Marquardt and Pemstein (2018), “IRT Models for Expert-Coded Panel Data”: related measurement modeling cited in the paper.
- [[papers/bridging-the-grade-gap-reducing-assessment-bias-in-a-multi-grader-class|Bridging the Grade Gap]]: a related application of overlapping ratings to scale calibration, using student assignments rather than country-year expert judgments.
