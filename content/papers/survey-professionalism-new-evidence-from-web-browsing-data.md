---
title: "Survey Professionalism: New Evidence from Web Browsing Data"
type: paper
authors:
  - Bernhard Clemm von Hohenberg
  - Tiago Ventura
  - Jonathan Nagler
  - Ericka Menchen-Trevino
  - Magdalena Wojcieszak
year: 2025
doi: "10.1017/pan.2025.10018"
tags:
  - survey-methodology
  - digital-trace-data
  - data-quality
---

## TL;DR

Browsing records from 3,886 U.S. respondents show substantial, vendor-dependent survey professionalism. Professionals respond faster and attempt repeated questionnaire participation more often, but show no consistent increase in response instability or consistent demographic and political differences across samples. Prevalence estimates depend on assumptions about who donates browsing data.

## Research Question

How prevalent is intensive survey taking, and how does it relate to respondent composition, response quality, and attempts to take the same questionnaire repeatedly?

## Motivation

Payment encourages frequent survey participation, while interconnected panel providers obscure respondents’ recruitment histories. Self-reports may understate participation. Behavioral records provide an alternative that captures activity across providers.

## Contributions

- Measures survey participation through host-level browsing activity, including recruitment and reward collection.
- Compares three recruitment settings and evaluates donor-selection sensitivity.
- Separates speeding, straightlining, response instability, and repeated participation rather than treating professionalism as synonymous with poor quality.

## Method

Facebook recruitment in 2018 supplies 707 donors and 16.4 million visits; Lucid recruitment in 2019 supplies 2,222 donors and 73.8 million visits; YouGov recruitment in 2018 supplies 957 donors and 6.4 million visits. Facebook and Lucid retrospectively collect desktop histories for up to 90 days per wave; YouGov tracks desktop and mobile browsing over two months. Respondents with fewer than seven days of browsing are excluded.

Survey hosts are identified using a questionnaire-software list, the word “survey” in host names, and manual coding of each sample’s 500 most frequent hosts. Duration is the interval until the next visit; intervals exceeding five minutes are treated as missing. The primary professionalism threshold is more than 100 survey-site visits per active day, not 100 completed questionnaires. Alternatives use more than half of visits, more than half of browsing time, or any of these criteria.

Raking targets combined donors and non-donors using available demographics, plus ideology and partisanship for Lucid and YouGov. Generalization assumes equal professionalism among donors and non-donors conditional on weighting variables. Sensitivity analyses relax this assumption.

Response quality is assessed through completion time, straightlining on mixed-direction batteries, and Bayesian heteroscedastic models of wave-two responses conditional on wave-one responses. Repeated participation is inferred from nonconsecutive visits to the same identifiable questionnaire URL at least one hour apart across eleven platforms. These are attempts, not verified repeat completions.

## Experiments

The main evidence is observational, with supplementary treatment-effect comparisons reported for Lucid.

| Weighted measure | Facebook | Lucid | YouGov |
| --- | --- | --- | --- |
| Aggregate share of visits to survey sites | 10.2% | 54.6% | 23.9% |
| Aggregate share of browsing time on survey sites | 8.7% | 43.0% | 18.2% |
| Lowest professionalism estimate across definitions | 1.7% | 34.7% | 7.6% |
| Respondents with at least one repeated questionnaire attempt | 26.7% | 71.5% | 15.3% |

Professional respondents have shorter median completion times by 13.4%, 6.9%, and 18.7% in Facebook, Lucid, and YouGov respectively. Straightlining differences reach conventional significance only in YouGov under the main classification and are not robust to alternative classifications. Across-wave response instability shows no consistent increase. Demographic and political differences depend on sample and threshold; the authors also report no professionalism-related differences in two Lucid treatment effects.

Repeated-attempt prevalence remains 22.5%, 68.2%, and 13.1% with a 24-hour threshold. Table 4 uses the browsing-time definition of professionalism, unlike the main response-quality comparisons.

## Limitations

Donation is selective, and weighting cannot establish conditional comparability. YouGov’s comparison sample comes from its main panel rather than observed refusals to donate. Vendor comparisons also mix recruitment, collection mode, and observation periods; they do not identify causal vendor effects or describe current panel quality.

Visits include recruitment and rewards, and duration is inferred rather than directly observed attention. Repeated URLs cannot prove completion or intent; YouGov’s own closed questionnaire platform is excluded from questionnaire identification. Stable answers do not establish truthfulness or universal inferential validity.

The supplied text contains inconsistent sensitivity bounds: the introduction gives Facebook/YouGov/Lucid lower bounds of 1.1%/4.8%/19.8%, whereas Section 4.1 gives 1.1%/4.6%/20.3%. These should not be collapsed into one definitive estimate. Supplementary analyses are summarized in the article, but the supplement itself is not included.

## Related Concepts

- [[concepts/survey-professionalism|Survey Professionalism]]: intensity of survey activity is distinct from response quality.
- [[concepts/data-donation|Data Donation]]: behavioral measurement introduces participation-selection assumptions.
- [[concepts/survey-response-time-and-attentiveness|Survey Response Time and Attentiveness]]: faster responding requires complementary quality checks.

## Related Papers

- [[papers/racing-the-clock-using-response-time-as-a-proxy-for-attentiveness-on-self-administered-surveys|Racing the Clock]]: a complementary approach using question-level timing patterns to distinguish attention profiles.
- Zhang et al. (2020), “Professional Respondents in Opt-in Online Panels: What Do We Really Know?”: self-report-based predecessor discussed by the authors.

[Article](https://doi.org/10.1017/pan.2025.10018). [Replication archive](https://doi.org/10.7910/DVN/PY8COU).
