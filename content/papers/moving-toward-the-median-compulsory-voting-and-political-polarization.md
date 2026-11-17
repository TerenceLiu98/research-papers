---
title: "Moving toward the Median: Compulsory Voting and Political Polarization"
type: paper
authors:
  - Alexandra Oprea
  - Lucy Martin
  - Geoffrey H. Brennan
year: 2024
doi: "10.1017/S0003055423001399"
tags:
  - compulsory-voting
  - political-polarization
  - spatial-electoral-competition
  - democratic-theory
---

## TL;DR

Compulsory turnout can weaken extreme voters’ threat to abstain and thereby encourage major parties to move toward the median. Adapting two spatial models, the paper develops a conditional normative argument for [[concepts/compulsory-voting|Compulsory Voting]] in high-capacity majoritarian democracies. Simulations illustrate substantial reductions in platform distance despite invalid ballots; they are not causal estimates of real-world policy effects.

## Research Question

Can compulsory voting reduce party polarization by changing the electoral incentives created by alienation-based abstention, and under what conditions would this strengthen democracy?

## Motivation

Existing defenses of compulsory voting emphasize civic duty, democratic legitimacy, or unequal participation. The authors offer an additional justification: reducing platform divergence could lower voters’ policy costs of rejecting undemocratic candidates, encourage elite restraint, and ease gridlock. This argument depends on the consequences of polarization rather than a distinctive moral duty to vote.

## Contributions

- Reinterprets two established turnout models as mechanisms linking compulsory voting to party convergence.
- Distinguishes alienation-driven abstention from indifference-driven abstention.
- Identifies majoritarian institutions, enforcement capacity, and sufficient effective turnout as scope conditions.
- Evaluates ballot spoilage, vote quality, affective polarization, and democratic dissatisfaction as possible countervailing effects.

## Method

Within a one-dimensional [[concepts/hotelling-downs-model|Hotelling-Downs Model]] framework, polarization is the absolute distance between the two dominant parties’ platforms, $|x-y|$. It is not a measure of citizens’ partisan hostility or a vote-weighted multiparty dispersion index.

In Callander and Wilson (2007), alienation-based abstention combines with potential third-party entry to sustain divergent platforms. Compulsory voting raises the policy distance voters tolerate before abstaining, reducing incentives to defend the ideological flanks. Beyond a turnout threshold, parties move inward; sufficiently high participation produces convergence.

In Adams and Merrill (2003), non-policy partisan preferences correlated with policy preferences combine with alienation to sustain divergence. Parties mobilize their own supporters rather than compete for opponents’ partisans. Removing alienation-based abstention restores convergence under complete turnout. Indifference-based abstention alone does not provide the same centrifugal mechanism.

The proposed institution compels attendance, not a valid vote. Meaningful, enforced penalties must therefore increase effective participation rather than merely attendance. The normative inference connects predicted platform moderation to existing research on democratic resilience.

## Experiments

The evidence comprises model-based simulations and a synthesis of prior empirical studies, not a new field experiment. Table 1 assumes a gross turnout increase of 16.5 percentage points and subtracts alternative increases in invalid ballots. Its reported percentage reductions in platform polarization are:

| Additional invalid ballots | Net turnout increase | Baseline 40% | Baseline 50% | Baseline 60% |
| --- | --- | --- | --- | --- |
| 6.5 p.p. | 10 p.p. | ~51% | ~69.9% | ~100% |
| 8.5 p.p. | 8 p.p. | ~42.1% | ~58.7% | ~92.5% |
| 12 p.p. | 4 p.p. (rounded down) | ~22.4% | ~32.0% | ~57.9% |

These scenarios use Callander–Wilson equilibrium simulations and assume all additional spoiled ballots come from alienated voters. The table shows larger proportional reductions at higher baseline turnout; the adjacent prose says “lower,” an internal inconsistency. The table values are retained here.

Prior studies support the existence of alienation-based abstention and suggest moderation in mainstream-party messaging under compulsory voting. The paper explicitly notes that these studies do not directly establish its target outcome: a causal reduction in distance between party platforms. Turnout and party positions are jointly determined, complicating empirical identification.

## Limitations

The argument primarily applies to two dominant parties in majoritarian systems with enforcement capacity and intermediate turnout. The roughly 35% turnout threshold discussed for the Callander–Wilson simulations is model-specific. Proportional representation, multiparty competition, and compulsory participation in primaries require separate analysis.

Ballot spoilage can attenuate or eliminate the mechanism. Newly mobilized voters must respond sufficiently to policy proximity. Compulsory voting might strengthen partisan identity or dissatisfaction with democracy, so reduced platform distance does not establish reduced affective polarization or a net improvement in democratic resilience. These competing effects remain empirically unsettled.

The supplied text references supplementary formal analysis but does not include it. Reported simulation results are summarized without reconstructing missing derivations. Replication materials are identified in the paper by DOI `10.7910/DVN/QIA26P`.

## Related Concepts

- [[concepts/compulsory-voting|Compulsory Voting]]: the institutional intervention.
- [[concepts/costly-voting|Costly Voting]]: participation decisions mediate parties’ electoral incentives.
- [[concepts/hotelling-downs-model|Hotelling-Downs Model]]: spatial competition and conditional median convergence.
- [[concepts/party-system-polarization|Party-System Polarization]]: related concept; this paper uses two-party platform distance rather than weighted system dispersion.

## Related Papers

- Callander and Wilson (2007), “Turnout, Polarization, and Duverger’s Law”: source model combining alienation and potential third-party entry.
- Adams and Merrill (2003), “Voter Turnout and Candidate Strategies in American Elections”: source model combining abstention and partisan preferences.
- [[papers/polarization-abstention-and-the-median-voter-theorem|Polarization, abstention, and the median voter theorem]]: a related library paper studying abstention and fixed third-party alternatives through probabilistic voting and local candidate adjustment.
