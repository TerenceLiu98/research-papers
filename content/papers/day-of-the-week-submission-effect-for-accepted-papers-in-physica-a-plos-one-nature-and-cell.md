---
title: "Day of the week submission effect for accepted papers in Physica A, PLOS ONE, Nature and Cell"
type: paper
authors:
  - Catalin Emilian Boja
  - Claudiu Herteliu
  - Marian Dardala
  - Bogdan Vasile Ileanu
year: 2018
tags:
  - scientometrics
  - submission-timing
  - day-of-week-effects
  - panel-data
---

## TL;DR

Across 178,427 published papers from four journals, recorded submission dates occur much more often on weekdays than weekends. Only PLOS ONE shows significant departures from uniformity when the descriptive test is restricted to Monday through Friday. Regressions retain a negative weekend association with normalized submission frequency, while seasonal and geographic patterns are less stable. Because rejected and withdrawn manuscripts are absent, these findings describe submission timing among accepted papers; they do not identify acceptance probabilities or establish a best day to submit.

## Research Question

How does the submission-day distribution of accepted papers vary across journals, and how stable are its weekday patterns after accounting for season, geography, team size, country characteristics, and time?

## Motivation

Electronic publication metadata make academic work rhythms observable at a larger scale than earlier single-journal studies. Comparing journals can distinguish recurring weekday/weekend patterns from journal-specific distributions. The substantive challenge is that public metadata reveal successful submissions, whereas evaluating editorial acceptance requires information about all submitted manuscripts.

## Contributions

- Assembles submission dates and bibliographic metadata for 178,427 accepted papers in Nature, Cell, PLOS ONE, and Physica A, with corresponding-author countries added in a later collection round.
- Combines distributional tests, article-level regressions, time-window comparisons, and country-day panel models to examine [[concepts/day-of-week-effects|Day-of-Week Effects]].
- Uses [[concepts/location-quotients|Location Quotients]] to compare countries' submission timing with the pooled sample distribution.

## Method

**Sample.** The authors collected public journal metadata using a custom Java/Jsoup scraper and stored records in MySQL. They excluded items lacking reception information indicative of peer review and removed several hundred records with unclear corresponding-author countries. Table 1 reports the following publication windows and retrieval coverage relative to estimated Web of Science citable items:

| Journal | Publication window | Retrieved papers | Reported coverage |
| --- | --- | ---: | ---: |
| Nature | 2010-2016 | 4,653 | 76.4% |
| Cell | 2002-2016 | 3,777 | 68.7% |
| PLOS ONE | 2006-2016 | 160,172 | 99.9% |
| Physica A | 2001-2016 | 9,825 | 83.4% |
| Total | Journal-specific windows | 178,427 | 97.1% |

These are publication windows, not identical submission-date windows. The coverage figures use partly estimated denominators and are not evidence of random sampling.

**Outcome.** Chi-square tests compare submission-day counts with a uniform distribution over seven days and, separately, over five weekdays. The regression outcome is a transformed ratio to uniform distribution (RUD). Table 2's worked examples divide the daily count of eventually accepted submissions by one seventh of the corresponding weekly journal total. Every article in the same journal-day receives that ratio. The displayed Equations (2.1)-(2.2) in the supplied Markdown do not consistently express this construction; the worked examples provide the clearest operational description.

**Article models.** Weekday indicators use Friday as reference, with a weekend indicator adjusted for country-specific weekend conventions and changes over time. Additional covariates include seasons, continent, a December 20-January 10 holiday indicator, and log-transformed author count, Human Development Index (HDI), and long-term orientation (LTO). Outcome transformations address skewness and kurtosis. After residual diagnostics, the authors use robust least squares with bisquare M-estimation and median-centered scale estimates; robust estimation fails for PLOS ONE, for which they report OLS. Models are also fitted within five time windows spanning 2000-2016.

**Panel and spatial analyses.** The country-day panel retains 120,258 papers from 11 major contributing countries over 2,435 days, January 1, 2010-August 31, 2016, giving 26,785 cells. Random-effects EGLS models use country-day averages of log RUD and log author count, with and without article-count weighting. GIS maps compare each country's share of submissions in Tuesday-Thursday or Saturday-Monday with the corresponding pooled share, using location quotients.

## Experiments

This is an observational metadata analysis, with specification comparisons rather than randomized experiments.

### Submission-Day Distributions

Figure 2 reports the following descriptive peaks and uniformity tests:

| Journal | Largest daily share among accepted papers | Seven-day chi-square | Weekdays-only chi-square |
| --- | --- | ---: | ---: |
| Physica A | Tuesday, 17.7% | 994.3 | 7.47 |
| PLOS ONE | Wednesday, 18.5% | 25,321.55 | 162.15 |
| Nature | Tuesday, 18.4% | 648.00 | 6.85 |
| Cell | Monday and Tuesday, 18.4% each | 657.82 | 1.34 |

