---
title: "International Sports Events and Repression in Autocracies: Evidence from the 1978 FIFA World Cup"
type: paper
authors:
  - Adam Scharpf
  - "Christian Gläßel"
  - Pearce Edwards
year: 2022
doi: "10.1017/S0003055422000958"
venue: American Political Science Review
tags:
  - authoritarianism
  - state-repression
  - sports-megaevents
  - international-media
  - argentina
---

## TL;DR

Around Argentina's 1978 World Cup, recorded disappearances and killings increased in host areas before the tournament, fell during it, and rose again afterward. The changes were concentrated near hotels reserved for foreign journalists. The authors interpret these patterns, together with a shift toward disappearances and changes in the hours of repression, as strategic responses to international scrutiny. The observational evidence supports this mechanism but does not establish that hosting increased total repression relative to a counterfactual without the tournament.

## Research Question

How do authoritarian hosts of international sports events adjust the location, timing, and visibility of repression when global publicity also exposes them to scrutiny by foreign journalists?

## Motivation

Sports megaevents can improve a regime's reputation and provide resources for rewarding elites. They also bring journalists whom the regime cannot readily control and give opposition groups an opportunity to publicize abuses. The resulting [[concepts/scrutiny-publicity-dilemma|Scrutiny-Publicity Dilemma]] may induce [[concepts/preemptive-repression|Preemptive Repression]] before journalists arrive, followed by restraint while they are present. Measuring violence only during the event could therefore miss repression surrounding it.

## Contributions

- Develops spatial and temporal predictions: repression should rise before and fall during a tournament in host cities, with less change in nonhost cities.
- Combines daily, geolocated records of disappearances and killings with archival information on World Cup organization and 74 hotels reserved for international journalists.
- Probes the mechanism through repression type, hotel proximity, broadcasting hours, and a post-tournament rebound, supplemented by historical accounts of intimidation and media distraction.
- Discusses how regime institutions, communication technologies, and infrastructure resources may alter the timing and geography of repression.

## Method

**Setting and outcome.** The tournament ran from June 1 to June 25, 1978, in Buenos Aires, Córdoba, Rosario, Mar del Plata, and Mendoza. The baseline department-day panel covers March 1 through June 25. Its outcome counts recorded disappearances and killings using the 2016 update of the National Commission on the Disappearance of Persons (CONADEP) report. This operationalization does not encompass every form of coercion.

**Main specification.** Negative binomial regressions interact a department's host-city indicator with a running time variable and its square. The positive linear interaction and negative quadratic interaction represent the hypothesized rise and fall in host areas. Controls include 1970 population and literacy, 1973 Peronist vote share, insurgent activity in 1974, and repression during 1970-1977. Specifications add military-zone fixed effects and compare robust with clustered standard errors. These are nonlinear temporal comparisons, not a randomized assignment or a conventional treatment-indicator difference-in-differences estimate.

**Mechanism analyses.** Hotel exposure is measured as kilometers from a department centroid to the nearest journalist hotel, including hotels outside match-hosting departments. The paper replaces the host indicator with this distance measure and presents Gaussian generalized additive model surfaces. Separate analyses distinguish disappearances from killings and compare the share of repression during match-broadcasting hours across periods. A March-September extension uses biweekly indicators interacted with host status to allow spikes both before and after the event.

## Experiments

This is an observational historical study. The results below are reported in the supplied article; its supplementary tables and replication data were not supplied or reanalyzed.

### Main Estimates

Table 1 reports 58,107 department-day observations in the simplest models and 56,394 in models with controls. The fully controlled specifications include military-zone fixed effects:

| Term | Model 3 coefficient (robust SE) | Model 6 coefficient (clustered SE) |
| --- | ---: | ---: |
| Host City × Time | 8.301 (2.008) | 8.301 (2.482) |
| Host City × Time squared | -6.844 (1.597) | -6.844 (2.134) |

Both interactions are significant at the reported $p<0.01$ threshold in both models. These are model coefficients in the paper's time parameterization, not additional victims per day. Predicted counts in Figure 5 show repression rising in host departments in the month before the tournament and falling sharply during it, while nonhost departments remain at comparatively low levels. The supplied text does not provide a numerical cumulative victim effect attributable to hosting.

### Mechanism and Follow-Up Findings

