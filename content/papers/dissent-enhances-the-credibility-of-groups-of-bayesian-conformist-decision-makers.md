---
title: "Dissent enhances the credibility of groups of Bayesian conformist decision-makers"
type: paper
authors:
  - Aurèle Boussard
  - Richard P. Mann
  - Alfonso Pérez-Escudero
year: 2026
doi: 10.1098/rsif.2025.0956
tags:
  - collective-intelligence
  - conformity
  - bayesian-decision-making
---

## TL;DR

An outsider can rationally trust a nearly unanimous group more than a unanimous one when groups differ in their propensity to conform. In a sequential Bayesian model, unanimity disproportionately selects highly conformist, less accurate groups. This is a conditional theoretical result, not a general rule that dissent establishes credibility.

## Research Question

How should an uninformed observer infer majority accuracy from agreement when the group's conformity is unknown?

## Motivation

Agreement can reflect independently informative judgments or pressure to follow others. An outsider observing only final choices cannot directly distinguish these processes. Models that hold conformity fixed miss how agreement changes the likely composition of the groups being assessed.

## Contributions

- Models the credibility of collective judgments from an external observer's perspective.
- Shows how mixing groups with different conformity levels produces a nonmonotonic relationship between agreement and accuracy.
- Tests this mechanism across information quality, social-information access, reward specifications, and within-group heterogeneity.

## Method

Agents sequentially choose between two mutually exclusive alternatives with equal prior probability. Each receives an independent Gaussian signal centered on +1 or −1 according to the true alternative, with common standard deviation ε. Agents combine this signal with preceding choices by Bayesian updating. The focal model exposes previous choice counts; a variant exposes the complete sequence.

With posterior probability p that option a is correct, multiplicative rewards are E(a) = p exp(C n_a) and E(b) = (1 − p) exp(C n_b). Positive C rewards conformity; negative C rewards anticonformity. An additive variant instead adds C times the fraction of predecessors choosing the respective option. Agents maximize expected reward, which need not maximize accuracy.

Recursive calculations yield probabilities of final choice counts. Agreement is the fraction supporting the majority. Accuracy conditional on agreement divides the probability of the corresponding correct-majority outcome by the combined probabilities of its correct and incorrect counterparts. For heterogeneous populations, the authors average outcome probabilities across group types before conditioning. This preserves the fact that unanimous observations need not have the same group composition as divided observations.

## Experiments

These are mathematical and computational analyses, not human-subject experiments (Sections 2–4).

- **Main example:** groups of 17, ε = 2, with independent individual accuracy 69.15%. In the count-only model, accuracy rises with agreement at each fixed C. A population mixing equal shares of C = 0 and C = 0.8 groups instead peaks below unanimity (Figure 2).
- **Conformity distributions:** 150 group types drawn from a zero-centered Gaussian truncated to [−1, 1]. Across the seven tested dispersion values, the focal example exhibits credibility-enhancing dissent only above inter-group standard deviation 0.25 (Figure 3b); this is not a universal threshold.
- **Within-group variation:** 10,000 groups of 13, with sampled group means and individual conformities. The effect is strongest when between-group conformity variation exceeds within-group variation.
- **Robustness:** four signal-noise values (0.5, 1, 2, 5), two social-information settings, and two reward formulations give 16 combinations. The effect persists across many settings, especially with relatively weak private information.
- **Exception:** with multiplicative rewards and full sequence information, some homogeneous populations also show the effect. Here particular decision sequences explain accuracy, rather than dissent identifying a persistently less conformist group.

The authors weight reversals in the agreement–accuracy relationship by the frequencies of the agreement levels, avoiding undue emphasis on virtually unobservable outcomes.

## Limitations

The model assumes binary, irreversible sequential decisions; independent private signals of equal quality; and communication through choices alone. Agents know the relevant decision rules and conformity parameters, including preceding agents' conformities in the heterogeneous calculation, while the outsider has less information. Rich discussion, networks, heterogeneous expertise, additional biases, and alternative signal distributions could change the predictions. The paper does not empirically validate the proposed diagnostic or provide a calibrated rule for judging actual expert groups. Dissent can be informative about a group's process without demonstrating that inducing dissent would improve it.

## Related Concepts

- [[concepts/credibility-enhancing-dissent|Credibility-Enhancing Dissent]]: agreement can reveal latent conformity as well as evidence quality.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: social interaction changes both agreement and the information retained in collective choices.

## Related Papers

- Mann (2023), “Optimising collective accuracy among rational individuals in sequential decision-making with competition”: the reward-based sequential model extended here.
- Mann (2021), “Optimal use of simplified social information in sequential decision-making”: background for comparing counts with sequence information.
- [[papers/conformity-to-popular-not-average-opinions-models-data-and-evolution|Conformity to popular, not average, opinions: Models, data, and evolution]]: a complementary continuous-opinion account of conformity and crowd accuracy; it models popularity-based copying rather than an outsider's inference from binary agreement.

Published in *Journal of the Royal Society Interface* 23, 20250956. [Article](https://doi.org/10.1098/rsif.2025.0956). Code archive reported in the source: [Zenodo](https://doi.org/10.5281/zenodo.20308872).