All seven-day tests reject uniformity at $p<0.01$. With weekends excluded, only PLOS ONE exceeds the reported 5% critical value of 9.49 with four degrees of freedom. Consequently, the largest observed weekday share is not sufficient evidence of a distinct weekday preference in the other three journals.

### Regression and Sensitivity Results

Table 6 reports negative weekend coefficients significant at 1% across the displayed journal and pooled article models. In the fullest specification, the coefficients are -0.538 pooled, -0.219 for Physica A, -0.481 for PLOS ONE, -0.187 for Nature, and -0.1431 for Cell. These are coefficients on dataset-specific transformed RUD scales, not changes in acceptance rates; their magnitudes are not directly comparable across journals.

PLOS ONE largely determines the pooled pattern because it supplies 160,172 of 178,427 records. Its Tuesday-Thursday coefficients are positive relative to Friday. Physica A and Cell show a positive Monday association, while Nature's Wednesday and Thursday coefficients are negative. These adjusted contrasts differ from ranking the raw daily shares above.

Seasonal and geographic covariates add little explanatory power, and some coefficients change sign or significance as controls enter. The holiday indicator is positive across the displayed article-level specifications. This is an association with transformed within-week submission concentration, so it should not be read directly as an increase in total holiday-period output.

In Table 7, pooled panel weekend coefficients are -0.374 without weighting and -0.860 with article-count weighting, both significant at 1%; adjusted $R^2$ is 0.499 and 0.620, respectively. PLOS ONE's corresponding coefficients are -0.357 and -0.792. HDI and LTO are insignificant in the unweighted panels but significantly negative in the weighted panels. Thus, the table does not support an unconditional claim that these country characteristics are irrelevant. The weighting changes how continuous variables enter the model, so coefficient magnitudes require care.

The country maps show relative overrepresentation in different submission intervals. They describe geographic composition within these four journals; they do not establish cultural causes of submission timing.

## Limitations

- **Selection on acceptance:** there are no rejected or withdrawn papers. The observed distribution is submission day conditional on eventual acceptance, not acceptance conditional on submission day. The introduction's claims about days being more likely to secure acceptance exceed what this sample can establish.
- **Coverage and generalization:** retrieval is incomplete and differs by journal; PLOS ONE dominates the pooled sample. The panel further restricts countries and years. Corresponding-author country does not describe every collaborator's work location.
- **Date comparability:** submission hours are unavailable, so server time zones can shift recorded weekdays. Nature explains that its published reception date can refer to a later resubmission that received a positive revise-and-resubmit decision, rather than the earliest submission.
- **Inference:** author characteristics and other possible confounders are unavailable. Article-level records share the same RUD within journal-days; the supplied description does not establish that inference accounts for this dependence. Robust estimation also fails for the largest journal sample.
- **Source and reproducibility limits:** the supplied text has inconsistent RUD notation and describes Cell collection as beginning in 2003 despite Table 1 listing 2002. Its panel equations leave zero-paper cells' treatment unclear. Referenced supplementary datasets, scripts, and detailed time-window tables are not included in the supplied Markdown. No stable identifier for this paper is present; author names here are transliterated from the damaged extracted byline.

## Related Concepts

- [[concepts/day-of-week-effects|Day-of-Week Effects]]: calendar associations depend on the outcome, reference category, and population observed.
- [[concepts/location-quotients|Location Quotients]]: compare local submission-time composition with a pooled benchmark.

## Related Papers

The following works are cited in the supplied manuscript; matching pages were not found in the library:

- Ausloos, Nedic, and Dekanski (2016), "Day of the week effect in paper submission/acceptance/rejection to/in/by peer review journals." Includes rejected and withdrawn submissions, providing a different evidence base for studying acceptance.
- Hartley and Cabanac (2017), "What can new technology tell us about the reviewing process for journal submissions in BJET?" Another comparison using submission outcomes beyond accepted papers.
- Cabanac and Hartley (2013), "Issues of work-life balance among JASIST authors and editors." Motivates the analysis of academic work rhythms through journal metadata.

Library comparison, not a citation made by this 2018 paper: [[papers/impacts-of-pm2-5-air-pollution-on-high-skilled-worker-productivity-in-china|Impacts of PM2.5 air pollution on high-skilled worker productivity in China]] also uses publication records to study research activity, but targets productivity with an instrumental-variable design. The comparison highlights the distinction between publication-based descriptive patterns and a separately specified causal estimand.

[[index|Library home]]