- **Repression type (Figure 7):** direct killings decline as the tournament approaches, while disappearances rise by May. The authors interpret this as a shift toward less visible tactics that can also deter opposition networks.
- **Journalist proximity (Figure 8):** the pre-event rise and tournament-period decline are concentrated close to journalist hotels. Hotel location proxies expected media presence; it does not measure individual journalists' movements or reporting.
- **Hours of repression (Figure 9):** roughly 60% of recorded repression during the World Cup occurred in broadcasting hours, compared with approximately 30% during those same hours in the three months before and after it. These are within-period shares, not evidence that the absolute number of operations increased during the tournament.
- **Rebound (Figure 10):** host departments show a statistically significant rise in predicted daily repression just after the tournament. About twelve weeks later, their levels approach those of nonhost departments. The suggestion that this targeted newly formed resistance networks is an interpretation, not a direct measurement of network formation.
- **Broader comparison (Figure 11):** demeaned annual repression scores around selected international sports events in autocratic hosts during 1945-2020 rise in the two preceding years and fall in the event year. This descriptive comparison provides suggestive scope evidence, not a separate causal estimate.

### Robustness

The authors report that the main pattern survives OLS, a binary repression outcome, cubic time trends, alternative correlation adjustments, three matched samples, leave-one-host-out analyses, alternative pre-event windows, province and military-subzone controls, Heckman selection models, weekly aggregation, and controls for protest activity. These checks are described in the main text with references to SI Tables 4.1-4.14; the supplied Markdown does not include those tables.

## Limitations

- **Selection and confounding:** host cities and journalist hotels were not randomly placed. Historical controls, matching, and selection corrections support the comparison but cannot establish that all relevant differences or concurrent local shocks are removed.
- **Measurement:** victim records may undercount repression, and centroid-to-hotel distance approximates exposure imperfectly. The authors argue that greater documentation under media attention would bias against their predictions; that direction depends on how reporting actually varies across locations, periods, and types of violence.
- **Mechanism:** hotel proximity, operation timing, and historical accounts converge on an interpretation involving media scrutiny. They do not independently identify the contributions of deterrence, incapacitation, censorship, and distraction.
- **Net effects:** a temporary decline during the event can coexist with violence before and afterward. The analyses do not quantify the tournament's cumulative causal effect relative to no tournament.
- **Generalization:** the principal case is a young military dictatorship in 1978. Party-based or personalist regimes, longer digital-news cycles, selective surveillance, and purpose-built venues may change the incentives and feasibility of these adjustments. Illustrative later cases do not resolve these scope conditions.
- **Source coverage:** the supplied copy contains the article and references, but not the cited supplementary analyses or full footnotes. The year above follows its 2022 copyright line; issue metadata are not specified. The paper identifies replication materials at [Harvard Dataverse](https://doi.org/10.7910/DVN/RJY34I), whose availability was not independently checked.

## Related Concepts

- [[concepts/preemptive-repression|Preemptive Repression]]: action against anticipated mobilization before the period of heightened scrutiny.
- [[concepts/scrutiny-publicity-dilemma|Scrutiny-Publicity Dilemma]]: reputational gains from visibility coexist with risks of exposure and opposition mobilization.
- [[concepts/protest-event-analysis|Protest Event Analysis]]: related event-measurement concerns about recording, aggregation, and coverage; the main outcome here is state violence, while protest activity enters a robustness analysis.

## Related Papers

The following works are cited in the supplied article:

- Ritter and Conrad (2016), "Preventing and Responding to Dissent: The Observational Challenges of Explaining Strategic Repression": motivates anticipatory repression and the difficulty of interpreting observed dissent.
- Truex (2019), "Focal Points, Dissident Calendars, and Preemptive Repression": connects predictable occasions for mobilization with repression in advance.
- DeMeritt (2012), "International Organizations and Government Killing: Does Naming and Shaming Save Lives?": informs the proposed costs of international condemnation.
- Scharpf and Gläßel (2020), "Why Underachievers Dominate Secret Police Organizations: Evidence from Autocratic Argentina": related research on the Argentine coercive apparatus.
- Weidmann (2016), "A Closer Look at Reporting Bias in Conflict Event Data": informs the discussion of media presence and recorded violence.

[[index|Library home]]
