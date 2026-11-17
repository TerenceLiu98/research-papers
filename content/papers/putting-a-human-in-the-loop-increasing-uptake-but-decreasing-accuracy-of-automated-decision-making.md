---
title: "Putting a human in the loop: Increasing uptake, but decreasing accuracy of automated decision-making"
type: paper
authors:
  - Daniela Sele
  - Marina Chugunova
year: 2024
doi: "10.1371/journal.pone.0298037"
tags:
  - human-ai-decision-making
  - human-oversight
  - automation-bias
---

## TL;DR

In a 292-person prediction experiment, allowing participants to adjust advice increased preference for an algorithm over an equally accurate human by 7 percentage points, but increased mean absolute prediction error from 17.4 to 18.0 percentiles. Participants intervened less often, and by smaller amounts, on the least accurate recommendations. Retaining human control improved uptake without ensuring effective quality control.

## Research Question

Does retaining authority to adjust recommendations increase algorithm uptake, and do human monitors improve predictions or correct large errors effectively?

## Motivation

Human review is often proposed to preserve agency and ensure decision quality. These goals need separate evaluation: willingness to adopt automated advice need not imply that users can identify its mistakes. The study compares advice sources with matched accuracy to isolate source preference from performance differences.

## Contributions

- Separates recommendation-source choice from the allocation of final decision authority.
- Demonstrates an uptake–accuracy trade-off under matched human and algorithmic advice quality.
- Examines intervention frequency and magnitude by recommendation source and error severity, including whether selecting a preferred source improves monitoring.

## Method

Participants predicted standardized mathematics-test percentile ranks from nine student characteristics in the U.S. High School Longitudinal Study of 2009. Algorithmic estimates came from a previously developed statistical model; human estimates came from a 200-person U.S. MTurk pre-study. Recommendations were curated to differ by at most two percentiles. Participants knew that both sources had average errors of 15–20 percentiles, but were not told the case-level matching.

Random assignment placed 108 participants in Delegation, where the selected recommendation became the final prediction, and 184 in Human-in-the-Loop, where a prefilled recommendation could be freely adjusted. Each completed 20 profiles in four fixed-order blocks, choosing an advice source before each block. No accuracy feedback was provided during the task. In the adjustment condition, the preferred source was replaced by the alternative with probability 0.4, with the actual source clearly disclosed. Accuracy-contingent bonuses rewarded one randomly selected prediction.

The authors compare treatment means and estimate participant fixed-effects models for intervention and accuracy, with additional pooled regressions and robustness checks. Data and instructions are identified in the paper at [OSF](https://doi.org/10.17605/OSF.IO/692XW).

## Experiments

The online experiment ran in September–October 2021 using the Zurich university subject pool. Mean age was 24; 53% were female, 54% were ETH Zurich students, and 62% studied STEM disciplines.

| Outcome | Reported finding |
| --- | --- |
| Algorithm choice | 66% of choices under delegation; adjustment authority increased this by 7 percentage points (p = .01). |
| Final prediction error | Mean absolute error increased from 17.4 to 18.0 percentiles with adjustment (p = .04). |
| Confidence in submitted predictions | Increased from 41 to 48 on a 100-point scale (p = .008). |
| Intervention | 63% of recommendations were adjusted; intervention probability did not significantly differ by source. |
| Conditional adjustment size | Human-source advice received larger adjustments; fixed-effects coefficient 0.868 percentiles (Table 1, p < .01). |
| Large-error intervention | 60% versus 64% for smaller errors (p = .02); large errors were at least 26 percentiles from truth. |
| Conditional adjustment by error size | 9.6 percentiles for large errors versus 11.3 for smaller errors (p < .001). |

Final errors following algorithmic versus human advice were 18.3 versus 17.7 percentiles; this difference was not statistically significant. The large-error monitoring failure occurred for both sources, without a significant source interaction. Alternative error thresholds and continuous-error analyses supported the pattern. Choosing rather than being assigned an advice source did not reliably improve adjustment size or accuracy.

## Limitations

The technology-friendly university sample, single prediction task, fixed profile order, and absence of feedback limit generalization to expert monitoring and adaptive deployment. Matched advice quality deliberately removes performance differences that can matter in practice. Monitors and the algorithm had access to the same profile information; expertise and additional contextual information could change the value of intervention. Confidence was measured after the experiment. The experiment demonstrates a context-specific accuracy cost of oversight, not that oversight lacks accountability or agency benefits. Its discussion of AI legislation reflects the paper's publication context.

## Related Concepts

- [[concepts/human-oversight-of-ai|Human Oversight of AI]]: retained authority can increase adoption while failing to improve accuracy.
- [[concepts/automation-bias|Automation Bias]]: smaller adjustments to algorithmic advice are consistent with greater reliance, though intervention frequency did not differ by source.
- [[concepts/calibrated-reliance|Calibrated Reliance]]: intervention was least responsive where recommendations contained the largest errors.

## Related Papers

- Dietvorst, Simmons, and Massey (2018), *Overcoming algorithm aversion: people will use imperfect algorithms if they can (even slightly) modify them*: supplies the prediction task and prior evidence on adjustment authority and uptake (reference 22).
- Logg, Minson, and Moore (2019), *Algorithm appreciation: People prefer algorithmic to human judgment*: motivates comparison between advice sources rather than between algorithmic advice and unaided judgment (reference 11).
- [[papers/unveiling-the-hidden-layer-ambivalent-cognitive-effects-of-xai-in-augmented-decision-making-under-uncertainty|Unveiling the Hidden Layer]]: a related library study of how explanations can simultaneously support scrutiny and increase harmful reliance; it studies a different intervention from retained adjustment authority.
