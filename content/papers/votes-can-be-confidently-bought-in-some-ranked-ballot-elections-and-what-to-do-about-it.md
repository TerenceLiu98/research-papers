---
title: Votes Can Be Confidently Bought in Some Ranked Ballot Elections, and What to Do about It
type: paper
authors:
  - Jack R. Williams
  - Samuel Baltz
  - Charles Stewart III
year: 2024
doi: 10.1017/pan.2024.4
tags:
  - electoral-systems
  - election-security
  - ballot-secrecy
---

## TL;DR

Ranked ballots can encode distinctive patterns that make cooperative vote verification statistically feasible when detailed rankings are publicly released. Williams, Baltz, and Stewart show how candidate counts, permitted ballot length, blank-position reporting, and geographic granularity determine this vulnerability in instant runoff voting (IRV). They demonstrate statistical feasibility, not observed vote buying.

## Research Question

When can published ranked-ballot records undermine secrecy by allowing a cooperating voter to demonstrate how they voted, and which administrative choices reduce this risk?

## Motivation

Removing names does not necessarily prevent ballots from carrying identifying signals. In IRV, lower rankings can distinguish ballots without helping competitors while the favored higher-ranked candidate remains in contention. The secrecy implications therefore depend jointly on ballot format and disclosure practices.

## Contributions

- Counts possible ranking sequences under three treatments of blank positions.
- Adapts a species-occupancy calculation to estimate how many rankings remain unused.
- Compares the theoretical bound with San Francisco election records and a hypothetical Oakland rule change.
- Identifies mitigation options and their trade-offs with transparency and voter choice.

## Method

For κ candidates and L permitted rankings, with L ≤ κ, the sequence counts exclude completely blank ballots and repeated candidates:

| Rule | Number of sequences | Interpretation |
| --- | --- | --- |
| No Blanks | $\kappa!/(\kappa-L)!$ | All L positions filled |
| Blanks Last | $\sum_{j=1}^{L}\kappa!/(\kappa-j)!$ | Incomplete rankings compressed to the start |
| Any Blank | $\sum_{j=1}^{L}\binom{L}{j}\kappa!/(\kappa-j)!$ | Positions of blanks preserved |

Counting and reporting rules can differ: normalizing blanks during tabulation does not protect secrecy if released records preserve their original positions.

With S possible sequences, m ballots, and sequence probabilities $p_i$, the expected number of distinct sequences observed is

$$
E[S_m]=S-\sum_{i=1}^{S}(1-p_i)^m.
$$

Uniform probabilities maximize expected occupancy within this sampling model. Consequently, $S(1-1/S)^m$ is a conservative expected count of unused sequences. This bounds aggregate unused capacity; it is not an individual identification guarantee or a realistic model of voter preferences.

## Experiments

**Oakland illustration (Section 4).** The paper considers the 2022 mayoral contest's ten candidates and approximately 125,000 voters, but imposes hypothetical Any Blank reporting that Oakland did not actually use. Increasing permitted rankings from five to ten expands the possible sequence space from 63,590 to 234,662,230. This is a counterfactual risk illustration, not evidence of misconduct.

**San Francisco, 2019 (Section 5).** Seven municipal IRV contests included three contested races. The six-candidate mayoral contest permits 1,956 sequences under Blanks Last versus 13,326 under Any Blank; each four-candidate contested race permits 64 versus 208. Precinct-level disclosure leaves more sequences unused than election-wide aggregation. Observed occupancy was below the uniform-model expectation, supporting its conservative direction in these cases. The main text reports that supplementary simulations found over 95% of randomly purchased sequences did not coincide with legitimate votes in the mayoral-election analysis; this is a simulation result, not observed purchasing.

**Broader comparison.** Across 36 public-office IRV elections in PrefLib, the paper reports a median proportion of possible sequences cast near 0.98 and a mean near 0.8. Many IRV contests consequently offer little unused sequence capacity.

## Limitations

- The authors report no evidence that the proposed scheme has been used. Statistical identifiability does not establish practical coercion or widespread vote buying.
- San Francisco combines relatively large candidate fields with unusually granular disclosure; its vulnerability is not representative of every IRV jurisdiction.
- The uniform occupancy bound concerns expectations under a sampling model. Real preference distributions and specific sequence collision probabilities matter for individual inference.
- Supplementary derivations and simulation details are referenced but not included in the supplied Markdown.
- Restricting candidate entry or ballot length can change outcomes; reducing disclosure sacrifices transparency and potentially forensic usefulness. Suppressing blank-position information that does not affect tabulation is a more targeted remedy.

## Related Concepts

- [[concepts/ballot-pattern-identifiability|Ballot Pattern Identifiability]]: distinctive ranking patterns can convey a voter's identity when combined with prior coordination and public records.

## Related Papers

- [[papers/the-probability-of-casting-a-pivotal-vote-in-an-instant-runoff-voting-election|The Probability of Casting a Pivotal Vote in an Instant Runoff Voting Election]]: related formal analysis of IRV's ranking and elimination structure; the supplied paper cites its 2022 preprint, whereas the library page covers the published version.
- Benaloh and Tuinstra (1994), “Receipt-Free Secret-Ballot Elections”: prior work on preventing voters from proving their choices.
- Kuriwaki, Lewis, and Morse (2023), “The Still Secret Ballot: The Limited Privacy Cost of Transparent Election Results”: related analysis of disclosure and ballot privacy cited by the authors.
