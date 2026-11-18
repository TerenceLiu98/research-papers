---
title: "Partner or Rival? How Human-Artificial Intelligence Conflict Shapes Artificial Intelligence Aversion"
type: paper
authors:
  - Kimia Ansari
  - Maryam Ghasemaghaei
year: 2026
doi: "10.1080/07421222.2026.2647459"
tags:
  - human-ai-decision-making
  - cognitive-dissonance
  - ai-aversion
---

## TL;DR

In a randomized experiment with 432 employees, greater disagreement with AI advice increased cognitive dissonance. Dissonance was associated with lower epistemic and social motivation and less advice uptake. Competitive framing amplified the conflict–dissonance relationship, particularly in critical decisions. Contrary to the authors’ hypothesis, dissonance reduced rather than increased motivation to understand the problem.

## Research Question

How does disagreement with AI shape advice aversion through cognitive dissonance and information-processing motivation, and how do cooperative versus competitive goal perceptions and decision criticality condition this process?

## Motivation

Organizational disagreement need not identify an objectively wrong decision: human judgment and AI advice can both appear plausible. Understanding resistance therefore requires examining perceived threats to expertise and authority alongside technical performance.

## Contributions

- Connects human–AI disagreement to advice uptake through dissonance and two motivational pathways.
- Tests cooperative versus competitive framing and critical versus non-critical decisions in a factorial experiment.
- Documents a reversal of the predicted positive relationship between dissonance and epistemic motivation.

## Method

The 2 × 2 × 2 between-subjects experiment crossed low/high conflict, cooperative/competitive AI framing, and critical/non-critical decisions. Of 700 recruited North American employees, 432 passed screening and quality checks; a separate 100-person pilot tested procedures and measures.

Participants allocated a hypothetical $5 million investment budget or $20,000 for office snacks and board games. After an initial allocation, the hypothetical advisory system OptiFlex was framed as either a complementary coworker or a potential decision-maker that could alter employee roles. Its recommendation differed from the initial decision by 20% or 90%, as described by the authors. Participants then revised their decisions and answered construct measures. No functioning AI was deployed.

Advice uptake was measured by weight-on-advice (WOA), the shift from initial to final decision relative to the gap between advice and initial decision, winsorized to 0–100%. Higher WOA means greater appreciation and lower aversion. Dissonance and motivation were measured with adapted scales. Analysis used PROCESS in SmartPLS 4.1, with age, gender, AI attitudes, trust, decision self-efficacy, and responsibility as controls.

## Experiments

Table 2 reports the following coefficients; signs for the final outcome refer to WOA, not an aversion score.

| Relationship | Coefficient | p |
| --- | ---: | ---: |
| Conflict → dissonance | 0.37 | .016 |
| Conflict × competitive framing → dissonance | 0.35 | .035 |
| Conflict × criticality → dissonance | 0.37 | .031 |
| Dissonance → epistemic motivation | −0.21 | <.001 |
| Dissonance → social motivation | −0.30 | <.001 |
| Epistemic motivation → WOA | 0.22 | <.001 |
| Social motivation → WOA | 0.11 | .041 |
| Conflict → WOA, direct effect | −0.36 | <.001 |

Serial indirect effects through dissonance and epistemic motivation (−0.02, CI [−0.04, −0.004]) and through dissonance and social motivation (−0.01, CI [−0.04, −0.001]) were significant. The indirect effect through dissonance alone was not (0.03, CI [−0.01, 0.10]). The model explained 12% of the outcome variance.

Post hoc comparisons (Table 3) found dissonance means of 5.55 under competition versus 3.72 under cooperation for high-conflict critical decisions (difference 1.83, p < .001). For low-conflict critical decisions the difference was 0.61 (p = .040). Corresponding competitive–cooperative differences in non-critical decisions were nonsignificant at both conflict levels. These null comparisons do not establish equivalence.

## Limitations

The North American employee sample and one-shot hypothetical scenarios limit cultural and longitudinal generalization. The study concerns subjective advisory decisions, not autonomous systems or tasks with verified correct answers. Criticality changes task content and budget as well as perceived importance. The measured mediators were collected after the final decision, so the mediation model alone does not establish their causal ordering. Lower advice uptake does not demonstrate poorer decision accuracy. Suggested interventions such as justification requirements were not experimentally evaluated here. Supplemental appendices referenced in the article are not included in the supplied Markdown.

## Related Concepts

- [[concepts/cognitive-dissonance|Cognitive Dissonance]]: measured psychological discomfort links conflicting advice to motivational withdrawal; this differs from geometric or private–public belief proxies.

## Related Papers

- [[papers/putting-a-human-in-the-loop-increasing-uptake-but-decreasing-accuracy-of-automated-decision-making|Putting a human in the loop]]: complements this study by separating advice uptake from accuracy and testing retained adjustment authority.
- Jussupow, Benbasat, and Heinzl (2024), *An integrative perspective on algorithm aversion and appreciation in decision-making*: cited conceptual background on advice acceptance (reference 40).
- Turel and Kalhan (2023), *Prejudiced against the machine? Implicit associations and the transience of algorithm aversion*: supplies methodological precedent for behavioral advice uptake (reference 81).

Published in *Journal of Management Information Systems*, 43(2), 368–401. [Article DOI](https://doi.org/10.1080/07421222.2026.2647459).
