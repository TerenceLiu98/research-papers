---
title: Information Equivalence
type: concept
aliases:
  - Informational Equivalence
definition: "Information equivalence requires an informational treatment to change beliefs about the intended characteristic without changing beliefs about other characteristics."
tags:
  - experimental-design
  - causal-inference
---

## Overview

An informational treatment can induce more inferences than the researcher intends. Information equivalence requires that the manipulation change only the intended belief. Names, for example, can convey race or ethnicity while also suggesting socioeconomic or migrant status. A randomized contrast between such names remains a contrast between bundled signals, making attribution to one characteristic difficult.

## Key Ideas

- Random assignment balances who receives a signal; it does not guarantee that the signal changes only one belief.
- Perception checks should examine plausible unintended characteristics as well as the intended manipulation. Administrative demographic associations are not necessarily measures of recipients' beliefs.
- Measuring correlated perceptions can diagnose a problem, but adding them to a regression does not automatically identify separate causal effects.
- Design responses include holding unintended perceptions fixed or selecting outcomes unaffected by unintended signals; either strategy requires substantive justification.

An additional design issue is when information becomes available. Leavitt and Rivera-Burgos (2024) show that holding a nonracial cue constant inside an email cannot resolve inferred-attribute explanations for recipients whose decision to open depends on the racial cue outside it. Symmetric exposure timing complements, but does not itself guarantee, equivalence of induced beliefs.

## Important Papers

- Dafoe, Zhang, and Caughey (2018), “Information Equivalence in Survey Experiments”: framework cited by Landgrave and Weller.
- [[papers/do-name-based-treatments-violate-information-equivalence-evidence-from-a-correspondence-audit-experiment|Do Name-Based Treatments Violate Information Equivalence? Evidence from a Correspondence Audit Experiment]]: combines name perceptions with legislative replies to demonstrate the attribution problem.

- [[papers/audit-experiments-of-racial-discrimination-and-the-importance-of-symmetry-in-exposure-to-cues|Audit Experiments of Racial Discrimination and the Importance of Symmetry in Exposure to Cues]]: derives the exposure-timing problem and designs that align cue availability with the intended causal contrast.

## Related Concepts

- [[concepts/treatment-confounder-separability|Treatment-Confounder Separability]]: concerns changing a feature while preserving other consequential features of a treatment object; information equivalence specifically concerns the beliefs induced by that object.
