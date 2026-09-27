---
title: "Dynamics and determinants of right-wing populist mobilisation in Germany"
type: paper
authors:
  - Sebastian Hellmeier
  - Johannes Vüllers
year: 2023
doi: "10.1080/01402382.2022.2135909"
journal: "West European Politics"
volume: 46
issue: 5
pages: "1024-1037"
tags:
  - right-wing-populism
  - protest-event-analysis
  - political-mobilisation
  - germany
---

## TL;DR

A media-based dataset records 373 Pegida protest events in 30 German cities during 2014-2017, with cumulative reported attendance exceeding 337,000. An exploratory analysis of 327 city-year observations associates higher protest counts with larger populations, higher income tax per capita, lower foreign-born population shares, and higher prior AfD vote shares. These are contextual correlations, not causal effects or evidence about which individuals participated.

## Research Question

How did Pegida's street mobilisation vary across German cities and over time, and which local economic, demographic, and political conditions predict its intensity?

## Motivation

Research on right-wing populism has focused heavily on electoral outcomes. Systematic subnational evidence on street protest is more limited, even though electoral support and movement activity may share local foundations. Pegida provides a case for studying [[concepts/right-wing-populist-mobilisation|right-wing populist mobilisation]] across localities, including cities where the movement failed to establish a recorded presence.

## Contributions

- Introduces protest data covering 89 major German cities in 2014-2017, retaining source-level reports before aggregating them into events.
- Documents two major mobilisation waves, geographical variation beyond Eastern Germany, and reported involvement of right-wing extremist actors alongside nativist and anti-elitist slogans.
- Compares economic, cultural, and ideological contextual predictors in a count model that allows nonlinear associations and accounts for city, state, and year dependencies.

## Method

### Event Collection

The authors use [[concepts/protest-event-analysis|protest event analysis]] based on more than 80 local and regional newspaper outlets. City-specific keyword searches retrieve articles about Pegida and demonstrations or protests. After text-similarity deduplication, trained research assistants code approximately 20,500 news reports. The sampling frame comprises 89 cities described as having more than 100,000 inhabitants; rural mobilisation is outside its scope.

Events are observable collective activities publicly supporting Pegida with an identifiable geographical location. Online activities are excluded. Coding records dates, locations, event types, actors, violence, and slogans. Individual reports remain separate before event aggregation, preserving disagreements about participant numbers. The broader dataset also contains 421 counter-demonstrations, which this note does not analyse in detail.

The [dataset identifier supplied by the paper](https://doi.org/10.17605/OSF.IO/5238F) is distinct from the [article DOI](https://doi.org/10.1080/01402382.2022.2135909). The article appeared online on 21 November 2022 and in the journal's 2023 volume.

### Contextual Model

Annual event counts are matched to Bertelsmann Foundation indicators of unemployment, income tax per capita, migration balance, population size, average age, foreign-born population, refugees, AfD vote share, and turnout. The paper states that predictors are lagged by one year; the political support measure specifically uses AfD vote share in the 2013 federal election, before Pegida's emergence.

The initial panel has 89 cities over four years, with 327 city-year observations retained after missing predictor values. A Poisson generalised additive model uses shrinkage cubic regression splines to represent potentially nonlinear associations and penalise weak predictors. Random intercepts for city, federal state, and year account for dependence. The outcome is the annual number of recorded events, rather than individual participation or a binary protest indicator.

## Experiments

### Descriptive Evidence

This is an observational study, with descriptive analysis, source comparisons, and regression rather than an intervention experiment.

| Finding | Reported evidence |
| --- | --- |
| Event coverage | 373 Pegida events in 30 of the 89 sampled cities, 2014-2017 |
| Attendance | More than 337,000 cumulatively across recorded events; repeat attendance cannot be identified |
| Timing | A first peak around the January 2015 Charlie Hebdo attack; a second wave during the 2015-2016 refugee crisis |
| Geography | Dresden has the most recorded events, followed by Leipzig; mobilisation also reaches western German cities |
| Actors and claims | News reports record extremist-group participation and slogans expressing nativism, anti-elitism, and opposition to mainstream media |

Figure 1 presents mean monthly participant estimates alongside minimum and maximum reported counts. These bounds describe disagreement across reports, not statistical confidence intervals. Comparisons with parliamentary-request data on extremist mobilisation and image/manual participant counts show similar trajectories, providing a partial external check on the media-based series.

### Contextual Associations

Four predictors are statistically significant in the reported model (Figure 4): population size, income tax per capita, and 2013 AfD vote share have positive relationships with protest counts; foreign-born population share has a negative relationship. The remaining included predictors are not statistically significant in this specification.

The authors interpret the negative foreign-born-share association as consistent with intergroup contact theory, and the AfD association as evidence of geographical clustering between right-wing populist voting and protest. Higher local income does not resolve the economic-grievance mechanism: inequality and fear of decline are offered as possible explanations, rather than directly tested pathways.

The notes refer to quasi-Poisson and negative binomial alternatives and report comparable results from a mixed-effects specification without smoothing or penalisation. The supplied Markdown does not contain the appendix tables or diagnostics, so numerical effect sizes and robustness statistics cannot be recovered here.

## Limitations

- Contextual variation is not exogenous. Lagged predictors and random intercepts do not establish that wealth, migration composition, or electoral support causes mobilisation.
- City-level relationships cannot identify protesters' income, migration contact, ideology, or prior votes. In particular, the AfD association does not show that AfD voters attended Pegida events.
- The major-city frame excludes rural mobilisation. Findings concern this movement, country, period, and sampling frame rather than far-right mobilisation generally.
- Newspaper coverage can omit events or selectively report actors, slogans, and attendance. Multiple outlets and external comparisons reduce concern but do not establish complete coverage.
- Cumulative attendance counts participation across events, not distinct people. Minimum and maximum reported estimates preserve measurement disagreement without resolving it.
- The article notes missing predictor data but does not establish that the retained 327 observations form an unbiased sample. Exact model estimates and supplementary diagnostics are absent from the supplied text.
- Temporal proximity between protest waves and prominent events is descriptive; the analysis does not identify the causal effects of those events.

## Related Concepts

- [[concepts/protest-event-analysis|Protest Event Analysis]]
- [[concepts/right-wing-populist-mobilisation|Right-Wing Populist Mobilisation]]
- Intergroup contact theory
- Ecological inference
- Generalised additive models

## Related Papers

- Vüllers and Hellmeier (2022), "Does Counter-Mobilization Contain Right-Wing Populist Movements? Evidence from Germany." The cited companion study examines counter-mobilisation using the broader data collection.
- Castelli Gattinara, Froio, and Pirro (2022), "Far-Right Protest Mobilisation in Europe: Grievances, Opportunities and Resources." Cited comparative research motivating attention to subnational variation.
- Weidmann and Rød (2015), "Making Uncertainty Explicit: Separating Reports and Events in the Coding of Violence and Contention." Cited methodological basis for preserving report-level uncertainty.
- [[papers/the-partypress-database-a-new-comparative-database-of-parties-press-releases|The PARTYPRESS Database]]: Related library reading on systematic political-communication data and radical-right immigration agendas. It studies party communication rather than street mobilisation and is not cited in this article.

[[index|Library home]]
