---
title: "Alliance Formation in Regional Space: Shifting the Battlefront Between Competing Hegemonial Powers"
type: paper
authors:
  - Kai A. Konrad
  - Florian Morath
year: 2026
doi: "10.1177/00220027251359720"
journal: "Journal of Conflict Resolution"
volume: 70
issue: 4
pages: "666–689"
tags:
  - international-relations
  - military-alliances
  - game-theory
---

## TL;DR

Sequential alliance expansion can be driven by small countries paying to move the prospective battlefield away from their territory. Konrad and Morath show that this incentive lets rival hegemons extract concessions and absorb every buffer country under the baseline assumptions, even when eliminating the buffer zone increases the probability of war. The result isolates [[concepts/battlefield-burden-shifting|Battlefield Burden-Shifting]] as a motive independent of improved military protection.

## Research Question

Can geographically concentrated war damage generate continued alliance expansion and political or economic concessions without military gains from additional members?

## Motivation

Frontline and buffer countries face disproportionate battlefield losses. Joining an expanding alliance can turn a prospective battlefield into protected hinterland by transferring exposure to countries farther along the frontier. This externality may make expansion individually attractive even when retaining neutral territory would reduce aggregate expected damage.

## Contributions

- Models geographically ordered accession negotiations between two hegemons and smaller countries.
- Establishes full, symmetric absorption in every subgame-perfect equilibrium of the baseline game, while accession transfers can vary across equilibria.
- Shows how successive concessions monetize the same displaced war risk repeatedly and can exceed total expected battlefield damage.
- Identifies conditions under which a surviving buffer state is preferable to complete expansion.

## Method

Two hegemons occupy opposite ends of a line containing $2n$ small countries. Each offers accession to its adjacent nonmember in exchange for a transfer, interpreted as money or political concessions. Offers are simultaneous; candidates observe both offers and decide simultaneously. Rejection permanently stops expansion by that hegemon, while the other may continue. Indifferent candidates accept.

After negotiations, war occurs with exogenous probability $p_0$ if the alliances meet, or $p_1$ if buffer countries remain, with $p_0/2<p_1\leq p_0$. Total battlefield damage is $D$: it is divided equally between the two final frontline countries without a buffer zone, or among the remaining buffer countries otherwise. Hinterland states escape this damage. Winning probabilities do not depend on alliance size, and each hegemon's expected war payoff is normalized to zero. Its payoff therefore comes from accession transfers.

Backward induction first solves unilateral expansion after one candidate rejects. The rival then absorbs all remaining countries, leaving the original rejecting country with a total expected loss of $p_1D$. Anticipating that outcome makes early accession attractive and supports full symmetric expansion.

## Experiments

This is a formal theoretical study; no datasets were generated or analyzed. Historical discussions of NATO and European battlefield exposure motivate the mechanism rather than test it.

Propositions 1–2 establish that each hegemon absorbs the $n$ countries nearest it. In periods $t<n$, equilibrium transfers lie within

$$
\left[\frac{p_1D}{2n-2(t-1)},\ p_1D\right].
$$

The last accession countries each pay $(p_1-p_0/2)D$ and remain frontline states. Earlier members become hinterland states. Transfer multiplicity reflects the candidates' off-path coordination possibilities; it does not change the final alliance geography. The appendix further restricts which pairs of transfers can occur at the interval boundaries.

A hegemon's maximum total transfer is $np_1D-p_0D/2$. Corollary 1 reports increasing upper and lower transfer bounds in damage, buffer-zone war probability, and the number of accession countries. When $p_1<p_0$, full absorption raises expected aggregate battlefield damage from $p_1D$ to $p_0D$.

Sensitivity analysis changes the result when buffers reduce war risk sufficiently: for $p_0>2p_1$, two asymmetric equilibria leave exactly one buffer country. If buffers bear only a fraction $\lambda$ of battlefield damage, the full-expansion condition becomes $\lambda p_1>p_0/2$. Allowing war probability to decrease with the number of buffers changes the transfer bounds. The discussion of endogenous preventive war offers intuition rather than a fully solved replacement model.

## Limitations

- Linear geography, contiguous alliances, irreversible rejection, and state-dependent strategies constrain accession paths.
- War onset and victory probabilities are not strategically determined in the baseline; commitment problems and preventive wars may interact with expansion in practice.
- Damage is concentrated on buffer or frontline states, with equal sharing within those categories. Different exposure patterns change the expansion threshold.
- The model deliberately removes capability gains and protection benefits to isolate a sufficient mechanism; it does not estimate its importance relative to other motives.
- Historical illustrations do not establish that battlefield burden-shifting caused particular NATO accessions or wars.

## Related Concepts

- [[concepts/battlefield-burden-shifting|Battlefield Burden-Shifting]]: geographic expansion relocates expected war losses to remaining outsiders.
- [[concepts/alliance-burden-sharing|Alliance Burden-Sharing]]: addresses contributions and defense costs within alliances; here the central externality concerns the location of battlefield damage.

## Related Papers

- [[papers/asymmetric-burden-sharing-and-the-restraining-and-deterrence-effects-of-alliances|Asymmetric burden-sharing and the restraining and deterrence effects of alliances]] (Iwanami, 2024), cited in the paper, derives restraint and deterrence through endogenous military contributions. Konrad and Morath isolate a geographic damage mechanism with military gains held fixed.
- Benson and Smith (2023), “Commitment Problems in Alliance Formation,” studies the power shifts and preventive-war incentives excluded from the baseline.
- Genicot and Ray (2006), “Contracts and Externalities: How Things Fall Apart,” provides a related sequential-contracting perspective on effects imposed on agents outside an agreement.

Source: supplied parsed Markdown for Cognitio job `2f8f77ba-288b-487d-949c-feb30c0097dc`. Bibliographic year follows the 2026 journal issue; the supplied article carries a 2025 copyright notice.
