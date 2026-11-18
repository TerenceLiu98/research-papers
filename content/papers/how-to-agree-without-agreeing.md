---
title: How to Agree Without Agreeing
type: paper
authors:
  - Casper van Elteren
  - Maria Kleshnina
year: null
tags:
  - consensus
  - international-cooperation
  - repeated-games
  - antarctic-governance
---

## TL;DR

Consensus can produce passage without active support, and frequent agreement need not rest on credible punishment. A proposal-response model shows how moderating demands can facilitate agreement while undermining the threat sustaining restraint. Learning experiments separate frequent passage from full incentive compatibility. In a selected Antarctic Treaty sample, 80% of revisions and 38% of new proposals yielded an adopted instrument at their submission meeting.

## Research Question

What does a record of consensus identify about support, proposal accommodation, and the credibility of cooperation after disagreement?

## Motivation

Under the [[concepts/rule-of-non-opposition|Rule of Non-Opposition]], support and standing aside both permit passage. Recorded adoption can therefore conceal opposition, costly endorsement, or an earlier reduction in demands. Continued revision of existing Antarctic arrangements can coexist with unresolved proposals for new protection.

## Contributions

- Separates proposal accommodation from responses to the actual proposal, including support, reluctant acceptance, and restraint motivated by future cooperation.
- Derives acceptance thresholds and tests the punishment proposer's incentives when proposals can be redesigned.
- Audits learned deterministic rules at every decision node, including rarely visited punishment states.
- Connects documentary proposal histories to the limits of inference from adoption records.

## Method

For a fixed proposal, each responder chooses support, standing aside, or veto. Passage requires no veto. Conditional on others refraining, the respective payoff differences relative to standing aside are $h_i-\Delta_i$, zero, and $G_i-\beta L_i$, where $G_i=-h_i-\Delta_i-c_{V,i}-b_i$ and $\beta=\delta\chi$. Here alignment is $h_i$, public stance cost is $\Delta_i$, additional veto cost is $c_{V,i}$, passage value is $b_i$, and $L_i$ is the continuation-value loss after veto. Future-supported restraint occurs when $0<G_i\leq\beta L_i$ under the stated payoff restrictions.

In the continuous-bite variant, an opposed responder accepts demands up to $(b_i+c_{V,i}+\beta L_i)/g_i$. With complete information, passage-favoring ties, and a proposer preferring larger accepted demands to rejection, the smallest responder threshold bounds the selected bite. The number of opponents alone does not determine this limit.

A separate alternating-proposer construction prescribes substantive cooperation followed by permanent zero-bite passage after deviation. Restricting the menu to the target and the zero-bite instrument can sustain target bite up to $\min\{1,c(1+\delta)\}$. Unrestricted redesign permits profitable modest offers during punishment, invalidating that prescribed trigger. This is a unilateral incentive failure, not a theorem about renegotiation-proofness or all cooperative equilibria.

The learning model uses two alternating parties, modest and demanding proposals, and open, revision, and punishment modes. SARSA with softmax choices learns action values. Each party's most likely actions define a deterministic rule; Bellman values and one-shot deviations test the resulting pair at all available nodes. The audit concerns those reconstructed rules, not convergence or the original exploratory policies.

## Experiments

**Current learning experiment (Figures 3–4; Supplement S10.11).** At each of 23 continuation probabilities, 1,000 pairs train for two million rounds. At $\chi=23/24$, the final 4,000 rounds yield 95.0824% passage: 11.5474% active support and 83.5350% standing aside. Only 3 of 1,000 reconstructed pairs pass the full audit; 889 pass the prescribed-path check, including 886 that fail elsewhere. Round shares and pair-level audit shares have different denominators.

At the reference discount and recovery parameters, the specified symmetric demanding-proposal rule is credible only for $2/9\leq\chi\lesssim0.343$. Above this window, restoring cooperation can make standing aside during punishment preferable to veto. Asymmetric punishment roles can support credibility beyond the symmetric window.

After an imposed dispute at $\chi=23/24$, punishment prescriptions change in 28.0825% of party–replicate records versus 0.045% in matched controls. Late apparent-consensus shares remain about 83.53% in both arms. Initial values, training horizon, and continuation probability materially affect the audit results; older symmetric projections in the supplement are different measurements.

**Antarctic records (Figure 5).** Of 1,595 working papers submitted since 1991, 366 enter the comparison between amendments to existing arrangements and new arrangements. Submission-meeting instrument adoption is reported as 80% versus 38%. This is a selected documentary comparison, not an estimated causal effect of revision. Proposal histories help distinguish weakened demands, unresolved objections, and agreement without an instrument.

**Identification extensions.** If an audited sample of $M$ passed decisions documents at least one stand-aside in $D$ cases and active support by every responder in $E$ cases, apparent consensus is bounded by $D/M$ and $1-E/M$. Unsigned documentary prominence in the supplementary Antarctic stress test does not identify political direction; assumed sign placements describe scenarios rather than estimated preferences.

## Limitations

The theoretical variants maintain different payoff and continuation assumptions and should not be combined as one model. The core credibility arguments assume complete information and public monitoring; the learning construction has two parties and a specified finite action menu. Failed audits identify profitable departures, not probabilities of institutional collapse. The symmetric credibility window does not exclude other equilibria.

Documentary patterns were identified after assembling the records. Scheduled reviews, narrower scope, and selection into prior agreement can contribute to the revision advantage; longer-follow-up differences are less secure. Adoption, entry into force, and implementation remain distinct outcomes. The main model stops at adoption, and the historical evidence does not establish the proposed mechanisms causally.

The supplied Markdown contains damaged mathematical glyphs. This summary uses recoverable equations and explicitly reported results. No publication year, venue, DOI, or preprint identifier is established by the supplied metadata; the year is left unspecified despite references to 2026 records.

## Related Concepts

- [[concepts/rule-of-non-opposition|Rule of Non-Opposition]]: passage requires the absence of a blocking objection, allowing heterogeneous reasons for agreement.
- [[concepts/consensus-reaching-in-group-decision-making|Consensus Reaching in Group Decision Making]]: a related literature on adjusting preferences toward an acceptable group solution; its convergence criterion differs from non-opposition.

## Related Papers

- [[papers/a-model-of-long-term-conflict-resolution-and-cooperation|A Model of Long-Term Conflict Resolution and Cooperation]]: a library comparison on learned cooperation and intervention persistence, using imitation and reciprocity rather than full strategic credibility audits; not presented as a citation by this manuscript.
- Urfalino (2014), “The Rule of Non-Opposition: Opening Up Decision-Making by Consensus”: cited foundation for the institutional rule.
- Maggi and Morelli (2006), “Self-Enforcing Voting in International Organizations”: cited foundation on participation incentives and voting rules.
- Farrell and Maskin (1989), “Renegotiation in Repeated Games”: cited distinction between unilateral punishment deviations and replacement of continuation strategies.
