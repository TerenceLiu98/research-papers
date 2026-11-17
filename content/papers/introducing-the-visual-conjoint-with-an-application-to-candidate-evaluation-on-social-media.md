---
title: "Introducing the Visual Conjoint, with an Application to Candidate Evaluation on Social Media"
type: paper
authors:
  - Alessandro Vecchiato
  - Kevin Munger
year: null
doi: "10.1017/XPS.2024.15"
source_job_id: "b9d34dbd-a239-46d4-b92f-bc3590fa68b5"
tags:
  - conjoint-experiments
  - external-validity
  - social-media
---

## TL;DR

Randomizing whether candidate attributes appear in text tables or simulated Twitter profiles changes estimated preferences. [[concepts/visual-conjoint-experiments|Visual conjoint experiments]] make treatment presentation resemble a specified target setting, including its uneven attribute salience. The study finds age-dependent responses to social feedback only in the visual format, but no corresponding digital-literacy heterogeneity.

## Research Question

Does presenting the same explicit candidate information through social-media profiles rather than attribute tables change candidate-choice effects and subgroup differences?

## Motivation

A table gives attributes relatively uniform prominence, whereas social-media interfaces emphasize photographs, posts, and endorsement counts. External validity therefore concerns treatment modality as well as respondent populations and profile distributions. The relevant target here is encountering politicians through social-media profiles, not political choice in every setting.

## Contributions

- Implements randomized candidate attributes within automatically generated profile images.
- Compares modality-dependent effects while retaining the explicit information used in a conventional conjoint.
- Tests preregistered salience predictions and heterogeneity in responses to followers, likes, and retweets.

## Method

The study compares standard box and visual conjoints, randomizing presentation modality. Profiles vary generation, gender, race, social feedback, education, party, profession, military service, and religion across 4,800 possible combinations. Two hypothetical partisan tweets encode party cues and engagement. Names use identical surnames and omit first names. Photographs of low-profile members of Congress match candidate age and are not fully randomized independently of it.

Regression estimates average marginal component effects. Subgroup comparisons use marginal means to avoid reference-category dependence. Adaptive shrinkage (Ash) adjusts multiple attribute comparisons; the single preregistered social-feedback heterogeneity test is reported without that adjustment.

## Experiments

YouGov interviewed 653 people and matched down to 500 Facebook or Twitter users using gender, age, race, and education. The design section states five candidate-pair tasks per respondent. The power paragraph separately reports 10,000 observations per conjoint and a minimum detectable effect of 0.045; these counts cannot be reconciled from the supplied text alone.

- **Gender and race:** gender is significant within the visual format at p < .05, with a between-format difference at p < .10. Race has a smaller effect in the visual format, contrary to the salience hypothesis; the reported modality difference is significant at p < .01.
- **Biographical attributes:** education has a smaller effect in the visual format, with a reported difference at p < .01. Veteran status has an effect roughly two-thirds as large as in the standard format, but the modality difference is uncertain. Several findings lose significance under Ash adjustment.
- **Social feedback:** neither format shows an overall main effect. Younger respondents favor high-feedback profiles in the visual condition; respondents aged 41 or older have a negative estimate whose uncertainty includes zero. This generational pattern appears only in the visual condition.
- **Digital literacy:** neither the internet-skills battery nor the power-user scale supports the preregistered feedback-heterogeneity hypothesis.

## Limitations

The experiment establishes modality sensitivity, not direct predictive validity for actual elections. The sample covers social-media users, and the interface represents a particular historical Twitter design. Photographs bundle demographic signals with other information; the proposed stereotype-based explanation for the race result is post hoc. Individual tweet effects are not analyzed. Supplementary appendices referenced in the article are absent from the supplied Markdown.

The introduction describes significant profession differences after correction, while the detailed results emphasize education and report that the used-car-dealer result does not survive Ash. This summary retains that ambiguity rather than resolving it without the underlying estimates. The supplied Markdown does not state a publication year explicitly; the year field remains unset.

## Related Concepts

- [[concepts/visual-conjoint-experiments|Visual Conjoint Experiments]]: varies attributes within context-resembling visual stimuli.
- [[concepts/population-average-marginal-component-effect|Population Average Marginal Component Effect]]: addresses profile-distribution representativeness, a distinct design dimension.
- [[concepts/generalizability-of-survey-experiments|Generalizability of Survey Experiments]]: addresses extension across respondent populations.
- [[concepts/multiple-hypothesis-testing|Multiple Hypothesis Testing]]: adaptive shrinkage changes several inferential conclusions.

## Related Papers

- [[papers/improving-the-external-validity-of-conjoint-analysis|Improving the External Validity of Conjoint Analysis]]: studies target profile distributions, whereas this paper changes presentation modality.
- [[papers/multiple-hypothesis-testing-in-conjoint-analysis|Multiple Hypothesis Testing in Conjoint Analysis]]: provides the adjustment approach applied here.
- [[papers/using-eye-tracking-to-understand-decision-making-in-conjoint-experiments|Using Eye-Tracking to Understand Decision-Making in Conjoint Experiments]]: studies attention during conjoint tasks, relevant to the proposed salience mechanism.

[Article and supplementary material](https://doi.org/10.1017/XPS.2024.15). [Replication data](https://doi.org/10.7910/DVN/TIBNLH).
