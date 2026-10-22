---
title: "How Do Voters Matter? Evidence from US Congressional Redistricting"
type: paper
authors:
  - Daniel B. Jones
  - Randall Walsh
year: 2018
tags:
  - electoral-responsiveness
  - congressional-redistricting
  - roll-call-voting
  - political-economy
  - causal-inference
---

## TL;DR

Using Census-driven changes in US congressional district boundaries across the 1990s, 2000s, and 2010s, Jones and Walsh find that districts with larger increases in predicted Democratic share subsequently receive more left-leaning representation. About 60% of the overall shift is associated with electing a Democrat; the remainder includes within-party candidate selection and changes in the voting of continuing representatives. The latter result supports an intensive-margin form of [[concepts/electoral-responsiveness|electoral responsiveness]], although the observational design depends on redistricting-induced composition changes being unrelated to unmodeled changes in legislators' voting.

## Research Question

When a congressional district's partisan composition changes, does policy representation change only because voters elect a different party or candidate, or do incumbent representatives also alter their roll-call behavior in response to the electorate?

## Motivation

Electoral competition models disagree about how voters affect policy. Citizen-candidate models emphasize an extensive margin: voters select politicians who then pursue their own preferred policies. Downsian models also imply an intensive margin: politicians adjust their positions toward voters. Prior US House evidence based on close elections found selection without a detectable behavioral response. This paper uses changes in district composition induced by redistricting to distinguish the two channels.

## Contributions

- Constructs a district-level measure of predicted Democratic share immediately before and after three redistricting waves while holding each wave's Census demographics fixed.
- Separates party switching, within-party candidate selection, and within-representative changes in roll-call voting.
- Studies multiple redistricting waves and tests whether estimates vary with partisan control, reapportionment, or the authority drawing district boundaries.
- Repeats the intensive-margin analysis using racial composition and civil-rights voting, then uses a shift-share instrumental-variable design based on within-decade demographic change.

## Method

### Data and Measures

The analysis pools three four-Congress panels around the early-1990s, early-2000s, and early-2010s redistricting waves. Pre- and post-redistricting districts are matched by mutual maximum population overlap rather than district number. The main sample contains 4,228 district-Congress observations from 1989 through 2014.

Predicted Democratic share is constructed in four steps: estimate region-specific fractional-logit models of county voter registration using 2010 demographics; map Census block groups to congressional boundaries before and after each redistricting wave; aggregate block-group demographics to districts; and apply the estimated demographic model. Within a redistricting wave, the same decennial Census data underlie both maps, so measured changes arise from reassigned boundaries rather than subsequent residential sorting. The measure excludes independents and expresses Democrats as a share of registered Democrats plus Republicans.

The main outcome is the first dimension of period-specific DW-NOMINATE, where lower values indicate more left-leaning roll-call voting. A secondary analysis uses intertemporally adjusted Leadership Conference on Civil Rights scores through the 110th Congress.

### Identification and Decomposition

The baseline continuous-treatment difference-in-differences specification includes district-by-redistricting-wave and Congress fixed effects. It estimates the combined effect of changed district composition through:

- an **extensive margin**, in which a different party or a different candidate within a party wins office; and
- an **intensive margin**, in which the same representative changes voting behavior.

The paper progressively controls for the elected representative's party, restricts the sample to districts with no party change, and adds representative-by-redistricting-wave fixed effects. The last specification identifies the intensive margin from representatives serving before and after redistricting. Standard errors are clustered by state and redistricting wave.

The design does not require randomly drawn districts. It requires redistricting-induced changes in composition to be unrelated to contemporaneous or anticipated changes in roll-call behavior after the included fixed effects and trends. Robustness analyses add unit-specific trends, split the sample by redistricting institutions and circumstances, and use a separate shift-share IV strategy based on state or national demographic growth outside the focal district.

## Experiments

This is an observational quasi-experimental study rather than a randomized experiment.

### Electoral and Roll-Call Outcomes

