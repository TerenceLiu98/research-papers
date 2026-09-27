---
title: "Partisan Alignment Increases Voter Turnout: Evidence from Redistricting"
type: paper
authors:
  - Bernard L. Fraga
  - Daniel J. Moskowitz
  - Benjamin Schneer
year: 2021
doi: "10.1007/s11109-021-09685-y"
tags:
  - voter-turnout
  - partisan-alignment
  - redistricting
  - expressive-voting
  - causal-inference
---

## TL;DR

Using congressional redistricting and longitudinal voter records, the authors find that assignment to districts favoring a registrant's party increases turnout relative to partisan mismatch. Their preferred pooled estimates for switching from misaligned to aligned districts are about **1.7 percentage points**; estimates for the reverse transition are smaller and statistically indistinguishable from zero. Survey evidence favors an [[concepts/expressive-voting|expressive voting]] interpretation, but does not identify the mechanism conclusively. Results are stronger in presidential elections and less consistent under difference-in-differences specifications.

## Research Question

Does [[concepts/partisan-alignment|alignment between a voter's party and the partisan composition of a congressional district]] increase participation? Can the effect be distinguished from electoral competitiveness, elite mobilization, and mobilization in response to partisan threat?

## Motivation

Redistricting research often evaluates representation and partisan seat shares while treating voter behavior as fixed. Boundary changes may also alter who participates. Comparing aligned and misaligned voters in lopsided districts helps distinguish the benefits of supporting a likely winner from incentives to cast a potentially decisive vote in a close election.

## Contributions

- Studies turnout responses to the 2012 redistricting cycle using individual records and geographically stationary voters, reducing confounding from residential self-selection.
- Constructs district partisanship from the same historical presidential returns under both maps, so measured changes arise from boundaries rather than subsequent voting behavior.
- Compares turnout within matched blocks and through longitudinal difference-in-differences, including transitions involving competitive districts.
- Uses a separate survey panel to examine district awareness, candidate knowledge, and campaign contact as evidence about possible mechanisms.

## Method

### Data and Treatment

The starting Catalist sample contains 6.4 million individuals. Analysis is restricted to people who remain at the same address, are of voting age and alive throughout 2008-2016, and register as Democrats or Republicans in states recording party registration. The regression samples are smaller than the starting database. The main turnout analyses concern general elections contested by both parties and exclude Louisiana because of its two-stage election process.

District partisanship uses demeaned 2004 and 2008 presidential vote returns, aggregated under both the old and new congressional maps. This Cook Partisan Voting Index (PVI) measure holds the underlying elections fixed. Districts from D+5 through R+5 are competitive; outside this interval, a registrant is aligned when the district favors their party and misaligned when it favors the other party.

### Identification and Estimation

Redistricting changes some stationary voters' partisan context while leaving others' context unchanged. The block fixed-effects design exactly matches individuals on pre-redistricting district, party registration, Black/Hispanic/Asian indicators, sex, age group, and turnout in 2008 and 2010. Preferred pooled regressions also include state-year fixed effects. Table 1 reports standard errors clustered at the pre/post-redistricting party-congressional-district level.

Panel A includes all eligible districts. Panel B restricts the sample to original districts containing both voters whose partisan context changes and voters whose context does not. Separate comparisons start with misaligned, aligned, or competitive voters. Supplementary difference-in-differences analyses compare turnout changes before and after redistricting.

These comparisons address observed targeting and stable voter differences, but redistricting is not randomized. A causal interpretation still requires that unaccounted-for changes correlated with reassignment do not explain turnout differences; difference-in-differences additionally relies on an appropriate untreated-trends assumption.

### Mechanism Evidence

The 2010-2014 Cooperative Congressional Election Study panel follows 9,500 respondents across 2010, 2012, and 2014. Analyses examine perceived district partisanship, ability to evaluate the respondent's party's candidate, and self-reported campaign contact. Candidate-evaluation and contact models include individual and state-year fixed effects.

## Experiments

This is an observational quasi-experimental study, not a randomized intervention.

### Turnout Estimates

Table 1 pools post-redistricting elections in 2012, 2014, and 2016. Entries below convert coefficients and clustered standard errors into **percentage points**; parentheses contain standard errors. Each transition is compared with remaining in the initial context, or initial set of contexts.

| Transition | Panel A: all districts | Panel B: districts with context changes |
| --- | --- | --- |
| Misaligned or competitive to aligned | +1.09 (0.47) | +1.22 (0.33) |
| Aligned or competitive to misaligned | -0.80 (0.36) | -0.99 (0.35) |
| Misaligned to aligned | +1.72 (0.55) | +1.69 (0.38) |
| Aligned to misaligned | -0.41 (0.46) | -0.60 (0.40) |
| Competitive to aligned | +0.70 (0.79) | +0.99 (0.60) |
| Competitive to misaligned | -1.48 (0.57) | -1.90 (0.64) |

The misaligned-to-aligned estimates exclude zero at the 95% level; the reverse-transition estimates do not. Competitive-to-aligned and competitive-to-misaligned effects differ at the reported 5% level in Panel A and 1% level in Panel B. This difference is inconsistent with an account in which reduced competitiveness alone affects both groups equally.

### Heterogeneity and Robustness

Table 2 shows substantial sensitivity to election type and estimator. For pooled years, 8 of 10 block fixed-effects hypothesis tests support the predicted direction at the 5% level, compared with 1 of 10 difference-in-differences tests. For midterms, the corresponding counts are 4 of 10 and 0 of 10; for presidential elections, they are 12 of 20 and 11 of 20. These are counts of related hypothesis tests, not independent replications.

Alignment effects are larger for marginal voters, defined as voting at most once in 2008 and 2010, than for those voting in both elections. The authors link this to the larger effects in presidential years. Larger changes in district partisan composition also predict larger turnout changes. Evidence that gaining alignment has a larger effect than losing it does not hold consistently across alternative specifications.

### Awareness and Contact

Respondents' perceptions track district partisanship even after conditioning on their old district or its PVI (Table 3). Relative to misaligned districts, alignment increases the ability to evaluate the party's candidate by 17.28 percentage points for competence, 11.21 for integrity, and 14.24 for ideological placement (Table 4). These outcomes measure whether respondents can offer an evaluation, not whether they evaluate the candidate favorably.

Most reported contact effects are small or statistically indistinguishable from zero. The exception is email/text contact: alignment increases it by 7.93 percentage points relative to misalignment, and competitive districts show a similar increase of 7.99 points (Table 5). The authors interpret the combination of awareness and limited additional contact as favoring expressive voting over elite mobilization.

## Limitations

- **Bundled treatment:** Boundary changes can alter candidates, representation, and other electoral conditions together with partisan composition. Matching on observed characteristics does not eliminate every source of strategic selection or time-varying confounding.
- **Population:** The design covers stationary registered Democrats and Republicans in party-registration states, with additional age, survival, and election restrictions. It does not directly estimate effects for movers, independents, unregistered citizens, or every electoral setting.
- **Uneven evidence:** Midterm results are mixed, difference-in-differences often yields weaker evidence, and the preferred aligned-to-misaligned estimates are imprecise. The paper's headline 0.4-1.7-point range should not be read as uniformly significant effects.
- **Mechanisms:** Awareness is compatible with expressive voting but does not measure expressive utility directly. Self-reported contact and the email/text exception leave room for mobilization or other explanations; the survey analyses are not a causal mediation test.
- **Source completeness:** The supplied Markdown includes the main article and references but not the online appendix repeatedly cited for detailed specifications and robustness checks. Its footnote markers lack corresponding note text. Those materials were not independently evaluated. The year above follows the stated online publication date, 16 February 2021.
- **Normative scope:** A turnout gain for aligned voters does not establish that partisan gerrymandering improves democratic welfare. The authors emphasize possible exclusion of persistent partisan losers and competing goals of representation.

## Related Concepts

- [[concepts/partisan-alignment|Partisan Alignment]]
- [[concepts/expressive-voting|Expressive Voting]]
- [[concepts/political-polarization|Political Polarization]]: Partisan identity and lopsided districts motivate the study; polarization itself is not the estimated treatment.

## Related Papers

- Hunt (2018), "When does redistricting matter? Changing conditions and their effects on voter turnout." The article contrasts its longitudinal design with this earlier Florida study.
- Moskowitz and Schneer (2019), "Reevaluating competition and turnout in U.S. House Elections." Addresses the related question of competitiveness rather than voter-district partisan alignment.
- Schuessler (2000), "Expressive voting." Supplies the identity-based theoretical account discussed in the article.
- Sekhon and Titiunik (2012), "When natural experiments are neither natural nor experiments." Motivates caution about treating redistricting as exogenous.

[[index|Library home]]
