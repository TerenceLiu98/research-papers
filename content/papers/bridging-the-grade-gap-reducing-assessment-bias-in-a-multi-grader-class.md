---
title: "Bridging the Grade Gap: Reducing Assessment Bias in a Multi-Grader Class"
type: paper
authors:
  - Sean Kates
  - Tine Paulsen
  - Sidak Yntiso
  - Joshua A. Tucker
year: 2023
doi: 10.1017/pan.2022.27
source_job_id: "ad7d255f-9251-4150-af5f-7f605433fc58"
tags:
  - educational-assessment
  - bayesian-measurement
  - grading-bias
---

## TL;DR

Having several graders assess a small shared set of assignments allows Bayesian Aldrich–McKelvey scaling to correct grader-specific severity and scale use. In a comparative politics course, even one shared exam halves rank error in the large majority of resampling runs, relative to a benchmark based on averaging all three graders. Much of the gain comes from correcting one consistently stricter grader.

Published in *Political Analysis* 31 (2023), 642–650; published online December 14, 2022. [Article](https://doi.org/10.1017/pan.2022.27) and [replication data](https://doi.org/10.7910/DVN/BIORH8).

## Research Question

How much can a small amount of overlapping grading reduce differences in student rankings caused by assignment to graders with different severity levels?

## Motivation

Rubrics, training, and anonymous grading can leave systematic differences in how graders use a scoring scale. The paper defines fairness through symmetry: assigning the same work to a different grader should not change its expected final assessment. Simply comparing raw grades violates this criterion when graders differ in their baselines or reward increments.

## Contributions

- Applies Bayesian [[concepts/aldrich-mckelvey-scaling|Aldrich-McKelvey Scaling]] to sparse overlapping assessment data.
- Quantifies the workload–accuracy tradeoff using fully cross-graded course assignments and repeated masking of grades.
- Reports simulations across grader severity, scale use, noise, class size, and grader count, including comparison with ordinal IRT.
- Describes an R wrapper for rstan and explanatory teaching materials to support adoption.

## Method

For grader $i$ and student $j$, the model is

$$
x_{ij}=\alpha_i+\beta_i\gamma_j+\mu_{ij}.
$$

The latent performance $\gamma_j$ is transformed by a grader-specific intercept $\alpha_i$ and stretch $\beta_i$, with stochastic error $\mu_{ij}$. Shared assignments connect graders: differences in their scores on the same work inform scale adjustments that extend to assignments assessed only once. The paper treats this interpersonal incomparability as differential item functioning.

The Bayesian implementation assigns weak normal priors to grader parameters and a standard normal prior to latent performance. It uses five chains of 30,000 iterations, discards 2,000 burn-in iterations, and thins every 20 iterations. Posterior estimates yield adjusted student rankings while allowing uncertainty in the incomplete grading matrix.

The approach assumes internally consistent graders, broadly shared judgments of answer quality, and approximately linear rewards for better work. Each fully shared assignment requires $G-1$ extra assessments for $G$ graders. Large immediate gains are most plausible when baseline severity differences dominate; estimating stretches benefits from additional bridges.

## Experiments

### Course Data and Resampling

The main analysis describes a Fall 2018 introductory comparative politics course with 140 students, six review sections, and three teaching assistants. Every assistant graded each available midterm, short paper, and final exam, despite the ordinary assignment of students to particular assistants. Rubric training and de-identification were used.

The reference ranking averages all three graders' scores. For the midterm, the ordinary assigned-grader ranking has mean absolute error (MAE) of approximately 22.5 positions among 135 nonmissing exams. For each bridge count, 100 repetitions retain all three grades for randomly selected bridge students and only the assigned grader's score for other students. Adjusted rankings are compared with the full-information reference.

Figure 3 reports that one bridge, requiring two additional assessments, halves MAE in the large majority of runs. More bridges produce diminishing median gains and reduce sensitivity to the selected shared assignments. The main empirical mechanism is correction of one grader's consistently greater severity.

### Additional Results Reported in the Main Text

- Appendix B is described as finding improvements for RMSE, other assignments, overall grades, and letter-grade outcomes, with no evidence that selecting low-, high-, or extreme-scoring bridges changes performance.
- Across 27 simulated datasets varying grader shifts, stretches, and noise, the model outperforms ordinary grading except when graders agree perfectly.
- Further simulations vary graders from two to five, students per grader among 12, 30, and 60, and low versus high parameter variability. Benefits occur throughout and grow with grader count, student count, and variability.
- On nine ordinal-IRT-generated datasets, both bridging methods outperform unbridged grading. Ordinal IRT performs better under moderate or severe differential item functioning, but the reported difference is small relative to the gain from bridging itself.

These supplementary findings are summarized by the supplied main text; the supplementary analyses themselves were not supplied.

## Limitations

- The full-grader average is an operational fairness benchmark, not independently observed true mastery. The simulation evidence addresses this concern under specified generating processes.
- The empirical evidence comes from one course and is strongly influenced by one grader's severity. The same effect size should not be assumed in other classrooms.
- Linear calibration cannot remove all random errors, idiosyncratic judgments, or student-specific biases. It depends on grader consistency and shared quality criteria.
- Communication with students and technical implementation remain adoption barriers.
- The supplied text lacks footnote bodies and supplementary details. Section 4 dates the course to Fall 2018, while the acknowledgments refer to Fall 2019; the discrepancy is unresolved.

## Related Concepts

- [[concepts/aldrich-mckelvey-scaling|Aldrich-McKelvey Scaling]]: shared stimuli identify differences in raters' scale use; here the stimuli are student assignments.

## Related Papers

- Hare et al. (2015), “Using Bayesian Aldrich–McKelvey Scaling to Study Citizens’ Ideological Preferences and Perceptions”: the Bayesian framework followed by this paper.
- Marquardt and Pemstein (2018), “IRT Models for Expert-Coded Panel Data”: the ordinal measurement alternative discussed in the simulations.
- [[papers/hierarchical-bayesian-aldrich-mckelvey-scaling|Hierarchical Bayesian Aldrich-McKelvey Scaling]]: a related library paper that extends scale calibration through partial pooling and scale-flipping mixtures for ideological placements; it is not the grading model evaluated here.
