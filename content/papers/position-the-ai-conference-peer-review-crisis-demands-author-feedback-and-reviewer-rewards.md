---
title: "Position: The AI Conference Peer Review Crisis Demands Author Feedback and Reviewer Rewards"
type: paper
authors:
  - Jaeho Kim
  - Yunseok Lee
  - Seulki Lee
year: null
tags:
  - peer-review
  - ai-conferences
  - reviewer-accountability
  - reviewer-incentives
---

## TL;DR

This position paper argues that rapidly growing AI conferences need reciprocal accountability in peer review. It proposes releasing neutral and positive review content before criticisms and ratings so authors can assess reviewer comprehension without knowing the recommendation, then using aggregated author feedback to inform meta-review and durable reviewer rewards. The proposal is an institutional design argument rather than evidence that these interventions improve review quality.

## Research Question

How can AI conferences add reviewer accountability and professional recognition without exposing reviewers to retaliatory author ratings or disrupting existing review timelines?

## Motivation

The paper attributes pressure on AI conference review quality to three stakeholders. Submission growth, publication incentives, and rapidly shifting research topics increase the author-side workload and create a knowledge ceiling that review-process changes cannot fully remove. Reviewers hold substantial power over authors but generally face limited accountability for superficial reviews, while conferences rely heavily on voluntary service without offering durable professional recognition. The authors therefore focus on process changes available to reviewers and conference systems rather than attempting to regulate every source of low-quality submissions.

## Contributions

- Proposes [[concepts/two-stage-bidirectional-peer-review|Two-Stage Bidirectional Peer Review]], in which authors assess the paper summary, strengths, and clarifying questions before seeing weaknesses and ratings.
- Suggests showing authors a clearly identified LLM-generated review as a reference and allowing them to flag suspected automated reviews, with meta-reviewer oversight and aggregation across assignments.
- Connects author feedback to short-term review assessment and longer-term reviewer recognition through standardized digital badges, activity records, and a proposed reviewer impact score.
- Surveys reviewer recognition practices across 14 major AI venues from 2020 through 2024 and reports that 10 publicly recognized outstanding reviewers in 2024, while only one offered the paper's coded form of in-kind compensation that year.
- Presents implementation risks and counterarguments, including outcome-biased author ratings, incentives for unnecessarily long or lenient reviews, reviewer recruitment costs, gaming, financial constraints, and added meta-reviewer workload.

## Method

The paper develops a stakeholder diagnosis of AI conference peer review and proposes an incremental redesign of the standard double-blind workflow. Under the redesign, human and explicitly labeled LLM reviews are prepared during the ordinary review period. Review content is split into two releases. Authors first receive summaries, strengths, and clarification questions, then rate comprehension and constructiveness and may justify an LLM-use flag. After that feedback is locked, the system releases weaknesses and overall scores and proceeds with the normal discussion and meta-review stages.

The reward proposal uses aggregated author feedback rather than a single author's score. Conferences could issue top-10% and top-30% reviewer badges, record reviewing activity, consider reviewer quality in selecting area chairs or senior program members, and provide low-cost recognition or educational opportunities. The paper also proposes a citation-like reviewer impact metric based on the later influence of reviewed papers, but does not specify or validate its statistical construction.

## Experiments

This is primarily a position paper and does not experimentally evaluate the proposed workflow or reward mechanisms. Its supporting analyses are descriptive:

- An ICLR keyword analysis for 2018-2025 reports that, on average, 17% of the top 20 keywords change each year, which the authors use to illustrate shifting reviewer expertise demands.
- An analysis of ICLR reviews from 2017-2024 uses Gemini 1.5 Flash to count spelling and obvious plural errors. Reported errors decline from 7.79 per 1,000 words in 2017 to 5.54 in 2024, and the share of error-free reviews rises from 31.4% in 2023 to 37.8% in 2024. The authors explicitly treat this only as soft, non-conclusive evidence of possible LLM-assisted generation or editing.
- A venue survey codes reviewer halls of fame and in-kind compensation across 14 AI conferences from 2020-2024. The paper reports public recognition at 10 venues in 2024 and limited material compensation.
- Prior NeurIPS experiments are used as motivation: the paper reports that independently reviewed paper groups produced different accept-or-reject outcomes for 16-23% of papers, and it draws on observed author-outcome and review-length biases to motivate staged disclosure and length limits.

## Limitations

The paper does not establish that AI conference review quality is declining, and it acknowledges that public complaints may overrepresent dissatisfied authors. The typo analysis cannot distinguish LLM use from spell-checking, editing, changing reviewer populations, or other time trends; it also depends on an LLM error detector. The venue survey may miss programs that were not publicly documented.

The proposed interventions remain untested. Author feedback may discourage recruiting, reward length or positivity rather than insight, be used strategically against critical reviews, and increase meta-reviewer workload. Aggregation and oversight may reduce these risks but are not evaluated. Digital badges can be gamed, the proposed reviewer impact score may reward fortunate assignment to influential papers rather than review quality, and cross-venue standardization would require platform cooperation and funding. The labeled LLM-review comparison is presented as a deterrent and soft reference, not a reliable detector of automated reviewing.

## Related Concepts

- [[concepts/two-stage-bidirectional-peer-review|Two-Stage Bidirectional Peer Review]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/automation-bias|Automation Bias]]

## Related Papers

- Goldberg et al. (2025), "Peer reviews of peer reviews: A randomized controlled trial and other experiments": provides evidence on author-outcome and review-length biases that motivates the staged design.
- Cortes and Lawrence (2021), "Inconsistency in conference peer review," and Beygelzimer et al. (2023), "Has the machine learning review process become more arbitrary as the field has grown?": report NeurIPS review-consistency experiments discussed by the paper.
- Liang et al. (2024), "Monitoring AI-modified content at scale": examines linguistic changes in AI conference reviews after ChatGPT.
- Sculley, Snoek, and Wiltschko (2018), "Avoiding a tragedy of the commons in the peer review process": proposes structured monetary incentives for reviewers.

[[index|Library home]]
