---
title: Adaptive Randomization in Conjoint Survey Experiments
type: paper
authors:
  - Jennah Gosciak
  - Daniel Molitor
  - Ian Lundberg
year: 2026
tags:
  - conjoint-experiments
  - adaptive-randomization
  - causal-inference
  - treatment-effect-heterogeneity
---

## TL;DR

The paper develops an adaptive conjoint design that searches for contexts where one preselected attribute has its strongest and weakest effects. It combines an initial uniform allocation, Thompson sampling over contexts, and independent validation of the selected contexts. An immigration experiment finds heterogeneous preferences for college education; a hiring vignette experiment finds little evidence of a motherhood effect across its four contexts. Validation estimates effects in the selected contexts without resolving uncertainty about whether they are the true extremes.

## Research Question

How can a conjoint experiment efficiently discover the range of a focal attribute's effects across combinations of other randomized attributes, including variation that low-order interaction models could miss?

## Motivation

Standard conjoint estimands average over other attributes, potentially obscuring large context-specific differences. Estimating every context precisely is expensive, even with a moderately sized attribute space. The proposed design concentrates observations on promising extreme contexts while preserving a separate sample for estimation after selection. It complements conventional conjoint analysis but targets a different estimand.

## Contributions

- Defines a focal attribute, context attributes, and randomized signals of each context value, separating the substantive comparison from its presentation.
- Targets minimum and maximum context-specific choice probabilities without assuming an additive or low-order interaction model.
- Introduces a warm-up, adaptive search, and validation workflow for [[concepts/adaptive-conjoint-experiments|Adaptive Conjoint Experiments]].
- Provides two online illustrations, simulation comparisons with fixed randomization, and reusable infrastructure for continuous adaptive assignment.

## Method

Each respondent makes one forced choice between two profiles. The profiles differ on the focal attribute but share context values. Distinct signals of each context value, such as Germany and Poland for a European origin, are randomly permuted between profiles. The focal attribute's position is also randomized. Signal effects need not vanish for identification, although small signal effects simplify interpretation (Sections 2 and 3; Appendices B and C).

Let $Y\in\{L,R\}$ be the chosen profile and $A\in\{L,R\}$ the profile bearing the selected focal-attribute value. For context $x$ and signal permutation $S$, the target is

$$
\theta(x)=\mathbb{E}_{S,A}\left[\Pr\{Y(x,S,A)=A\}\right],
\qquad
\theta_{\min}=\min_x\theta(x),\quad
\theta_{\max}=\max_x\theta(x).
$$

Here $\theta(x)=0.5$ represents no preference. Under this paired design, the conditional effect on a profile's selection probability is $2\theta(x)-1$ (Appendix F). Thus a 60% choice probability corresponds to a 20-percentage-point conditional effect, not a 60-point effect. These quantities are not directly interchangeable with AMCEs from independently randomized conventional conjoint profiles.

1. **Warm-up:** Assign contexts with equal probabilities to obtain initial observations for each arm.
2. **Adaptive search:** Begin with independent $\operatorname{Beta}(1,1)$ priors. After $s_x$ choices favoring the focal value and $f_x$ opposing choices, use $\operatorname{Beta}(1+s_x,1+f_x)$ posteriors. [[concepts/thompson-sampling|Thompson Sampling]] assigns a context in proportion to its posterior probability of maximizing or minimizing $\theta$. The implementation estimates these probabilities using 100,000 posterior draws. Searches can run separately or sequentially; the authors favor sequential searches so the second can use the first search's data.
3. **Selection and validation:** Select the most probable maximum and minimum contexts and report their posterior selection probabilities. Collect fresh observations at the selected contexts with fixed allocation and estimate choice probabilities using sample proportions. This removes the winner's curse from estimation of the selected contexts and avoids relying on naive inference from adaptively collected observations.

Appendix G notes implementation differences from the ideal algorithm: the immigration study updates from completed responses, and its validation uses two simultaneous Prolific experiments with identical recruitment calls, one per context. The authors treat context assignment there as effectively randomized; focal-attribute and signal assignments are randomized within each experiment.

## Experiments

### Immigration preferences

The study recruited 10,000 Prolific respondents in June 2024. Education, college degree versus no formal education, was the focal attribute. Four binary context attributes, prior U.S. trips, profession, reason for application, and country of origin, generated 16 contexts. Allocation was 2,000 warm-up respondents, 3,000 searching for the maximum, 3,000 searching for the minimum, and 2,000 in validation, with 1,000 per selected context (Section 4.1).

