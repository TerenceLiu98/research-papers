---
title: "The transformation of the European Parliament’s voting dimensions: agenda-driven or secular change?"
type: paper
authors:
  - Anatole Cheysson
  - Nicolò Fraccaroli
year: 2026
doi: "10.1080/13501763.2025.2468441"
source_job_id: "cfdf7e10-1741-401c-8270-103f887282c8"
tags:
  - european-parliament
  - roll-call-voting
  - political-measurement
---

## TL;DR

European Parliament roll calls show the integration axis overtaking left-right voting during the eurozone crisis and remaining dominant through June 2022. Within-policy comparisons and constant-policy-weight estimates indicate that changing topic shares alone do not explain the shift. Excluding eurosceptic far-right legislators restores left-right dominance, identifying their importance to the observed configuration without establishing a causal counterfactual.

Published in *Journal of European Public Policy*, 33(5), 1366–1412 (2026); online 27 February 2025. DOI: https://doi.org/10.1080/13501763.2025.2468441.

## Research Question

Does the growing prominence of European integration in parliamentary voting reflect a temporary crisis agenda or a persistent reorganization of voting conflict?

## Motivation

A dimension can become dominant because legislators change alignments or because the assembly votes more often on topics activating an existing divide. Distinguishing these mechanisms is essential before interpreting aggregate voting changes as a durable cleavage.

## Contributions

- Extends the roll-call record across nine terms, July 1979–June 2022, with 41,201,334 legislator-vote matrix cells.
- Compares dimensional salience within nine policy categories and after holding category shares constant.
- Examines extreme parties’ contribution to the observed dimensional ordering.

## Method

Principal component analysis is estimated separately by parliamentary term. Votes in favor are 1, against −1, and abstentions and absences 0; periods outside a legislator’s tenure are missing. Legislators in office for fewer than 20% of plenary votes and votes where the minority is less than 2.5% of the majority are excluded. Missing values are iteratively imputed using PCA, starting from column means. Probabilistic PCA provides a robustness comparison.

Political-group locations and Chapel Hill Expert Survey party positions inform interpretation of the axes. CHES validation covers terms five through nine; returning legislators’ score correlations provide evidence of continuity. Subset analyses use average squared cosines of vote loadings to retain the full-sample axes rather than refitting each subset.

A weighted “synthetic parliament” fixes policy-area shares to the fifth term’s distribution. Exclusion exercises remove parties at ideological extremes defined using CHES distribution tails; these diagnose which legislators sustain the observed voting geometry.

## Experiments

The evidence is observational scaling and sensitivity analysis.

| Term | European-axis variance | Left-right variance |
| --- | --- | --- |
| Sixth, 2004–2009 | 14.98% | 21.56% |
| Seventh, 2009–2014 | 21.2% | 19.27% |
| Ninth, 2019–June 2022 | 31.82% | 18.9% |

These are variance shares, not classification accuracy. Left-right generally dominates before the crisis, with the third term an exception. European integration becomes dominant in the seventh term and strengthens afterward.

The European component grows in every policy area from the sixth to seventh term. Growth continues into the eighth except for internal-EP votes; ninth-term changes are more uneven. Fixing policy shares slightly reduces the European component’s explanatory share but preserves its dominance. Agenda changes may therefore reinforce a shift they do not fully explain.

Removing eurosceptic far-right MEPs makes left-right dominant in terms seven through nine. The cumulative reduction in European-axis variance across these terms is 21.2 percentage points, a sum across terms rather than a single-term effect. Excluding far-left legislators weakens the left-right component. Robustness exercises separate amendments from final votes, coalition agreement from disagreement, and exclude resolutions.

## Limitations

- Recording procedures change over time, including during the pandemic. The authors cannot exclude roll-call selection changes contributing to the sixth-to-seventh-term shift.
- Separate term-specific components require evidence for comparable interpretation. CHES coverage is limited, and the ninth-term left-right correspondence weakens.
- Coding absence and abstention identically and imputing missing entries are measurement choices. PCA orthogonality does not establish substantive independence of attitudes.
- Fixed broad policy shares do not hold every proposal within a category constant. Party exclusions are descriptive exercises, not causal estimates of a parliament without those parties.
- Far-right movement toward the center of a recovered axis need not mean ideological moderation. The evidence concerns recorded plenary votes through June 2022, not committee bargaining or future permanence.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: relative salience can change without changing the number of axes.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: recording choices constrain generalization beyond observed votes.

## Related Papers

- [[papers/dimensions-of-politics-in-the-european-parliament|Dimensions of Politics in the European Parliament]]: historical predecessor using NOMINATE and external validation; this study extends coverage and examines the later reversal with PCA.
- Blumenau and Lauderdale (2018), “Never Let a Good Crisis Go to Waste”: cited agenda-setting account motivating the constant-policy-share comparison; agenda amplification and persistent realignment remain compatible.
