---
title: Cherry-Picking in News Reporting
type: concept
aliases:
  - Bias by Omission
  - Omission-Based Media Bias
tags:
  - media-bias
  - computational-journalism
  - cherry-picking
  - text-classification
---

## Overview

Cherry-picking in news reporting is the selective omission, distortion, or over-emphasis of evidence in ways that favor one narrative. Computational detection of omission differs from lexical or framing analysis: the relevant fact may never appear in the target article. A system therefore needs an event-level comparison set, a way to judge which cross-source statements matter, and a way to verify that those statements are genuinely absent.

## Key Ideas

- **Absence requires external context.** A target document alone cannot reveal every important omitted fact. Reports from other outlets provide candidate statements and competing perspectives.
- **Importance and presence are separate decisions.** A statement can be important but already expressed through different wording. Detection pipelines should first estimate event-level importance and then test semantic presence in the target report.
- **The event is the comparison unit.** Articles must be grouped by the event they cover before their statements can be compared. Event-clustering errors can create false omissions or hide real ones.
- **Counter-bias can substitute for a neutral source.** Opposing accounts may jointly provide useful context when no trusted neutral narrative exists, although their combined coverage is not guaranteed to be complete or neutral.
- **Correction is not the same as neutralization.** Adding counter-perspective statements can improve balance and comprehensiveness, but semantic similarity to a designated neutral report does not independently establish neutrality.
- **Human judgment remains embedded in the task.** Statement importance, outlet-bias labels, event boundaries, and reference neutrality all involve contestable choices. Agreement filters and source masking reduce but do not eliminate subjectivity.

## Important Papers

- [[papers/filling-the-blanks-context-driven-detection-and-correction-of-cherry-picking-in-news-reporting|Filling the Blanks: Context-driven Detection and Correction of Cherry-picking in News Reporting]]: formulates sentence omission as context-conditioned importance classification, introduces the Cherry dataset, and evaluates an end-to-end detection and correction pipeline.
- Asudeh et al. (2020), "On Detecting Cherry-Picked Trendlines": detects selectively presented portions of quantitative trends.
- Lin et al. (2021), "On Detecting Cherry-Picked Generalizations": studies computational detection of selectively supported generalizations.

## Related Concepts

- [[concepts/microframe-bias-and-intensity|Microframe Bias and Intensity]]: measures semantic direction and emphasis in observed language, complementing omission-based analysis.
- [[concepts/text-embedding-models|Text Embedding Models]]: support event clustering, statement clustering, semantic presence verification, and report comparison.
- [[concepts/issue-framing-effects|Issue Framing Effects]]: concerns how selected aspects shape audience interpretation; omission is one mechanism by which selection can occur.
- [[concepts/out-of-context-multimodal-misinformation-detection|Out-of-Context Multimodal Misinformation Detection]]: another setting where truth depends on relationships and context rather than the validity of isolated content.
