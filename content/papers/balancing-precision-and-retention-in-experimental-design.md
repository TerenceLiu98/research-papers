---
title: Balancing Precision and Retention in Experimental Design
type: paper
authors:
  - Gustavo Diaz
  - Erin Rossiter
year: 2025
doi: 10.1017/pan.2025.10008
tags:
  - experimental-design
  - survey-experiments
  - causal-inference
---

## TL;DR

Collecting baseline information can improve treatment-effect precision even when its cost reduces sample size substantially. Across three preregistered survey-experiment replications, the benefits depend on baseline predictiveness: two studies retain substantial gains despite simulated sample loss, while a weak quasi-baseline measure fails to improve precision.

## Research Question

When do block randomization and pre-post designs improve precision after accounting for participant dropout and budget-driven reductions in sample size?

## Motivation

Advice to collect baseline covariates typically holds sample size fixed. Longer surveys can instead cause explicit loss through dropout or exclusions, and implicit loss because a fixed budget buys fewer participants. Only 32 of 217 experiments in the authors’ sample of 2022–2023 political science articles used the designs considered here.

## Contributions

- Randomized comparisons of experimental designs connect statistical precision advice to actual retention costs.
- A distinction between explicit and implicit sample loss separates observed implementation losses from simulated budget constraints.
- Evidence identifies baseline outcome predictiveness as central to whether precision gains survive smaller samples.

## Method

Participants on CloudResearch Connect were randomized to a standard post-treatment-only design, a pre-post design with complete randomization, or a pre-post design with blocking. The replications cover Dietrich and Hayes (DH), Bayram and Graham (BG), and Tappin and Hewitt (TH). DH uses a quasi-baseline outcome because the outcome is a reaction to the stimulus; BG uses a baseline outcome; TH separates baseline collection, treatment, and outcomes over three waves.

DH forms 15 blocks and BG six using a predictive covariate and baseline outcome measure. TH uses multivariate continuous blocking over baseline covariates. The paper separately evaluates pre-post and blocking precision; its TH blocking comparison also incorporates pre-post information.

To simulate implicit loss, the authors start with equal sample sizes within each study, randomly omit 0–50% of observations from alternative designs in five-percentage-point increments, and repeat estimation over 1,000 draws per size. The comparison is percentage change in estimated standard error against the full-sample standard design, not a directly observed budget intervention (§4.2).

## Experiments

| Replication | Standard / pre-post / combined design N (Table 2) | Main precision result |
| --- | --- | --- |
| DH | 426 / 427 / 429 | Pre-post standard errors are approximately 15% larger even without implicit loss; baseline correlation is 0.28. Blocking provides only small gains. |
| BG | 1,008 / 1,010 / 1,006 | Both alternatives reduce standard errors by over 30% without loss and remain more precise with half the sample; baseline correlation is 0.70. |
| TH | 751 / 780 / 767 | Approximately 25% precision improvement without loss; pre-post reaches similar precision with half the sample. Blocking remains slightly better at 20% loss; baseline correlation is 0.69. |

DH and BG show roughly 1% explicit loss per design without distinguishable design differences. TH losses are 13.0%, 14.2%, and 20.7%, respectively. Exclusion of 7% of observations with missing blocking covariates before treatment assignment explains the extra loss in TH’s combined design (§4.1).

The authors find little evidence of altered observed sample composition or additional differential post-treatment attrition. Those checks cover measured characteristics only. DH’s preregistered treatment contrast has about 210 participants per design; the authors attribute its unexpected pre-post result to weak baseline predictiveness and sampling variability, rather than establishing that pre-post adjustment generally harms precision.

## Limitations

Three selected online survey experiments cannot establish universal retention thresholds. Implicit loss is simulated by random deletion, whereas actual recruitment constraints may change sample composition. Observed-covariate checks cannot exclude selection on unmeasured characteristics. Pretreatment exclusions preserve randomized comparisons within the retained sample but may change the population represented. Supplementary derivations and guidance are referenced but not included in the supplied Markdown. DH’s prose is inconsistent around the 10% blocking-loss threshold; the robust takeaway is that its precision margin is small.

## Related Concepts

- [[concepts/block-randomized-designs|Block-Randomized Designs]]: use baseline information to assign treatment within comparable groups.
- [[concepts/pre-post-experimental-designs|Pre-Post Experimental Designs]]: incorporate baseline outcomes into treatment-effect estimation.

## Related Papers

- [[papers/priming-bias-versus-post-treatment-bias-in-experimental-designs|Priming Bias Versus Post-Treatment Bias in Experimental Designs]]: addresses measurement-timing bias, a complementary concern to the precision and retention trade-off here.
- Clifford, Sheagley, and Piston (2021), “Increasing Precision Without Altering Treatment Effects: Repeated Measures Designs in Survey Experiments”: motivates the pre-post comparison.
- Moore (2012), “Multivariate Continuous Blocking to Improve Political Science Experiments”: supplies the blocking approach used in TH.

Replication data: [Harvard Dataverse](https://doi.org/10.7910/DVN/LMFOBS).
