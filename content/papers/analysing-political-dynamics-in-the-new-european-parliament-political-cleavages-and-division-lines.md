---
title: "Analysing political dynamics in the new European Parliament: Political Cleavages and Division Lines"
type: paper
authors:
  - Antonis Papakostas
  - Spyros Blavoukos
  - Georgios Matsoukas
year: 2025
source_job_id: "2860dd45-fb59-4f09-9360-85ec296a29ef"
tags:
  - european-parliament
  - roll-call-voting
  - political-parties
  - political-measurement
---

## TL;DR

Across 221 roll-call votes from the beginning of the European Parliament's tenth term through 10 July 2025, the study identifies a closely aligned EPP-S&D-Renew core, with Greens/EFA nearby and issue-dependent participation by other groups. Pairwise voting distances correlate more strongly with differences in European-integration positions ($r=0.82$) than with left-right differences ($r=0.56$). These are descriptive associations among group aggregates, not causal estimates of the forces producing coalitions.

## Research Question

How do transnational groups and their constituent national parties align during the first year of the 2024-2029 European Parliament, and are their voting differences more closely associated with left-right ideology or European integration versus national sovereignism?

## Motivation

The Parliament combines eight transnational groups with more than 200 national parties. National priorities, internal ideological diversity, and flexible discipline can make alliances vary across policy areas. Group-level proximity and within-group cohesion therefore need separate measurement: a group can sit near a governing majority while containing substantial internal disagreement.

## Contributions

- Maps intergroup alignment with [[concepts/normalized-roll-call-voting-distance|Normalized Roll-Call Voting Distance]].
- Examines national-party deviations from their European groups using overall and policy-specific distance distributions.
- Compares observed voting distances with group-level Chapel Hill Expert Survey (CHES) positions on two political dimensions.
- Connects a broadly stable centrist alignment to policy-specific departures, rather than treating every vote as evidence of a permanent coalition.

## Method

The authors collect 221 votes from HowTheyVote.eu and classify them by title into ten themes. Counts are budget/finance 57, external relations 40, environment 29, human rights 27, institutions 18, Russia-Ukraine 16, health/social policy 13, energy/industry 12, technology/digital 10, and agriculture 1. Agriculture is excluded from subsequent thematic analyses because it has only one vote.

Individual votes are coded $+1$ for support, $-1$ for opposition, and $0$ for abstention or absence. A group's vote score is its share supporting minus its share opposing. Thus, 65% support, 15% opposition, and 20% abstention/absence yield $0.50$.

Appendix I specifies Euclidean distance divided by the maximum possible distance and multiplied by ten. For $n$ shared votes, this implies

$$
D(p,q)=\frac{10}{2\sqrt{n}}\sqrt{\sum_{v=1}^{n}(p_v-q_v)^2}.
$$

Zero indicates identical aggregate vote profiles; ten indicates opposite unanimous positions on every vote. National-party distances from their own groups are summarized with medians, interquartile ranges (IQRs), and boxplots. The paper treats low median distance and limited dispersion as evidence of internal cohesion.

Finally, the study compares pairwise voting distances among eight groups with their left-right and integration-position distances using Pearson correlations. CHES-derived group scores supply the external positions. This connects behavioral measures with [[concepts/party-position-measurement|Party-Position Measurement]] without fitting an individual-level latent-preference model.

## Experiments

The evidence consists of observational comparisons, not randomized experiments.

| Comparison | Reported result | Source |
| --- | --- | --- |
| EPP-Renew voting distance | 1.38 on the 0-10 scale | Table 3 |
| S&D-Renew; EPP-S&D | 1.72; 2.40 | Table 3 |
| EPP-ECR; Greens/EFA-The Left | 3.00; 3.35 | Table 3 |
| PfE-ESN | 2.67 | Table 3 |
| EPP-PfE; EPP-ESN | 5.37; 6.38 | Table 3 |
| Voting distance versus integration-position distance | Pearson $r=0.82$ | Political-cleavages section and Table 5 |
| Voting distance versus left-right distance | Pearson $r=0.56$ | Political-cleavages section and Table 5 |

The authors interpret this pattern as a centrist governing core, a relatively separate PfE-ESN cluster, and intermediate positions for ECR and The Left. Proximity describes voting alignment; it does not itself establish a formal coalition agreement.

Appendix II reports the following overall national-party distance summaries:

| Group | Median | IQR |
| --- | --- | --- |
| EPP | 1.81 | 0.71 |
| S&D | 1.50 | 0.72 |
| Renew | 1.77 | 0.52 |
| Greens/EFA | 1.61 | 1.03 |
| ECR | 2.53 | 1.17 |
| The Left (GUE/NGL) | 2.36 | 0.38 |
| PfE | 2.64 | 0.85 |
| ESN | 2.28 | 0.74 |

S&D has the lowest median, while The Left has the smallest IQR but a higher median. These summarize different properties. The thematic analysis highlights environmental disagreements within EPP and Renew and divisions over Russia within The Left. The conclusion discusses the November 2025 Sustainability Omnibus alignment as later political context; that event falls outside the July data cutoff.

## Limitations

- Abstention and absence receive the same code. A zero group score can also arise from equal support and opposition, so this representation loses distinctions between nonparticipation, coordinated abstention, and internal division.
- Normalizing by the number of votes puts distances on a common scale but does not control for agenda composition or [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]. The supplied text does not give a fully reproducible rule for selecting the 221 votes or assigning thematic categories.
- Pairwise observations share groups. The reported correlations provide neither an uncertainty analysis accounting for this dependence nor a multivariate test separating integration from left-right positions. The authors explicitly call for more robust research on the cleavage interpretation.
- The CHES wave, any scale transformations, and precise national-party weighting used to obtain group scores are not specified in the supplied text. These omissions limit reproduction of the external-position comparison.
- The cohesion prose says ECR and PfE have IQRs above 1.1 and that the centrist groups have the smallest IQRs. Appendix II instead gives PfE 0.85 and The Left 0.38. The table above preserves the appendix values rather than repeating the conflicting ranking. The appendix also describes the distance reference ambiguously as an average or consensus position, whereas the main method describes each party's own group.
- The year follows the foreword's explicit statement that ELIAMEP published the study in November 2025. The supplied English version has no separate publication date or stable identifier for this paper; none is inferred.

## Related Concepts

- [[concepts/normalized-roll-call-voting-distance|Normalized Roll-Call Voting Distance]]: the study's aggregate behavioral-distance measure.
- [[concepts/agreement-index|Agreement Index]]: an alternative measure of voting cohesion that treats abstention as an expressed option distinct from absence.
- [[concepts/party-position-measurement|Party-Position Measurement]]: relates expert assessments to observed legislative behavior.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: two correlated distance comparisons do not establish the dimensionality of individual preferences.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: coverage and recording rules constrain generalization from observed votes.

## Related Papers

- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: cited historical analysis of group cohesion and left-right coalition patterns. Its Agreement Index and joint-voting frequencies differ from the distance measure used here.
- Rosalino, Curado, and Pinheiro (2025), "Multi-polarization during the 9th European Parliament": cited predecessor describing a multipolar, variable alliance system in the preceding term.
- [[papers/roll-call-vote-selection-implications-for-the-study-of-legislative-politics|Roll-Call Vote Selection: Implications for the Study of Legislative Politics]]: related library reading on selection and representativeness; not identified as a citation in this study.

[[index|Library home]]