A 10-percentage-point redistricting-induced increase in predicted Democratic share is associated with a 14-percentage-point increase in the probability that a Democrat holds the seat and an 8-percentage-point increase in Democratic vote share.

In the baseline roll-call model, the coefficient on predicted Democratic share is -1.612 (standard error 0.308). Thus, a 10-point increase corresponds to a 0.161-point leftward change in DW-NOMINATE, approximately one third of the outcome's full-sample standard deviation. Adding party affiliation reduces the coefficient to -0.547 (0.135), showing that party control explains much, but not all, of the relationship.

Restricting the sample to districts whose representative's party does not change produces a coefficient of -0.661 (0.162). Relative to the baseline, the authors attribute about 60% of the overall effect to party switching and about 40% to within-party selection and behavioral response. With representative fixed effects, the estimate is -0.209 (0.098), indicating that continuing legislators also move left as predicted Democratic share rises. The estimated direction is similar for Democratic and Republican representatives, though the party-specific Republican estimate with representative fixed effects is imprecise.

### Robustness and Alternative Outcomes

District- or representative-specific trends leave the main intensive-margin estimates similar, though the representative-trend estimate is significant only at the 10% level. Estimates retain the same direction across partisan and nonpartisan redistricting, states that did or did not gain seats, and maps produced by political branches versus courts or commissions; several representative-fixed-effect subgroup estimates are imprecise.

An increase in a district's Black population predicts more voting in line with the LCCR agenda. The association remains after controlling for predicted Democratic share, restricting to districts without party changes, and adding representative fixed effects. This outcome-specific test is consistent with legislators responding to constituency composition rather than only to generic electoral competition.

The alternative shift-share IV analysis uses within-decade demographic trends rather than redistricting. State-based and national instruments have first-stage F-statistics from 25.98 to 39.27. Across no-party-change and representative-fixed-effect specifications, the second-stage predicted-Democratic-share coefficients range from -0.778 to -0.949 and exclude zero at conventional levels except one estimate reported at the 10% level.

## Limitations

- **Nonrandom boundaries:** Redistricting is strategic. The design addresses several observable forms of selection, but causal interpretation still fails if map-induced composition changes track unmodeled deviations in legislators' voting behavior.
- **Generated treatment measure:** Predicted Democratic share is based on 2010 county registration-demographic relationships applied across regions, geographic levels, and years. It measures two-party registered-voter composition rather than directly observed district preferences.
- **Survivor-based intensive margin:** Representative fixed effects identify legislators who remain in Congress across redistricting. These incumbents may not represent politicians who lose, retire, or enter office after a boundary change.
- **Channel accounting:** The no-party-change estimate combines selection of different candidates within a party with behavioral changes by incumbents. The decomposition of that residual depends on comparisons across specifications rather than direct observation of candidate preferences.
- **Outcome scope:** DW-NOMINATE summarizes recorded roll calls on a dominant left-right dimension. It may conceal issue-specific movement and inherits concerns about which legislative decisions become recorded votes.
- **IV assumptions:** Strong first stages establish relevance but not exclusion. Broad demographic trends used in the shift-share instruments could affect legislative behavior through channels other than predicted Democratic share.

## Related Concepts

- [[concepts/electoral-responsiveness|Electoral Responsiveness]]
- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]

## Related Papers

- Lee, Moretti, and Butler (2004), "Do Voters Affect or Elect Policies? Evidence from the U.S. House": provides the close-election design and extensive-margin conclusion that this paper contrasts with its own results.
- Levitt (1996), "How Do Senators Vote? Disentangling the Role of Voter Preferences, Party Affiliation, and Senator Ideology": examines related sources of legislative voting behavior.
- Gerber and Lewis (2004), "Beyond the Median: Voter Preferences, District Heterogeneity, and Political Representation": studies the connection between district preferences and representation.
- [[papers/partisan-alignment-increases-voter-turnout-evidence-from-redistricting|Partisan Alignment Increases Voter Turnout: Evidence from Redistricting]]: uses boundary changes to study voter participation rather than legislators' roll-call response.

[[index|Library home]]