Warm-up and adaptive posterior means favored the college-educated profile in every context, ranging from below 65% to above 75%. The selected maximum had a 79% posterior probability of being the true maximum; the selected minimum had only a 49% probability of being the true minimum. Independent validation estimates were similar and slightly closer to 0.5. The prose does not provide exact validation point estimates, so those are not reconstructed from figures here. Appendix A reports similar poststratified estimates using ACS demographic weights, subject to selection-on-observables assumptions and retained population cells.

### Job applicants

Respondents compared equally qualified women applying for a human resources position. Motherhood was signaled through parent-teacher association involvement versus a neighborhood association role. Applicant race and educational institution rank defined four contexts. Data were collected on Prolific during February and March 2024, with adaptive updates in batches of 200 respondents (Section 4.2).

Estimated probabilities of selecting the non-mother were close to 0.5 in all four contexts. The most probable maximum and minimum had posterior selection probabilities of 39% and 47%. The authors stopped after adaptive sampling and omitted validation because the observed heterogeneity was too small to justify further collection. This is a near-null result for these survey choices, not evidence that actual employers never discriminate against mothers.

### Simulations and diagnostics

Appendix D compares adaptive and fixed randomization over 9 to 30 contexts, with choice probabilities ranging from 0.3 to 0.7 and a fixed gap between the two largest values. Across 1,000 replications at sample sizes of 500 or 1,000, adaptive allocation more often selects the true maximum. At 1,000 respondents it retains about 70% accuracy with 24 contexts. A separate stopping-rule comparison reaches greater than 95% posterior probability for an arm at roughly half the sample size under adaptive allocation. These are results for the specified simulations and maximum-arm search, not a universal sample-size guarantee for the complete three-phase design.

Appendix E constructs a high-order interaction example whose true choice probabilities span 0.1 to 0.9, while additive and two-way interaction approximations span only 0.425 to 0.575. Appendix C reports primary-signal choice rates of 45% to 55% across immigrant contexts and job-applicant signal rates within six percentage points of 50%, supporting small signal effects in these applications.

## Limitations

- Independent validation corrects selection-induced estimation bias for the chosen contexts; selecting the wrong arms can still understate the true range. Validation uncertainty and arm-selection uncertainty are distinct.
- The method requires enough data to explore all contexts. Scaling to hundreds or thousands of contexts would require additional pooling assumptions or methods not developed here.
- One focal attribute receives priority. Matching other attributes within pairs prevents recovering the usual parallel summaries of their marginal effects; Appendix F shows some analogous marginal estimands are fixed by the design.
- Similar profiles can reveal the focal comparison and invite social desirability bias. Different signals and one task per respondent mitigate this concern at the cost of fewer observations per respondent.
- Prolific is a non-probability sample, and hypothetical hiring choices need not generalize to employer behavior. Poststratification does not remove unmeasured selection bias.
- Optimal allocation across phases, stopping rules, and mixing of minimum and maximum searches remain open questions.
- The supplied Markdown ends immediately after Appendix H's opening paragraph. Further signal-selection details are unavailable in this source; several numerical results appear only as images.

## Related Concepts

- [[concepts/adaptive-conjoint-experiments|Adaptive Conjoint Experiments]]
- [[concepts/thompson-sampling|Thompson Sampling]]
- [[concepts/causal-and-interpretable-heterogeneous-treatment-effects|Causal and Interpretable Heterogeneous Treatment Effects]]: related interest in effect modifiers, with the present study directly randomizing profile contexts.
- [[concepts/exploratory-causal-inference|Exploratory Causal Inference]]: discovery followed by independent validation.

## Related Papers

- Hainmueller, Hopkins, and Yamamoto (2014), "Causal Inference in Conjoint Analysis: Understanding Multidimensional Choices Via Stated Preference Experiments": conventional conjoint identification and marginal effects.
- Egami and Imai (2019), "Causal Interaction in Factorial Experiments: Application to Conjoint Analysis": marginal interaction estimands that motivate a complementary search for extreme contexts.
- Offer-Westort, Coppock, and Green (2021), "Adaptive Experimental Design: Prospects and Applications in Political Science": adaptive experimentation background cited by the paper.
- [[papers/from-tokens-to-policy-causal-and-interpretable-heterogeneous-treatment-effects-identification|From Tokens to Policy: Causal and Interpretable Heterogeneous Treatment Effects Identification]]: a library comparison on discovering effect modifiers from representations, rather than adapting experimental allocation across predefined contexts; not a citation in the supplied paper.

## Resources

The source reports a [replication archive](https://doi.org/10.7910/DVN/7EBDDY), [analysis code](https://github.com/jennahgosciak/adaptive_conjoint), and [adaptive experiment infrastructure](https://github.com/dmolitor/adaptive-infra). The Dataverse DOI identifies the replication data, not the article. Preregistrations are [immigration](https://osf.io/ctd54) and [job applicants](https://osf.io/ekjbm).

[[index|Library home]]
