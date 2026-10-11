---
title: "Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001"
type: paper
authors:
  - Simon Hix
  - Abdul Noury
  - Gerard Roland
year: null
source_job_id: "aebcf586-6d4b-473e-81ce-a16b1432b0a3"
tags:
  - legislative-politics
  - european-parliament
  - political-parties
  - roll-call-voting
---

## TL;DR

Using the European Parliament's roll-call record from July 1979 through December 2001, Hix, Noury, and Roland find strong transnational party cohesion and coalition patterns associated with left-right proximity. Larger party groups are more cohesive, national fractionalization is associated with lower cohesion, and ideological distance predicts less joint voting. The authors interpret these patterns as evidence that parliamentary empowerment strengthens party organization, although the observational design does not isolate that causal mechanism.

## Research Question

What explains changes in European Parliament party-group cohesion and coalition patterns: shared ideological preferences, organizational incentives, national composition, group size, or parliamentary powers?

## Motivation

The European Parliament combines transnational party groups with national party delegations in a separated-powers setting. Without a government dependent on routine parliamentary confidence, cohesion cannot simply be attributed to government survival. Increasing legislative stakes may encourage members to coordinate through party organizations, even as their national and ideological composition becomes more diverse.

## Contributions

- Assembles the full population of recorded roll calls for the study period: 11,627 votes when the five counts in Table 2 are summed.
- Develops an [[concepts/agreement-index|Agreement Index]] incorporating Yes, No, and Abstain on a zero-to-one scale.
- Distinguishes absolute party agreement from agreement relative to chamber-wide consensus.
- Uses party and party-pair panel models to examine within-group changes in cohesion and within-pair changes in joint voting.

## Method

For a group casting $Y$ Yes votes, $N$ No votes, and $A$ Abstain votes, let $T=Y+N+A$ and $M=\max(Y,N,A)$. The Agreement Index is

$$
AI=\frac{M-\tfrac12(T-M)}{T},\qquad T>0.
$$

Relative cohesion divides a party's index by the whole parliament's index on the same vote. Coalition frequency is the proportion of votes on which the majorities of two groups choose the same option; it does not require a formal coalition agreement or a winning majority.

The regression design uses 44 six-month periods, July 1979 through June 2001, rather than the full descriptive coverage through December 2001. It studies six main party families: Socialists, European People's Party, Liberals, Radical Left, Gaullists and allies, and Greens. The cohesion models contain 248 observations; the coalition models contain 610.

Manifestos Research Group national-party positions supply external left-right measures. Group positions are weighted by national parties' shares of group MEPs; internal ideological diversity is the weighted absolute deviation from the group mean. National fractionalization is one minus the sum of squared national-party shares. Controls include lagged group size, government-party membership, roll-call frequency, treaty indicators, a time trend, and, for cohesion, enlargement indicators. Coalition models control for chamber agreement and combined group size.

Party or party-pair fixed effects absorb time-invariant differences. Panel-corrected standard errors address heteroscedasticity and cross-group error correlation. Reported checks include alternative specifications for correlated regressors, panel unit-root tests, first- and second-order serial-correlation corrections, and removal of extreme observations.

## Experiments

These are observational analyses, not randomized experiments.

| Analysis | Reported evidence | Scope |
| --- | --- | --- |
| Absolute cohesion, Table 2 | Socialist AI rises from 0.757 to 0.904; Liberal AI from 0.849 to 0.909; EPP AI falls from 0.899 to 0.859 between the first and fifth periods | Absolute cohesion does not increase uniformly across parties |
| Relative cohesion, Table 2 | EPP relative cohesion in the fifth period is 1.721, above the second through fourth periods but below the first period's 1.775 | Chamber consensus changes the interpretation of party agreement |
| Joint voting, Table 3 | PES-EPP agreement peaks at 0.710 in 1989-1994; PES-ELDR agreement reaches 0.738 in 1994-1999 and 0.739 in 1999-2001 | The grand coalition's prominence varies over time |
| Cohesion regressions, Table 4 | Lagged group-size coefficients are positive; national fractionalization negative; national-government party membership positive | These associations are more consistent across specifications than ideological explanations of internal cohesion |
| Treaty indicators, Table 4 | Amsterdam coefficients are positive and significant at 5%; Single European Act and Maastricht coefficients are not significant | Evidence for institutional change is specific, rather than uniform across treaties |
| Coalition regressions, Table 5 | Ideological-distance coefficient is -0.002 in all four models, significant at 1%; combined-size coefficients are about 0.10 and significant only at 10% where included | Left-right proximity has stronger statistical support than combined size |

Table 4 reports $R^2$ values of 0.417-0.465; Table 5 reports 0.599-0.610. The authors report robustness to excluding 31 extreme coalition observations and four extreme cohesion observations. The Single European Act association with coalition frequency disappears when enlargement indicators are introduced; Maastricht and Amsterdam do not show significant coalition effects.

## Limitations

- Roll calls comprise roughly one third of parliamentary votes in the historical setting described and can be requested strategically. Complete coverage of roll calls does not establish representativeness of all votes.
- Cohesion is observed agreement, not an identified effect of discipline. Shared preferences, agenda selection, and organizational pressure can generate similar voting patterns. Treaty indicators and lagged size do not independently identify causal effects.
- Party-level manifesto measures and half-year aggregates do not directly capture individual MEP preferences, issue-specific coalitions, or pressures from national and European party principals.
- The parsed source has unresolved discrepancies. Table 4 prints positive 0.003 coefficients for ideological diversity, while the prose describes a small negative effect. This summary does not assign a reliable direction to that finding. Several prose percentage-effect interpretations are also difficult to reconcile with the displayed coefficient scales, so they are not repeated as elasticities.
- The conclusion describes coalition size as playing no role, whereas Table 5 reports a weak positive association. The table supports weaker evidence for size than for ideological distance, rather than a categorical absence of association.
- The supplied Markdown lacks most footnote text, publication year, and a stable article identifier. The title's dates describe data coverage; they are not a publication date. No missing bibliographic metadata is inferred.

## Related Concepts

- [[concepts/agreement-index|Agreement Index]]: three-option voting cohesion and its chamber-relative version.
- [[concepts/conditional-party-government|Conditional Party Government]]: related reasoning about preferences and delegation to party leaders; the transnational, separated-powers setting here is distinct.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: strong left-right associations with coalition frequency do not establish that all political preferences are one-dimensional.

## Related Papers

- [[papers/polarization-and-ideology-partisan-sources-of-low-dimensionality-in-scaled-roll-call-analyses|Polarization and Ideology: Partisan Sources of Low Dimensionality in Scaled Roll Call Analyses]]: related library reading on how party structure affects interpretation of roll-call patterns; not identified as a citation in the supplied source.
- [[papers/unpredictable-voters-in-ideal-point-estimation|Unpredictable Voters in Ideal Point Estimation]]: related library reading examining legislator-specific unpredictability, including European Parliament sessions, rather than aggregate group agreement; not identified as a citation here.

[[index|Library home]]
