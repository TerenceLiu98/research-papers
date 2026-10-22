---
title: "Explaining Differences in Voting Patterns across Voting Domains Using Hierarchical Bayesian Models"
type: paper
authors:
  - Erin Rose Lipman
  - Scott Moser
  - Abel Rodriguez
year: 2026
doi: "10.1017/pan.2025.10014"
arxiv: "2312.15049"
venue: Political Analysis
source_job_id: "97f4bf77-f3bb-456c-a80c-4d40a1b2ff04"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - bayesian-variable-selection
  - roll-call-voting
---

## TL;DR

The paper jointly estimates whether U.S. House members have the same ideal point for procedural and final-passage votes and which observed characteristics predict that equality. Across the 93rd-113th Houses, minority-party members and members representing more electorally moderate districts are generally less likely to be "bridges" with a common ideal point across the two domains. The model propagates uncertainty from roll-call scaling into covariate selection, but the findings are associations under a two-domain spatial voting model rather than identified causal effects.

## Research Question

Which legislator and constituency characteristics explain whether a legislator's revealed ideal point differs between two voting domains, and how can those relationships be estimated without first fixing the identities of cross-domain bridge legislators?

## Motivation

Separate ideal-point models leave domain scales incomparable, while selecting invariant legislators in advance assumes part of the substantive answer. Earlier [[concepts/multiple-ideal-points|Multiple Ideal Points]] models infer who bridges domains but do not directly identify covariates associated with bridging. A two-stage procedure that first classifies bridges and then regresses those classifications on covariates depends on an arbitrary classification threshold and treats uncertain latent labels as observed outcomes.

## Contributions

- Embeds covariate-dependent bridge probabilities in a joint Bayesian spatial voting model.
- Assigns positive posterior probability to exact equality of a legislator's ideal points across two domains, allowing the bridge identities and common scale to be learned together.
- Adds Bayesian variable selection to identify characteristics associated with bridge status while accounting for multiplicity.
- Applies the model independently to 21 U.S. Houses spanning 1973-2014 and distinguishes procedural from final-passage voting.

## Method

For legislator $i$ and roll call $j$, the model uses a logistic [[concepts/item-response-theory|Item Response Theory]] likelihood with a motion intercept, a discrimination parameter, and the legislator's ideal point for the known domain of that vote. A latent indicator $\zeta_i$ equals one when the two domain-specific ideal points are exactly equal. Such legislators are bridges; when $\zeta_i=0$, their two ideal points receive independent draws from the same population distribution. The common population prior and inferred bridges place the two domains on a shared latent scale.

Bridge status follows a logistic regression,

$$
\Pr(\zeta_i=1\mid\mathbf{x}_i)=\operatorname{logit}^{-1}(\eta_0+\mathbf{x}_i^\top\boldsymbol\eta),
$$

where $\mathbf{x}_i$ contains centered legislator and constituency covariates. A spike-and-slab-style specification permits each slope to be exactly zero. Included coefficients receive a $g$-prior with $g=I$, and a beta-binomial prior over inclusion indicators supplies multiplicity adjustment. The intercept has a logistic prior, which induces a uniform prior over the baseline bridge probability under the null model (Sections 2.2-2.3).

Posterior inference uses Markov chain Monte Carlo with Polya-Gamma augmentation for the logistic components. The authors fit each House separately and use multiple chains and Gelman-Rubin diagnostics. Posterior inclusion probabilities summarize variable selection; bridge frequency averages the latent bridge indicators within a House (Section 3).

## Experiments

### Data and Design

The application analyzes procedural and final-passage roll calls separately for each of the 93rd through 113th U.S. Houses, covering 1973-2014. Legislator, party, electoral, and district demographic variables include majority-party status, seniority, sponsorship activity, demographic indicators, district socioeconomic measures, and party-specific interactions with the Republican presidential vote share in the district. The empirical exercise is an observational explanatory analysis, not a predictive benchmark or causal design (Section 4 and Appendix 1).

### Reported Findings

- Estimated bridge frequency is generally high but varies across Houses, indicating that a shared ideal point fits many legislators while leaving meaningful cross-domain differences.
- Majority-party status is the most consistently selected predictor. From the 99th House onward, raw bridge frequencies are generally higher in the majority party; the fitted coefficients correspondingly imply that minority-party members are more likely to differ across procedural and final-passage votes.
- District presidential vote share has party-specific associations. In the Houses where the interaction is selected, moving toward a more electorally competitive district lowers bridge probability for both Democratic and Republican members.
- Excluding the 109th-House outlier and a marginal 111th-House result, a five-percentage-point increase in Republican presidential vote share reduces a Democratic member's odds of bridging by factors between 1.3 and 3.2. For Republicans, the analogous increase raises bridge odds by factors between 1.5 and 3.3 in the reported non-outlier cases (Figure 7).
- Other legislator and constituency variables are not consistently selected across sessions. Gender and ethnicity, in particular, do not show stable explanatory value in this analysis.

## Limitations

- The model handles exactly two voting domains. Extending the binary bridge indicator and regression to more domains is computationally and conceptually nontrivial.
- The application fits each House independently, so coefficients and bridge frequencies describe session-specific models rather than a single longitudinal process.
- Covariate selection reports posterior associations with latent bridge status. It does not identify constituency pressure, party discipline, or any other mechanism causally.
- Results depend on the spatial voting likelihood, common-scale assumptions, vote-domain coding, and the availability of enough bridge legislators for identification.
- The 109th House is a conspicuous outlier with many selected predictors. Political circumstances may explain it, but misspecification in either the ideal-point or explanatory module remains an alternative.
- Standard Euclidean IRT can misrepresent cases in which ideological extremes vote together against the center. The authors identify flexible response models and modular or cut inference as directions for addressing this risk.

## Related Concepts

- [[concepts/multiple-ideal-points|Multiple Ideal Points]]: supplies the framework for exact cross-domain equality and inferred bridges.
- [[concepts/item-response-theory|Item Response Theory]]: supplies the binary roll-call measurement model.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes domain-specific position changes from adding latent dimensions.

## Related Papers

- [[papers/multiple-ideal-points-revealed-preferences-in-different-domains|Multiple Ideal Points: Revealed Preferences in Different Domains]]: the cited multi-domain predecessor; it estimates domain partitions but does not model bridge probabilities using observed covariates.
- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: cited Bayesian foundation for joint roll-call measurement and behavioral inference.
- [[papers/logit-unfolding-choice-models-for-binary-data|Logit Unfolding Choice Models for Binary Data]]: related library treatment of non-monotonic binary preference responses, relevant to the misspecification concern discussed by the authors.
- Lofland, Rodriguez, and Moser (2017), "Assessing Differences in Legislators' Revealed Preferences: A Case Study on the 107th U.S. Senate": cited two-domain bridge model extended here with covariate-dependent bridge probabilities.

[[index|Library home]]
