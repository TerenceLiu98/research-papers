---
title: Depolarizing power of anticonformity
type: paper
authors:
  - Arkadiusz Lipiecki
  - Katarzyna Sznajd-Weron
year: 2025
journal: Expert Systems with Applications
doi: 10.1016/j.eswa.2025.127879
tags:
  - opinion-dynamics
  - political-polarization
  - social-influence
---

## TL;DR

Two factions start at opposite extremes. An agent who wants to stand out from like-minded peers can leave its faction's extreme for the middle position, even when the factions rarely meet. In the authors' models, enough of this behavior can make the middle position dominant. Greater tolerance alone leaves the factions polarized when cross-faction contact is rare.

## Research Question

When can encouraging people to differ from their peers help two already polarized factions reach a compromise? How does it compare with increasing cross-faction contact or widening the range of opinions people will consider?

## Motivation

Moving away from a political opponent can reinforce an extreme position. Moving away from allies who already share that extreme opens a route toward compromise. The distinction matters in a segregated population, where allies supply most opportunities for influence.

## Contributions

Lipiecki and Sznajd-Weron compare three interventions within a family of six threshold voter models. They distinguish a decline in polarization because one extreme wins from a decline because the middle position gains support. They also track whether the factions still occupy opposite poles or have each become internally divided.

## Method

Two equally sized factions have fixed memberships. Their members can move among three ordered positions, $-1,0,+1$. At each update, a target samples a panel of $Q$ peers. Each peer comes from the other faction with probability $\beta$. A threshold of $q$ peers must support a response.

- Under bounded confidence, the target adopts an adjacent position when at least $q$ peers hold it.
- Under greater tolerance, the target moves one step toward at least $q$ peers on the same side of its current position. Those peers may occupy different positions.
- Under anticonformity, at least $q$ peers must share the target's current position. A target at either extreme then moves to the middle. A target in the middle chooses either extreme with equal probability.

The authors examine each pair of rules twice. In the dynamic version, each agent uses the intervention rule with probability $p$ at each update. In the static version, a fixed fraction $p$ of agents always uses it. The authors numerically integrate equations for opinion shares to steady state, slightly perturbing the initial split to allow either pole to prevail when symmetry breaks.

## Experiments

Figure 3 compares all six variants with three of four panel members required for influence. With bounded confidence and dynamic anticonformity, the middle position has its largest advantage just beyond the transition out of polarization. Further increases in anticonformity push the three shares toward equality as moderates also differentiate themselves.

At intermediate anticonformity, more cross-faction contact can raise polarization while shifting the divide inside each faction. With fixed behavioral types, frequent cross-faction contact and little anticonformity can instead give one extreme a dominant share. Relaxing bounded confidence can produce consensus when cross-faction contact is sufficiently frequent, but fails to do so under strong in-group favoritism. Changing the panel size and threshold shifts the boundaries while preserving the qualitative pattern reported for bounded confidence with anticonformity (Fig. 5).

## Limitations

The results concern stationary opinion shares on one three-choice issue. Faction identity stays fixed, and group membership affects whom an agent meets. The model does not measure hostility toward the other faction. The cited reward experiments show that incentives can elicit anticonformity in small groups. Whether such incentives produce lasting political compromise remains an empirical question.

## Related Concepts

- [[concepts/anticonformity|Anticonformity]] creates a middle position inside an initially unanimous extreme faction.
- [[concepts/bounded-confidence-models|Bounded Confidence Models]] explain why contact across two extremes can leave both opinions unchanged.
- [[concepts/q-voter-model|Q-Voter Model]] provides the group-influence framework. Here $q$ counts the peers needed to trigger an update in a panel of size $Q$.

## Related Papers

- [[papers/modeling-explosive-opinion-depolarization-in-interdependent-topics|Modeling Explosive Opinion Depolarization in Interdependent Topics]] also finds abrupt transitions out of polarization. Its mechanism is alignment under stronger social influence across two issues.
